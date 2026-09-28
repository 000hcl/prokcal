import { useState } from 'react'

const today = new Date().toISOString().substring(0,10)

const LogIntakeForm = () => {
  //TODO:
  // goal to attach
  // food and preset selection
  // statistics/summary display
  // shortcut/pop-up to new preset/ food form
  // how to handle multiple loggings in a day?

  const [date, setDate] = useState(today)

  return (
    <div>
      <h3>Log your intake</h3>
      <form>
        <div>
          <label>
            Date:
            <input type='date' value={date} onChange={({ target }) => setDate(target.value)}/>
          </label>
        </div>
      </form>
    </div>
  )
}

export default LogIntakeForm