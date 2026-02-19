require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    // Rename existing columns to match expected names
    await pool.query('ALTER TABLE destinations CHANGE COLUMN description_en about_en LONGTEXT');
    console.log('Renamed description_en -> about_en');
  } catch (e) {
    console.log('description_en rename skipped:', e.message.substring(0, 60));
  }

  try {
    await pool.query('ALTER TABLE destinations CHANGE COLUMN description_ar about_ar LONGTEXT');
    console.log('Renamed description_ar -> about_ar');
  } catch (e) {
    console.log('description_ar rename skipped:', e.message.substring(0, 60));
  }

  try {
    await pool.query('ALTER TABLE destinations CHANGE COLUMN image_url background_image VARCHAR(500)');
    console.log('Renamed image_url -> background_image');
  } catch (e) {
    console.log('image_url rename skipped:', e.message.substring(0, 60));
  }

  // Add missing columns
  const newCols = [
    'population VARCHAR(100)',
    'area VARCHAR(100)',
    'climate_en VARCHAR(100)',
    'climate_ar VARCHAR(100)',
    'best_time_en TEXT',
    'best_time_ar TEXT',
    'cuisine_en TEXT',
    'cuisine_ar TEXT',
    'etiquette_en TEXT',
    'etiquette_ar TEXT',
    'transport_en TEXT',
    'transport_ar TEXT'
  ];

  for (const col of newCols) {
    const name = col.split(' ')[0];
    try {
      await pool.query('ALTER TABLE destinations ADD COLUMN ' + col);
      console.log('Added column: ' + name);
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('Column already exists: ' + name);
      } else {
        console.error('Error adding ' + name + ':', e.message);
      }
    }
  }

  // Create gallery table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS destination_gallery (
      id INT AUTO_INCREMENT PRIMARY KEY,
      destination_id INT NOT NULL,
      image_url VARCHAR(500),
      type VARCHAR(20) DEFAULT 'image',
      sort_order INT DEFAULT 0,
      FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('destination_gallery table ready');

  // Create tags table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS destination_tags (
      id INT AUTO_INCREMENT PRIMARY KEY,
      destination_id INT NOT NULL,
      name_en VARCHAR(255),
      name_ar VARCHAR(255),
      FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('destination_tags table ready');

  // Verify final schema
  const [cols] = await pool.query('SHOW COLUMNS FROM destinations');
  console.log('\nFinal destinations schema:');
  cols.forEach(c => console.log('  ' + c.Field + ' (' + c.Type + ')'));

  await pool.end();
  console.log('\nMigration complete!');
})();
