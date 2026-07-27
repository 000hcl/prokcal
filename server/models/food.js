const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  protein: {
      type: Number,
      required: true
  },
  carbohydrates: {
      type: Number,
      required: true
  },
  calories: {
      type: Number,
      required: true
  },
  fiber: {
      type: Number,
      required: true
  },
  fat: {
      type: Number,
      required:true
  },
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

foodSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Food', foodSchema)