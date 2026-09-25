const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  protein: {
    min: Number,
    max: Number,
    minEnabled: Boolean,
    maxEnabled: Boolean
  },
  carbohydrates: {
    min: Number,
    max: Number,
    minEnabled: Boolean,
    maxEnabled: Boolean
  },
  calories: {
    min: Number,
    max: Number,
    minEnabled: Boolean,
    maxEnabled: Boolean
  },
  fiber: {
    min: Number,
    max: Number,
    minEnabled: Boolean,
    maxEnabled: Boolean
  },
  fat: {
    min: Number,
    max: Number,
    minEnabled: Boolean,
    maxEnabled: Boolean
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  }

})

goalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Goal', goalSchema)