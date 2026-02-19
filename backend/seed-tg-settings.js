const pool = require('./config/db');

const settings = [
  { key: 'tg_hero_bg', value: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80&w=1600' },
  { key: 'tg_hero_badge_en', value: 'VIRTUAL TOUR' },
  { key: 'tg_hero_badge_ar', value: 'جولة افتراضية' },
  { key: 'tg_hero_title_en', value: 'ALGERIA VIRTUAL HERITAGE' },
  { key: 'tg_hero_title_ar', value: 'التراث الافتراضي للجزائر' },
  { key: 'tg_hero_subtitle_en', value: 'Embark on an immersive journey through the ancient Casbahs, Sahara dunes, and Roman ruins from your home.' },
  { key: 'tg_hero_subtitle_ar', value: 'انطلق في رحلة غامرة عبر القصبات القديمة وكثبان الصحراء والآثار الرومانية من منزلك.' }
];

async function seed() {
  try {
    for (const { key, value } of settings) {
      // Use INSERT ... ON DUPLICATE KEY UPDATE if you have a unique constraint on setting_key
      // For now, let's just check if it exists
      const [rows] = await pool.query('SELECT * FROM site_settings WHERE setting_key = ?', [key]);
      if (rows.length === 0) {
        await pool.query('INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)', [key, value]);
        console.log(`Added setting: ${key}`);
      } else {
        await pool.query('UPDATE site_settings SET setting_value = ? WHERE setting_key = ?', [value, key]);
        console.log(`Updated setting: ${key}`);
      }
    }
    console.log('Tour Guide settings seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
