const pool = require('./config/db');

async function setup() {
  try {
    // 1. Create the table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tour_guide_hero (
        id INT PRIMARY KEY DEFAULT 1,
        bg_image_url VARCHAR(255),
        badge_en VARCHAR(100),
        badge_ar VARCHAR(100),
        title_en VARCHAR(255),
        title_ar VARCHAR(255),
        subtitle_en TEXT,
        subtitle_ar TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 2. Seed with initial data if empty
    const [rows] = await pool.query('SELECT * FROM tour_guide_hero WHERE id = 1');
    if (rows.length === 0) {
      await pool.query(`
        INSERT INTO tour_guide_hero (id, bg_image_url, badge_en, badge_ar, title_en, title_ar, subtitle_en, subtitle_ar)
        VALUES (
          1,
          'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80&w=1600',
          'VIRTUAL TOUR',
          'جولة افتراضية',
          'ALGERIA VIRTUAL HERITAGE',
          'التراث الافتراضي للجزائر',
          'Embark on an immersive journey through the ancient Casbahs, Sahara dunes, and Roman ruins from your home.',
          'انطلق في رحلة غامرة عبر القصبات القديمة وكثبان الصحراء والآثار الرومانية من منزلك.'
        )
      `);
      console.log('✅ tour_guide_hero table created and seeded.');
    } else {
      console.log('ℹ️ tour_guide_hero table already exists and has data.');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating tour_guide_hero table:', err);
    process.exit(1);
  }
}

setup();
