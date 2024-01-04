/** @format */

import axios from 'axios';
import React, { createContext, useContext, useEffect, useState, useReducer } from 'react';
import { redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [authToken, setAuthToken] = useState(sessionStorage.getItem('token'));
	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
	const [isAuth, setIsAuth] = useState(false);
	const [balance, setBalance] = useState(0);
	const urlApi = 'http://localhost:5000';
	const tableTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;


	const instance = axios.create({
		baseURL: urlApi,
	});

	instance.interceptors.response.use(
		(response) => response,	// Aquí puedes realizar acciones antes de que la respuesta sea devuelta
		(error) => {
			//Cuando el error cuando la peticion es erronea
			if (error.response?.status === 400) {
				Swal.fire({
					icon: 'error',
					title: error.response.data.error,
					timer: 300000,
				});
			}
			// Cuando el servidor devuelva una peticion fallida con el codigo 401(No autroizado) cerrara la sesión
			if (error.response?.status === 401 | 500) {
				logout(); // Ejecución de logout() para limpieza de variables de sesión
			}
			return Promise.reject(error);
		},
	);

	const login = async (token) => {
		instance
			.get(`${urlApi}/api/auth/verify`, {
				headers: {
					//Inicializa el header de la paetición
					Authorization: `Bearer ${token}`, // Agrega el token al encabezado "Authorization" para el envio del token por Bearer
				},
			})
			.then(async (respuesta) => {
				const decodedToken = respuesta.data;
				sessionStorage.setItem('token', token);
				sessionStorage.setItem('user', JSON.stringify(decodedToken.payload[0]));
				setAuthToken(sessionStorage.getItem('token'));
				await setUser(JSON.parse(sessionStorage.getItem('user')));
				setIsAuth(true);
			})
			.catch((error) => {
				console.error('Error verificando el token', error);
			});
	};

	const logout = () => {
		sessionStorage.clear();
		setAuthToken(null);
		setUser(null);
		setIsAuth(false);
		redirect('/');
	};

	const verifyToken = async (token) => {
		try {
			const response = await instance.get(`${urlApi}/api/auth/verify`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const decodedToken = response.data;
			sessionStorage.setItem('token', token);
			sessionStorage.setItem('user', JSON.stringify(decodedToken.payload[0]));
			setUser(JSON.parse(sessionStorage.getItem('user')));
			setIsAuth(true);
		} catch (error) {
			logout();
			console.error('Error verificando el token', error);
		}
	};

	const initialState = {
		cart: {
			cartItems: sessionStorage.getItem('cartItems') ? JSON.parse(sessionStorage.getItem('cartItems')) : [],
		},
	};

	function reducer(state, action) {
		switch (action.type) {
			case 'CART_ADD_ITEM': {
				const newItem = action.payload;
				const existItem = state.cart.cartItems.find((item) => item.prodId === newItem.prodId);
				const cartItems = existItem
					? state.cart.cartItems.map((item) =>
						item.prodId === existItem.prodId ? { ...item, cantidad: item.cantidad + newItem.cantidad } : item
					)
					: [...state.cart.cartItems, newItem];
				sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
				return { ...state, cart: { cartItems } }; // Update cartItems directly
			}

			case 'CART_DECREASE': {
				const newItem = action.payload;
				const existItem = state.cart.cartItems.find((item) => item.prodId === newItem.prodId);
				if (existItem) {
					const cartItems = state.cart.cartItems.map((item) => (item.prodId === existItem.prodId ? { ...item, cantidad: item.cantidad - 1 } : item));
					sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
					return { ...state, cart: { ...state.cart, cartItems } };
				}
				return state;
			}

			case 'CART_DEL_ITEM': {
				const payloadItem = action.payload;
				const newCartItems = state.cart.cartItems.filter((item) => item.prodId !== payloadItem.prodId);
				sessionStorage.setItem('cartItems', JSON.stringify(newCartItems));
				return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
			}

			case 'CART_CLEAR':
				sessionStorage.setItem('cartItems', JSON.stringify([]))
				return { ...state, cart: { cartItems: [] } }; // Clear cartItems directly

			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log('render');
		if (authToken) {
			verifyToken(authToken);
		}
		authToken && user ? setIsAuth(true) : logout();
		setBalance(0);
	}, [authToken, state.cart.cartItems, dispatch]);

	return (
		<AuthContext.Provider
			value={{
				instance,
				authToken,
				user,
				balance,
				setBalance,
				isAuth,
				login,
				logout,
				urlApi,
				state,
				tableTheme,
				dispatch,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
