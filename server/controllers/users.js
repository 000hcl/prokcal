const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, password, confirmPassword } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: `Username "${username}" is already in use.` })
  }

  if (username.length < 3) {
    return response.status(400).json({ error: 'Username must be at least 3 characters long.' })
  }

  if (!password) {
    return response.status(400).json({ error: 'Password is required.' })
  }
  if (password.length < 8) {
    return response.status(400).json({ error: 'Password must be at least 8 characters long.' })
  }
  if (password !== confirmPassword) {
    return response.status(400).json({ error: 'Passwords need to match.' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    passwordHash
  })
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})


module.exports = userRouter