const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// =============================================
// SECTIONS CRUD
// =============================================

// GET all sections (with place count)
router.get('/sections', async (req, res) => {
  try {
    const [sections] = await pool.query(`
      SELECT s.*, COUNT(p.id) AS place_count
      FROM discover_sections s
      LEFT JOIN discover_places p ON p.section_id = s.id
      GROUP BY s.id
      ORDER BY s.sort_order ASC, s.id ASC
    `);
    res.json(sections);
  } catch (err) {
    console.error('GET /discover-system/sections error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create section
router.post('/sections', auth, async (req, res) => {
  try {
    const { name_en, name_ar, sort_order, is_active } = req.body;
    const [[{ maxOrder }]] = await pool.query('SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM discover_sections');
    const [result] = await pool.query(
      'INSERT INTO discover_sections (name_en, name_ar, sort_order, is_active) VALUES (?, ?, ?, ?)',
      [name_en, name_ar, sort_order || maxOrder + 1, is_active !== false]
    );
    const [newRow] = await pool.query('SELECT * FROM discover_sections WHERE id = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error('POST /discover-system/sections error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update section
router.put('/sections/:id', auth, async (req, res) => {
  try {
    const data = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    await pool.query(`UPDATE discover_sections SET ${setClause} WHERE id = ?`, [...values, req.params.id]);
    const [updated] = await pool.query('SELECT * FROM discover_sections WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    console.error('PUT /discover-system/sections error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE section
router.delete('/sections/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM discover_sections WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /discover-system/sections error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// =============================================
// PLACES CRUD
// =============================================

// Helper: load categories + gallery for a place
async function loadPlaceRelations(place) {
  const [categories] = await pool.query('SELECT * FROM discover_place_categories WHERE place_id = ?', [place.id]);
  const [gallery] = await pool.query('SELECT * FROM discover_place_gallery WHERE place_id = ? ORDER BY sort_order ASC', [place.id]);
  return { ...place, categories, gallery };
}

// GET all places (with relations)
router.get('/places', async (req, res) => {
  try {
    const { section_id, region, category } = req.query;
    let query = `
      SELECT p.*, s.name_en AS section_name_en, s.name_ar AS section_name_ar
      FROM discover_places p
      LEFT JOIN discover_sections s ON s.id = p.section_id
    `;
    const conditions = [];
    const params = [];

    if (section_id) { conditions.push('p.section_id = ?'); params.push(section_id); }
    if (region) { conditions.push('p.region = ?'); params.push(region); }
    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY p.sort_order ASC, p.id ASC';

    const [places] = await pool.query(query, params);

    // Load relations
    const result = [];
    for (const place of places) {
      const full = await loadPlaceRelations(place);
      // If category filter, check if place has matching category
      if (category) {
        const hasCategory = full.categories.some(c =>
          c.name_en.toLowerCase() === category.toLowerCase() ||
          c.name_ar === category
        );
        if (!hasCategory) continue;
      }
      result.push(full);
    }

    res.json(result);
  } catch (err) {
    console.error('GET /discover-system/places error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single place
router.get('/places/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, s.name_en AS section_name_en, s.name_ar AS section_name_ar
      FROM discover_places p
      LEFT JOIN discover_sections s ON s.id = p.section_id
      WHERE p.id = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const full = await loadPlaceRelations(rows[0]);
    res.json(full);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create place
router.post('/places', auth, async (req, res) => {
  try {
    const { categories, gallery, ...data } = req.body;

    // Auto sort_order
    const [[{ maxOrder }]] = await pool.query('SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM discover_places');
    data.sort_order = data.sort_order || maxOrder + 1;

    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');

    const [result] = await pool.query(
      `INSERT INTO discover_places (${keys.join(', ')}) VALUES (${placeholders})`, values
    );
    const placeId = result.insertId;

    // Insert categories
    if (categories && Array.isArray(categories)) {
      for (const cat of categories) {
        await pool.query(
          'INSERT INTO discover_place_categories (place_id, name_en, name_ar) VALUES (?, ?, ?)',
          [placeId, cat.name_en || cat.tag_en || '', cat.name_ar || cat.tag_ar || '']
        );
      }
    }

    // Insert gallery
    if (gallery && Array.isArray(gallery)) {
      for (let i = 0; i < gallery.length; i++) {
        const img = gallery[i];
        const url = typeof img === 'string' ? img : img.image_url;
        await pool.query(
          'INSERT INTO discover_place_gallery (place_id, image_url, sort_order) VALUES (?, ?, ?)',
          [placeId, url, i + 1]
        );
      }
    }

    const [newRow] = await pool.query('SELECT * FROM discover_places WHERE id = ?', [placeId]);
    const full = await loadPlaceRelations(newRow[0]);
    res.status(201).json(full);
  } catch (err) {
    console.error('POST /discover-system/places error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update place
router.put('/places/:id', auth, async (req, res) => {
  try {
    const { categories, gallery, section_name_en, section_name_ar, ...data } = req.body;
    const id = req.params.id;

    // Update main fields
    if (Object.keys(data).length > 0) {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const setClause = keys.map(k => `${k} = ?`).join(', ');
      await pool.query(`UPDATE discover_places SET ${setClause} WHERE id = ?`, [...values, id]);
    }

    // Replace categories
    if (categories !== undefined) {
      await pool.query('DELETE FROM discover_place_categories WHERE place_id = ?', [id]);
      if (Array.isArray(categories)) {
        for (const cat of categories) {
          await pool.query(
            'INSERT INTO discover_place_categories (place_id, name_en, name_ar) VALUES (?, ?, ?)',
            [id, cat.name_en || cat.tag_en || '', cat.name_ar || cat.tag_ar || '']
          );
        }
      }
    }

    // Replace gallery
    if (gallery !== undefined) {
      await pool.query('DELETE FROM discover_place_gallery WHERE place_id = ?', [id]);
      if (Array.isArray(gallery)) {
        for (let i = 0; i < gallery.length; i++) {
          const img = gallery[i];
          const url = typeof img === 'string' ? img : img.image_url;
          await pool.query(
            'INSERT INTO discover_place_gallery (place_id, image_url, sort_order) VALUES (?, ?, ?)',
            [id, url, i + 1]
          );
        }
      }
    }

    const [updated] = await pool.query('SELECT * FROM discover_places WHERE id = ?', [id]);
    if (updated.length === 0) return res.status(404).json({ error: 'Not found' });
    const full = await loadPlaceRelations(updated[0]);
    res.json(full);
  } catch (err) {
    console.error('PUT /discover-system/places error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE place
router.delete('/places/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM discover_places WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// =============================================
// FEATURED (homepage + UNESCO)
// =============================================
router.get('/featured', async (req, res) => {
  try {
    const [homepagePlaces] = await pool.query(`
      SELECT p.*, s.name_en AS section_name_en, s.name_ar AS section_name_ar
      FROM discover_places p
      LEFT JOIN discover_sections s ON s.id = p.section_id
      WHERE p.show_on_homepage = 1 AND p.is_active = 1
      ORDER BY p.sort_order ASC
      LIMIT 3
    `);

    const [unescoPlaces] = await pool.query(`
      SELECT p.*, s.name_en AS section_name_en, s.name_ar AS section_name_ar
      FROM discover_places p
      LEFT JOIN discover_sections s ON s.id = p.section_id
      WHERE p.show_on_unesco = 1 AND p.is_active = 1
      ORDER BY p.sort_order ASC
      LIMIT 6
    `);

    // Load relations for each
    const homepage = [];
    for (const p of homepagePlaces) homepage.push(await loadPlaceRelations(p));
    const unesco = [];
    for (const p of unescoPlaces) unesco.push(await loadPlaceRelations(p));

    res.json({ homepage, unesco });
  } catch (err) {
    console.error('GET /discover-system/featured error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// =============================================
// PLACES BY SECTION
// =============================================
router.get('/sections/:id/places', async (req, res) => {
  try {
    const { region, category } = req.query;
    let query = 'SELECT * FROM discover_places WHERE section_id = ? AND is_active = 1';
    const params = [req.params.id];

    if (region) { query += ' AND region = ?'; params.push(region); }
    query += ' ORDER BY sort_order ASC';

    const [places] = await pool.query(query, params);
    const result = [];
    for (const place of places) {
      const full = await loadPlaceRelations(place);
      if (category) {
        const hasCategory = full.categories.some(c =>
          c.name_en.toLowerCase() === category.toLowerCase()
        );
        if (!hasCategory) continue;
      }
      result.push(full);
    }
    res.json(result);
  } catch (err) {
    console.error('GET /discover-system/sections/:id/places error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// =============================================
// PAGE SETTINGS
// =============================================
router.get('/page-settings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM discover_page_settings');
    const settings = {};
    rows.forEach(r => { settings[r.setting_key] = r.setting_value; });
    res.json(settings);
  } catch (err) {
    console.error('GET /discover-system/page-settings error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/page-settings', auth, async (req, res) => {
  try {
    const data = req.body;
    for (const [key, value] of Object.entries(data)) {
      await pool.query(
        'INSERT INTO discover_page_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, value, value]
      );
    }
    // Return updated settings
    const [rows] = await pool.query('SELECT * FROM discover_page_settings');
    const settings = {};
    rows.forEach(r => { settings[r.setting_key] = r.setting_value; });
    res.json(settings);
  } catch (err) {
    console.error('PUT /discover-system/page-settings error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
