const intakeRouter = require('express').Router()
const Intake = require('../models/intake')
const User = require('../models/user')
const middleware = require('../utils/middleware')

intakeRouter.get('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  if (!user) {
    console.log('No user')
    return response.status(401).json({ error: 'Not logged in'})
  }
  const intakes = await Intake.find({ user: user._id }).populate('user', {username: 1}).populate('foods.food').populate('goal')
  response.json(intakes)
})

intakeRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  //TODO: check if intake exists for date already.
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

intakeRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const foundIntake = await Intake.findById(request.params.id)
  const user = request.user

  if (!foundIntake) {
    return response.status(404).json({ error: 'Intake log not found' })
  }
  if (!user || !foundIntake.user.equals(user._id)) {
    console.log(foundIntake.user, user._id)
    return response.status(401).json({ error: 'Unauthorized'})
  }
  //should it be possible to change the date?
  const { foods, goal } = request.body
  foundIntake.foods = foods
  foundIntake.goal = goal
  const savedIntake = await foundIntake.save()
  return response.status(201).json(savedIntake)

})


module.exports = intakeRouter