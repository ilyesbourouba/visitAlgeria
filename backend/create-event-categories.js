const pool = require('./config/db');

async function setup() {
  try {
    // 1. Create event_categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS event_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_en VARCHAR(100) NOT NULL,
        name_ar VARCHAR(100),
        sort_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ event_categories table created.');

    // 2. Create junction table for many-to-many
    await pool.query(`
      CREATE TABLE IF NOT EXISTS event_category_map (
        event_id INT NOT NULL,
        category_id INT NOT NULL,
        PRIMARY KEY (event_id, category_id),
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES event_categories(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ event_category_map junction table created.');

    // 3. Add subtitle columns to events if they don't exist
    try {
      await pool.query(`ALTER TABLE events ADD COLUMN subtitle_en VARCHAR(255) AFTER title_ar`);
      console.log('✅ Added subtitle_en column.');
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') console.log('ℹ️  subtitle_en already exists.');
      else throw e;
    }
    try {
      await pool.query(`ALTER TABLE events ADD COLUMN subtitle_ar VARCHAR(255) AFTER subtitle_en`);
      console.log('✅ Added subtitle_ar column.');
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') console.log('ℹ️  subtitle_ar already exists.');
      else throw e;
    }

    // 4. Seed default categories
    const [existing] = await pool.query('SELECT COUNT(*) as cnt FROM event_categories');
    if (existing[0].cnt === 0) {
      const cats = [
        ['Festivals', 'مهرجانات', 1],
        ['Exhibitions', 'معارض', 2],
        ['Concerts', 'حفلات', 3],
        ['Sports', 'رياضة', 4],
        ['Conferences', 'مؤتمرات', 5],
        ['Cultural', 'ثقافية', 6],
        ['Other', 'أخرى', 7],
      ];
      for (const [en, ar, order] of cats) {
        await pool.query(
          'INSERT INTO event_categories (name_en, name_ar, sort_order) VALUES (?, ?, ?)',
          [en, ar, order]
        );
      }
      console.log('✅ Seeded default categories.');
    } else {
      console.log('ℹ️  Categories already exist, skipping seed.');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

setup();
