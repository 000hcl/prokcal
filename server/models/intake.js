const mongoose = require('mongoose')

const intakeSchema = new mongoose.Schema({
  foods: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
      },
      grams: {
        type: Number,
        required: true
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal'
  }

})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('Intake', intakeSchema)