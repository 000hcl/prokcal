const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  name: String,
  passwordHash: String,
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    }
  ],
  addedFoods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    }
  ]

})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)