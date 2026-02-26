const express = require('express')
const router = express.Router()

const { authenticate } = require('../middleware/auth.middleware')
const { authorize } = require('../middleware/role.middleware')

const { getOwnerDashboard } = require('../controllers/owner.controller')

router.get(
  '/dashboard',
  authenticate,
  authorize('USER', 'OWNER'),
  getOwnerDashboard
)

module.exports = router