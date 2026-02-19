/**
 * Seed script — creates a proper bcrypt-hashed admin user.
 * Run once: node scripts/seed-admin.js
 */
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function seedAdmin() {
  try {
    const username = 'admin';
    const email = 'admin@visitalgeria.dz';
    const password = 'admin123';
    const role = 'admin';

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Delete existing admin user if exists, then insert
    await pool.query('DELETE FROM admin_users WHERE username = ?', [username]);
    await pool.query(
      'INSERT INTO admin_users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [username, email, password_hash, role]
    );

    console.log('✅ Admin user seeded successfully');
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);
    console.log('   ⚠️  Change the password in production!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seedAdmin();
