const pool = require('./config/db');

async function createTables() {
  try {
    console.log('--- Creating Destination Tables ---');

    // 1. Destinations Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS destinations (
        id INT PRIMARY KEY, -- Wilaya Code (1-58)
        name_en VARCHAR(255) NOT NULL,
        name_ar VARCHAR(255) NOT NULL,
        background_image VARCHAR(255),
        about_en LONGTEXT,
        about_ar LONGTEXT,
        population VARCHAR(100),
        area VARCHAR(100),
        climate_en VARCHAR(100),
        climate_ar VARCHAR(100),
        best_time_en TEXT,
        best_time_ar TEXT,
        cuisine_en TEXT,
        cuisine_ar TEXT,
        etiquette_en TEXT,
        etiquette_ar TEXT,
        transport_en TEXT,
        transport_ar TEXT,
        is_active TINYINT(1) DEFAULT 1,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ destinations table created');

    // 2. Destination Gallery
    await pool.query(`
      CREATE TABLE IF NOT EXISTS destination_gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        destination_id INT,
        image_url VARCHAR(255) NOT NULL,
        type ENUM('image', 'video') DEFAULT 'image',
        sort_order INT DEFAULT 0,
        FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ destination_gallery table created');

    // 3. Destination Tags
    await pool.query(`
      CREATE TABLE IF NOT EXISTS destination_tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        destination_id INT,
        name_en VARCHAR(100),
        name_ar VARCHAR(100),
        FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ destination_tags table created');

    console.log('--- Database Setup Complete ---');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating tables:', err);
    process.exit(1);
  }
}

createTables();
