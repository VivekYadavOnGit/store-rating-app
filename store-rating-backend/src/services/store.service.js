const pool = require('../config/db')

exports.getStoresForUserService = async (userId, queryParams) => {

  let baseQuery = `
    SELECT 
      s.id,
      s.name,
      s.address,
      COALESCE(AVG(r.rating), 0)::numeric(10,2) AS overall_rating,
      MAX(CASE WHEN r.user_id = $1 THEN r.rating END) AS user_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE 1=1
  `

  const values = [userId]
  let index = 2

  // Filters
  if (queryParams.name) {
    baseQuery += ` AND s.name ILIKE $${index}`
    values.push(`%${queryParams.name}%`)
    index++
  }

  if (queryParams.address) {
    baseQuery += ` AND s.address ILIKE $${index}`
    values.push(`%${queryParams.address}%`)
    index++
  }

  baseQuery += ` GROUP BY s.id`

  // Sorting
  const allowedSortFields = ['name', 'overall_rating']
  const sortField = allowedSortFields.includes(queryParams.sort)
    ? queryParams.sort
    : 'name'

  const sortOrder = queryParams.order === 'asc' ? 'ASC' : 'DESC'

  baseQuery += ` ORDER BY ${sortField} ${sortOrder}`

  const result = await pool.query(baseQuery, values)

  return result.rows
}

exports.submitRatingService = async (userId, storeId, rating) => {

  // Check if store exists
  const storeCheck = await pool.query(
    "SELECT * FROM stores WHERE id = $1",
    [storeId]
  )

  if (storeCheck.rows.length === 0) {
    throw new Error("Store not found")
  }

  // Check if user already rated
  const existingRating = await pool.query(
    "SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2",
    [userId, storeId]
  )

  if (existingRating.rows.length > 0) {
    // Update rating
    await pool.query(
      `
      UPDATE ratings
      SET rating = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2 AND store_id = $3
      `,
      [rating, userId, storeId]
    )

    return { message: "Rating updated successfully" }
  } else {
    // Insert rating
    await pool.query(
      `
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES ($1, $2, $3)
      `,
      [userId, storeId, rating]
    )

    return { message: "Rating submitted successfully" }
  }
}