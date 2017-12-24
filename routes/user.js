const router = require('express').Router()

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user')

router.get('/', getUsers)
router.get('/:id', getUser)

module.exports = router
