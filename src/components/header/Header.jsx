/** @format */

import { useAuth } from '../Auth/Autenticacion';
import './header.css';
import male from '../../assets/icon-male-100.png';
import female from '../../assets/icon-female-100.png';
import Monto from '../monto/Monto';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
	const { user, state, logout } = useAuth();
	let cartItems = state.cart.cartItems;

	const { usuNom, perfilNom, usuGen } = user;

	return (
		<header className='flex items-center justify-end w-full gap-3 my-2 text-right'>
			<section className='mx-2'>
				<Monto />
			</section>
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
			<section className='flex items-center gap-2'>
				<div>
					<p>Hola.</p>
					<p className='w-20 font-bold truncate'>{usuNom}</p>
				</div>
				<Dropdown className='w-10 '>
					<Dropdown.Toggle size='lg' className='p-0 text-black bg-transparent border-0 after:m-0' id='dropdown-basic'>
						<img src={usuGen === 1 ? male : female} alt='user' className='object-contain w-10 h-10 rounded-full' />
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item>
							<strong className='divide-y divide-clNeg'>
								<p className='w-32 text-xl truncate'>{'jaissdasdadadssondel valbuenas'}</p>
								<p>{perfilNom}</p>
							</strong>
						</Dropdown.Item>
						<Dropdown.Item>
							<Link to={'/personal'}>Datos personales</Link>
						</Dropdown.Item>
						<Dropdown.Item onClick={() => logout()}>
							<i className='pr-2 fa fa-power-off fa-lg'></i>Cerrar sesión
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<span onClick={() => {}}></span>
			</section>
		</header>
	);
};

export default Header;
