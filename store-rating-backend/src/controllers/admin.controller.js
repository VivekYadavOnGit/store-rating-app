const { fetchDashboardStats } = require('../services/admin.service')
const {
  validateEmail,
  validatePassword,
  validateName,
  validateAddress
} = require('../utils/validators')

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await fetchDashboardStats()

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      data: stats
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

const { createStoreService } = require('../services/admin.service')

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body

    if (!name || !email || !owner_id) {
      return res.status(400).json({ message: "Required fields missing" })
    }

    const store = await createStoreService({
      name,
      email,
      address,
      owner_id
    })

    res.status(201).json({
      message: "Store created successfully",
      store
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const { createUserService } = require('../services/admin.service')

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Required fields missing" })
    }

    // 🔹 Name validation
    if (!validateName(name)) {
      return res.status(400).json({
        message: "Name must be between 20 and 60 characters"
      })
    }

    // 🔹 Email validation
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      })
    }

    // 🔹 Password validation
    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must be 8-16 characters, include at least one uppercase letter and one special character"
      })
    }

    // 🔹 Address validation
    if (!validateAddress(address)) {
      return res.status(400).json({
        message: "Address must not exceed 400 characters"
      })
    }

    const user = await createUserService({
      name,
      email,
      password,
      address,
      role
    })

    res.status(201).json({
      message: "User created successfully",
      user
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const { getAllUsersService } = require('../services/admin.service')

exports.getAllUsers = async (req, res) => {
    try {
      const users = await getAllUsersService(req.query)
  
      res.status(200).json({
        message: "Users fetched successfully",
        data: users
      })
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  }

  const { getAllStoresService } = require('../services/admin.service')

exports.getAllStores = async (req, res) => {
  try {
    const stores = await getAllStoresService(req.query)

    res.status(200).json({
      message: "Stores fetched successfully",
      data: stores
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

const { getUserDetailsService } = require('../services/admin.service')

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params

    const user = await getUserDetailsService(id)

    res.status(200).json({
      message: "User details fetched successfully",
      data: user
    })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}