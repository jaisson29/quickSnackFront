import { useAuth } from '../../contexts/Auth/Autenticacion';
import React, { useEffect, useState } from 'react';

const CarritoItem = ({ item }: any) => {
	const { urlApi, dispatch, instance }: any = useAuth();
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
		<div key={item.prodNom} className='flex mx-5'>
			<img
				src={`${urlApi}/uploads/${prodImg}`}
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
};

export { CarritoItem };
