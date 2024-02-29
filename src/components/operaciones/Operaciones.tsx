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

		instance
			.get(`${urlApi}/api/producto/getAll/${tipoTrs === 6 ? '1' : ''}`, {
				headers: {
					authorization: `Bearer ${authToken}`,
				},
			})
			.then((result: any) => {
				setProductos(result.data);
			})
			.catch((err: any) => {
				console.log(err);
			});
	}, [tipoTrs, authToken, urlApi, dispatch]);

	function transactionHandler() {
		if (state.cart.cartItems.length === 0) {
			return;
		}

		const usuDoc = { usuNoDoc: usuNoDocRef?.current?.value ?? '0000000000' };
		instance
			.post(`${urlApi}/api/usuario/getOne`, usuDoc, {
				headers: {
					authorization: `Bearer ${authToken}`,
				},
			})
			.then((res: any) => {
				console.log(res.usuId);
				transacData.usuId = res.data.usuId;
				console.log(transacData);
				console.log(res);
				instance
					.post(`${urlApi}/api/transac/crear`, transacData, {
						headers: {
							authorization: `Bearer ${authToken}`,
						},
					})
					.then((res: any) => {
						console.log(res);
					})
					.catch((err: any) => {
						console.log(err);
					});
			})
			.catch((err: any) => {
				console.log(transacData);
				console.log(err);
			});

		if (usuNoDocRef.current) {
			usuNoDocRef.current.value = '';
		}
		dispatch({ type: 'CART_CLEAR' });
	}

	function formHandler(event: any) {
		event.preventDefault();
		const produc = Number(event.target.prodId.value);
		const item: any = productos.find((prod: any) => prod.prodId === produc);
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, cantidad: Number(event.target.cantidad.value) } });
		cantidadRef.current.value = 1;
	}

	return (
		<section className={'w-full md:w-10/12 m-auto'}>
			<div className={`card-head ${tipoTrs === 7 ? 'pr-3' : 'pl-3'}`}>
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
									Precio de Venta
								</label>
								<select name='prodId' id='prodValVen' className='input' required>
									{productos.map((prod: any) => {
										return (
											<option key={prod.prodId} value={prod.prodId}>
												{tipoTrs === 6 ? `$ ${Number(prod.prodNom).toLocaleString('es-CO')}` : prod.prodNom}
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
				<div className='h-full p-5'>
					<table className='w-full h-full tbl'>
						<thead>
							<tr>
								<th>Producto</th>
								<th>Cantidad</th>
							</tr>
						</thead>
						<tbody>
							{state.cart.cartItems.map((item: any) => {
								return (
									<tr key={item.prodId} className=' h-fit'>
										<td>{tipoTrs === 6 ? `$ ${Number(item.prodNom).toLocaleString('es-CO')}` : item.prodNom}</td>
										<td>{item.cantidad}</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot>
							<tr>
								<th></th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</div>
				<div>
					{tipoTrs === 6 && (
						<>
							<label htmlFor='usuNoDoc' className='form-label'>
								Numero de documento
							</label>
							<input type='text' id='usuNoDoc' ref={usuNoDocRef} className='input' />
						</>
					)}

					<Button onClick={() => transactionHandler()} twStyles={'my-2 self-end'}>
						Completar
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Operaciones;
