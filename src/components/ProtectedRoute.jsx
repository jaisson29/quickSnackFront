import { Navigate } from 'react-router-dom'
import { useAuth } from './Auth/Autenticacion'

export const ProtectedRoute = ({ component, ...rest }) => {
  const { authToken, login } = useAuth()
  login('adad')
  console.log(authToken)
  return authToken ? component : <Navigate to="/login" />
}
