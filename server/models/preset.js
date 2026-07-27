const mongoose = require('mongoose')

const presetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  foods: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
      },
      defaultGrams: {
        type: Number,
        default: 0
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  private: {
    type: Boolean,
    required: true,
    default: true
  }

})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Preset', presetSchema)