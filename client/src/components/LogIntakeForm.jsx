import { useState } from 'react'
import Selector from './Selector'
import GoalPreview from './GoalPreview'
import FoodListing from './FoodListing'
import SummaryTable from './SummaryTable'

const today = new Date().toISOString().substring(0,10)

const LogIntakeForm = ({ goals, foods, presets }) => {
  //TODO:
  // preset selection: confirm adding, different preview?
    // preset preview!
    // handle adding!
  // shortcut/pop-up to new preset/ food form
  // how to handle multiple loggings in a day?
  // Currently only handles singular food additions
  //toggleable previews?

  const [date, setDate] = useState(today)
  //NewAddition is Food
  const [newAddition, setNewAddition] = useState(null)
  const [newPresetAddition, setNewPresetAddition] = useState(null)
  const [loggedFoods, setLoggedFoods] = useState([])
  const [amount, setAmount] = useState('')
  const [goal, setGoal] = useState(null)

  const handleAddExistingFood = () => {
    setLoggedFoods(loggedFoods.concat({...newAddition, units: Number(amount)}))
    setNewAddition(null)
    setAmount('')
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
    const newFoodList = newPresetAddition.foods.filter(f => f.id != foodToDelete.id)
    setNewPresetAddition({...newPresetAddition, foods: newFoodList})
  }

  const handleEditPresetItem = (foodToEdit, newAmount) => {
    const newFoodList = newPresetAddition.foods.map(f => f.id === foodToEdit.id ? {...f, defaultUnits: newAmount} : f)
    setNewPresetAddition({...newPresetAddition, foods: newFoodList})
  }


  return (
    <div>
      <h3>Log your intake</h3>
      <div>
        <div>
          <label>
            Date:
            <input type='date' value={date} onChange={({ target }) => setDate(target.value)}/>
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
            <SummaryTable isPresetForm={true} foods={newPresetAddition.foods} handleDelete={handleDeletePresetItem} handleEdit={handleEditPresetItem} />
          }
        </div>
      </div>
    </div>
  )
}

export default LogIntakeForm