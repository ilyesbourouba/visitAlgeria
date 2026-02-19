const pool = require('./config/db');

(async () => {
  try {
    const [tables] = await pool.query('SHOW TABLES');
    const dbName = process.env.DB_NAME || 'visit_algeria';
    
    await pool.query(`ALTER DATABASE \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log('Database charset updated');
    
    for (const row of tables) {
      const tbl = Object.values(row)[0];
      await pool.query(`ALTER TABLE \`${tbl}\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      console.log('Converted:', tbl);
    }
    
    console.log('All tables converted to utf8mb4!');
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
})();
