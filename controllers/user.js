const UserModel = require('../models/user')
const boom = require('boom')

module.exports = {
  getUsers: function(req, res, next) {
    UserModel.find()
      .then(users =>
        res.status(200).json({
          message: 'Users get success',
          data: users
        })
      )
      .catch(err => next(boom.boomify(err)))
  },
  getUser: function(req, res, next) {
    UserModel.findById(req.params.id)
      .then(user => {
        if(user){
          res.status(200).json({
            message: 'User get success',
            data: user
          })
        }else{
          res.status(404).json({
            message: 'User not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  },
  createUser: function(req, res, next) {
    UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        res.status(200).json({
          message: 'User successfully created',
          data: user
        })
      })
      .catch(err => next(boom.boomify(err)))
  },
}
