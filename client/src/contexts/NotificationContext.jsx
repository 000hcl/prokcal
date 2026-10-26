import { createContext, useState, useCallback } from 'react'


const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const notify = useCallback((message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }, [])

  const removeNotification = useCallback(() => {
    setNotification(null)
  }, [])

  return (
    <NotificationContext.Provider
      value={{ notification, notify, removeNotification }} >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext