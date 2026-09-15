import { useState } from 'react'
import FoodListing from './FoodListing'

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

const AddPresetForm = ({ allFoods }) => {
  const [name, setName] = useState('')
  const [foods, setFoods] = useState([])
  const [newAddition, setNewAddition] = useState(null)
  const [defaultUnits, setDefaultUnits] = useState('')

  const handleNewAddition = (event) => {
    event.preventDefault()
    setFoods(foods.concat({...newAddition, defaultUnits }))
    setNewAddition(null)
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
      <form onSubmit={handleNewAddition}>
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
        <div>
          <label>
            default units
            <input type='text' value={defaultUnits} onChange={({ target }) => setDefaultUnits(target.value)}/> 
          </label>
        </div>
        <button type='submit'>add food to preset</button>
      </form>
    </div>
  )
}

export default AddPresetForm