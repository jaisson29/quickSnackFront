import { Navigate } from 'react-router-dom'
import { useAuth } from './Auth/Autenticacion'

export const ProtectedRoute = ({ component, ...rest }) => {
  const { authToken } = useAuth()

  console.log(authToken)
  return authToken ? component : <Navigate to="/login" />
}
