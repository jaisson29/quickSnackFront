/** @format */

import axios from 'axios';
import React, { createContext, useContext, useEffect, useState, useReducer } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [authToken, setAuthToken] = useState(sessionStorage.getItem('token'));
	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
	const [isAuth, setIsAuth] = useState(false);
	const [balance, setBalance] = useState(0);
	const urlApi = 'http://localhost:5000';

	const instance = axios.create({
		baseURL: urlApi,
	});

	instance.interceptors.response.use(
		(response) => {
			// Aquí puedes realizar acciones antes de que la respuesta sea devuelta
			return response;
		},
		(error) => {
			// Cuando el servidor devuelva una peticion fallida con el codigo 401(No autroizado) cerrara la sesión
			if (error.response.status === 401) {
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
			cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
		},
	};

	function reducer(state, action) {
		switch (action.type) {
			case 'CART_ADD_ITEM': {
				const newItem = action.payload;
				const existItem = state.cart.cartItems.find((item) => item.prodId === newItem.prodId);
				const cartItems = existItem
					? state.cart.cartItems.map((item) =>
							item.prodId === existItem.prodId ? { ...item, cantidad: item.cantidad + newItem.cantidad } : item,
					  )
					: [...state.cart.cartItems, newItem];
				localStorage.setItem('cartItems', JSON.stringify(cartItems));
				return { ...state, cart: { ...state.cart, cartItems } };
			}
			case 'CART_DECREASE': {
				const newItem = action.payload;
				const existItem = state.cart.cartItems.find((item) => item.prodId === newItem.prodId);
				if (existItem) {
					const cartItems = state.cart.cartItems.map((item) =>
						item.prodId === existItem.prodId ? { ...item, cantidad: item.cantidad - 1 } : item,
					);
					return { ...state, cart: { ...state.cart, cartItems } };
				}
				return state;
			}
			case 'CART_DEL_ITEM': {
				const payloadItem = action.payload;
				const newCartItems = state.cart.cartItems.filter((item) => item.prodId !== payloadItem.prodId);
				return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
			}
			case 'CART_CLEAR':
				localStorage.removeItem('cartItems');
				return { ...initialState };
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
	}, [authToken]);

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
				dispatch,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
