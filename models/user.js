const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String,
      select: false
    }
  },
  { timestamps: {} } // auto generate createdAt and updatedAt field
)

userSchema.pre('save', function(callback) {
  let plainPassword = this.password
  bcrypt.hash(plainPassword, 10).then((hash) =>{
    console.log('hash', hash)
    this.password = hash
    callback()
  })
  .catch(callback)
})


userSchema.methods.comparePassword = function (plainPassword, callback) {
  console.log('compare--->', plainPassword, this.password)
  bcrypt.compare(plainPassword, this.password)
  .then(result => {
    callback(null, result)
  })
  .catch(err => {
    console.log(err)
    callback(err)
  })
}



module.exports = mongoose.model('User', userSchema)
