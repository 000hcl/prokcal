import { useState } from 'react'
import Selector from './Selector'
import GoalPreview from './GoalPreview'
import FoodListing from './FoodListing'
import SummaryTable from './SummaryTable'
import IntakeService from '../services/intakes'

const today = new Date().toISOString().substring(0,10)

const LogIntakeForm = ({ goals, foods, presets, intakes }) => {
  //TODO:
  // preset selection: different preview?
    // restore button?
  // shortcut/pop-up to new preset/ food form
  // how to handle multiple loggings in a day?
  //toggleable previews?
  //food preview comes with notification that food already exists?

  const [date, setDate] = useState(today)
  //NewAddition is Food
  const [newAddition, setNewAddition] = useState(null)
  const [newPresetAddition, setNewPresetAddition] = useState(null)
  const [loggedFoods, setLoggedFoods] = useState([])
  const [amount, setAmount] = useState('')
  const [goal, setGoal] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [currentIntake, setCurrentIntake] = useState(null)

  const handleAddExistingFood = () => {
    const existing = loggedFoods.find(f => f.id === newAddition.id)
    if (existing) {
      existing.units = Number(existing.units) + Number(amount)
      const newLoggedFoods = loggedFoods.map(f => f.id === existing.id ? existing : f)
      setLoggedFoods(newLoggedFoods)
      setNewAddition(null)
      setAmount('')
    } else {
      setLoggedFoods(loggedFoods.concat({...newAddition, units: Number(amount)}))
      setNewAddition(null)
      setAmount('')
    }

  }

  const handleDateChange = ({ target }) => {
    //should notify user if existing intake data exists for a date
    setDate(target.value)
    const dateAsISOString = new Date(target.value).toISOString()
    const existingIntake = intakes.find(i => i.date === dateAsISOString)
    console.log(dateAsISOString)
    console.log(existingIntake, intakes)
    if (existingIntake) {
      setEditMode(true)
      setCurrentIntake(existingIntake)
      const mappedFoods = existingIntake.foods.map(f => ({ ...f.food, units: f.units }))
      setLoggedFoods(mappedFoods)
    } else {
      setCurrentIntake(null)
      setEditMode(false)
    }
  }

  const handleDelete = (foodToDelete) => {
    const newFoods = loggedFoods.filter(f => f.id != foodToDelete.id)
    setLoggedFoods(newFoods)
  }

  const handleEdit = (foodToEdit, newAmount) => {
    const newFoods = loggedFoods.map(f => f.id === foodToEdit.id ? {...f, units: newAmount} : f)
    setLoggedFoods(newFoods)
  }

  const handleDeletePresetItem = (foodToDelete) => {
    const newFoodList = newPresetAddition.foods.filter(f => f.food.id != foodToDelete.id)
    setNewPresetAddition({...newPresetAddition, foods: newFoodList})
  }

  const handleEditPresetItem = (foodToEdit, newAmount) => {
    const newFoodList = newPresetAddition.foods.map(f => f.food.id === foodToEdit.id ? {...f, defaultUnits: newAmount} : f)
    setNewPresetAddition({...newPresetAddition, foods: newFoodList})
  }

  const addPresetItems = () => {
    const foodsToMap = newPresetAddition.foods
    const foodsToConcat = foodsToMap.map(f => ({ ...f.food, units: f.defaultUnits }))

    let canConcat = []
    let loggedFoodsCopy = loggedFoods

    foodsToConcat.forEach(newFood => {
      const existing = loggedFoods.find(f => f.id === newFood.id)
      if (existing) {
        const existingCopy = loggedFoodsCopy.find(f => f.id === newFood.id)
        existingCopy.units = Number(newFood.units) + Number(existingCopy.units)
      } else {
        console.log('not existing')
        canConcat = canConcat.concat(newFood)
      }
    })
    const newFoods = loggedFoodsCopy.concat(canConcat)
    setLoggedFoods(newFoods)
    setAmount('')
    setNewPresetAddition(null)
  }

  const handleSubmitIntake = async (event) => {
    //TODO: PUT when existing intake exists for date
    event.preventDefault()
    const foodsMapped = loggedFoods.map(f => ({food: f.id, units: f.units}))
    const newIntake = {
      foods: foodsMapped,
      date: date,
      goal: goal.id
    }
    if (!editMode) {
      const createdIntake = await IntakeService.create(newIntake)
      console.log(createdIntake)
      //further actions
    } else {
      const editedIntake = await IntakeService.edit({ ...newIntake, id: currentIntake.id})
      console.log(editedIntake)
      //further actions
    }

    //empty fields here


  }


  return (
    <div>
      <h3>Log your intake</h3>
      <form onSubmit={handleSubmitIntake}>
        <div>
          <label>
            Date:
            <input type='date' value={date} onChange={handleDateChange}/>
          </label>
        </div>
        <div>
          <label>
            Goal:
            <Selector itemList={goals} newAddition={goal} setNewAddition={setGoal} label={'Attach goal'} selectLabel={'Select goal'}/>
            {goal &&
            <GoalPreview goal={goal}/>}
          </label>
        </div>
        <div>
          <SummaryTable isPresetForm={false} foods={loggedFoods} handleEditAmount={handleEdit} handleDelete={handleDelete}/>
        </div>
        <div>
          <Selector itemList={foods} newAddition={newAddition} setNewAddition={setNewAddition} label={'Add existing food'} selectLabel={'Select food'}/>

          {newAddition &&
            <FoodListing food={newAddition}/>
          }
          <div>
            <label>
              Amount
              <input type='text' value={amount} onChange={({ target }) => setAmount(target.value)}/> 
            </label>
          </div>
          <button type='button' onClick={handleAddExistingFood}>add to intake</button>
        </div>
        <div>
          <Selector itemList={presets}
            newAddition={newPresetAddition}
            setNewAddition={setNewPresetAddition}
            label={'Add a preset group of foods'}
            selectLabel={'Select preset'}
          />
          {
            newPresetAddition &&
            <>
              <SummaryTable isPresetForm={true} foods={newPresetAddition.foods.map(pf => ({ ...pf.food, defaultUnits: pf.defaultUnits }))} handleDelete={handleDeletePresetItem} handleEditAmount={handleEditPresetItem} />
              <button type='button' onClick={addPresetItems}>add items</button>
            </>
          }
          
        </div>
        <button type='submit'>Submit intake</button>
      </form>
    </div>
  )
}

export default LogIntakeForm