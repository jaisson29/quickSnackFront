/** @format */

import axios from 'axios'
import React, { createContext, useContext, useEffect, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
	authToken: sessionStorage.getItem('token'),
	user: JSON.parse(sessionStorage.getItem('user')),
	isAuth: false,
	balance: 0,
	cartItems: [],
	urlApi: 'http://localhost:5000',
}

function reducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, authToken: action.payload }
		case 'LOGOUT':
			return { ...initialState }
		case 'SET_USER':
			return { ...state, user: act
        ion.payload }
		case 'SET_AUTH':
			return { ...state, isAuth: action.payload }
		case 'SET_BALANCE':
			return { ...state, balance: action.payload }
		case 'SET_CART_ITEMS':
			return { ...state, cartItems: action.payload }
		case 'CART_ADD_ITEM':
			const newItem = action.payload
			const existItem = state.cartItems.find((item) => item._id === newItem._id)
			const cartItems = existItem
				? state.cartItems.map((item) => (item._id === existItem._id ? newItem : item))
				: [...state.cartItems, newItem]
			return { ...state, cartItems }
		default:
			return state
	}
}

export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const login = async (token) => {
		dispatch({ type: 'LOGIN', payload: token })
		try {
			const response = await axios.get(`${state.urlApi}/api/login/verify`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const decodedToken = response.data
			sessionStorage.setItem('token', token)
			sessionStorage.setItem('user', JSON.stringify(decodedToken.payload[0]))
			dispatch({ type: 'SET_USER', payload: JSON.parse(sessionStorage.getItem('user')) })
			dispatch({ type: 'SET_AUTH', payload: true })
		} catch (error) {
			console.error('Error verifying the token', error)
			logout()
		}
	}

	const logout = () => {
		sessionStorage.clear()
		dispatch({ type: 'LOGOUT' })
	}

	useEffect(() => {
		if (state.authToken) {
			login(state.authToken)
		}
		state.authToken && state.user ? dispatch({ type: 'SET_AUTH', payload: true }) : logout()
		dispatch({ type: 'SET_BALANCE', payload: 0 })
	}, [state.authToken])

	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

export function useAuth() {
	return useContext(AuthContext)
}
