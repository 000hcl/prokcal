const goalsRouter = require('express').Router()
const Goal = require('../models/goal')
const middleware = require('../utils/middleware')

goalsRouter.get('/', async (request, response) => {
  const goals = await Goal.find({}).populate('user', { username: 1 })
  response.json(goals)
})

goalsRouter.post('/', middleware.userExtractor, async (request, response) => {
  //body expected to be appropriate format
  console.log(request.body)

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'Not logged in'})
  }

  const goal = new Goal({
    ...body, user: user._id
  })

  const savedGoal = await goal.save()
  response.status(201).json(savedGoal)
})

module.exports = goalsRouter