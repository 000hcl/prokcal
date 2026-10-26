import { createContext, useState, useCallback } from 'react'


const ErrorContext = createContext()

export const ErrorContextProvider = ({ children }) => {
  const [error, setError] = useState(null)

  const notifyError = useCallback((message) => {
    setError(message)
    setTimeout(() => setError(null), 5000)
  }, [])

  const removeError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <ErrorContext.Provider
      value={{ error, notifyError, removeError }} >
      {children}
    </ErrorContext.Provider>
  )
}

export default ErrorContext