import AddFoodForm from "./components/AddFoodForm"

const dummyDataFoods = [
  {
    id: '46873986573',
    name: 'greek yogurt',
    protein: 9.5,
    carbohydrates: 5.66,
    fats: 3.56,
    kcal: 92
  },
  {
    id: '76869879f9z3',
    name: 'baked salmon',
    protein: 23.97,
    carbohydrates: 0.49,
    fats: 7.56,
    kcal: 171
  }
]

const dummyDataTracking = [
  {
    date: '23.1.2026',
    food: '46873986573',
    grams: 200
  },
  {
    date: '24.1.2026',
    food: '76869879f9z3',
    grams: 250
  }
]


const App = () => {
  return (
    <div>
      <h1>prokcal</h1>
      <AddFoodForm/>
    </div>
  )
}

export default App