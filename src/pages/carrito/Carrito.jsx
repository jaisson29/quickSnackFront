/** @format */

import { useAuth } from '../../components/Auth/Autenticacion';

const Carrito = () => {
	const { state, urlApi } = useAuth();
	return (
		<section className='grid w-full h-40 grid-cols-5 mx-auto divide-y-4 md:w-4/5 bg-opacity-40 dark:bg-opacity-100 lg:divide-y-0 divide-clNeg bg-clNegL rounded-xl'>
			<div className='col-span-full lg:col-span-4'>
				{state.cart.cartItems.map((item) => {
					if (item) {
						return (
							<div className='flex justify-'>
								<img src={`${urlApi}/uploads/${item.prodImg}`} className='w-20' alt={item.prodImg} />
								<div>
									<p>{item.prodNom}</p>
									<p>{item.prodDescr}</p>
								</div>
								<div>
									<p>${item.prodValVen}</p>
								</div>
								<span>{item.cantidad}</span>
							</div>
						);
					}
				})}
			</div>
			<div className='h-full col-span-full lg:col-span-1'>d</div>
		</section>
	);
};

export default Carrito;
