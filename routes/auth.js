const router = require('express').Router()
const fbLogin = require('../middlewares/fbLogin')
const {
  signin,
  signup,
  signinFacebook
} = require('../controllers/auth')

router.post('/signin', signin)
router.post('/signinfacebook', fbLogin, signinFacebook)
router.post('/signup', signup)

module.exports = router
