const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all tour locations (public) — includes tags
router.get('/', async (req, res) => {
  try {
    const activeOnly = req.query.active === 'true';
    let query = 'SELECT * FROM tour_locations';
    if (activeOnly) query += ' WHERE is_active = 1';
    query += ' ORDER BY sort_order ASC';
    const [locations] = await pool.query(query);

    for (const loc of locations) {
      const [tags] = await pool.query('SELECT * FROM tour_location_tags WHERE tour_location_id = ?', [loc.id]);
      loc.tags = tags;
    }

    res.json(locations);
  } catch (err) {
    console.error('GET /tour-locations error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET by id (public)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tour_locations WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const loc = rows[0];
    const [tags] = await pool.query('SELECT * FROM tour_location_tags WHERE tour_location_id = ?', [loc.id]);
    loc.tags = tags;
    res.json(loc);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { tags, ...data } = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');

    const [result] = await pool.query(
      `INSERT INTO tour_locations (${keys.join(', ')}) VALUES (${placeholders})`, values
    );

    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await pool.query(
          'INSERT INTO tour_location_tags (tour_location_id, tag_en, tag_ar) VALUES (?, ?, ?)',
          [result.insertId, tag.tag_en, tag.tag_ar]
        );
      }
    }

    const [newRow] = await pool.query('SELECT * FROM tour_locations WHERE id = ?', [result.insertId]);
    const [newTags] = await pool.query('SELECT * FROM tour_location_tags WHERE tour_location_id = ?', [result.insertId]);
    newRow[0].tags = newTags;
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error('POST /tour-locations error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { tags, ...data } = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length > 0) {
      const setClause = keys.map(k => `${k} = ?`).join(', ');
      await pool.query(`UPDATE tour_locations SET ${setClause} WHERE id = ?`, [...values, req.params.id]);
    }

    if (tags !== undefined) {
      await pool.query('DELETE FROM tour_location_tags WHERE tour_location_id = ?', [req.params.id]);
      for (const tag of tags) {
        await pool.query(
          'INSERT INTO tour_location_tags (tour_location_id, tag_en, tag_ar) VALUES (?, ?, ?)',
          [req.params.id, tag.tag_en, tag.tag_ar]
        );
      }
    }

    const [updated] = await pool.query('SELECT * FROM tour_locations WHERE id = ?', [req.params.id]);
    if (updated.length === 0) return res.status(404).json({ error: 'Not found' });
    const [updTags] = await pool.query('SELECT * FROM tour_location_tags WHERE tour_location_id = ?', [req.params.id]);
    updated[0].tags = updTags;
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tour_locations WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
