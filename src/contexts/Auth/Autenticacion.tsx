import axios from 'axios';
import { createContext, useContext, useEffect, useState, useReducer, useMemo, useCallback } from 'react';
import { redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Usuario } from '../../types';

const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
	const [authToken, setAuthToken] = useState(sessionStorage.getItem('token'));
	const [user, setUser] = useState<Usuario | null>();
	const [isAuth, setIsAuth] = useState(false);
	const [balance, setBalance] = useState(0);
	const [cargando, setCargando] = useState<boolean>(false);
	const urlApi = 'https://quick-anack-back.onrender.com';
	// const urlApi = 'http://localhost:5000';
	const tableTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

	const instance = axios.create({
		baseURL: urlApi,
	});

	instance.interceptors.response.use(
		(response) => response,
		(error) => {
			//Cuando el error cuando la peticion es erronea
			if (error?.response?.status === 400 || error?.response?.status === 500) {
				Swal.fire({
					icon: 'error',
					title: error.response.data.message ?? 'Surgio un error al realizar la operación',
					timer: 10000,
				});
			}
			// Cuando el servidor devuelva una peticion fallida con el codigo 401(No autorizado) cerrara la sesión
			if (error.response?.status === 401) {
				logout(); // Ejecución de logout() para limpieza de variables de sesión
			}
			return Promise.reject(error);
		},
	);

	const login = useCallback(
		async (token: string) => {
			try {
				const respuesta = await instance.get(`${urlApi}/api/auth/verify`, {
					headers: {
						//Inicializa el header de la paetición
						Authorization: `Bearer ${token}`, // Agrega el token al encabezado "Authorization" para el envio del token por Bearer
					},
				});
				const decodedToken = respuesta.data;
				sessionStorage.setItem('token', token);
				setAuthToken(sessionStorage.getItem('token'));
				setUser(decodedToken.payload);
				setIsAuth(true);
			} catch (error) {
				console.error('Error verificando el token', error);
			}
		},
		[instance],
	);

	const logout = () => {
		sessionStorage.clear();
		setAuthToken(null);
		setUser(null);
		setIsAuth(false);
		setBalance(0);
		redirect('/');
	};

	const initialState = {
		cart: {
			cartItems: sessionStorage.getItem('cartItems') ? JSON.parse(sessionStorage.getItem('cartItems') as string) : [],
		},
	};

	function reducer(state: any, action: any) {
		switch (action.type) {
			case 'CART_ADD_ITEM': {
				const newItem = action.payload;
				const existItem = state.cart.cartItems.find((item: any) => item.prodId === newItem.prodId);
				const cartItems = existItem
					? state.cart.cartItems.map((item: any) =>
							item.prodId === existItem.prodId ? { ...item, cantidad: newItem.cantidad } : item,
					  )
					: [...state.cart.cartItems, newItem];
				sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
				return { ...state, cart: { cartItems } }; // Update cartItems directly
			}

			case 'CART_DECREASE': {
				const newItem = action.payload;
				const existItem = state.cart.cartItems.find((item: any) => item.prodId === newItem.prodId);
				if (existItem) {
					const cartItems = state.cart.cartItems.map((item: any) =>
						item.prodId === existItem.prodId ? { ...item, cantidad: item.cantidad - 1 } : item,
					);
					sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
					return { ...state, cart: { ...state.cart, cartItems } };
				}
				return state;
			}

			case 'CART_DEL_ITEM': {
				const payloadItem = action.payload;
				const newCartItems = state.cart.cartItems.filter((item: any) => item.prodId !== payloadItem.prodId);
				sessionStorage.setItem('cartItems', JSON.stringify(newCartItems));
				return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
			}

			case 'CART_CLEAR':
				sessionStorage.setItem('cartItems', JSON.stringify([]));
				return { ...state, cart: { cartItems: [] } }; // Clear cartItems directly

			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log('render');

		const verifyToken = async (token: string) => {
			try {
				const response = await instance.get(`${urlApi}/api/auth/verify`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const decodedToken = response.data;
				sessionStorage.setItem('token', token);
				setUser(decodedToken.payload);
				redirect(`/${decodedToken.paginaRuta}`)
			} catch (error) {
				logout();
				console.error('Error verificando el token', error);
			}
		};

		if (authToken && !user) {
			verifyToken(authToken);
		}

		!authToken && !user && logout();
	}, [authToken, instance, user]);

	return (
		<AuthContext.Provider
			value={useMemo(
				() => ({
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
					cargando,
					setCargando,
				}),
				[authToken, balance, cargando, instance, isAuth, login, state, tableTheme, user],
			)}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	if (!AuthContext) {
		throw new Error('Esta fuera del contexto de autenticacion');
	}
	return useContext(AuthContext);
}
