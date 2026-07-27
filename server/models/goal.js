const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
  name: {
      type: String
  },
  protein: {
      type: Number
  },
  carbohydrates: {
      type: Number
  },
  calories: {
      type: Number
  },
  fiber: {
      type: Number
  },
  fat: {
      type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true
  }

})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Goal', goalSchema)