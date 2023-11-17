/** @format */

import { useRef } from 'react';
import { useAuth } from '../Auth/Autenticacion';
import Button from '../boton/Button';

const Tarjeta = ({ prod, id, nom, descr, cat, img, precio }) => {
	const { urlApi, dispatch } = useAuth();
	const cantRef = useRef();
	return (
		<li className='w-full rounded-lg bg-slate-200' key={id}>
			<div className='flex items-center justify-center w-full rounded-lg'>
				<img className='object-contain h-52 w-52' src={`${urlApi}/uploads/${img}`} alt={nom} />
			</div>
			<p>{nom}</p>
			<p>{descr}</p>
			<p>{cat}</p>
			<p>{precio}</p>
			<form
				className={'flex'}
				onSubmit={async (event) => {
					event.preventDefault();
					const cant = Number(event.target.cant.value);
					dispatch({ type: 'CART_ADD_ITEM', payload: { cantidad: cant, ...prod } });
					cantRef.current.value = 1;
				}}>
				<span>
					<i onClick={() => cantRef.current.value--} className='fa fa-minus-circle'></i>
				</span>
				<input
					type='number'
					className='w-10 text-center'
					id='cant'
					name='cant'
					min={1}
					defaultValue={1}
					ref={cantRef}
					inputMode='numeric'
				/>
				<i onClick={() => cantRef.current.value++} className='fa fa-plus-circle'></i>
				<span></span>
				<Button extraClass={'px-0 py-0'}>
					<input className='w-full h-full' type='submit' value='Agregar' />
				</Button>
			</form>
		</li>
	);
};
export default Tarjeta;
