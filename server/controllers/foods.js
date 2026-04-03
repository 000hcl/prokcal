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
    const food = new Food({
        name: body.name,
        protein: body.protein,
        carbohydrates: body.carbohydrates,
        calories: body.calories,
        fiber: body.fiber,
        fats: body.fats
    })

    const savedFood = await food.save()
    response.status(201).json(savedFood)
})

module.exports = foodsRouter