const TodoModel = require('../models/todo')
const boom = require('boom')

module.exports = {
  getTodos: function(req, res, next) {
    TodoModel.find({
      creator: req.userId
    })
      .then(todos =>
        res.status(200).json({
          message: 'Todos get success',
          data: todos
        })
      )
      .catch(err => next(boom.boomify(err)))
  },
  getTodo: function(req, res, next) {
    TodoModel.findOne({
      _id: req.params.id,
      creator: req.userId
    })
      .then(todo => {
        if (todo) {
          res.status(200).json({
            message: 'Todo get success',
            data: todo
          })
        } else {
          res.status(404).json({
            message: 'Todo not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  },
  createTodo: function(req, res, next) {
    let newTodo = new TodoModel({
      title: req.body.title,
      // completed: req.body.completed,
      creator: req.userId
    })
    newTodo
      .save()
      .then(todo => {
        res.status(200).json({
          message: 'Todo successfully created',
          data: todo
        })
      })
      .catch(err => next(boom.boomify(err)))
  },
  updateTodo: function(req, res, next) {
    TodoModel.findOneAndUpdate(
      {
        _id: req.params.id,
        creator: req.userId
      },
      {
        title: req.body.title
        // completed: req.body.completed
      },
      {new: true} // return new updated document
    )
      .then(todo => {
        if (todo) {
          res.status(200).json({
            message: 'Todo successfully updated',
            data: todo
          })
        } else {
          res.status(404).json({
            message: 'Todo not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  },
  markTodo: function(req, res, next) {
    TodoModel.findOneAndUpdate(
      {
        _id: req.params.id,
        creator: req.userId
      },
      {
        completed: req.query.completed == 'true' ? true : false
      },
      {new: true}
    )
      .then(todo => {
        if (todo) {
          res.status(200).json({
            message: 'Todo successfully updated',
            data: todo
          })
        } else {
          res.status(404).json({
            message: 'Todo not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  },
  deleteTodo: function(req, res, next) {
    TodoModel.findOneAndRemove({
      _id: req.params.id,
      creator: req.userId
    })
      .then(todo => {
        if (todo) {
          res.status(200).json({
            message: 'Todo successfully deleted',
            data: todo
          })
        } else {
          res.status(404).json({
            message: 'Todo not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  }
}
