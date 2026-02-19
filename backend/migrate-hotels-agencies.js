require('dotenv').config();
const pool = require('./config/db');

async function migrate() {
  try {
    // Hotels table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_en VARCHAR(200) NOT NULL,
        name_ar VARCHAR(200),
        description_en TEXT,
        description_ar TEXT,
        image_url VARCHAR(500),
        region VARCHAR(100),
        stars TINYINT DEFAULT 3,
        price DECIMAL(10,2) DEFAULT 0,
        sort_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1
      )
    `);
    console.log('✅ hotels table created');

    // Hotel tags
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hotel_tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hotel_id INT NOT NULL,
        tag_en VARCHAR(100),
        tag_ar VARCHAR(100),
        FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ hotel_tags table created');

    // Travel agencies table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS travel_agencies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_en VARCHAR(200) NOT NULL,
        name_ar VARCHAR(200),
        description_en TEXT,
        description_ar TEXT,
        image_url VARCHAR(500),
        region VARCHAR(100),
        sort_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1
      )
    `);
    console.log('✅ travel_agencies table created');

    // Travel agency tags
    await pool.query(`
      CREATE TABLE IF NOT EXISTS travel_agency_tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        travel_agency_id INT NOT NULL,
        tag_en VARCHAR(100),
        tag_ar VARCHAR(100),
        FOREIGN KEY (travel_agency_id) REFERENCES travel_agencies(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ travel_agency_tags table created');

    console.log('\n🎉 All tables created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
}

migrate();
