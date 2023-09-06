import axios from 'axios'
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

const AuthContext = createContext({
  auth: false,
})

const authReducer = (state, action) => {
  switch (
    action.type // Cambia action a action.type
  ) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload, // Cambia action a action.payload.user
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
  const urlApi = 'http://10.190.195.51:5000'

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuth: false,
  })

  const login = (token) => {
    setAuthToken(token)
    axios
      .get(`${urlApi}/api/login/verify`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token al encabezado "Authorization"
        },
      })
      .then((respuesta) => {
        const decodedToken = respuesta.data
        localStorage.setItem('token', token)
        dispatch({ type: 'LOGIN', payload: decodedToken.payload[0] })
      })
      .catch((error) => {
        dispatch({ type: 'LOGOUT' })
        console.error('Error verificando el token', error)
      })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('token')
    setAuthToken(null)
  }

  useEffect(() => {
    authToken ? login(authToken) : logout()
  }, [authToken])
  return (
    <AuthContext.Provider
      value={{
        authToken,
        isAuth: state.isAuth,
        user: state.user,
        login,
        logout,
        urlApi,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
