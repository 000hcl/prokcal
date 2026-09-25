import AddFoodForm from "./components/AddFoodForm"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import foodService from './services/foods'
import { useState, useEffect, useContext } from "react"
import UserContext from "./contexts/UserContext"
import FoodList from "./components/FoodList"
import AddPresetForm from "./components/AddPresetForm"
import GoalForm from "./components/GoalForm"

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
      <GoalForm />
      <AddFoodForm handleNewFood={handleNewFood}/>
      
      <AddPresetForm allFoods={foods} setAllFoods={setFoods} />
      <FoodList foods={foods}/>
    </div>
  )
}

export default App