const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all settings (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM site_settings ORDER BY setting_key');
    // Return as key-value object for easy consumption
    const settings = {};
    rows.forEach(row => { settings[row.setting_key] = row.setting_value; });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all settings as array (for dashboard editing)
router.get('/list', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM site_settings ORDER BY setting_key');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update a setting by key (protected)
router.put('/:key', auth, async (req, res) => {
  try {
    const { value } = req.body;
    const [existing] = await pool.query('SELECT * FROM site_settings WHERE setting_key = ?', [req.params.key]);

    if (existing.length === 0) {
      // Create it if it doesn't exist
      await pool.query('INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)', [req.params.key, value]);
    } else {
      await pool.query('UPDATE site_settings SET setting_value = ? WHERE setting_key = ?', [value, req.params.key]);
    }

    res.json({ setting_key: req.params.key, setting_value: value });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT bulk update (protected)
router.put('/', auth, async (req, res) => {
  try {
    const settings = req.body; // { key: value, key: value, ... }
    for (const [key, value] of Object.entries(settings)) {
      const [existing] = await pool.query('SELECT * FROM site_settings WHERE setting_key = ?', [key]);
      if (existing.length === 0) {
        await pool.query('INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)', [key, value]);
      } else {
        await pool.query('UPDATE site_settings SET setting_value = ? WHERE setting_key = ?', [value, key]);
      }
    }
    res.json({ message: 'Settings updated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a setting (protected)
router.delete('/:key', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM site_settings WHERE setting_key = ?', [req.params.key]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
