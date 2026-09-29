import { useState } from 'react'

const TotalMacrosRow = ({foods}) => {
  const protein = foods ? foods.reduce((acc, f) => acc + f.protein*f.defaultUnits/100, 0) : 0
  const carbohydrates = foods ? foods.reduce((acc, f) => acc + f.carbohydrates*f.defaultUnits/100, 0) : 0
  const fiber = foods ? foods.reduce((acc, f) => acc + f.fiber*f.defaultUnits/100, 0) : 0
  const fat = foods ? foods.reduce((acc, f) => acc + f.fat*f.defaultUnits/100, 0) : 0
  const calories = foods ? foods.reduce((acc, f) => acc + f.calories*f.defaultUnits/100, 0) : 0

  return (
    <tr>
      <td>total</td>
      <td>{protein} g</td>
      <td>{carbohydrates} g</td>
      <td>{fiber} g</td>
      <td>{fat} g</td>
      <td>{calories} kcal</td>
      <td></td>
    </tr>
  )
}

const Listing = ({food, handleDelete, handleEditAmount, isPresetForm}) => {
  const [editmode, setEditmode] = useState(false)
  const [newAmount, setNewAmount] = useState(isPresetForm ? food.defaultUnits : food.units)

  const handleEdit = () => {
    setEditmode(!editmode)
    handleEditAmount(food, newAmount)
  }

  const protein = isPresetForm ? food.protein * food.defaultUnits / 100 : food.protein * food.units / 100
  const carbohydrates = isPresetForm ? food.carbohydrates * food.defaultUnits / 100 : food.carbohydrates * food.units / 100
  const fiber = isPresetForm ? food.fiber * food.defaultUnits / 100 : food.fiber * food.units / 100
  const fat = isPresetForm ? food.fat * food.defaultUnits / 100 : food.fat * food.units / 100
  const calories = isPresetForm ? food.calories * food.defaultUnits / 100 : food.calories * food.units / 100

  return (
    <tr>
      <td>
        {food.name}
      </td>
      <td>{protein} g</td>
      <td>{carbohydrates} g</td>
      <td>{fiber} g</td>
      <td>{fat} g</td>
      <td>{calories} kcal</td>
      {!editmode &&
      <td>
        {food.defaultUnits} {food.unit}
      </td>}
      {editmode &&
      <td>
        <input type='text' value={newAmount} onChange={({ target }) => setNewAmount(target.value)}/>
      </td>}
      <td>
        <button type='button' onClick={handleEdit}>{editmode ? 'save' : 'edit'}</button>
      </td>
      <td>
        <button type='button' onClick={() => handleDelete(food)}>X</button>
      </td>
    </tr>
    
  )
}

const SummaryTable = ({ handleEditAmount, foods, handleDelete, isPresetForm }) => {
  const isEmpty = foods.length === 0
  return (
    <div>
      <b>Macros summary</b>
      {isEmpty && <div>No foods added</div>}
      {!isEmpty &&
        <table>
          <thead>
            <tr>
              <th>food</th>
              <th>protein</th>
              <th>carbohohydrates</th>
              <th>fiber</th>
              <th>fat</th>
              <th>calories</th>
              <th>amount</th>
            </tr>
          </thead>
          <tbody>
            {foods.map(f => <Listing food={f} key={f.id} handleDelete={handleDelete} handleEditAmount={handleEditAmount} isPresetForm={isPresetForm}/>)}
          </tbody>
          <tfoot>
            <TotalMacrosRow foods={foods}/>
          </tfoot>
        </table>}
    </div>
  )
}

export default SummaryTable