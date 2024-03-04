import { useAuth } from '../../contexts/Auth/Autenticacion';
import React, { useEffect, useState } from 'react';

const CarritoItem = ({ item }: any) => {
	const { urlApi, dispatch, instance, state }: any = useAuth();
	const [prodImg, setProdImg] = useState<string>('default-img.webp');

	useEffect(() => {
		const verifyImg = async () => {
			try {
				const response = await instance.get(`${urlApi}/uploads/${item.prodImg}`);
				response.data && setProdImg(item.prodImg);
			} catch (error) {
				setProdImg('default-img.webp');
			}
		};
		verifyImg();
	}, [instance, item.prodImg, urlApi]);
	return (
		<div key={item.prodNom} className='flex flex-col md:flex-row'>
			<div className='flex items-center w-full md:justify-between md:w-5/6'>
				<img
					src={`${urlApi}/uploads/${prodImg}`}
					className='hidden object-contain w-20 sm:block rounded-2xl'
					alt={`${urlApi}/uploads/defautl.webp`}
				/>
				<div className='w-24 truncate'>
					<p className='text-lg font-medium capitalize truncate'>{item.prodNom}</p>
					<p className='text-sm truncate'>{item.prodDescr}</p>
				</div>
				<div className='flex flex-col justify-center w-16'>
					<span className='w-full text-xs font-semibold text-center text-black/50'>Cantidad</span>
					<input
						type='number'
						defaultValue={1}
						min={1}
						minLength={1}
						required
						onChange={(e) => {
							dispatch({
								type: 'CART_ADD_ITEM',
								payload: { ...item, cantidad: parseInt(e?.currentTarget?.value ? e.currentTarget.value : '1') },
							});
						}}
						className='w-12 h-12 m-auto text-center border-2 rounded-lg border-black/20'
						name='cantidad'
						title='cantidad'
						id='cantidad'
					/>
				</div>
				<div className='w-20 text-center'>
					<span>Precio</span>
					<p>$ {item.prodValVen.toLocaleString('es-CO')}</p>
				</div>
			</div>
			<div className='flex items-center justify-center w-full md:w-1/6'>
				<button
					className='w-3/6 my-2 text-white border-2 rounded-full md:w-8 md:h-8 ring-2 ring-offset ring-red-500 bg-red-500/80'
					title='Quitar'
					onClick={() => dispatch({ type: 'CART_DEL_ITEM', payload: item })}>
					<span className='px-1 font-semibold md:hidden'>Quitar</span>
					<i className='fa fa-x'></i>
				</button>
			</div>
		</div>
	);
};

export { CarritoItem };
