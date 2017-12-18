const router = require('express').Router()

router.get('/', function(req, res, next) {
  res.status(200).json({
    message : 'This is API index route',
    data : 'OK'
  })
})

router.use('/auth', require('./auth'))
router.use('/users', require('./user'))
router.use('/todos', require('./todo'))

module.exports = router
