const intakeRouter = require('express').Router()
const Intake = require('../models/intake')
const middleware = require('../utils/middleware')

intakeRouter.get('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  if (!user) {
    console.log('No user')
    return response.status(401).json({ error: 'Not logged in'})
  }
  const intakes = await Intake.find({ user: user._id }).populate('user', {username: 1}).populate('foods.food')
  response.json(intakes)
})

intakeRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) {
    console.log('No user')
    return response.status(401).json({ error: 'Not logged in'})
  }
  const intake = new Intake({
    ...body, user: user._id
  })
  const savedIntake = await intake.save()
  response.status(201).json(savedIntake)
})

module.exports = intakeRouter