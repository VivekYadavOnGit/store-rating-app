const { updatePasswordService } = require('../services/user.service')

exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.id
    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both passwords required" })
    }

    await updatePasswordService(userId, oldPassword, newPassword)
    
    res.status(200).json({
      message: "Password updated successfully"
    })
    
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}