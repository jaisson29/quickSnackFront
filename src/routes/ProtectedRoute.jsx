import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../components/Auth/Autenticacion'

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  const [isLoggedIn, setIsLoggedIn] = useAuth()
  setIsLoggedIn(true)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />
        } else {
          return <Navigate to="/login" />
        }
      }}
    />
  )
}

export default ProtectedRoute
