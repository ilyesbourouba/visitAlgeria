const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// Helper: attach category info to a library item
async function enrichItem(item) {
  if (item.category_id) {
    const [cats] = await pool.query('SELECT * FROM library_categories WHERE id = ?', [item.category_id]);
    item.category = cats.length > 0 ? cats[0] : null;
  } else {
    item.category = null;
  }
  return item;
}

// GET all library files (public) — supports search & pagination
router.get('/', async (req, res) => {
  try {
    const { search, page, limit, active, category_id } = req.query;
    const conditions = [];
    const params = [];

    if (active === 'true') {
      conditions.push('dl.is_active = 1');
    }

    if (category_id && category_id !== 'all') {
      conditions.push('dl.category_id = ?');
      params.push(category_id);
    }

    if (search && search.trim()) {
      conditions.push('(dl.name_en LIKE ? OR dl.name_ar LIKE ?)');
      const q = `%${search.trim()}%`;
      params.push(q, q);
    }

    let query = 'SELECT dl.*, lc.name_en AS category_name_en, lc.name_ar AS category_name_ar FROM digital_library dl LEFT JOIN library_categories lc ON dl.category_id = lc.id';
    let countQuery = 'SELECT COUNT(*) AS total FROM digital_library dl';

    if (conditions.length > 0) {
      const where = ' WHERE ' + conditions.join(' AND ');
      query += where;
      countQuery += where;
    }

    query += ' ORDER BY dl.sort_order ASC, dl.created_at DESC';

    // Pagination
    if (page && limit) {
      const p = Math.max(1, parseInt(page));
      const l = Math.max(1, parseInt(limit));
      const offset = (p - 1) * l;
      query += ` LIMIT ${l} OFFSET ${offset}`;
    }

    const [rows] = await pool.query(query, params);
    const [countResult] = await pool.query(countQuery, params);
    const total = countResult[0].total;

    res.json({ data: rows, total });
  } catch (err) {
    console.error('GET /digital-library error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single file (public)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM digital_library WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    await enrichItem(rows[0]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { name_en, name_ar, category_id, file_url, file_type, is_active } = req.body;

    if (!name_en || !file_url) {
      return res.status(400).json({ error: 'Name (EN) and file are required' });
    }

    const [maxResult] = await pool.query('SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM digital_library');
    const sortOrder = maxResult[0].maxOrder + 1;

    const [result] = await pool.query(
      'INSERT INTO digital_library (name_en, name_ar, category_id, file_url, file_type, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name_en, name_ar || '', category_id || null, file_url, file_type || 'pdf', sortOrder, is_active !== undefined ? is_active : 1]
    );

    const [newRow] = await pool.query('SELECT * FROM digital_library WHERE id = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error('POST /digital-library error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// PUT update (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name_en, name_ar, category_id, file_url, file_type, sort_order, is_active } = req.body;
    const id = req.params.id;

    const updates = [];
    const values = [];

    if (name_en !== undefined) { updates.push('name_en = ?'); values.push(name_en); }
    if (name_ar !== undefined) { updates.push('name_ar = ?'); values.push(name_ar); }
    if (category_id !== undefined) { updates.push('category_id = ?'); values.push(category_id || null); }
    if (file_url !== undefined) { updates.push('file_url = ?'); values.push(file_url); }
    if (file_type !== undefined) { updates.push('file_type = ?'); values.push(file_type); }
    if (sort_order !== undefined) { updates.push('sort_order = ?'); values.push(sort_order); }
    if (is_active !== undefined) { updates.push('is_active = ?'); values.push(is_active); }

    if (updates.length > 0) {
      await pool.query(`UPDATE digital_library SET ${updates.join(', ')} WHERE id = ?`, [...values, id]);
    }

    const [updated] = await pool.query('SELECT * FROM digital_library WHERE id = ?', [id]);
    if (updated.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(updated[0]);
  } catch (err) {
    console.error('PUT /digital-library error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// DELETE (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM digital_library WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE /digital-library error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
