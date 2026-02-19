const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET current hero data
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tour_guide_hero WHERE id = 1');
    if (rows.length === 0) {
      // Return defaults if somehow empty
      return res.json({
        id: 1,
        bg_image_url: '',
        badge_en: '',
        badge_ar: '',
        title_en: '',
        title_ar: '',
        subtitle_en: '',
        subtitle_ar: ''
      });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE hero data
router.put('/', auth, async (req, res) => {
  try {
    const data = req.body;
    // Remove id from update if present
    delete data.id;
    delete data.updated_at;

    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return res.json({ message: 'No fields to update' });

    const setClause = keys.map(k => `${k} = ?`).join(', ');
    await pool.query(`UPDATE tour_guide_hero SET ${setClause} WHERE id = 1`, [...values]);

    const [updated] = await pool.query('SELECT * FROM tour_guide_hero WHERE id = 1');
    res.json(updated[0]);
  } catch (err) {
    console.error('PUT /tour-guide-hero error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
