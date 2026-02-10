/**
 * Generic CRUD route factory for simple content tables.
 * Creates GET (all), GET (by id), POST, PUT, DELETE endpoints.
 * 
 * Features:
 *   - Sort order collision handling: auto-shifts existing records
 *   - Public GET, protected POST/PUT/DELETE
 */
const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

/**
 * Shift sort_order values to make room for a new entry.
 * If an item wants sort_order=N, all rows with sort_order >= N are bumped +1.
 * On update, the item's own row (excludeId) is excluded from the shift.
 */
async function shiftSortOrder(tableName, sortOrder, excludeId = null) {
  let query = `UPDATE ${tableName} SET sort_order = sort_order + 1 WHERE sort_order >= ?`;
  const params = [sortOrder];
  if (excludeId) {
    query += ' AND id != ?';
    params.push(excludeId);
  }
  await pool.query(query, params);
}

function createCrudRouter(tableName, options = {}) {
  const router = express.Router();
  const { orderBy = 'sort_order ASC, id ASC', publicGet = true } = options;

  // GET all (public)
  router.get('/', async (req, res) => {
    try {
      const activeOnly = req.query.active === 'true';
      let query = `SELECT * FROM ${tableName}`;
      if (activeOnly) query += ' WHERE is_active = 1';
      query += ` ORDER BY ${orderBy}`;
      const [rows] = await pool.query(query);
      res.json(rows);
    } catch (err) {
      console.error(`GET /${tableName} error:`, err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // GET by id (public)
  router.get('/:id', async (req, res) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  // POST create (protected) — with sort_order collision handling
  router.post('/', auth, async (req, res) => {
    try {
      const data = req.body;

      // Auto-shift if sort_order is provided
      if (data.sort_order !== undefined && data.sort_order !== null) {
        await shiftSortOrder(tableName, data.sort_order);
      }

      const keys = Object.keys(data);
      const values = Object.values(data);
      const placeholders = keys.map(() => '?').join(', ');

      const [result] = await pool.query(
        `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`,
        values
      );

      const [newRow] = await pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [result.insertId]);
      res.status(201).json(newRow[0]);
    } catch (err) {
      console.error(`POST /${tableName} error:`, err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // PUT update (protected) — with sort_order collision handling
  router.put('/:id', auth, async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;

      // Auto-shift if sort_order is being changed
      if (data.sort_order !== undefined && data.sort_order !== null) {
        await shiftSortOrder(tableName, data.sort_order, id);
      }

      const keys = Object.keys(data);
      const values = Object.values(data);
      const setClause = keys.map(k => `${k} = ?`).join(', ');

      await pool.query(
        `UPDATE ${tableName} SET ${setClause} WHERE id = ?`,
        [...values, id]
      );

      const [updated] = await pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
      if (updated.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(updated[0]);
    } catch (err) {
      console.error(`PUT /${tableName}/${req.params.id} error:`, err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // DELETE (protected)
  router.delete('/:id', auth, async (req, res) => {
    try {
      const [result] = await pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      console.error(`DELETE /${tableName}/${req.params.id} error:`, err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  return router;
}

module.exports = createCrudRouter;
