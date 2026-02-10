const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all events (public) — includes tags
router.get('/', async (req, res) => {
  try {
    const { active, featured, category, region } = req.query;
    let query = 'SELECT * FROM events WHERE 1=1';
    const params = [];

    if (active === 'true') { query += ' AND is_active = 1'; }
    if (featured === 'true') { query += ' AND is_featured = 1'; }
    if (category && category !== 'all') { query += ' AND category = ?'; params.push(category); }
    if (region && region !== 'all') { query += ' AND region = ?'; params.push(region); }

    query += ' ORDER BY sort_order ASC, date_start ASC';
    const [events] = await pool.query(query, params);

    // Attach tags to each event
    for (const event of events) {
      const [tags] = await pool.query('SELECT * FROM event_tags WHERE event_id = ?', [event.id]);
      event.tags = tags;
      const [gallery] = await pool.query('SELECT * FROM event_gallery WHERE event_id = ? ORDER BY sort_order', [event.id]);
      event.gallery = gallery;
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

    const event = rows[0];
    const [tags] = await pool.query('SELECT * FROM event_tags WHERE event_id = ?', [event.id]);
    event.tags = tags;
    const [gallery] = await pool.query('SELECT * FROM event_gallery WHERE event_id = ? ORDER BY sort_order', [event.id]);
    event.gallery = gallery;

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create event (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { tags, gallery, ...eventData } = req.body;
    const keys = Object.keys(eventData);
    const values = Object.values(eventData);
    const placeholders = keys.map(() => '?').join(', ');

    const [result] = await pool.query(
      `INSERT INTO events (${keys.join(', ')}) VALUES (${placeholders})`,
      values
    );

    const eventId = result.insertId;

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
        await pool.query(
          'INSERT INTO event_gallery (event_id, image_url, sort_order) VALUES (?, ?, ?)',
          [eventId, gallery[i].image_url || gallery[i], i + 1]
        );
      }
    }

    const [newEvent] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
    const [newTags] = await pool.query('SELECT * FROM event_tags WHERE event_id = ?', [eventId]);
    newEvent[0].tags = newTags;
    res.status(201).json(newEvent[0]);
  } catch (err) {
    console.error('POST /events error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update event (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { tags, gallery, ...eventData } = req.body;
    const keys = Object.keys(eventData);
    const values = Object.values(eventData);

    if (keys.length > 0) {
      const setClause = keys.map(k => `${k} = ?`).join(', ');
      await pool.query(`UPDATE events SET ${setClause} WHERE id = ?`, [...values, req.params.id]);
    }

    // Replace tags
    if (tags !== undefined) {
      await pool.query('DELETE FROM event_tags WHERE event_id = ?', [req.params.id]);
      for (const tag of tags) {
        await pool.query(
          'INSERT INTO event_tags (event_id, tag_en, tag_ar) VALUES (?, ?, ?)',
          [req.params.id, tag.tag_en, tag.tag_ar]
        );
      }
    }

    // Replace gallery
    if (gallery !== undefined) {
      await pool.query('DELETE FROM event_gallery WHERE event_id = ?', [req.params.id]);
      for (let i = 0; i < gallery.length; i++) {
        await pool.query(
          'INSERT INTO event_gallery (event_id, image_url, sort_order) VALUES (?, ?, ?)',
          [req.params.id, gallery[i].image_url || gallery[i], i + 1]
        );
      }
    }

    const [updated] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (updated.length === 0) return res.status(404).json({ error: 'Not found' });
    const [updTags] = await pool.query('SELECT * FROM event_tags WHERE event_id = ?', [req.params.id]);
    updated[0].tags = updTags;
    res.json(updated[0]);
  } catch (err) {
    console.error('PUT /events error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE event (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET regions (for filter dropdown)
router.get('/meta/regions', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT region FROM events WHERE region IS NOT NULL ORDER BY region');
    res.json(rows.map(r => r.region));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
