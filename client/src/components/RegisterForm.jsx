import { useState, useContext } from "react"
import userService from '../services/users'
import UserContext from "../contexts/UserContext"
import ErrorContext from "../contexts/ErrorContext"

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {user} = useContext(UserContext)
  //remove error for 'x' button?
  const { notifyError, removeError } = useContext(ErrorContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (user) {
      notifyError('You are already logged in')
      return
    }

    try {
      const newUserCredentials = {
        username,
        password,
        confirmPassword
      }
      const result = await userService.register(newUserCredentials)
      console.log(result)
    } catch (error) {
      console.error(error)
      notifyError(error.response.data.error)
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