import { useState } from 'react'
import goalService from '../services/goals'

const today = new Date().toISOString().substring(0,10)

const GoalForm = () => {
  const [name, setName] = useState('')
  const [minCalories, setMinCalories] = useState('')
  const [maxCalories, setMaxCalories] = useState('')
  const [minCarbs, setMinCarbs] = useState('')
  const [maxCarbs, setMaxCarbs] = useState('')
  const [minProtein, setMinProtein] = useState('')
  const [maxProtein, setMaxProtein] = useState('')
  const [minFat, setMinFat] = useState('')
  const [maxFat, setMaxFat] = useState('')
  const [minFiber, setMinFiber] = useState('')
  const [maxFiber, setMaxFiber] = useState('')
  const [date, setDate] = useState(today)

  const [enableMinCalories, setEnableMinCalories] = useState(false)
  const [enableMaxCalories, setEnableMaxCalories] = useState(false)
  const [enableMinCarbs, setEnableMinCarbs] = useState(false)
  const [enableMaxCarbs, setEnableMaxCarbs] = useState(false)
  const [enableMinProtein, setEnableMinProtein] = useState(false)
  const [enableMaxProtein, setEnableMaxProtein] = useState(false)
  const [enableMinFat, setEnableMinFat] = useState(false)
  const [enableMaxFat, setEnableMaxFat] = useState(false)
  const [enableMinFiber, setEnableMinFiber] = useState(false)
  const [enableMaxFiber, setEnableMaxFiber] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault()
    const goal = {
      name: name,
      protein: {
        max: maxProtein,
        min: minProtein,
        maxEnabled: enableMaxProtein,
        minEnabled: enableMinProtein
      },
      carbohydrates: {
        max: maxCarbs,
        min: minCarbs,
        maxEnabled: enableMaxCarbs,
        minEnabled: enableMinCarbs
      },
      calories: {
        max: maxCalories,
        min: minCalories,
        maxEnabled: enableMaxCalories,
        minEnabled: enableMinCalories
      },
      fiber: {
        max: maxFiber,
        min: minFiber,
        maxEnabled: enableMaxFiber,
        minEnabled: enableMinFiber
      },
      fat: {
        max: maxFat,
        min: minFat,
        maxEnabled: enableMaxFat,
        minEnabled: enableMinFat
      },
      date: date
    }
    setName('')
    setMinCalories('')
    setMaxCalories('')
    setMinCarbs('')
    setMaxCarbs('')
    setMinProtein('')
    setMaxProtein('')
    setMinFiber('')
    setMaxFiber('')
    setMinFat('')
    setMaxFat('')

    setEnableMaxCalories(false)
    setEnableMinCalories(false)
    setEnableMaxFat(false)
    setEnableMinFat(false)
    setEnableMaxFiber(false)
    setEnableMinFiber(false)
    setEnableMaxProtein(false)
    setEnableMinProtein(false)
    setEnableMaxCarbs(false)
    setEnableMinCarbs(false)

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
            {enableMinCalories &&
              <input type='text' value={minCalories} onChange={({ target }) => setMinCalories(target.value)}/>
            }
            <button type='button' onClick={() => setEnableMinCalories(!enableMinCalories)}>{enableMinCalories ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Maximum
            {enableMaxCalories &&
              <input type='text' value={maxCalories} onChange={({ target }) => setMaxCalories(target.value)}/>
            }
            <button type='button' onClick={() => setEnableMaxCalories(!enableMaxCalories)}>{enableMaxCalories ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <b>Carbohydrates</b>
        <div>
          <label>
            Minimum
            {enableMinCarbs &&
              <input type='text' value={minCarbs} onChange={({ target }) => setMinCarbs(target.value)}/>
            }
            <button type='button' onClick={() => setEnableMinCarbs(!enableMinCarbs)}>{enableMinCarbs ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Maximum
            {enableMaxCarbs &&
              <input type='text' value={maxCarbs} onChange={({ target }) => setMaxCarbs(target.value)}/>
            }
            <button type='button' onClick={() => setEnableMaxCarbs(!enableMaxCarbs)}>{enableMaxCarbs ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <b>Protein</b>
        <div>
          <label>
            Minimum
            {enableMinProtein &&
              <input type='text' value={minProtein} onChange={({ target }) => setMinProtein(target.value)}/>
            }
            <button type='button' onClick={() => setEnableMinProtein(!enableMinProtein)}>{enableMinProtein ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Maximum
            {enableMaxProtein &&
              <input type='text' value={maxProtein} onChange={({ target }) => setMaxProtein(target.value)}/>
            }
            <button type='button' onClick={() => setEnableMaxProtein(!enableMaxProtein)}>{enableMaxProtein ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <b>Fat</b>
        <div>
          <label>
            Minimum
            {enableMinFat &&
              <input type='text' value={minFat} onChange={({ target }) => setMinFat(target.value)}/>
            }
            <button type='button' onClick={() => setEnableMinFat(!enableMinFat)}>{enableMinFat ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Maximum
            {enableMaxFat &&
              <input type='text' value={maxFat} onChange={({ target }) => setMaxFat(target.value)}/>
            }
            <button type='button' onClick={() => setEnableMaxFat(!enableMaxFat)}>{enableMaxFat ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <b>Fiber</b>
        <div>
          <label>
            Minimum
            {enableMinFiber &&
              <input type='text' value={minFiber} onChange={({ target }) => setMinFiber(target.value)}/>
            }
            <button type='button' onClick={() => setEnableMinFiber(!enableMinFiber)}>{enableMinFiber ? 'Do not track' : 'Track'}</button>

          </label>
        </div>
        <div>
          <label>
            Maximum
            {enableMaxFiber &&
              <input type='text' value={maxFiber} onChange={({ target }) => setMaxFiber(target.value)}/>
            }
            <button type='button' onClick={() => setEnableMaxFiber(!enableMaxFiber)}>{enableMaxFiber ? 'Do not track' : 'Track'}</button>

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