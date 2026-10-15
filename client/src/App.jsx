import AddFoodForm from "./components/AddFoodForm"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import foodService from './services/foods'
import presetService from './services/presets'
import goalService from './services/goals'
import intakeService from './services/intakes'
import { useState, useEffect, useContext } from "react"
import UserContext from "./contexts/UserContext"
import FoodList from "./components/FoodList"
import AddPresetForm from "./components/AddPresetForm"
import GoalForm from "./components/GoalForm"
import LogIntakeForm from "./components/LogIntakeForm"

const App = () => {
  //backend: only public or private resources belonging to the user
  //this is currently a test page, TODO: different views
  const [foods, setFoods] = useState([])
  const [presets, setPresets] = useState([])
  const [goals, setGoals] = useState([])
  const [intakes, setIntakes] = useState([])
  const { user, login, logout } = useContext(UserContext)

  useEffect(() => {
    const getFoods = async () => {
      const dbFoods = await foodService.getAll()
      setFoods(dbFoods)
    }
    const getPresets = async () => {
      const dbPresets = await presetService.getAll()
      setPresets(dbPresets)
    }
    const getGoals = async () => {
      const dbGoals = await goalService.getAll()
      setGoals(dbGoals)
    }
    const getIntakes = async () => {
      //Unauthorized if not logged in
      const dbIntakes = await intakeService.getAll()
      console.log(dbIntakes)
      setIntakes(dbIntakes)
    }

    getFoods()
    getPresets()
    getGoals()
    getIntakes()

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

      <LogIntakeForm foods={foods} presets={presets} goals={goals}/>

      <GoalForm />
      <AddFoodForm handleNewFood={handleNewFood}/>
      
      <AddPresetForm allFoods={foods} setAllFoods={setFoods} />
      <FoodList foods={foods}/>
    </div>
  )
}

export default App