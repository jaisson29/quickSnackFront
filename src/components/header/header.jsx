/** @format */

import { useAuth } from '../Auth/Autenticacion'
import './header.css'
import male from '../../assets/icon-male-100.png'
import female from '../../assets/icon-female-100.png'
import Monto from '../monto/Monto'
import { Link } from 'react-router-dom'

const Header = () => {
	const { user, state } = useAuth()
	let cartItems = state.cart.cartItems

	const { usuNom, perfilNom, usuGen } = user

	return (
		<header className='flex items-center justify-end w-full text-right'>
			{user.perfilId === 2 && (
				<Link to='/carrito' className='relative'>
					<i className='fa fa-cart-shopping fa-2xl'></i>
					{cartItems.length > 0 && (
						<span className='absolute flex items-center justify-center w-5 h-5 font-bold text-center text-white bg-red-500 rounded-full ring-2 ring-offset-1 ring-red-500 -right-2 -top-2'>
							{cartItems.length}
						</span>
					)}
				</Link>
			)}
			<section className='grid mx-5 place-content-center'>
				<Monto />
			</section>
			<section className='flex items-center gap-4'>
				<div>
					<p>{usuNom}</p>
					<p>{perfilNom}</p>
				</div>
				<img src={usuGen === 1 ? male : female} alt='../../assets/logoQS.svg' className='w-10 h-10 rounded-full' />
				<i className='fa fa-caret-down'></i>
			</section>
		</header>
	)
}

export default Header
