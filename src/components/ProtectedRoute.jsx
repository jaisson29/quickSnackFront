import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './Auth/Autenticacion'

export const ProtectedRoute = ({ children, component, ...rest }) => {
  const { authToken } = useAuth()
  console.log(authToken)
  return authToken ? { children } : <Navigate to="/login" />
}
