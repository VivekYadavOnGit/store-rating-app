const pool = require('../config/db')

exports.getOwnerDashboardService = async (ownerId) => {

  // Get store owned by this user
  const storeResult = await pool.query(
    "SELECT * FROM stores WHERE owner_id = $1",
    [ownerId]
  )

  if (storeResult.rows.length === 0) {
    throw new Error("No store found for this owner")
  }

  const store = storeResult.rows[0]

  // Get ratings + user info
  const ratingsResult = await pool.query(
    `
    SELECT 
      u.name,
      u.email,
      r.rating
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    WHERE r.store_id = $1
    `,
    [store.id]
  )

  // Calculate average rating
  const avgResult = await pool.query(
    `
    SELECT COALESCE(AVG(rating), 0)::numeric(10,2) AS average_rating
    FROM ratings
    WHERE store_id = $1
    `,
    [store.id]
  )

  return {
    store: {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address
    },
    average_rating: avgResult.rows[0].average_rating,
    rated_users: ratingsResult.rows
  }
}