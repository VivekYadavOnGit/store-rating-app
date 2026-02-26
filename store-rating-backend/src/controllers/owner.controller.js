const { getOwnerDashboardService } = require('../services/owner.service')

exports.getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id

    const data = await getOwnerDashboardService(ownerId)

    res.status(200).json({
      message: "Owner dashboard fetched successfully",
      data
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}