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
    fats: {
        type: Number,
        required:true
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