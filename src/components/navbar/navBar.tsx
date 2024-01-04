/** @format */

import { useEffect, useState } from 'react';
import './navBar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logoQSW.svg';
import { useAuth } from '../Auth/Autenticacion';
import Cargando from '../cargando/Cargando';

function NavBar() {
	const [paginas, setPaginas] = useState([]);
	const { logout, urlApi, user, instance }: any = useAuth();

	useEffect(() => {
		instance
			.get(`${urlApi}/api/pagina/getAll/${user.perfilId}`)
			.then((respuesta: any) => {
				if (respuesta.data.length !== 0) {
					setPaginas(respuesta.data);
				}
			})
			.catch((error: any) => {
				console.log(error);
				setPaginas([]);
			});
	}, [urlApi]);

	const location = useLocation();

	return (
		<aside className='aside'>
			<nav>
				<div className='p-2' id='logoNav'>
					<img className='w-auto h-auto row-span-1 mx-auto mt-2 max-h-24' src={Logo} alt='' />
				</div>
				<ul className='md:mb-2 md:ml-1 listNav'>
					{paginas.length !== 0 ? (
						paginas.map((pg: any) => {
							const { paginaId, paginaNom, paginaRuta, paginaIcon } = pg;
							const { perfilId } = user;
							if (perfilId === pg.perfilId) {
								return (
									<li id={paginaId} key={paginaId} className={`font-bold menuItem ${location.pathname === paginaRuta ? 'acti' : ''}`}>
										<Link className='flex flex-col-reverse items-center justify-center w-full h-full gap-2 md:flex-row' to={paginaRuta}>
											<span className='md:hidden text-ellipsis'>{paginaNom}</span>
											<i className={`fa ${paginaIcon} fa-xl `}></i>
										</Link>
									</li>
								);
							}
							return <></>;
						})
					) : (
						<Cargando />
					)}
					{/* <li key={0} className='mt-10 menuItem' onClick={logout}>
						<div>
							<i className='fa fa-power-off fa-lg menuItem'></i>
							<span className='hidden'>Salir</span>
						</div>
					</li> */}
				</ul>
			</nav>
		</aside>
	);
}

export default NavBar;

