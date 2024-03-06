/** @format */

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import Error from '../../components/error/Error';
import Button from '../../components/boton/Button';
import Swal from 'sweetalert2';
import { CarritoItem } from './CarritoItem';
import { CarritoOrden } from './carritoOrden';
import { Transaccion as TransacType } from '../../types';

const Carrito = () => {
	const { state, urlApi, instance, authToken, user, dispatch, balance }: any = useAuth();
	const [total, setTotal] = useState(0);
	const [activeOrders, setActiveOrders] = useState<TransacType[]>([]);
	const [cargando, setCargando] = useState<boolean>(false);

	const pay = (e: any) => {
		e.preventDefault();
		if (balance >= total) {
			setCargando(true);
			instance
				.post(
					`${urlApi}/api/transac/crear`,
					{
						usuId: user.usuId,
						transacTipo: 7,
						det: state.cart.cartItems,
					},
					{
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
					},
				)
				.then((res: any) => {
					console.log('pagado', res);
					dispatch({ type: 'CART_CLEAR' });
					console.log(state);
				})
				.catch((error: any) => {
					console.log(error);
				})
				.finally(() => setCargando(false));
		} else {
			Swal.fire({
				icon: 'error',
				title: 'No tienes suficiente saldo',
				text: 'Porfavor acercate a los cajeros de la cafeteria para recargar mas fondos',
				timer: 3000,
			});
		}
	};

	useEffect(() => {
		const getActiveOrders = async () => {
			try {
				const resultado = await instance.get(`${urlApi}/api/transac/getAll/${user.usuId}`, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				});
				resultado?.data && setActiveOrders(resultado.data);
			} catch (error) {
				console.error(error);
				setActiveOrders([]);
			}
		};

		const suma = state.cart.cartItems.length
			? state.cart.cartItems
					.map((item: any) => item.cantidad * item.prodValVen)
					.reduce((total: any, subtotal: any) => total + subtotal, 0)
			: 0;
		setTotal(suma);
		getActiveOrders();
	}, [state.cart.cartItems, setTotal, authToken, dispatch, instance, urlApi, user.usuId]);

	return (
		<>
			<h3 className='w-full my-2 text-3xl font-bold text-center'>Carrito de compras</h3>
			{state.cart.cartItems.length === 0 && (
				<Error mensaje={'No hay items en tu carrito'} twStyles={'bg-green-200 ring-green-400'} />
			)}
			{state.cart.cartItems.length !== 0 && (
				<section className='w-full p-2 mx-auto divide-y-2 max-w-[800px] shadow-md min-h-24 divide-clNegL bg-clBlan md:p-5 md:w-4/5 rounded-xl'>
					{state.cart.cartItems.length > 0 &&
						state.cart.cartItems.map((item: any) => {
							return <CarritoItem key={item.prodId} item={item} />;
						})}

					<h3 className={'py-3 font-bold text-end'}>Total a pagar: $ {total.toLocaleString('es-CO')}</h3>

					<Button disabled={cargando} twStyles={`m-auto`} onClick={pay}>
						Pagar
					</Button>
				</section>
			)}
			<div className='flex flex-wrap gap-4 mt-5'>
				<h3 className='w-full text-2xl font-bold text-center text-black/70'>Pedidos pendientes</h3>
				{activeOrders?.map((orden: any) => (

					orden.transacTipo === 7 && <CarritoOrden key={orden.transacId} numeroPago={orden.transacId} />
				))}
			</div>
		</>
	);
};

export default Carrito;
