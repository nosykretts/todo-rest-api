const mongoose = require('mongoose')
const Schema = mongoose.Schema

let todoSchema = new Schema(
  {
    title: {
      type: String
    },
    completed: {
      type: Boolean,
      default : false
    },
    creator : {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: {} } // auto generate createdAt and updatedAt field
)

module.exports = mongoose.model('Todo', todoSchema)
