const pool = require('../config/db')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

exports.registerUser = async ({ name, email, password, address, role }) => {
  // Check if email already exists
  const existingUser = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )

  if (existingUser.rows.length > 0) {
    throw new Error('Email already registered')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  // Insert user
  const newUser = await pool.query(
    `INSERT INTO users (name, email, password, address, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, role`,
    [name, email, hashedPassword, address, role || 'USER']
  )

  return newUser.rows[0]
}

const jwt = require('jsonwebtoken')

exports.loginUser = async ({ email, password }) => {
  const userResult = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )

  if (userResult.rows.length === 0) {
    throw new Error('Invalid email or password')
  }

  const user = userResult.rows[0]

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Invalid email or password')
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }
}