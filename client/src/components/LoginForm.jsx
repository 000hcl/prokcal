import { useState, useContext } from "react"
import loginService from '../services/login'
import UserContext from "../contexts/UserContext"

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {user, login} = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (user) {
      return
    }
    const credentials = {
      username,
      password,
    }
    try {
      //TODO: error handling

      const user = await loginService.logIn(credentials)
      window.localStorage.setItem(
        'loggedProkcalUser', JSON.stringify(user)
      )
      login(user)
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            Password
            <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
          </label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default LoginForm