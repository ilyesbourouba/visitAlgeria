require('dotenv').config();
const pool = require('./config/db');

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS languages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(10) NOT NULL UNIQUE,
        name_en VARCHAR(50) NOT NULL,
        name_native VARCHAR(50) NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        sort_order INT NOT NULL DEFAULT 0
      ) ENGINE=InnoDB
    `);
    console.log('Table created');

    const [existing] = await pool.query('SELECT COUNT(*) as c FROM languages');
    if (existing[0].c === 0) {
      await pool.query(`
        INSERT INTO languages (code, name_en, name_native, sort_order, is_active) VALUES
        ('fr', 'French', 'Français', 1, 1),
        ('es', 'Spanish', 'Español', 2, 1),
        ('de', 'German', 'Deutsch', 3, 0),
        ('it', 'Italian', 'Italiano', 4, 0),
        ('tr', 'Turkish', 'Türkçe', 5, 0),
        ('zh', 'Chinese', '中文', 6, 0)
      `);
      console.log('Seeded 6 languages');
    } else {
      console.log('Languages already exist, skipping seed');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
