import { useState, useContext } from "react"
import userService from '../services/users'
import UserContext from "../contexts/UserContext"

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {user} = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (user) {
      setUsername('USER EXISTS')
      console.log(user)
      return
    }
    const newUserCredentials = {
      username,
      password,
      confirmPassword
    }
    try {
      //TODO: error handling
      const result = await userService.register(newUserCredentials)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h3>Register a new account</h3>
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
        <div>
          <label>
            Confirm Password
            <input type='password' value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)}/>
          </label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default RegisterForm