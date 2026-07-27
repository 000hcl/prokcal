const foodsRouter = require('express').Router()
const Food = require('../models/food')

foodsRouter.get('/', async (request, response) => {
    const foods = await Food.find({})
    response.json(foods)
})

foodsRouter.post('/', async (request,response) => {
    //TODO: require user
    const body = request.body
    console.log(request.body);
    
    //attach user? public/private?
    //TODO: private
    const food = new Food({
        name: body.name,
        protein: body.protein,
        carbohydrates: body.carbohydrates,
        calories: body.calories,
        fiber: body.fiber,
        fat: body.fat
    })

    const savedFood = await food.save()
    response.status(201).json(savedFood)
})

module.exports = foodsRouter