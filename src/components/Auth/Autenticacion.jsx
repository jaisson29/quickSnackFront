import React, { createContext, useContext, useReducer, useState } from 'react'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuth: false,
      }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'))

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuth: false,
  })

  const login = (token) => {
    try {
      const decodedToken = localStorage.getItem('token')
      localStorage.setItem('authToken', token)
      dispatch({ type: 'LOGIN', payload: decodedToken })
    } catch (error) {
      dispatch({ type: 'LOGOOUT' })
      console.error('Error verificando el token', error)
    }
    localStorage.setItem('authToken', token)
    setAuthToken(token)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setAuthToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isAuth: state.isAuth,
        user: state.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
