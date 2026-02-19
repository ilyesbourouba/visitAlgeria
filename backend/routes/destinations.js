const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// Valid columns in the `destinations` table
const ALLOWED_COLUMNS = [
  'id', 'name_en', 'name_ar', 'background_image',
  'about_en', 'about_ar',
  'population', 'area', 'climate_en', 'climate_ar',
  'best_time_en', 'best_time_ar',
  'cuisine_en', 'cuisine_ar',
  'etiquette_en', 'etiquette_ar',
  'transport_en', 'transport_ar',
  'is_active', 'sort_order', 'show_on_homepage'
];

/**
 * Pick only allowed scalar fields from the request body.
 * Strips out gallery, tags, section_ dividers, and any objects/arrays.
 */
function pickColumns(body) {
  const data = {};
  for (const col of ALLOWED_COLUMNS) {
    if (body[col] !== undefined) {
      data[col] = body[col];
    }
  }
  return data;
}

// Helper: Enrich a destination row with its gallery and tags
async function enrichDestination(dest) {
  const [gallery] = await pool.query(
    'SELECT * FROM destination_gallery WHERE destination_id = ? ORDER BY sort_order ASC',
    [dest.id]
  );
  const [tags] = await pool.query(
    'SELECT * FROM destination_tags WHERE destination_id = ?',
    [dest.id]
  );
  return { ...dest, gallery, tags };
}

// ─── GET all ──────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const activeOnly = req.query.active === 'true';
    const homepageOnly = req.query.homepage === 'true';
    let query = 'SELECT * FROM destinations';
    const conditions = [];
    if (activeOnly) conditions.push('is_active = 1');
    if (homepageOnly) conditions.push('show_on_homepage = 1');
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY id ASC';

    const [rows] = await pool.query(query);
    const enriched = await Promise.all(rows.map(enrichDestination));
    res.json(enriched);
  } catch (err) {
    console.error('GET /api/destinations error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── GET single ───────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM destinations WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const full = await enrichDestination(rows[0]);
    res.json(full);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── POST create ──────────────────────────────────────────────────────
router.post('/', auth, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Insert main destination row (only valid columns)
    const data = pickColumns(req.body);
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');

    const [result] = await connection.query(
      `INSERT INTO destinations (${keys.join(', ')}) VALUES (${placeholders})`,
      values
    );
    const destId = data.id || result.insertId;

    // 2. Insert gallery items
    const gallery = req.body.gallery;
    if (Array.isArray(gallery)) {
      for (let i = 0; i < gallery.length; i++) {
        const item = gallery[i];
        const url = typeof item === 'string' ? item : (item.image_url || item.url);
        if (!url) continue;
        await connection.query(
          'INSERT INTO destination_gallery (destination_id, image_url, type, sort_order) VALUES (?, ?, ?, ?)',
          [destId, url, item.type || 'image', item.sort_order || i]
        );
      }
    }

    // 3. Insert tags
    const tags = req.body.tags;
    if (Array.isArray(tags)) {
      for (const tag of tags) {
        const nameEn = typeof tag === 'string' ? tag : (tag.name_en || tag.text || '');
        const nameAr = typeof tag === 'string' ? '' : (tag.name_ar || '');
        if (!nameEn) continue;
        await connection.query(
          'INSERT INTO destination_tags (destination_id, name_en, name_ar) VALUES (?, ?, ?)',
          [destId, nameEn, nameAr]
        );
      }
    }

    await connection.commit();

    // Return the full enriched row
    const [newRows] = await pool.query('SELECT * FROM destinations WHERE id = ?', [destId]);
    const enriched = await enrichDestination(newRows[0]);
    res.status(201).json(enriched);
  } catch (err) {
    await connection.rollback();
    console.error('POST /destinations error:', err);
    res.status(500).json({ error: 'Save failed: ' + err.message });
  } finally {
    connection.release();
  }
});

// ─── PUT update ───────────────────────────────────────────────────────
router.put('/:id', auth, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const id = req.params.id;

    // 1. Update main destination row (only valid columns, skip id)
    const data = pickColumns(req.body);
    delete data.id; // can't change the wilaya code
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length > 0) {
      const setClause = keys.map(k => `${k} = ?`).join(', ');
      await connection.query(
        `UPDATE destinations SET ${setClause} WHERE id = ?`,
        [...values, id]
      );
    }

    // 2. Replace gallery (delete + re-insert)
    if (req.body.gallery !== undefined) {
      await connection.query('DELETE FROM destination_gallery WHERE destination_id = ?', [id]);
      if (Array.isArray(req.body.gallery)) {
        for (let i = 0; i < req.body.gallery.length; i++) {
          const item = req.body.gallery[i];
          const url = typeof item === 'string' ? item : (item.image_url || item.url);
          if (!url) continue;
          await connection.query(
            'INSERT INTO destination_gallery (destination_id, image_url, type, sort_order) VALUES (?, ?, ?, ?)',
            [id, url, item.type || 'image', item.sort_order || i]
          );
        }
      }
    }

    // 3. Replace tags (delete + re-insert)
    if (req.body.tags !== undefined) {
      await connection.query('DELETE FROM destination_tags WHERE destination_id = ?', [id]);
      if (Array.isArray(req.body.tags)) {
        for (const tag of req.body.tags) {
          const nameEn = typeof tag === 'string' ? tag : (tag.name_en || tag.text || '');
          const nameAr = typeof tag === 'string' ? '' : (tag.name_ar || '');
          if (!nameEn) continue;
          await connection.query(
            'INSERT INTO destination_tags (destination_id, name_en, name_ar) VALUES (?, ?, ?)',
            [id, nameEn, nameAr]
          );
        }
      }
    }

    await connection.commit();

    // Return enriched row
    const [updatedRows] = await pool.query('SELECT * FROM destinations WHERE id = ?', [id]);
    if (updatedRows.length === 0) return res.status(404).json({ error: 'Not found' });
    const enriched = await enrichDestination(updatedRows[0]);
    res.json(enriched);
  } catch (err) {
    await connection.rollback();
    console.error(`PUT /destinations/${req.params.id} error:`, err);
    res.status(500).json({ error: 'Update failed: ' + err.message });
  } finally {
    connection.release();
  }
});

// ─── DELETE ───────────────────────────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    // Gallery and tags are deleted automatically via ON DELETE CASCADE
    await pool.query('DELETE FROM destinations WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(`DELETE /destinations/${req.params.id} error:`, err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
