import { useState } from 'react'
import FoodListing from './FoodListing'
import SummaryTable from './SummaryTable'
import AddFoodForm from './AddFoodForm'
import Selector from './Selector'
import foodService from '../services/foods'
import presetService from '../services/presets'


const ToggleButton = ({newFoodForm, setNewFoodForm}) => {
  return (
    <button onClick={() => setNewFoodForm(!newFoodForm)}>
      {newFoodForm ? 'Add existing food' : 'Add a new food'}
    </button>
  )
}

//TODO: further refactoring?
const AddExisting = ({ allFoods, newAddition, setNewAddition }) => {
  return (
    <div>
      <Selector itemList={allFoods} newAddition={newAddition} setNewAddition={setNewAddition} label={'Add existing food'} selectLabel={'Select food'}/>

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
  const [defaultAmount, setDefaultAmount] = useState('')
  const [newFoodForm, setNewFoodForm] = useState(false)
  const [isPrivate, setPrivate] = useState(true)

  const handleDelete = (foodToDelete) => {
    const newFoods = foods.filter(f => f.id != foodToDelete.id)
    setFoods(newFoods)
  }

  const handleEditDefault = (foodToEdit, newAmount) => {
    const newFoods = foods.map(f => f.id === foodToEdit.id ? {...f, defaultAmount: newAmount} : f)
    setFoods(newFoods)
  }

  const handleNewAddition = (event) => {
    event.preventDefault()
    setFoods(foods.concat({...newAddition, defaultAmount }))
    setNewAddition(null)
    setDefaultAmount('')
  }

  const handleNewFood = async (newFood) => {
    const createdFood = await foodService.create(newFood)
    setAllFoods(allFoods.concat(createdFood))
    setFoods(foods.concat({...createdFood, defaultAmount}))
    setDefaultAmount('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const foodsConcise = foods.map(f => ({food: f.id, defaultAmount: f.defaultAmount}))
    const newPreset = { name, foods: foodsConcise, private: isPrivate }
    const savedPreset = await presetService.create(newPreset)
    setFoods([])
    setName('')
    setNewAddition(null)
    setDefaultAmount('')
    setPrivate(true)
    setNewFoodForm(false)
    console.log(savedPreset)
  }

  return (
    <div>
      <h3>Make a preset</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name
            <input type='text' value={name} onChange={({ target }) => setName(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            private
            <input type='checkbox' checked={isPrivate} onChange={({ target }) => setPrivate(target.checked)}/>
          </label>
        </div>
        <div>
          <SummaryTable isPresetForm={true} foods={foods} handleEditAmount={handleEditDefault} handleDelete={handleDelete}/>

        </div>
        <button type='submit'>save preset</button>
      </form>
      <ToggleButton newFoodForm={newFoodForm} setNewFoodForm={setNewFoodForm}/>
      <form onSubmit={handleNewAddition}>
        {!newFoodForm &&
          <div>
            <AddExisting allFoods={allFoods} newAddition={newAddition} setNewAddition={setNewAddition}/>
            <div>
              <label>
                default amount
                <input type='text' value={defaultAmount} onChange={({ target }) => setDefaultAmount(target.value)}/> 
              </label>
            </div>
            <button type='submit'>add food to preset</button>
          </div>
        }
      </form>
        {
          newFoodForm &&
          <AddFoodForm handleNewFood={handleNewFood} isPreset={true} defaultUnit={defaultAmount} setDefaultUnit={setDefaultAmount}/>
        }
    </div>
  )
}

export default AddPresetForm