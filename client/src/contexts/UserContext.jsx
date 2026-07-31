import { createContext, useState, useCallback } from 'react'
import { setToken } from '../services/common'

const UserContext = createContext()

export default UserContext

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = useCallback((userData) => {
    setUser(userData)
    setToken(userData?.token)
  }, [])

  const logout = useCallback(() => {
    window.localStorage.removeItem('loggedProkcalUser')
    setUser(null)
  }, [])

  return (
    <UserContext.Provider
      value={
        {user, login, logout}
      }>
      {children}
    </UserContext.Provider>
  )
}
