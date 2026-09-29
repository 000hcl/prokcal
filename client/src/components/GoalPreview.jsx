const MacroListing = ({ macro }) => {
  if (!macro.minEnabled && !macro.maxEnabled) {
    return <div>Not tracked</div>
  }
  return (
    <div>
      <div>{macro.minEnabled && <> at least {macro.min} g</>} {macro.maxEnabled && <>at most {macro.max} g</>}</div>
    </div>
  )
}

const GoalPreview = ({ goal }) => {
  return (
    <div>
      <b>{goal.name}</b>
      <div>Protein: <MacroListing macro={goal.protein}/></div>
      <div>Carbohydrates: <MacroListing macro={goal.carbohydrates}/></div>
      <div>Fiber: <MacroListing macro={goal.fiber}/></div>
      <div>Fat: <MacroListing macro={goal.fat}/></div>
      <div>Calories: <MacroListing macro={goal.calories}/></div>
      <div>Date: {goal.date}</div>
    </div>
  )
}

export default GoalPreview