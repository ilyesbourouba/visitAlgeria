const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// Valid columns in the events table (used to filter out non-DB fields)
const EVENT_COLUMNS = new Set([
  'title_en', 'title_ar', 'subtitle_en', 'subtitle_ar',
  'description_en', 'description_ar',
  'category', 'region', 'location', 'address', 'place',
  'date_start', 'date_end', 'time_start', 'time_end',
  'image_url', 'contact_phone', 'contact_email', 'homepage',
  'is_featured', 'is_active', 'sort_order'
]);

// Helper: attach categories, tags, gallery to an event
async function enrichEvent(event) {
  const [categories] = await pool.query(
    `SELECT ec.id, ec.name_en, ec.name_ar 
     FROM event_categories ec 
     JOIN event_category_map ecm ON ec.id = ecm.category_id 
     WHERE ecm.event_id = ?`,
    [event.id]
  );
  event.categories = categories;

  const [tags] = await pool.query('SELECT * FROM event_tags WHERE event_id = ?', [event.id]);
  event.tags = tags;

  const [gallery] = await pool.query('SELECT * FROM event_gallery WHERE event_id = ? ORDER BY sort_order', [event.id]);
  event.gallery = gallery;

  return event;
}

// Helper: sync junction table — normalize IDs from objects or plain values
async function syncCategories(eventId, categoryIds) {
  await pool.query('DELETE FROM event_category_map WHERE event_id = ?', [eventId]);
  if (categoryIds && categoryIds.length > 0) {
    for (const cat of categoryIds) {
      // Accept either a plain ID or an object { id, ... }
      const catId = typeof cat === 'object' ? cat.id : cat;
      if (catId) {
        await pool.query(
          'INSERT INTO event_category_map (event_id, category_id) VALUES (?, ?)',
          [eventId, catId]
        );
      }
    }
  }
}

// Helper: extract only valid DB columns from request body
function extractEventData(body) {
  const data = {};
  for (const [key, value] of Object.entries(body)) {
    if (EVENT_COLUMNS.has(key) && value !== undefined) {
      data[key] = value;
    }
  }
  return data;
}

// GET all events (public) — includes categories, tags, gallery
router.get('/', async (req, res) => {
  try {
    const { active, featured, category, region } = req.query;
    let query = 'SELECT DISTINCT e.* FROM events e';
    const params = [];
    const conditions = [];

    // If filtering by category, join the junction table
    if (category && category !== 'all') {
      query += ' JOIN event_category_map ecm ON e.id = ecm.event_id';
      conditions.push('ecm.category_id = ?');
      params.push(category);
    }

    if (active === 'true') conditions.push('e.is_active = 1');
    if (featured === 'true') conditions.push('e.is_featured = 1');
    if (region && region !== 'all') { conditions.push('e.region = ?'); params.push(region); }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY e.sort_order ASC, e.date_start DESC';
    const [events] = await pool.query(query, params);

    // Enrich each event
    for (const event of events) {
      await enrichEvent(event);
    }

    res.json(events);
  } catch (err) {
    console.error('GET /events error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single event (public)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    await enrichEvent(rows[0]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create event (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { tags, gallery, categories } = req.body;
    const eventData = extractEventData(req.body);

    const keys = Object.keys(eventData);
    const values = Object.values(eventData);
    
    if (keys.length === 0) {
      return res.status(400).json({ error: 'No valid fields provided' });
    }

    const placeholders = keys.map(() => '?').join(', ');
    const [result] = await pool.query(
      `INSERT INTO events (${keys.join(', ')}) VALUES (${placeholders})`,
      values
    );
    const eventId = result.insertId;

    // Sync categories
    await syncCategories(eventId, categories);

    // Insert tags
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await pool.query(
          'INSERT INTO event_tags (event_id, tag_en, tag_ar) VALUES (?, ?, ?)',
          [eventId, tag.tag_en, tag.tag_ar]
        );
      }
    }

    // Insert gallery
    if (gallery && gallery.length > 0) {
      for (let i = 0; i < gallery.length; i++) {
        const imgUrl = typeof gallery[i] === 'string' ? gallery[i] : gallery[i].image_url;
        await pool.query(
          'INSERT INTO event_gallery (event_id, image_url, sort_order) VALUES (?, ?, ?)',
          [eventId, imgUrl, i + 1]
        );
      }
    }

    const [newEvent] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
    await enrichEvent(newEvent[0]);
    res.status(201).json(newEvent[0]);
  } catch (err) {
    console.error('POST /events error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update event (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { tags, gallery, categories } = req.body;
    const eventData = extractEventData(req.body);

    const keys = Object.keys(eventData);
    const values = Object.values(eventData);

    if (keys.length > 0) {
      const setClause = keys.map(k => `${k} = ?`).join(', ');
      await pool.query(`UPDATE events SET ${setClause} WHERE id = ?`, [...values, req.params.id]);
    }

    // Sync categories
    if (categories !== undefined) {
      await syncCategories(req.params.id, categories);
    }

    // Replace tags
    if (tags !== undefined) {
      await pool.query('DELETE FROM event_tags WHERE event_id = ?', [req.params.id]);
      if (Array.isArray(tags)) {
        for (const tag of tags) {
          await pool.query(
            'INSERT INTO event_tags (event_id, tag_en, tag_ar) VALUES (?, ?, ?)',
            [req.params.id, tag.tag_en, tag.tag_ar]
          );
        }
      }
    }

    // Replace gallery
    if (gallery !== undefined) {
      await pool.query('DELETE FROM event_gallery WHERE event_id = ?', [req.params.id]);
      if (Array.isArray(gallery)) {
        for (let i = 0; i < gallery.length; i++) {
          const imgUrl = typeof gallery[i] === 'string' ? gallery[i] : gallery[i].image_url;
          await pool.query(
            'INSERT INTO event_gallery (event_id, image_url, sort_order) VALUES (?, ?, ?)',
            [req.params.id, imgUrl, i + 1]
          );
        }
      }
    }

    const [updated] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (updated.length === 0) return res.status(404).json({ error: 'Not found' });
    await enrichEvent(updated[0]);
    res.json(updated[0]);
  } catch (err) {
    console.error('PUT /events error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE event (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Junction and tags/gallery are cleaned up via ON DELETE CASCADE
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
