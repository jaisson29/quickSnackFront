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
	const urlApi = 'http://localhost:5000'

	const instance = axios.create({
		baseURL: urlApi,
	})

	instance.interceptors.response.use(
		(response) => {
			// Aquí puedes realizar acciones antes de que la respuesta sea devuelta
			return response
		},
		(error) => {
			// Cuando el servidor devuelva una peticion fallida con el codigo 401(No autroizado) cerrara la sesión
			if (error.response.status === 401) {
				logout() // Ejecución de logout() para limpieza de variables de sesión
			}
			return Promise.reject(error)
		},
	)

	const login = async (token) => {
		setAuthToken(token)
		instance
			.get(`${urlApi}/api/login/verify`, {
				headers: {
					//Inicializa el header de la paetición
					Authorization: `Bearer ${token}`, // Agrega el token al encabezado "Authorization" para el envio del token por Bearer
				},
			})
			.then(async (respuesta) => {
				const decodedToken = respuesta.data
				sessionStorage.setItem('token', token)
				sessionStorage.setItem('user', JSON.stringify(decodedToken.payload[0]))
				setAuthToken(sessionStorage.getItem('token'))
				await setUser(JSON.parse(sessionStorage.getItem('user')))
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
			const response = await instance.get(`${urlApi}/api/login/verify`, {
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
			logout()
			console.error('Error verificando el token', error)
		}
	}

	const initialState = {
		cart: {
			cartItems: [{ prodName: 'galletas', prodValVen: 10000 }],
		},
	}

	function reducer(state, action) {
		switch (action.type) {
			case 'CART_ADD_ITEM':
				const newItem = action.payload
				const existItem = state.cart.cartItems.find((item) => item._id === newItem._id)
				const cartItems = existItem
					? state.cart.cartItems.map((item) => (item._id === existItem._id ? newItem : item))
					: [...state.cart.cartItems, newItem]
				return { ...state, cart: { ...state.cart, cartItems } }
			case 'CART_DEL_ITEM':
				const payloadItem = action.payload
				const newCartItems = state.cart.cartItems.filter((item) => item.prodId !== payloadItem.prodId)
				return { ...state, cart: { ...state.cart, cartItems: newCartItems } }
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
