const pool = require('./config/db');

/**
 * One-time fix: re-number sort_order for all content tables to remove gaps/duplicates.
 */
(async () => {
  const tables = [
    'hero_slides', 'destinations', 'discover_cards', 'suggestions',
    'unesco_sites', 'panoramas', 'events', 'tour_locations'
  ];
  
  for (const table of tables) {
    try {
      const [rows] = await pool.query(`SELECT id FROM \`${table}\` ORDER BY sort_order ASC, id ASC`);
      for (let i = 0; i < rows.length; i++) {
        await pool.query(`UPDATE \`${table}\` SET sort_order = ? WHERE id = ?`, [i + 1, rows[i].id]);
      }
      console.log(`${table}: renumbered ${rows.length} rows`);
    } catch (err) {
      console.warn(`${table}: skipped (${err.message})`);
    }
  }
  console.log('Done!');
  process.exit(0);
})();
