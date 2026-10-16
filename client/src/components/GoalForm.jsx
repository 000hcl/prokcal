import { useState } from 'react'
import goalService from '../services/goals'

const today = new Date().toISOString().substring(0,10)

const GoalForm = () => {
  const [name, setName] = useState('')

  const [date, setDate] = useState(today)


  const [calories, setCalories] = useState({min: '', max: '', minEnabled: false, maxEnabled: false})
  const [carbohydrates, setCarbohydrates] = useState({min: '', max: '', minEnabled: false, maxEnabled: false})
  const [protein, setProtein] = useState({min: '', max: '', minEnabled: false, maxEnabled: false})
  const [fat, setFat] = useState({min: '', max: '', minEnabled: false, maxEnabled: false})
  const [fiber, setFiber] = useState({min: '', max: '', minEnabled: false, maxEnabled: false})


  const handleSubmit = async (event) => {
    event.preventDefault()
    const goal = { name, protein, carbohydrates, calories, fiber, fat, date }


    setName('')
    setCalories({min: '', max: '', minEnabled: false, maxEnabled: false})
    setCarbohydrates({min: '', max: '', minEnabled: false, maxEnabled: false})
    setProtein({min: '', max: '', minEnabled: false, maxEnabled: false})
    setFat({min: '', max: '', minEnabled: false, maxEnabled: false})
    setFiber({min: '', max: '', minEnabled: false, maxEnabled: false})

    const savedGoal = await goalService.create(goal)
    console.log(savedGoal)
  }

  return (
    <div>
      <h3>Create a new goal</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name
            <input type='text' value={name} onChange={({ target }) => setName(target.value)}/>
          </label>
        </div>
        <b>Calories</b>
        <div>
          <label>
            Minimum
            {calories.minEnabled &&
              <input type='text' value={calories.min} onChange={({ target }) => setCalories({...calories, min: target.value})}/>
            }
            <button type='button' onClick={() => setCalories({...calories, minEnabled: !calories.minEnabled})}>{calories.minEnabled ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Maximum
            {calories.maxEnabled &&
              <input type='text' value={calories.max} onChange={({ target }) => setCalories({...calories, max: target.value})}/>
            }
            <button type='button' onClick={() => setCalories({...calories, maxEnabled: !calories.maxEnabled})}>{calories.maxEnabled ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <b>Carbohydrates</b>
        <div>
          <label>
            Minimum
            {carbohydrates.minEnabled &&
              <input type='text' value={carbohydrates.min} onChange={({ target }) => setCarbohydrates({...carbohydrates, min: target.value})}/>
            }
            <button type='button' onClick={() => setCarbohydrates({...carbohydrates, minEnabled: !carbohydrates.minEnabled})}>{carbohydrates.minEnabled ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Maximum
            {carbohydrates.maxEnabled &&
              <input type='text' value={carbohydrates.max} onChange={({ target }) => setCarbohydrates({...carbohydrates, max: target.value})}/>
            }
            <button type='button' onClick={() => setCarbohydrates({...carbohydrates, maxEnabled: !carbohydrates.maxEnabled})}>{carbohydrates.maxEnabled ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <b>Protein</b>
        <div>
          <label>
            Minimum
            {protein.minEnabled &&
              <input type='text' value={protein.min} onChange={({ target }) => setProtein({...protein, min: target.value})}/>
            }
            <button type='button' onClick={() => setProtein({...protein, minEnabled: !protein.minEnabled})}>{protein.minEnabled ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Maximum
            {protein.maxEnabled &&
              <input type='text' value={protein.max} onChange={({ target }) => setProtein({...protein, max: target.value})}/>
            }
            <button type='button' onClick={() => setProtein({...protein, maxEnabled: !protein.maxEnabled})}>{protein.maxEnabled ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <b>Fat</b>
        <div>
          <label>
            Minimum
            {fat.minEnabled &&
              <input type='text' value={fat.min} onChange={({ target }) => setFat({...fat, min: target.value})}/>
            }
            <button type='button' onClick={() => setFat({...fat, minEnabled: !fat.minEnabled})}>{fat.minEnabled ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Maximum
            {fat.maxEnabled &&
              <input type='text' value={fat.max} onChange={({ target }) => setFat({...fat, max: target.value})}/>
            }
            <button type='button' onClick={() => setFat({...fat, maxEnabled: !fat.maxEnabled})}>{fat.maxEnabled ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <b>Fiber</b>
        <div>
          <label>
            Minimum
            {fiber.minEnabled &&
              <input type='text' value={fiber.min} onChange={({ target }) => setFiber({...fiber, min: target.value})}/>
            }
            <button type='button' onClick={() => setFiber({...fiber, minEnabled: !fiber.minEnabled})}>{fiber.minEnabled ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Maximum
            {fiber.maxEnabled &&
              <input type='text' value={fiber.max} onChange={({ target }) => setFiber({...fiber, max: target.value})}/>
            }
            <button type='button' onClick={() => setFiber({...fiber, maxEnabled: !fiber.maxEnabled})}>{fiber.maxEnabled ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Start date:
            <input type='date' value={date} onChange={({ target }) => setDate(target.value)}/>
          </label>
        </div>
        <button type='submit'>Create Goal</button>
      </form>
    </div>
  )
}

export default GoalForm