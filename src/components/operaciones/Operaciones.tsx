/** @format */

import { useState, useEffect, useRef } from 'react';
import './operaciones.css';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import Button from '../boton/Button';

const Operaciones = () => {
	const { urlApi, instance, authToken, state, dispatch }: any = useAuth();
	const [productos, setProductos] = useState([]);
	const [tipoTrs, setTipoTrs] = useState(7);

	const transacData = {
		usuId: 1,
		transacTipo: tipoTrs,
		det: state.cart.cartItems,
	};

	const cantidadRef: any = useRef();
	const usuNoDocRef: any = useRef();

	useEffect(() => {
		dispatch({ type: 'CART_CLEAR' });

		const getTransacs = async () => {
			try {
				const result = await instance.get(`api/producto/getAll/${tipoTrs === 6 ? '1' : ''}`, {
					headers: {
						authorization: `Bearer ${authToken}`,
					},
				});
				setProductos(result.data);
			} catch (error) {
				console.error(error);
			}
		};
		getTransacs();
	}, [tipoTrs, authToken, urlApi, dispatch]);

	const transactionHandler = async () => {
		if (state.cart.cartItems.length === 0) {
			return;
		}

		try {
			const usuDoc = { usuNoDoc: usuNoDocRef?.current?.value ?? '0000000000' };
			const usuario = await instance.post(`${urlApi}/api/usuario/getOne`, usuDoc, {
				headers: {
					authorization: `Bearer ${authToken}`,
				},
			});
			transacData.usuId = usuario.data.usuId;
			const creado = await instance.post(`${urlApi}/api/transac/crear`, transacData, {
				headers: {
					authorization: `Bearer ${authToken}`,
				},
			});
			const completado = await instance.get(`${urlApi}/api/transac/complete/${creado?.data?.transacId}`, {
				headers: {
					authorization: `Bearer ${authToken}`,
				},
			});
			console.log(completado);
		} catch (error) {
			console.error(error);
		}

		if (usuNoDocRef.current) {
			usuNoDocRef.current.value = '';
		}
		dispatch({ type: 'CART_CLEAR' });
	};

	function formHandler(event: any) {
		event.preventDefault();
		const produc = Number(event.target.prodId.value);
		const item: any = productos.find((prod: any) => prod.prodId === produc);
		dispatch({ type: 'CART_INCREASE_ITEM', payload: { ...item, cantidad: Number(event.target.cantidad.value) } });
		cantidadRef.current.value = 1;
	}

	return (
		<section className={'w-full md:w-7/12 md:mx-auto'}>
			<div className={`card-head w-full ${tipoTrs === 7 ? 'pr-3' : 'pl-3'}`}>
				<button
					className={`cardTab btn-ven ${tipoTrs === 7 && 'activeTab'}`}
					onClick={() => {
						setTipoTrs(7);
					}}>
					Venta
				</button>
				<button
					className={`cardTab btn-rec ${tipoTrs === 6 && 'activeTab'}`}
					onClick={() => {
						setTipoTrs(6);
					}}>
					Recarga
				</button>
			</div>
			<div className={`card-body ${tipoTrs === 7 ? 'rounded-tr-lg' : 'rounded-tl-lg'}`}>
				{/* <h1>{tipoTrs === 7 ? 'Pagando' : 'Recargando'}</h1> */}
				<div>
					<form method='POST' className='flex flex-col gap-3' onSubmit={formHandler}>
						<div className='row'>
							<div className='w-full md:w-6/12'>
								<label htmlFor='prodValVen' className='form-label'>
									Producto
								</label>
								<select name='prodId' id='prodValVen' className='input' required>
									{productos.map((prod: any) => {
										return (
											<option key={prod.prodId} value={prod.prodId}>
												{tipoTrs === 6
													? `$ ${Number(prod.prodNom).toLocaleString('es-CO')}`
													: `${prod.prodNom} - $ ${prod.prodValVen.toLocaleString('es-CO')}`}
											</option>
										);
									})}
								</select>
							</div>
							<div className='w-full md:w-6/12'>
								<label htmlFor='cantidad' className='form-label'>
									Cantidad
								</label>
								<input
									type='number'
									className='input'
									inputMode='numeric'
									name='cantidad'
									ref={cantidadRef}
									id='cantidad'
									min={1}
									defaultValue={1}
								/>
							</div>
						</div>
						<div className='flex items-end w-full row md:w-1/2'>
							<Button>
								<input type='submit' value={'Añadir'} />
							</Button>
						</div>
					</form>
				</div>
				<div className='mt-3 min-h-[300px] flex flex-col justify-between border-2 border-collapse rounded-xl p-3 w-full'>
					<table className='w-full h-full rounded-lg '>
						<thead className='border-b-2 border-clNeg/30'>
							<tr className='text-center'>
								<th>Producto</th>
								<th>Cantidad</th>
								<th>Acumulado</th>
							</tr>
						</thead>
						<tbody className='overflow-y-auto divide-y-2'>
							{state?.cart?.cartItems?.map((item: any) => {
								return (
									<tr key={item.prodId} className='text-center divide-x-2'>
										<td>{tipoTrs === 6 ? `$ ${Number(item.prodNom).toLocaleString('es-CO')}` : item.prodNom}</td>
										<td>{item.cantidad} Und</td>
										<td>$ {(item.prodValVen * item.cantidad).toLocaleString('es-CO')}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<table className='border-t-2 border-clNeg/30'>
						<tfoot>
							<tr className='flex justify-around'>
								<td className='font-bold text-end'></td>
								<td className='font-bold text-center'>Total</td>
								<td className='font-bold text-center'>
									${' '}
									{state?.cart?.cartItems
										?.reduce((acum: any, item: any) => acum + item.prodValVen * item.cantidad, 0)
										.toLocaleString('es-CO')}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
				<div className='flex flex-col justify-center'>
					{tipoTrs === 6 && (
						<>
							<label htmlFor='usuNoDoc' className='font-bold form-label'>
								Numero de documento
							</label>
							<input type='text' id='usuNoDoc' ref={usuNoDocRef} className='input' />
						</>
					)}

					<Button onClick={() => transactionHandler()} twStyles={'my-2 m-auto self-end'}>
						Completar
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Operaciones;
