require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pool = require('./src/config/db')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: "API is running 🚀" })
})

const PORT = process.env.PORT || 5000

// Connect DB first, then start server
pool.connect()
  .then(() => {
    console.log("PostgreSQL Connected ✅")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error("DB connection error ❌", err)
  })