const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const {selfAuth} = require('../middlewares/authorization')
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  markTodo,
  deleteTodo
} = require('../controllers/todo')

router.get('/', authentication, getTodos)
router.post('/', authentication, createTodo)
router.get('/:id', authentication, getTodo)
router.put('/:id/mark', authentication, markTodo)
router.put('/:id', authentication, updateTodo)
router.delete('/:id', authentication, deleteTodo)

module.exports = router
