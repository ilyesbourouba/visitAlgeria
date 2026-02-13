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
 * Renumber all sort_order values in a table sequentially (1, 2, 3, ...).
 * Optionally exclude one row (by id) from numbering.
 */
async function renumberSortOrder(tableName, excludeId = null) {
  let query = `SELECT id FROM ${tableName}`;
  if (excludeId) query += ` WHERE id != ?`;
  query += ` ORDER BY sort_order ASC, id ASC`;
  const [rows] = await pool.query(query, excludeId ? [excludeId] : []);
  for (let i = 0; i < rows.length; i++) {
    await pool.query(`UPDATE ${tableName} SET sort_order = ? WHERE id = ?`, [i + 1, rows[i].id]);
  }
  return rows.length;
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

  // POST create (protected) — auto-assign next sort_order
  router.post('/', auth, async (req, res) => {
    try {
      const data = { ...req.body };

      // Always auto-assign sort_order = MAX + 1
      const [[{ maxOrder }]] = await pool.query(
        `SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM ${tableName}`
      );
      data.sort_order = maxOrder + 1;

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

  // PUT update (protected) — with sort_order reordering
  router.put('/:id', auth, async (req, res) => {
    try {
      const data = { ...req.body };
      const id = req.params.id;

      // If sort_order is being changed, use "remove and insert" approach
      if (data.sort_order !== undefined && data.sort_order !== null) {
        const newOrder = Number(data.sort_order);
        // Renumber all other rows sequentially (excluding this one)
        const otherCount = await renumberSortOrder(tableName, id);
        // Clamp the new order to valid range
        const clampedOrder = Math.max(1, Math.min(newOrder, otherCount + 1));
        // Shift rows at or after the target position up by 1
        await pool.query(
          `UPDATE ${tableName} SET sort_order = sort_order + 1 WHERE sort_order >= ? AND id != ?`,
          [clampedOrder, id]
        );
        data.sort_order = clampedOrder;
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

  // DELETE (protected) — renumber after deletion to close gaps
  router.delete('/:id', auth, async (req, res) => {
    try {
      const [result] = await pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      // Renumber remaining rows to close the gap
      await renumberSortOrder(tableName);
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      console.error(`DELETE /${tableName}/${req.params.id} error:`, err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  return router;
}

module.exports = createCrudRouter;
