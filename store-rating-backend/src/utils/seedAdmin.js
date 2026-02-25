const pool = require('../config/db')
const bcrypt = require('bcrypt')

async function seedAdmin() {
  const existing = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    ['admin@store.com']
  )

  if (existing.rows.length === 0) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10)

    await pool.query(
      `INSERT INTO users (name, email, password, address, role)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        'System Administrator Account',
        'admin@store.com',
        hashedPassword,
        'Head Office',
        'ADMIN'
      ]
    )

    console.log("Default admin created ✅")
  } else {
    console.log("Admin already exists")
  }
}

module.exports = seedAdmin