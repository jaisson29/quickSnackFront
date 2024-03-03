/** @format */

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import Error from '../../components/error/Error';
import Button from '../../components/boton/Button';
import Swal from 'sweetalert2';

const Carrito = () => {
	const { state, urlApi, instance, authToken, user, dispatch, balance }: any = useAuth();
	const [total, setTotal] = useState(0);
	const [numeroPago, setNumeroPago] = useState(0);

	const pay = (e: any) => {
		e.preventDefault();
		if (balance >= total) {
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
					setNumeroPago(res.data.transacId);
					dispatch({ type: 'CART_CLEAR' });
					console.log(state);
				})
				.catch((error: any) => {
					console.log(error);
				});
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
		const suma = state.cart.cartItems.length
			? state.cart.cartItems
					.map((item: any) => item.cantidad * item.prodValVen)
					.reduce((total: any, subtotal: any) => total + subtotal, 0)
			: 0;
		setTotal(suma);
	}, [state.cart.cartItems, setTotal, authToken, dispatch]);

	if (numeroPago !== 0) {
		return (
			<div className='border-2 border-black/20 flex flex-col m-auto justify-center rounded-lg shadow-md items-center w-[350px] min-h-[300px]'>
				<p className='text-3xl font-semibold text-black/60'>Numero de pago</p>
				<span className='text-[60px] font-bold' >{numeroPago}</span>
			</div>
		);
	}

	if (state.cart.cartItems.length === 0) {
		return <Error mensaje={'No hay items en tu carrito'} twStyles={'bg-green-200 ring-green-400'} />;
	}

	return (
		<section className='w-full p-2 mx-auto divide-y-2 shadow-md min-h-24 divide-clNegL bg-clBlan md:p-5 md:w-4/5 rounded-xl'>
			{state.cart.cartItems.length > 0 &&
				state.cart.cartItems.map((item: any) => {
					return (
						<div key={item.prodNom} className='flex mx-5'>
							<img
								src={`${urlApi}/uploads/${item.prodImg}`}
								className='object-contain w-20 rounded-2xl'
								alt={`${urlApi}/uploads/defautl.webp`}
							/>
							<div className='flex-grow'>
								<p>{item.prodNom}</p>
								<p>{item.prodDescr}</p>
								<p>{item.prodImg}</p>
							</div>
							<span className='w-16'>{item.cantidad}</span>
							<div>
								<p>$ {item.prodValVen.toLocaleString('es-CO')}</p>
							</div>
							<button title='Quitar' onClick={() => dispatch({ type: 'CART_DEL_ITEM', payload: item })}>
								<i className='fa fa-x'></i>
							</button>
						</div>
					);
				})}

			<h3 className={'py-3 font-bold text-end'}>Total a pagar: $ {total.toLocaleString('es-CO')}</h3>

			<Button disabled={state.cart.cartItems.length === 0} onClick={pay}>
				Pagar
			</Button>
		</section>
	);
};

export default Carrito;
