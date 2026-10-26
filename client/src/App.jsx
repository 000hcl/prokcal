import AddFoodForm from "./components/AddFoodForm"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import foodService from './services/foods'
import presetService from './services/presets'
import userService from './services/users'
import goalService from './services/goals'
import intakeService from './services/intakes'
import { useState, useEffect, useContext } from "react"
import UserContext from "./contexts/UserContext"
import FoodList from "./components/FoodList"
import AddPresetForm from "./components/AddPresetForm"
import GoalForm from "./components/GoalForm"
import LogIntakeForm from "./components/LogIntakeForm"
import Navigation from "./components/Navigation"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotificationContext from './contexts/NotificationContext'
import ErrorContext from "./contexts/ErrorContext"
import Home from "./components/Home"
import Notification from "./components/Notification"


const App = () => {
  //backend: only public or private resources belonging to the user
  const [foods, setFoods] = useState([])
  const [presets, setPresets] = useState([])
  const [goals, setGoals] = useState([])
  const [intakes, setIntakes] = useState([])
  const [users, setUsers] = useState([])
  const { user, login, logout } = useContext(UserContext)
  const { notification, notify, removeNotification } = useContext(NotificationContext)
  const { error, notifyError, removeError } = useContext(ErrorContext)

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
    const getUsers = async () => {
      const dbUsers = await userService.getAll()
      setUsers(dbUsers.map(u => u.username))
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
    getUsers()

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

  //TODO: handle goal and preset states here

  return (
    <div>
      <Router>
        <b>{error}</b>
        <h1>prokcal</h1>
        <p>Welcome, {user?.username}</p>
        <button onClick={logout}>log out</button>
        <Navigation />
        <button onClick={() => notify('button press')}>notification test button</button>
        <button onClick={removeNotification}>no more notification</button>
        <div>{notification}</div>
        <Notification />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginForm />}/>
          <Route path="/register" element={<RegisterForm existingUsers={users}/>}/>
          <Route path="/logintake" element={<LogIntakeForm foods={foods} presets={presets} goals={goals} intakes={intakes}/>}/>
          <Route path="/newgoal" element={<GoalForm />}/>
          <Route path="/foods" element={<FoodList foods={foods}/>}/>
          <Route path="/addfood" element={<AddFoodForm handleNewFood={handleNewFood}/>}/>
          <Route path="/addpreset" element={<AddPresetForm allFoods={foods} setAllFoods={setFoods} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App