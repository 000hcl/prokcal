import ReactDOM from 'react-dom/client'
import { UserContextProvider } from './contexts/UserContext'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { ErrorContextProvider } from './contexts/ErrorContext'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <NotificationContextProvider>
      <ErrorContextProvider>
        <App />
      </ErrorContextProvider>
    </NotificationContextProvider>
  </UserContextProvider>
)