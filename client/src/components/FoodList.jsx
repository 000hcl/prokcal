import FoodListing from "./FoodListing"

const FoodList = ({ foods }) => {
  return (
    <div>
      <h2>Foods:</h2>
      <div>
        {foods.map(f => <FoodListing food={f} key={f.id}/>)}
      </div>
    </div>
  )
}

export default FoodList