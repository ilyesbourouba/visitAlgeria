/**
 * Migration: Add subtitle, description, bg_image, and wilaya_ids to hero_slides
 * Run: node migrate-hero-subtitle.js
 */
require('dotenv').config();
const pool = require('./config/db');

async function migrate() {
  const columns = [
    "ADD COLUMN IF NOT EXISTS subtitle_en VARCHAR(255) DEFAULT NULL AFTER title_ar",
    "ADD COLUMN IF NOT EXISTS subtitle_ar VARCHAR(255) DEFAULT NULL AFTER subtitle_en",
    "ADD COLUMN IF NOT EXISTS description_en TEXT DEFAULT NULL AFTER subtitle_ar",
    "ADD COLUMN IF NOT EXISTS description_ar TEXT DEFAULT NULL AFTER description_en",
    "ADD COLUMN IF NOT EXISTS bg_image_url VARCHAR(500) DEFAULT NULL AFTER description_ar",
    "ADD COLUMN IF NOT EXISTS wilaya_ids VARCHAR(500) DEFAULT NULL AFTER bg_image_url",
  ];

  try {
    for (const col of columns) {
      await pool.query(`ALTER TABLE hero_slides ${col}`);
    }
    console.log('✅ Migration complete: hero_slides updated with subtitle/description/wilaya columns');
  } catch (err) {
    // If "IF NOT EXISTS" isn't supported, check for duplicate column error
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('⚠️  Columns already exist, skipping.');
    } else {
      console.error('❌ Migration failed:', err.message);
    }
  }
  process.exit();
}

migrate();
