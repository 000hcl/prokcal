import { useState, useContext } from 'react'
import ErrorContext from "../contexts/ErrorContext"


const AddFoodForm = ({ handleNewFood, isPreset=false, defaultUnit, setDefaultUnit }) => {
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('0')
  const [carbs, setCarbs] = useState('0')
  const [protein, setProtein] = useState('0')
  const [fat, setFat] = useState('0')
  const [fiber, setFiber] = useState('0')
  const [isPrivate, setPrivate] = useState(true)
  const [unit, setUnit] = useState('g')

  const [nameError, setNameError] = useState(null)
  const [caloriesError, setCaloriesError] = useState(null)
  const [carbsError, setCarbsError] = useState(null)
  const [proteinError, setProteinError] = useState(null)
  const [fatError, setFatError] = useState(null)
  const [fiberError, setFiberError] = useState(null)

  const { notifyError } = useContext(ErrorContext)

  const positiveNumber = (inputValue, inputName) => {
    if (isNaN(inputValue)) {
      return `${inputName} must be a number.`
    } else if (inputValue < 0) {
      return `${inputName} cannot be negative.`
    }
    return null
  }

  const validate = () => {
    let nameErr = null
    let caloriesErr = null
    let carbsErr = null
    let proteinErr = null
    let fatErr = null
    let fiberErr = null

    if (name.length === 0) {
      nameErr = 'Name is required.'
    }

    caloriesErr = positiveNumber(calories, 'Calories')
    carbsErr = positiveNumber(carbs, 'Carbohydrates')
    proteinErr = positiveNumber(protein, 'Protein')
    fatErr = positiveNumber(fat, 'Fat')
    fiberErr = positiveNumber(fiber, 'Fiber')

    setNameError(nameErr)
    setCaloriesError(caloriesErr)
    setProteinError(proteinErr)
    setCarbsError(carbsErr)
    setFatError(fatErr)
    setFiberError(fiberErr)

    return !(nameErr || caloriesErr || carbsErr || proteinErr || fatErr || fiberErr);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) {
      return
    }
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
      await handleNewFood(newFood)
      setName('')
      setCalories('0')
      setCarbs('0')
      setProtein('0')
      setFat('0')
      setFiber('0')
      console.log('testing');
    } catch (error) {
      notifyError('Something went wrong')
      console.log(error)
    }

  }

  return (
    <div>
      <h3>Add a new food</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            { nameError }
          </div>
          <label>
            name
            <input type='text' value={name} onChange={({ target }) => setName(target.value)}/>
          </label>
        </div>
        <div>
          <div>
            { caloriesError }
          </div>
          <label>
            kcal per 100 {unit}
            <input type='text' value={calories} onChange={({ target }) => setCalories(target.value)} onFocus={(e) => e.target.select()}/>
          </label>
        </div>
        <div>
          <div>
            { carbsError }
          </div>
          <label>
            carbohydrates per 100 {unit}
            <input type='text' value={carbs} onChange={({ target }) => setCarbs(target.value)} onFocus={(e) => e.target.select()}/>
          </label>
        </div>
        <div>
          <div>
            { proteinError }
          </div>
          <label>
            protein per 100 {unit}
            <input type='text' value={protein} onChange={({ target }) => setProtein(target.value)} onFocus={(e) => e.target.select()}/>
          </label>
        </div>
        <div>
          <div>
            { fatError }
          </div>
          <label>
            fat per 100 {unit}
            <input type='text' value={fat} onChange={({ target }) => setFat(target.value)} onFocus={(e) => e.target.select()}/>
          </label>
        </div>
        <div>
          <div>
            { fiberError }
          </div>
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
        {isPreset &&
        <div>
          <label>
            default {unit}
            <input type='text' value={defaultUnit} onChange={({ target }) => setDefaultUnit(target.value)} onFocus={(e) => e.target.select()}/>
          </label>
        </div>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddFoodForm