const foodsRouter = require('express').Router()
const Food = require('../models/food')
const middleware = require('../utils/middleware')

foodsRouter.get('/', async (request, response) => {
    const foods = await Food.find({})
    response.json(foods)
})


foodsRouter.post('/', middleware.userExtractor, async (request,response) => {
    const body = request.body
    console.log(request.body)
    const user = request.user

    const food = new Food({
        name: body.name,
        protein: body.protein,
        carbohydrates: body.carbohydrates,
        calories: body.calories,
        fiber: body.fiber,
        fat: body.fat,
        user: user._id,
        private: body.private ? body.private : true,
        unit: body.unit
    })

    const savedFood = await food.save()
    response.status(201).json(savedFood)
})

module.exports = foodsRouter