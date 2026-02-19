/**
 * Generic CRUD route factory for simple content tables.
 * Creates GET (all), GET (by id), POST, PUT, DELETE endpoints.
 *
 * Features:
 *   - Sort order collision handling: auto-shifts existing records
 *   - Public GET, protected POST/PUT/DELETE
 *   - Auto-filters non-column fields (section_ prefixes, objects/arrays)
 */
const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

/**
 * Renumber all sort_order values in a table sequentially (1, 2, 3, ...).
 */
async function renumberSortOrder(tableName, excludeId = null) {
  let query = 'SELECT id FROM ' + tableName;
  if (excludeId) query += ' WHERE id != ?';
  query += ' ORDER BY sort_order ASC, id ASC';
  const [rows] = await pool.query(query, excludeId ? [excludeId] : []);
  for (let i = 0; i < rows.length; i++) {
    await pool.query('UPDATE ' + tableName + ' SET sort_order = ? WHERE id = ?', [i + 1, rows[i].id]);
  }
  return rows.length;
}

/**
 * Filter request body to only include scalar (non-object) values
 * and skip UI-only fields (like section_ dividers).
 */
function filterScalarFields(data) {
  const filtered = {};
  for (const [key, val] of Object.entries(data)) {
    if (key.startsWith('section_')) continue;
    if (val !== null && typeof val === 'object') continue;
    filtered[key] = val;
  }
  return filtered;
}

function createCrudRouter(tableName, options) {
  options = options || {};
  const router = express.Router();
  const orderBy = options.orderBy || 'sort_order ASC, id ASC';

  // GET all (public)
  router.get('/', async (req, res) => {
    try {
      const activeOnly = req.query.active === 'true';
      let query = 'SELECT * FROM ' + tableName;
      if (activeOnly) query += ' WHERE is_active = 1';
      query += ' ORDER BY ' + orderBy;
      const [rows] = await pool.query(query);
      res.json(rows);
    } catch (err) {
      console.error('GET /' + tableName + ' error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // GET by id (public)
  router.get('/:id', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM ' + tableName + ' WHERE id = ?', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  // POST create (protected)
  router.post('/', auth, async (req, res) => {
    try {
      var data = filterScalarFields(req.body);
      var maxResult = await pool.query('SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM ' + tableName);
      data.sort_order = maxResult[0][0].maxOrder + 1;

      var keys = Object.keys(data);
      var values = Object.values(data);
      var placeholders = keys.map(function() { return '?'; }).join(', ');

      var result = await pool.query(
        'INSERT INTO ' + tableName + ' (' + keys.join(', ') + ') VALUES (' + placeholders + ')',
        values
      );

      var newRow = await pool.query('SELECT * FROM ' + tableName + ' WHERE id = ?', [result[0].insertId]);
      res.status(201).json(newRow[0][0]);
    } catch (err) {
      console.error('POST /' + tableName + ' error:', err);
      res.status(500).json({ error: 'Server error: ' + err.message });
    }
  });

  // PUT update (protected)
  router.put('/:id', auth, async (req, res) => {
    try {
      var data = filterScalarFields(req.body);
      var id = req.params.id;

      if (data.sort_order !== undefined && data.sort_order !== null) {
        var newOrder = Number(data.sort_order);
        var otherCount = await renumberSortOrder(tableName, id);
        var clampedOrder = Math.max(1, Math.min(newOrder, otherCount + 1));
        await pool.query(
          'UPDATE ' + tableName + ' SET sort_order = sort_order + 1 WHERE sort_order >= ? AND id != ?',
          [clampedOrder, id]
        );
        data.sort_order = clampedOrder;
      }

      var keys = Object.keys(data);
      var values = Object.values(data);

      if (keys.length > 0) {
        var setClause = keys.map(function(k) { return k + ' = ?'; }).join(', ');
        await pool.query(
          'UPDATE ' + tableName + ' SET ' + setClause + ' WHERE id = ?',
          values.concat([id])
        );
      }

      var updated = await pool.query('SELECT * FROM ' + tableName + ' WHERE id = ?', [id]);
      if (updated[0].length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(updated[0][0]);
    } catch (err) {
      console.error('PUT /' + tableName + '/' + req.params.id + ' error:', err);
      res.status(500).json({ error: 'Server error: ' + err.message });
    }
  });

  // DELETE (protected)
  router.delete('/:id', auth, async (req, res) => {
    try {
      var result = await pool.query('DELETE FROM ' + tableName + ' WHERE id = ?', [req.params.id]);
      if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      await renumberSortOrder(tableName);
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      console.error('DELETE /' + tableName + '/' + req.params.id + ' error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  return router;
}

module.exports = createCrudRouter;
