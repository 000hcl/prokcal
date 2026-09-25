import { useState } from 'react'
import FoodListing from './FoodListing'
import AddFoodForm from './AddFoodForm'
import foodService from '../services/foods'
import presetService from '../services/presets'


const PresetListing = ({presetFood, handleDelete, handleEditDefault}) => {
  const [editmode, setEditmode] = useState(false)
  const [newDefault, setNewDefault] = useState(presetFood.defaultUnits)

  const handleEdit = () => {
    setEditmode(!editmode)
    handleEditDefault(presetFood, newDefault)
  }


  return (
    <tr>
      <td>
        {presetFood.name}
      </td>
      <td>{presetFood.protein * presetFood.defaultUnits / 100}</td>
      <td>{presetFood.carbohydrates * presetFood.defaultUnits / 100}</td>
      <td>{presetFood.fiber * presetFood.defaultUnits / 100}</td>
      <td>{presetFood.fat * presetFood.defaultUnits / 100}</td>
      <td>{presetFood.calories * presetFood.defaultUnits / 100}</td>
      <td>{presetFood.unit}</td>
      {!editmode &&
      <td>
        {presetFood.defaultUnits}
      </td>}
      {editmode &&
      <td>
        <input type='text' value={newDefault} onChange={({ target }) => setNewDefault(target.value)}/>
      </td>}
      <td>
        <button type='button' onClick={handleEdit}>{editmode ? 'save' : 'edit'}</button>
      </td>
      <td>
        <button type='button' onClick={() => handleDelete(presetFood)}>X</button>
      </td>
    </tr>
    
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

const TotalMacrosRow = ({foods}) => {
  const protein = foods ? foods.reduce((acc, f) => acc + f.protein*f.defaultUnits/100, 0) : 0
  const carbohydrates = foods ? foods.reduce((acc, f) => acc + f.carbohydrates*f.defaultUnits/100, 0) : 0
  const fiber = foods ? foods.reduce((acc, f) => acc + f.fiber*f.defaultUnits/100, 0) : 0
  const fat = foods ? foods.reduce((acc, f) => acc + f.fat*f.defaultUnits/100, 0) : 0
  const calories = foods ? foods.reduce((acc, f) => acc + f.calories*f.defaultUnits/100, 0) : 0

  return (
    <tr>
      <td>total</td>
      <td>{protein}</td>
      <td>{carbohydrates}</td>
      <td>{fiber}</td>
      <td>{fat}</td>
      <td>{calories}</td>
      <td></td>
      <td></td>
    </tr>
  )
}

const AddPresetForm = ({ allFoods, setAllFoods }) => {
  const [name, setName] = useState('')
  const [foods, setFoods] = useState([])
  const [newAddition, setNewAddition] = useState(null)
  const [defaultUnits, setDefaultUnits] = useState('')
  const [newFoodForm, setNewFoodForm] = useState(false)
  const [isPrivate, setPrivate] = useState(true)

  const handleDelete = (foodToDelete) => {
    const newFoods = foods.filter(f => f.id != foodToDelete.id)
    setFoods(newFoods)
  }

  const handleEditDefault = (foodToEdit, newUnits) => {
    const newFoods = foods.map(f => f.id === foodToEdit.id ? {...f, defaultUnits: newUnits} : f)
    setFoods(newFoods)
  }

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const foodsConcise = foods.map(f => ({food: f.id, defaultUnits: f.defaultUnits}))
    const newPreset = { name, foods: foodsConcise, private: isPrivate }
    const savedPreset = await presetService.create(newPreset)
    setFoods([])
    setName('')
    setNewAddition(null)
    setDefaultUnits('')
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
          {foods.length >0 && <b>Added foods</b>}
          <table>
            <thead>
              <tr>
                <th>food</th>
                <th>protein</th>
                <th>carbhohydrates</th>
                <th>fiber</th>
                <th>fat</th>
                <th>kcal</th>
                <th>unit</th>
                <th>default g/ml</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(f => <PresetListing presetFood={f} key={f.id} handleDelete={handleDelete} handleEditDefault={handleEditDefault}/>)}
            </tbody>
            <tfoot>
              <TotalMacrosRow foods={foods}/>
            </tfoot>
          </table>
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