const express = require('express')
const router = express.Router()

const { authenticate } = require('../middleware/auth.middleware')
const { authorize } = require('../middleware/role.middleware')

const { getDashboardStats } = require('../controllers/admin.controller')

router.get(
  '/dashboard',
  authenticate,
  authorize('ADMIN'),
  getDashboardStats
)

const { createStore } = require('../controllers/admin.controller')

router.post(
  '/stores',
  authenticate,
  authorize('ADMIN'),
  createStore
)

const { createUser } = require('../controllers/admin.controller')

router.post(
  '/users',
  authenticate,
  authorize('ADMIN'),
  createUser
)

const { getAllUsers } = require('../controllers/admin.controller')

router.get(
  '/users',
  authenticate,
  authorize('ADMIN'),
  getAllUsers
)

const { getAllStores } = require('../controllers/admin.controller')

router.get(
  '/stores',
  authenticate,
  authorize('ADMIN'),
  getAllStores
)

const { getUserDetails } = require('../controllers/admin.controller')

router.get(
  '/users/:id',
  authenticate,
  authorize('ADMIN'),
  getUserDetails
)

module.exports = router