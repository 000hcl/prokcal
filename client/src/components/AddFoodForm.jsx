import { useState } from 'react'

const AddFoodForm = ({ handleNewFood }) => {
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [carbs, setCarbs] = useState('')
  const [protein, setProtein] = useState('')
  const [fat, setFat] = useState('')
  const [fiber, setFiber] = useState('')



  const handleSubmit = (event) => {
    event.preventDefault()
    const newFood = {
      name: name,
      calories: calories,
      carbohydrates: carbs,
      protein: protein,
      fats: fat,
      fiber: fiber
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
            kcal per 100g
            <input type='text' value={calories} onChange={({ target }) => setCalories(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            carbohydrates per 100g
            <input type='text' value={carbs} onChange={({ target }) => setCarbs(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            protein per 100g
            <input type='text' value={protein} onChange={({ target }) => setProtein(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            fat per 100g
            <input type='text' value={fat} onChange={({ target }) => setFat(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            fiber per 100g
            <input type='text' value={fiber} onChange={({ target }) => setFiber(target.value)}/>
          </label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddFoodForm