const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * Helper: renumber sort_order sequentially for tour_locations.
 * Optionally exclude a specific row by id.
 */
async function renumberSortOrder(excludeId = null) {
  let query = 'SELECT id FROM tour_locations';
  if (excludeId) query += ' WHERE id != ?';
  query += ' ORDER BY sort_order ASC, id ASC';
  const [rows] = await pool.query(query, excludeId ? [excludeId] : []);
  for (let i = 0; i < rows.length; i++) {
    await pool.query('UPDATE tour_locations SET sort_order = ? WHERE id = ?', [i + 1, rows[i].id]);
  }
  return rows.length;
}

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

// POST (protected) — auto-assign sort_order, handle reordering
router.post('/', auth, async (req, res) => {
  try {
    const { tags, ...data } = req.body;

    // Auto-assign sort_order
    if (data.sort_order !== undefined && data.sort_order !== null && data.sort_order !== '') {
      const desiredOrder = Number(data.sort_order);
      // First get current count
      const [[{ cnt }]] = await pool.query('SELECT COUNT(*) as cnt FROM tour_locations');
      // Clamp to valid range (max = count + 1 since this is a new row)
      const clampedOrder = Math.max(1, Math.min(desiredOrder, cnt + 1));
      // Shift rows at or after target position up by 1
      await pool.query('UPDATE tour_locations SET sort_order = sort_order + 1 WHERE sort_order >= ?', [clampedOrder]);
      data.sort_order = clampedOrder;
    } else {
      // Auto-assign to end
      const [[{ maxOrder }]] = await pool.query('SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM tour_locations');
      data.sort_order = maxOrder + 1;
    }

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

// PUT (protected) — with sort_order reordering
router.put('/:id', auth, async (req, res) => {
  try {
    const { tags, ...data } = req.body;
    const id = req.params.id;

    // Handle sort_order reordering
    if (data.sort_order !== undefined && data.sort_order !== null && data.sort_order !== '') {
      const newOrder = Number(data.sort_order);
      // Renumber all other rows (excluding this one)
      const otherCount = await renumberSortOrder(id);
      // Clamp to valid range
      const clampedOrder = Math.max(1, Math.min(newOrder, otherCount + 1));
      // Shift rows at or after target position up by 1
      await pool.query(
        'UPDATE tour_locations SET sort_order = sort_order + 1 WHERE sort_order >= ? AND id != ?',
        [clampedOrder, id]
      );
      data.sort_order = clampedOrder;
    }

    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length > 0) {
      const setClause = keys.map(k => `${k} = ?`).join(', ');
      await pool.query(`UPDATE tour_locations SET ${setClause} WHERE id = ?`, [...values, id]);
    }

    if (tags !== undefined) {
      await pool.query('DELETE FROM tour_location_tags WHERE tour_location_id = ?', [id]);
      for (const tag of tags) {
        await pool.query(
          'INSERT INTO tour_location_tags (tour_location_id, tag_en, tag_ar) VALUES (?, ?, ?)',
          [id, tag.tag_en, tag.tag_ar]
        );
      }
    }

    const [updated] = await pool.query('SELECT * FROM tour_locations WHERE id = ?', [id]);
    if (updated.length === 0) return res.status(404).json({ error: 'Not found' });
    const [updTags] = await pool.query('SELECT * FROM tour_location_tags WHERE tour_location_id = ?', [id]);
    updated[0].tags = updTags;
    res.json(updated[0]);
  } catch (err) {
    console.error('PUT /tour-locations error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE (protected) — renumber after deletion
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tour_locations WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    // Also delete associated tags
    await pool.query('DELETE FROM tour_location_tags WHERE tour_location_id = ?', [req.params.id]);
    // Renumber remaining rows to close gaps
    await renumberSortOrder();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE /tour-locations error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
