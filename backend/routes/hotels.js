const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all hotels (public) — supports ?active=true & ?region=X
router.get('/', async (req, res) => {
  try {
    const { active, region } = req.query;
    let query = 'SELECT * FROM hotels';
    const conditions = [];
    const params = [];

    if (active === 'true') { conditions.push('is_active = 1'); }
    if (region) { conditions.push('region = ?'); params.push(region); }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY sort_order ASC, id DESC';

    const [hotels] = await pool.query(query, params);

    for (const h of hotels) {
      const [tags] = await pool.query('SELECT * FROM hotel_tags WHERE hotel_id = ?', [h.id]);
      h.tags = tags;
    }

    res.json(hotels);
  } catch (err) {
    console.error('GET /hotels error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hotels WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    const h = rows[0];
    const [tags] = await pool.query('SELECT * FROM hotel_tags WHERE hotel_id = ?', [h.id]);
    h.tags = tags;
    res.json(h);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { tags, ...data } = req.body;
    if (!data.sort_order) {
      const [[{ m }]] = await pool.query('SELECT COALESCE(MAX(sort_order),0) AS m FROM hotels');
      data.sort_order = m + 1;
    }

    const keys = Object.keys(data);
    const vals = Object.values(data);
    const [result] = await pool.query(
      `INSERT INTO hotels (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})`, vals
    );

    if (tags && tags.length) {
      for (const t of tags) {
        await pool.query('INSERT INTO hotel_tags (hotel_id, tag_en, tag_ar) VALUES (?,?,?)',
          [result.insertId, t.tag_en, t.tag_ar]);
      }
    }

    const [newRow] = await pool.query('SELECT * FROM hotels WHERE id = ?', [result.insertId]);
    const [newTags] = await pool.query('SELECT * FROM hotel_tags WHERE hotel_id = ?', [result.insertId]);
    newRow[0].tags = newTags;
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error('POST /hotels error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { tags, ...data } = req.body;
    const id = req.params.id;

    const keys = Object.keys(data);
    const vals = Object.values(data);
    if (keys.length) {
      const set = keys.map(k => `${k} = ?`).join(', ');
      await pool.query(`UPDATE hotels SET ${set} WHERE id = ?`, [...vals, id]);
    }

    if (tags !== undefined) {
      await pool.query('DELETE FROM hotel_tags WHERE hotel_id = ?', [id]);
      for (const t of tags) {
        await pool.query('INSERT INTO hotel_tags (hotel_id, tag_en, tag_ar) VALUES (?,?,?)',
          [id, t.tag_en, t.tag_ar]);
      }
    }

    const [updated] = await pool.query('SELECT * FROM hotels WHERE id = ?', [id]);
    if (!updated.length) return res.status(404).json({ error: 'Not found' });
    const [uTags] = await pool.query('SELECT * FROM hotel_tags WHERE hotel_id = ?', [id]);
    updated[0].tags = uTags;
    res.json(updated[0]);
  } catch (err) {
    console.error('PUT /hotels error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM hotels WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE /hotels error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
