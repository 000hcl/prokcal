import { useState } from 'react'

const today = new Date().toISOString().substring(0,10)

const LogIntakeForm = ({ goals, foods, presets }) => {
  //TODO:
  // goal to attach
  // food and preset selection
  // statistics/summary display
  // shortcut/pop-up to new preset/ food form
  // how to handle multiple loggings in a day?
  //TODO: component for food selector

  const [date, setDate] = useState(today)
  const [newAddition, setNewAddition] = useState(null)

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
            Add a food
          <select
            value={newAddition?.id ?? ''}
            onChange={e => {
              const food = foods.find(f => String(f.id) === e.target.value)
              setNewAddition(food ?? null)
            }}
          >
            <option value=''>Select a food</option>

            {foods.map(f => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          </label>
          <button type='button'>add to intake</button>
        </div>
      </div>
    </div>
  )
}

export default LogIntakeForm