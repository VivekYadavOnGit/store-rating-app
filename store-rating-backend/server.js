require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pool = require('./src/config/db')

const adminRoutes = require('./src/routes/admin.routes')
const authRoutes = require('./src/routes/auth.routes')
const { authenticate } = require('./src/middleware/auth.middleware')
const { authorize } = require('./src/middleware/role.middleware')
const storeRoutes = require('./src/routes/store.routes')
const seedAdmin = require('./src/utils/seedAdmin')
const initDb = require('./src/utils/initDb')
const userRoutes = require('./src/routes/user.routes')
const ownerRoutes = require('./src/routes/owner.routes')

const app = express()

app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ratehub.vercel.app"
  ],
  credentials: true
}))
app.use('/api/stores', storeRoutes)
app.use('/api/users', userRoutes)
app.use('/api/owner', ownerRoutes)
// Routes
app.get('/', (req, res) => {
  res.json({ message: "API is running successfully" })
})

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

app.get(
  '/api/test-admin',
  authenticate,
  authorize('ADMIN'),
  (req, res) => {
    res.json({ message: "Admin route accessed successfully" })
  }
)

const PORT = process.env.PORT || 5000

// Connect DB and start server ONLY ONCE
async function startServer() {
  try {
    await pool.query('SELECT 1')

    await initDb()
    await seedAdmin()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  } catch (error) {
    console.error("Failed to start server ❌", error)
  }
}

startServer()