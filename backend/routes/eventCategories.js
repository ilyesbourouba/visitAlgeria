const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all categories (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM event_categories ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    console.error('GET /event-categories error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single category
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM event_categories WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create category (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { name_en, name_ar, sort_order, is_active } = req.body;
    const [result] = await pool.query(
      'INSERT INTO event_categories (name_en, name_ar, sort_order, is_active) VALUES (?, ?, ?, ?)',
      [name_en, name_ar || '', sort_order || 0, is_active !== undefined ? is_active : 1]
    );
    const [newRow] = await pool.query('SELECT * FROM event_categories WHERE id = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error('POST /event-categories error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update category (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const data = req.body;
    delete data.id;
    delete data.created_at;
    const keys = Object.keys(data);
    const values = Object.values(data);
    if (keys.length === 0) return res.json({ message: 'Nothing to update' });

    const setClause = keys.map(k => `${k} = ?`).join(', ');
    await pool.query(`UPDATE event_categories SET ${setClause} WHERE id = ?`, [...values, req.params.id]);

    const [updated] = await pool.query('SELECT * FROM event_categories WHERE id = ?', [req.params.id]);
    if (updated.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(updated[0]);
  } catch (err) {
    console.error('PUT /event-categories error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE category (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM event_categories WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE /event-categories error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
