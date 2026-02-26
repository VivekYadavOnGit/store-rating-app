const pool = require('../config/db')
const bcrypt = require('bcrypt')

exports.updatePasswordService = async (userId, oldPassword, newPassword) => {

  const userResult = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [userId]
  )

  const user = userResult.rows[0]

  const isMatch = await bcrypt.compare(oldPassword, user.password)

  if (!isMatch) {
    throw new Error("Old password is incorrect")
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2",
    [hashedPassword, userId]
  )
}