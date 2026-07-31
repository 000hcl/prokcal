import AddFoodForm from "./components/AddFoodForm"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import foodService from './services/foods'
import { useState, useEffect, useContext } from "react"
import UserContext from "./contexts/UserContext"

// const dummyDataFoods = [
//   {
//     id: '46873986573',
//     name: 'greek yogurt',
//     protein: 9.5,
//     carbohydrates: 5.66,
//     fats: 3.56,
//     kcal: 92
//   },
//   {
//     id: '76869879f9z3',
//     name: 'baked salmon',
//     protein: 23.97,
//     carbohydrates: 0.49,
//     fats: 7.56,
//     kcal: 171
//   }
// ]

// const dummyDataTracking = [
//   {
//     date: '23.1.2026',
//     food: '46873986573',
//     grams: 200
//   },
//   {
//     date: '24.1.2026',
//     food: '76869879f9z3',
//     grams: 250
//   }
// ]


const App = () => {
  const [foods, setFoods] = useState([])
  const { user, login, logout } = useContext(UserContext)

  useEffect(() => {
    const getFoods = async () => {
      const dbFoods = await foodService.getAll()
      setFoods(dbFoods)
    }

    getFoods()

  }, [])
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedProkcalUser')

    if (loggedUserJSON) {
      login(JSON.parse(loggedUserJSON))
    }
  }, [login])


  const handleNewFood = async (newFood) => {
    const savedFood = await foodService.create(newFood)
    setFoods(foods.concat(savedFood))

  }



  return (
    <div>
      <h1>prokcal</h1>
      <p>Welcome, {user?.username}</p>
      <button onClick={logout}>log out</button>
      <RegisterForm />
      <LoginForm />
      <AddFoodForm handleNewFood={handleNewFood}/>
    </div>
  )
}

export default App