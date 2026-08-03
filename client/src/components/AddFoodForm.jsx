import { useState } from 'react'

const AddFoodForm = ({ handleNewFood }) => {
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('0')
  const [carbs, setCarbs] = useState('0')
  const [protein, setProtein] = useState('0')
  const [fat, setFat] = useState('0')
  const [fiber, setFiber] = useState('0')
  const [isPrivate, setPrivate] = useState(true)
  const [unit, setUnit] = useState('g')


  const handleSubmit = (event) => {
    event.preventDefault()
    const newFood = {
      name: name,
      calories: calories,
      carbohydrates: carbs,
      protein: protein,
      fat: fat,
      fiber: fiber,
      private: isPrivate,
      unit: unit
    }
    try{
      handleNewFood(newFood)
      setName('')
      setCalories('')
      setCarbs('')
      setProtein('')
      setFat('')
      setFiber('')
      console.log('testing');
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <h3>Add a new food</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name
            <input type='text' value={name} onChange={({ target }) => setName(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            kcal per 100 {unit}
            <input type='text' value={calories} onChange={({ target }) => setCalories(target.value)} onFocus={(e) => e.target.select()}/>
          </label>
        </div>
        <div>
          <label>
            carbohydrates per 100 {unit}
            <input type='text' value={carbs} onChange={({ target }) => setCarbs(target.value)} onFocus={(e) => e.target.select()}/>
          </label>
        </div>
        <div>
          <label>
            protein per 100 {unit}
            <input type='text' value={protein} onChange={({ target }) => setProtein(target.value)} onFocus={(e) => e.target.select()}/>
          </label>
        </div>
        <div>
          <label>
            fat per 100 {unit}
            <input type='text' value={fat} onChange={({ target }) => setFat(target.value)} onFocus={(e) => e.target.select()}/>
          </label>
        </div>
        <div>
          <label>
            fiber per 100 {unit}
            <input type='text' value={fiber} onChange={({ target }) => setFiber(target.value)} onFocus={(e) => e.target.select()}/>
          </label>
        </div>
        <div>
          <label>
            private
            <input type='checkbox' checked={isPrivate} onChange={({ target }) => setPrivate(target.checked)}/>
          </label>
        </div>
        <div>
          Using unit:
        </div>
        <div>
          <label>
            per 100 g
            <input type='radio' value={'g'} checked={unit === 'g'} onChange={({ target }) => setUnit(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            per 100 ml
            <input type='radio' value={'ml'} checked={unit === 'ml'} onChange={({ target }) => setUnit(target.value)}/>
          </label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddFoodForm