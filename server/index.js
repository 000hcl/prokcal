const express = require('express')
const mongoose = require('mongoose')
const config = require("./utils/config")

const foodsRouter = require('./controllers/foods')

const app = express()
app.use(express.json())

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { family: 4 });

const dummyData = [
  {
    id: '46873986573',
    name: 'greek yogurt',
    protein: 9.5,
    carbohydrates: 5.66,
    fats: 3.56,
    kcal: 92
  },
  {
    id: '76869879f9z3',
    name: 'baked salmon',
    protein: 23.97,
    carbohydrates: 0.49,
    fats: 7.56,
    kcal: 171
  }
]

app.get('/', (request, response) => {
  response.send('dummy route')
})

app.get('/dummy/foods', (request, response) => {
  response.json(dummyData)
})

app.use('/api/foods', foodsRouter)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})