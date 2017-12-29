const boom = require('boom')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

module.exports = {
  signin: function(req, res, next) {
    let {email, password} = req.body
    if (!email || !password || email.length === 0 || password.length === 0) {
      return next(boom.badRequest('Username or password cannot be empty'))
    }
    UserModel.findOne({
      email: req.body.email,
    })
      .select('+password')
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: 'User with email not found',
          })
        }

        user.comparePassword(req.body.password, (err, success) => {
          if (err || !success) {
            res.status(403).json({
              message: 'Email or password not match',
            })
          } else {
            const payload = {
              userId: user._id,
              email: user.email,
            }
            jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
              if (err) return next(boom.boomify(err))
              res.status(200).json({
                message: 'Signin success',
                data: {token},
              })
            })
          }
        })
      })
      .catch(err => next(boom.boomify(err)))
  },
  signinFacebook: function(req, res, next) {
    const {email, name} = req.fbProfile
    UserModel.findOne({
      email,
    })
      .then(user => {
        if (!user) {
          let password = Math.random().toString(36).substr(2, 6)
          console.log('password',password)
          return UserModel.create({
            name,
            email,
            password,
          })
        }
        return user
      })
      .then(user => {
        const payload = {
          userId: user._id,
          email: user.email,
        }
        jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
          if (err) return next(boom.boomify(err))
          res.status(200).json({
            message: 'Signin with FB success',
            data: {token},
          })
        })
      })
      .catch(err => next(boom.boomify(err)))
  },
  signup: function(req, res, next) {
    UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then(user => {
        res.status(200).json({
          message: 'User successfully created',
          data: user,
        })
      })
      .catch(err => next(boom.boomify(err)))
  },
}
