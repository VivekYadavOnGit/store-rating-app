const { registerUser, loginUser } = require('../services/auth.service')

const {
  validateEmail,
  validatePassword,
  validateName,
  validateAddress
} = require('../utils/validators')

exports.register = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body

    if (!name || !email || !password) {
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

    const user = await registerUser({
      name,
      email,
      password,
      address,
      role
    })

    res.status(201).json({
      message: "User registered successfully",
      user
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const data = await loginUser({ email, password })

    res.status(200).json({
      message: "Login successful",
      ...data
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}