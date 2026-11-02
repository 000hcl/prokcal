const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, 'Food must have a name']
  },
  protein: {
      type: Number,
      required: [true, 'Protein is required.'],
      cast: '{VALUE} is not a number',
      min: [0, 'Protein cannot be negative.']
  },
  carbohydrates: {
      type: Number,
      required: [true, 'Carbohydrate is required.'],
      cast: '{VALUE} is not a number',
      min: [0, 'Carbohydrates cannot be negative.']
  },
  calories: {
      type: Number,
      required: [true, 'Calories is required.'],
      cast: '{VALUE} is not a number',
      min: [0, 'Calories cannot be negative.']
  },
  fiber: {
      type: Number,
      required: [true, 'Fiber is required.'],
      cast: '{VALUE} is not a number',
      min: [0, 'Fiber cannot be negative.']
  },
  fat: {
      type: Number,
      required:[true, 'Fat is required.'],
      cast: '{VALUE} is not a number',
      min: [0, 'Fat cannot be negative.']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  private: {
    type: Boolean,
    required: true,
    default: true,
    cast: '{VALUE} is not a boolean'
  },
  unit: {
    type: String,
    enum: ['g', 'ml'],
    required: true,
    default: 'g',
    cast: 'Selected unit must be g or ml'
  }
})

foodSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Food', foodSchema)