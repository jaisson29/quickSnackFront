/** @format */

/** @format */

import axios from 'axios'
import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
	const [authToken, setAuthToken] = useState(sessionStorage.getItem('token'))
	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
	const [isAuth, setIsAuth] = useState(false)
	const [balance, setBalance] = useState(0)
	const [cartItems, setCartItems] = useState([2])
	const urlApi = 'http://localhost:5000'

	const login = async (token) => {
		setAuthToken(token)
		axios
			.get(`${urlApi}/api/login/verify`, {
				headers: {
					//Inicializa el header la el http
					Authorization: `Bearer ${token}`, // Agrega el token al encabezado "Authorization"
				},
			})
			.then((respuesta) => {
				const decodedToken = respuesta.data
				sessionStorage.setItem('token', token)
				sessionStorage.setItem('user', JSON.stringify(decodedToken.payload[0]))
				setAuthToken(sessionStorage.getItem('token'))
				setUser(JSON.parse(sessionStorage.getItem('user')))
				setIsAuth(true)
			})
			.catch((error) => {
				console.error('Error verificando el token', error)
			})
	}

	const logout = () => {
		sessionStorage.clear()
		setAuthToken(null)
		setUser(null)
		setIsAuth(false)
	}

	const verifyToken = async (token) => {
		try {
			const response = await axios.get(`${urlApi}/api/login/verify`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const decodedToken = response.data
			sessionStorage.setItem('token', token)
			sessionStorage.setItem('user', JSON.stringify(decodedToken.payload[0]))
			setAuthToken(sessionStorage.getItem('token'))
			setUser(JSON.parse(sessionStorage.getItem('user')))
			setIsAuth(true)
		} catch (error) {
			console.error('Error verificando el token', error)
			logout()
		}
	}

	const initialState = {
		cart: {
			cartItems: [],
		},
	}

	function reducer(state, action) {
		switch (action.type) {
			case 'CART_ADD_ITEM':
				//Cuando se agrega un producto al carrito de compras.
				const newItem = action.payload
				const existItem = state.cart.cartItems.find((item) => item._id === newItem._id)
				const cartItems = existItem
					? state.cart.cartItems.map((item) => (item._id === existItem._id ? newItem : item))
					: [...state.cart.cartItems, newItem]
				return { ...state, cart: { ...state.cart, cartItems } }

			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		if (authToken) {
			verifyToken(authToken)
		}
		authToken && user ? setIsAuth(true) : logout()
		setBalance(0)
	}, [authToken])

	return (
		<AuthContext.Provider
			value={{
				authToken,
				user,
				balance,
				setBalance,
				isAuth,
				login,
				logout,
				urlApi,
				cartItems,
				setCartItems,
				state,
				dispatch,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	return useContext(AuthContext)
}
