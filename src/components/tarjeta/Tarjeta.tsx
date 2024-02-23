/** @format */

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';

const Tarjeta = ({ prod }: any) => {
	const { urlApi, dispatch, state }: any = useAuth();

	const [registered, setRegistered] = useState<boolean>(false);

	const addItemHandler = () => {
		dispatch({ type: 'CART_ADD_ITEM', payload: { cantidad: 1, ...prod } });
	};

	useEffect(() => {
		const cartItemsIds = state?.cart?.cartItems?.map((item: any) => item.prodId);
		setRegistered(cartItemsIds.includes(prod.prodId));
	}, [prod.prodId, registered, state?.cart?.cartItems]);

	const { prodId, prodNom, prodDescr, catNom, prodImg, prodValVen } = prod;
	
	return (
		<li className='w-full rounded-b-lg shadow-md shadow-black/40 border-slate-300 border-1' key={prodId}>
			<div className='relative flex items-center justify-center w-full rounded-lg'>
				<img className='object-cover w-full h-60' src={`${urlApi}/uploads/${prodImg}`} alt={prodNom} />
				{registered ? (
					<span className='absolute grid text-green-600 border-green-600 rounded-full w-7 h-7 border-3 place-content-center top-3 right-3'>
						<i className='fa fa-check fill-green-500'></i>
					</span>
				) : (
					<button
						title='Agregar al carrito'
						onClick={addItemHandler}
						className='absolute grid border-2 border-black rounded-full w-7 h-7 place-content-center top-3 right-3'>
						<i className='fa fa-plus'></i>
					</button>
				)}
			</div>
			<div className='p-3'>
				<div className='flex items-center justify-between'>
					<h3 className='text-xl font-bold'>{prodNom}</h3>
					<span className='font-bold text-black'>${Number(prodValVen).toLocaleString('es-CO')}</span>
				</div>
				<div>
					<span className='text-sm font-medium text-black/50'>{catNom}</span>
					<p className='text-sm font-medium text-black/40'>{prodDescr}</p>
				</div>
			</div>
			{/* <div className='flex'>
					<span>
						<button title='Quitar' onClick={() => setCantidad(cantidad === 1 ? cantidad : cantidad - 1)}>
							<i className='fa fa-minus-circle'></i>
						</button>
					</span>
					<span>{cantidad}</span>
					<span>
						<button title='Añadir' onClick={() => setCantidad(cantidad + 1)}>
							<i className='fa fa-plus-circle'></i>
						</button>
					</span>
				</div>
				<div>
					<input type='hidden' name='cant' value={cantidad} />

					<Button twStyles={'px-0 py-0 mx-0'}>
						<input className='w-full h-full' type='submit' value='Agregar' />
					</Button>
				</div> */}
		</li>
	);
};
export default Tarjeta;
