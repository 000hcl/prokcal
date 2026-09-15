import { useState } from 'react'
import FoodListing from './FoodListing'
import AddFoodForm from './AddFoodForm'
import foodService from '../services/foods'

const PresetListing = ({presetFood}) => {
  return (
    <div>
      <div>
        Food: {presetFood.name}
      </div>
      <div>
        Default units: {presetFood.defaultUnits}
      </div>
    </div>
  )
}

const ToggleButton = ({newFoodForm, setNewFoodForm}) => {
  return (
    <button onClick={() => setNewFoodForm(!newFoodForm)}>
      {newFoodForm ? 'Add existing food' : 'Add a new food'}
    </button>
  )
}

const AddExisting = ({ allFoods, newAddition, setNewAddition }) => {
  return (
    <div>
      <div>
        <label>
          Add new food
          <select
            value={newAddition?.id ?? ''}
            onChange={e => {
              const food = allFoods.find(f => String(f.id) === e.target.value)
              setNewAddition(food ?? null)
            }}
          >
            <option value=''>Select a food</option>

            {allFoods.map(f => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        {newAddition && (
          <FoodListing food={newAddition}/>
        )}
      </div>
    </div>
  )
}

const AddPresetForm = ({ allFoods, setAllFoods }) => {
  const [name, setName] = useState('')
  const [foods, setFoods] = useState([])
  const [newAddition, setNewAddition] = useState(null)
  const [defaultUnits, setDefaultUnits] = useState('')
  const [newFoodForm, setNewFoodForm] = useState(false)

  const handleNewAddition = (event) => {
    event.preventDefault()
    setFoods(foods.concat({...newAddition, defaultUnits }))
    setNewAddition(null)
    setDefaultUnits('')
  }

  const handleNewFood = async (newFood) => {
    const createdFood = await foodService.create(newFood)
    setAllFoods(allFoods.concat(createdFood))
    setFoods(foods.concat({...createdFood, defaultUnits}))
    setDefaultUnits('')
  }

  return (
    <div>
      <h3>Make a preset</h3>
      <form>
        <div>
          <label>
            name
            <input type='text' value={name} onChange={({ target }) => setName(target.value)}/>
          </label>
        </div>
      </form>
      {foods.length >0 && <b>Added foods</b>}
      {foods.map(f => <PresetListing presetFood={f} key={f.id}/>)}
      <ToggleButton newFoodForm={newFoodForm} setNewFoodForm={setNewFoodForm}/>
      <form onSubmit={handleNewAddition}>
        {!newFoodForm &&
          <div>
            <AddExisting allFoods={allFoods} newAddition={newAddition} setNewAddition={setNewAddition}/>
          
            <div>
              <label>
                default units
                <input type='text' value={defaultUnits} onChange={({ target }) => setDefaultUnits(target.value)}/> 
              </label>
            </div>
            <button type='submit'>add food to preset</button>
          </div>
        }


      </form>
        {
          newFoodForm &&
          <AddFoodForm handleNewFood={handleNewFood} isPreset={true} defaultUnit={defaultUnits} setDefaultUnit={setDefaultUnits}/>
        }
    </div>
  )
}

export default AddPresetForm