/**
 * Migration: Create digital_library and library_categories tables
 */
require('dotenv').config();
const pool = require('./config/db');

async function migrate() {
  try {
    console.log('Creating library_categories table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS library_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_en VARCHAR(255) NOT NULL,
        name_ar VARCHAR(255) DEFAULT '',
        sort_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ library_categories created');

    console.log('Creating digital_library table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS digital_library (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_en VARCHAR(255) NOT NULL,
        name_ar VARCHAR(255) DEFAULT '',
        category_id INT DEFAULT NULL,
        file_url VARCHAR(500) NOT NULL,
        file_type VARCHAR(50) DEFAULT 'pdf',
        sort_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES library_categories(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ digital_library created');

    console.log('Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
}

migrate();
