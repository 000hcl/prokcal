import { useState, useContext } from "react"
import userService from '../services/users'
import UserContext from "../contexts/UserContext"
import ErrorContext from "../contexts/ErrorContext"
import NotificationContext from "../contexts/NotificationContext"

const RegisterForm = ({existingUsers}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameError, setUsernameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  //confirm error should highlight both fields in red
  const [confirmError, setConfirmError] = useState(null)
  const {user} = useContext(UserContext)
  //for unusual errors
  const { notifyError } = useContext(ErrorContext)
  const { notify } = useContext(NotificationContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (user) {
      notifyError('You are already logged in')
      return
    }
    //needed due to async
    let usernameErr = null
    let passwordErr = null
    let confirmErr = null

    if (existingUsers.includes(username)) {
      usernameErr = `Username "${username}" already exists.`
    } else if (username.length < 3) {
      usernameErr = 'Username must be at least 3 characters long.'
    }

    if (password.length < 8) {
      passwordErr = 'Password must be at least 8 characters long.'
    }

    if (password !== confirmPassword) {
      confirmErr = 'Passwords must match'
    }

    setUsernameError(usernameErr)
    setPasswordError(passwordErr)
    setConfirmError(confirmErr)

    if (usernameErr || passwordErr || confirmErr) {
      return
    }

    const newUserCredentials = {
      username,
      password,
      confirmPassword
    }
    try {
      const result = await userService.register(newUserCredentials)
      //redirect to log9in
      console.log(result)
      notify('User successfully created.')
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
          { usernameError }
        </div>
        <div>
          <label>
            Username
            <input type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
          </label>
        </div>
        <div>
          <div>
            {passwordError}
          </div>
          <div>
            {confirmError}
          </div>
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