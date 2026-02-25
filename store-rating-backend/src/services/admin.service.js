const pool = require('../config/db')

exports.fetchDashboardStats = async () => {

  const usersCount = await pool.query(
    "SELECT COUNT(*) FROM users"
  )

  const storesCount = await pool.query(
    "SELECT COUNT(*) FROM stores"
  )

  const ratingsCount = await pool.query(
    "SELECT COUNT(*) FROM ratings"
  )

  return {
    totalUsers: Number(usersCount.rows[0].count),
    totalStores: Number(storesCount.rows[0].count),
    totalRatings: Number(ratingsCount.rows[0].count)
  }
}

exports.createStoreService = async ({ name, email, address, owner_id }) => {

    // Check if owner exists and has OWNER role
    const ownerCheck = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND role = 'OWNER'",
      [owner_id]
    )
  
    if (ownerCheck.rows.length === 0) {
      throw new Error("Invalid owner ID or user is not an OWNER")
    }
  
    // Check if store email already exists
    const existingStore = await pool.query(
      "SELECT * FROM stores WHERE email = $1",
      [email]
    )
  
    if (existingStore.rows.length > 0) {
      throw new Error("Store email already exists")
    }
  
    // Insert store
    const newStore = await pool.query(
      `INSERT INTO stores (name, email, address, owner_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, address, owner_id`,
      [name, email, address, owner_id]
    )
  
    return newStore.rows[0]
  }

  const bcrypt = require('bcrypt')

exports.createUserService = async ({ name, email, password, address, role }) => {

  // Validate role
  const allowedRoles = ['ADMIN', 'USER', 'OWNER']

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role")
  }

  // Check if email already exists
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  )

  if (existingUser.rows.length > 0) {
    throw new Error("Email already registered")
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Insert user
  const newUser = await pool.query(
    `INSERT INTO users (name, email, password, address, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, address, role`,
    [name, email, hashedPassword, address, role]
  )

  return newUser.rows[0]
}

exports.getAllUsersService = async (queryParams) => {
    let baseQuery = `
      SELECT id, name, email, address, role
      FROM users
      WHERE 1=1
    `
  
    const values = []
    let index = 1
  
    // Filters
    if (queryParams.name) {
      baseQuery += ` AND name ILIKE $${index}`
      values.push(`%${queryParams.name}%`)
      index++
    }
  
    if (queryParams.email) {
      baseQuery += ` AND email ILIKE $${index}`
      values.push(`%${queryParams.email}%`)
      index++
    }
  
    if (queryParams.address) {
      baseQuery += ` AND address ILIKE $${index}`
      values.push(`%${queryParams.address}%`)
      index++
    }
  
    if (queryParams.role) {
      baseQuery += ` AND role = $${index}`
      values.push(queryParams.role)
      index++
    }
  
    // Sorting
    const allowedSortFields = ['name', 'email', 'role', 'created_at']
    const sortField = allowedSortFields.includes(queryParams.sort)
      ? queryParams.sort
      : 'created_at'
  
    const sortOrder = queryParams.order === 'asc' ? 'ASC' : 'DESC'
  
    baseQuery += ` ORDER BY ${sortField} ${sortOrder}`
  
    const result = await pool.query(baseQuery, values)
  
    return result.rows
  }

  exports.getAllStoresService = async (queryParams) => {

    let baseQuery = `
      SELECT 
        s.id,
        s.name,
        s.email,
        s.address,
        COALESCE(AVG(r.rating), 0)::numeric(10,2) AS average_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1=1
    `
  
    const values = []
    let index = 1
  
    // Filters
    if (queryParams.name) {
      baseQuery += ` AND s.name ILIKE $${index}`
      values.push(`%${queryParams.name}%`)
      index++
    }
  
    if (queryParams.email) {
      baseQuery += ` AND s.email ILIKE $${index}`
      values.push(`%${queryParams.email}%`)
      index++
    }
  
    if (queryParams.address) {
      baseQuery += ` AND s.address ILIKE $${index}`
      values.push(`%${queryParams.address}%`)
      index++
    }
  
    baseQuery += ` GROUP BY s.id`
  
    // Sorting
    const allowedSortFields = ['name', 'email', 'average_rating']
    const sortField = allowedSortFields.includes(queryParams.sort)
      ? queryParams.sort
      : 'name'
  
    const sortOrder = queryParams.order === 'asc' ? 'ASC' : 'DESC'
  
    baseQuery += ` ORDER BY ${sortField} ${sortOrder}`
  
    const result = await pool.query(baseQuery, values)
  
    return result.rows
  }

  exports.getUserDetailsService = async (userId) => {

    // Get user
    const userResult = await pool.query(
      `SELECT id, name, email, address, role
       FROM users
       WHERE id = $1`,
      [userId]
    )
  
    if (userResult.rows.length === 0) {
      throw new Error("User not found")
    }
  
    const user = userResult.rows[0]
  
    // If OWNER → calculate store rating
    if (user.role === 'OWNER') {
  
      const ratingResult = await pool.query(
        `
        SELECT COALESCE(AVG(r.rating), 0)::numeric(10,2) AS average_rating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id
        WHERE s.owner_id = $1
        `,
        [userId]
      )
  
      user.average_rating = ratingResult.rows[0].average_rating
    }
  
    return user
  }