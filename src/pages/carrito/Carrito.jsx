/** @format */

import { useAuth } from '../../components/Auth/Autenticacion';

const Carrito = () => {
	const { state, urlApi } = useAuth();
	return (
		<section className='w-full h-40 p-2 mx-auto divide-y-2 shadow-md divide-clNegL bg-clBlan md:p-5 md:w-4/5 rounded-xl'>
			{state.cart.cartItems.map((item) => {
				if (item) {
					return (
						<div key={item.prodNom} className='flex'>
							<img src={`${urlApi}/uploads/${item.prodImg}`} className='object-contain w-20' alt={`${urlApi}/uploads/defautl.webp`} />
							<div className='flex-grow'>
								<p>{item.prodNom}</p>
								<p>{item.prodDescr}</p>
								<p>{item.prodImg}</p>
							</div>
							<div>
								<p>${item.prodValVen}</p>
							</div>
							<span>{item.cantidad}</span>
						</div>
					);
				}
			})}
		</section>
	);
};

export default Carrito;
