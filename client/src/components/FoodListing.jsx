
const FoodListing = ({ food }) => {
  const { name,
          unit,
          fiber,
          protein,
          calories,
          carbohydrates,
          fat,
          user
        } = food
  const isPrivate = food.private
  return (
    <div>
      <div><b>{name}</b></div>
      <div>
        Added by: {user?.username} {isPrivate ? <b>private</b> : <b>public</b>}
      </div>
      <div>
        Calories per 100 {unit}: {calories}
      </div>
      <div>
        Protein per 100 {unit}: {protein}
      </div>
      <div>
        Fiber per 100 {unit}: {fiber}
      </div>
      <div>
        Carbohydrates per 100 {unit}: {carbohydrates}
      </div>
      <div>
        Fat per 100 {unit}: {fat}
      </div>
      <br/>
    </div>
  )
}

export default FoodListing