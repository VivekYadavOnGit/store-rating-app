const express = require('express')
const router = express.Router()

const { authenticate } = require('../middleware/auth.middleware')
const { authorize } = require('../middleware/role.middleware')

const { getStoresForUser } = require('../controllers/store.controller')

router.get(
  '/',
  authenticate,
  authorize('USER'),
  getStoresForUser
)

const { submitRating } = require('../controllers/store.controller')

router.post(
  '/:storeId/rate',
  authenticate,
  authorize('USER'),
  submitRating
)

module.exports = router