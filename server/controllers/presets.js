const presetRouter = require('express').Router()
const Preset = require('../models/preset')
const middleware = require('../utils/middleware')

presetRouter.get('/', async (request, response) => {
    const presets = await Preset.find({}).populate('user', {username: 1}).populate('foods.food')
    response.json(presets)
})

presetRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    if (!user) {
        console.log('No user')
        return response.status(401).json({ error: 'Not logged in'})
    }
    const preset = new Preset({
        ...body, user: user._id
    })

    const savedPreset = await preset.save()
    response.status(201).json(savedPreset)
})

module.exports = presetRouter