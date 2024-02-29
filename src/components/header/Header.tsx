/** @format */

import { useAuth } from '../../contexts/Auth/Autenticacion';
import './header.css';
import male from '../../assets/icon-male-100.png';
import female from '../../assets/icon-female-100.png';
import Monto from '../monto/Monto';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
	const { user, state, logout, urlApi }: any = useAuth();
	let cartItems = state.cart.cartItems;

	const { usuNom, perfilNom } = user;

	const usuImg = user.usuImg ? `${urlApi}/uploads/${user.usuImg}` : user.usuGen === 1 ? male : female;

	return (
		<header className='flex items-center justify-end float-right h-16 gap-3 pl-3 pr-3 my-2 text-right rounded-l-full shadow-md w-fit'>
			<Dropdown className='w-10 '>
				<Dropdown.Toggle size='lg' className='p-0 text-black bg-transparent border-0 after:m-0 after:hidden' id='dropdown-basic'>
					<img src={usuImg} alt={usuNom} className='object-contain rounded-full w-14 h-14' />
				</Dropdown.Toggle>

				<Dropdown.Menu className='w-52'>
					<Dropdown.Item>
						<strong className='divide-y divide-clNeg'>
							<p className='w-32 text-xl truncate'>{usuNom}</p>
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
			<section className=''>
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
			<section className='flex items-center hidden gap-2 md:block'>
				<div>
					<p>Hola.</p>
					<p className='w-20 font-bold truncate'>{usuNom}</p>
				</div>
				<span onClick={() => {}}></span>
			</section>
		</header>
	);
};

export default Header;

