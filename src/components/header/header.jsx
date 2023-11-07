/** @format */

import { useAuth } from '../Auth/Autenticacion'
import './header.css'
import male from '../../assets/icon-male-100.png'
import female from '../../assets/icon-female-100.png'
import Monto from '../monto/Monto'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'

const Header = () => {
	const { user, state, logout } = useAuth()
	let cartItems = state.cart.cartItems

	const { usuNom, perfilNom, usuGen, usuEmail } = user

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
			<section className='mx-2'>
				<Monto />
			</section>
			<section className='flex items-center gap-4'>
				<div>
					<p>{usuNom}</p>
					<p>{perfilNom}</p>
				</div>
				<img src={usuGen === 1 ? male : female} alt='../../assets/logoQS.svg' className='w-10 h-10 rounded-full' />
				<Dropdown>
					<Dropdown.Toggle  size="lg" className='text-black bg-transparent' id='dropdown-basic'>
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href='#'>{usuNom}</Dropdown.Item>
						<Dropdown.Item href='#'>{usuEmail}</Dropdown.Item>
						<Dropdown.Item onClick={() => logout()}><i className='pr-2 fa fa-power-off fa-lg'></i>Cerrar sesión</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<span onClick={() => {}}></span>
			</section>
		</header>
	)
}

export default Header
