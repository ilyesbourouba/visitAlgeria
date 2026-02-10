const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all categories with their items (public)
router.get('/', async (req, res) => {
  try {
    const activeOnly = req.query.active === 'true';
    let catQuery = 'SELECT * FROM discover_categories';
    if (activeOnly) catQuery += ' WHERE is_active = 1';
    catQuery += ' ORDER BY sort_order ASC';
    const [categories] = await pool.query(catQuery);

    for (const cat of categories) {
      let itemQuery = 'SELECT * FROM discover_items WHERE category_id = ?';
      if (activeOnly) itemQuery += ' AND is_active = 1';
      itemQuery += ' ORDER BY sort_order ASC';
      const [items] = await pool.query(itemQuery, [cat.id]);
      cat.items = items;
    }

    res.json(categories);
  } catch (err) {
    console.error('GET /discover error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Category CRUD ---
router.post('/categories', auth, async (req, res) => {
  try {
    const { name_en, name_ar, sort_order, is_active } = req.body;
    const [result] = await pool.query(
      'INSERT INTO discover_categories (name_en, name_ar, sort_order, is_active) VALUES (?, ?, ?, ?)',
      [name_en, name_ar, sort_order || 0, is_active !== false]
    );
    const [newRow] = await pool.query('SELECT * FROM discover_categories WHERE id = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/categories/:id', auth, async (req, res) => {
  try {
    const data = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    await pool.query(`UPDATE discover_categories SET ${setClause} WHERE id = ?`, [...values, req.params.id]);
    const [updated] = await pool.query('SELECT * FROM discover_categories WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/categories/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM discover_categories WHERE id = ?', [req.params.id]);
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
      `INSERT INTO discover_items (${keys.join(', ')}) VALUES (${placeholders})`, values
    );
    const [newRow] = await pool.query('SELECT * FROM discover_items WHERE id = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
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
    await pool.query(`UPDATE discover_items SET ${setClause} WHERE id = ?`, [...values, req.params.id]);
    const [updated] = await pool.query('SELECT * FROM discover_items WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/items/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM discover_items WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
