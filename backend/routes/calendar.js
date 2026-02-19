const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all months with their items (public)
router.get('/', async (req, res) => {
  try {
    const activeOnly = req.query.active === 'true';
    let monthQuery = 'SELECT * FROM calendar_months';
    if (activeOnly) monthQuery += ' WHERE is_active = 1';
    monthQuery += ' ORDER BY sort_order ASC';
    const [months] = await pool.query(monthQuery);

    for (const month of months) {
      let itemQuery = 'SELECT * FROM calendar_items WHERE month_id = ?';
      if (activeOnly) itemQuery += ' AND is_active = 1';
      itemQuery += ' ORDER BY sort_order ASC';
      const [items] = await pool.query(itemQuery, [month.id]);
      month.items = items;
    }

    res.json(months);
  } catch (err) {
    console.error('GET /calendar error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Month CRUD ---
router.post('/months', auth, async (req, res) => {
  try {
    const { name_en, name_ar, sort_order, is_active } = req.body;
    const [result] = await pool.query(
      'INSERT INTO calendar_months (name_en, name_ar, sort_order, is_active) VALUES (?, ?, ?, ?)',
      [name_en, name_ar, sort_order || 0, is_active !== false]
    );
    const [row] = await pool.query('SELECT * FROM calendar_months WHERE id = ?', [result.insertId]);
    res.status(201).json(row[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/months/:id', auth, async (req, res) => {
  try {
    const data = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    await pool.query(`UPDATE calendar_months SET ${setClause} WHERE id = ?`, [...values, req.params.id]);
    const [updated] = await pool.query('SELECT * FROM calendar_months WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/months/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM calendar_months WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Item CRUD ---
router.post('/items', auth, async (req, res) => {
  try {
    const data = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const [result] = await pool.query(
      `INSERT INTO calendar_items (${keys.join(', ')}) VALUES (${placeholders})`, values
    );
    const [row] = await pool.query('SELECT * FROM calendar_items WHERE id = ?', [result.insertId]);
    res.status(201).json(row[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/items/:id', auth, async (req, res) => {
  try {
    const data = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    await pool.query(`UPDATE calendar_items SET ${setClause} WHERE id = ?`, [...values, req.params.id]);
    const [updated] = await pool.query('SELECT * FROM calendar_items WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/items/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM calendar_items WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
