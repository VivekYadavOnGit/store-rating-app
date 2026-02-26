const express = require('express')
const router = express.Router()

const { authenticate } = require('../middleware/auth.middleware')
const { authorize } = require('../middleware/role.middleware')

const { updatePassword } = require('../controllers/user.controller')

router.put(
  '/update-password',
  authenticate,
  authorize('USER'),
  updatePassword
)

module.exports = router