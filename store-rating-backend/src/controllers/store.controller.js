const { getStoresForUserService } = require('../services/store.service')

exports.getStoresForUser = async (req, res) => {
  try {
    const userId = req.user.id
    const stores = await getStoresForUserService(userId, req.query)

    res.status(200).json({
      message: "Stores fetched successfully",
      data: stores
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

const { submitRatingService } = require('../services/store.service')

exports.submitRating = async (req, res) => {
  try {
    const userId = req.user.id
    const { storeId } = req.params
    const { rating } = req.body

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" })
    }

    const result = await submitRatingService(userId, storeId, rating)

    res.status(200).json({
      message: result.message
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}