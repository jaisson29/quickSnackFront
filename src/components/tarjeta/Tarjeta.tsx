/** @format */

import {  useState } from 'react';
import { useAuth } from '../Auth/Autenticacion';
import Button from '../boton/Button';

const Tarjeta = ({ prod, id, nom, descr, cat, img, precio }: any) => {
	const { urlApi, dispatch }: any = useAuth();
	const [cantidad, setCantidad] = useState(1);
	return (
		<li className='w-full rounded-lg bg-slate-200' key={id}>
			<div className='flex items-center justify-center w-full rounded-lg'>
				<img className='object-contain h-52 w-52' src={`${urlApi}/uploads/${img}`} alt={nom} />
			</div>
			<h3 className='font-bold'>{nom}</h3>
			<h5>{descr}</h5>
			<p>{cat}</p>
			<span>{precio}</span>
			<form
				className={'flex'}
				onSubmit={async (event: any) => {
					event.preventDefault();
					const cant = Number(event.target.cant.value);
					dispatch({ type: 'CART_ADD_ITEM', payload: { cantidad: cant, ...prod } });
					setCantidad(1);
				}}>
				<span>
					<i onClick={() => setCantidad(cantidad === 1 ? cantidad : cantidad - 1)} className='fa fa-minus-circle'></i>
				</span>
				<span>{cantidad}</span>
				<span>
					<i onClick={() => setCantidad(cantidad + 1)} className='fa fa-plus-circle'></i>
				</span>

				<input type='hidden' name='cant' value={cantidad} />

				<Button twStyles={'px-0 py-0'}>
					<input className='w-full h-full' type='submit' value='Agregar' />
				</Button>
			</form>
		</li>
	);
};
export default Tarjeta;
