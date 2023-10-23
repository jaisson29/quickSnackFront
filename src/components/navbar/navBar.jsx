/** @format */

import { useEffect, useState } from 'react'
import './navBar.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../assets/logoQS.svg'
import { useAuth } from '../Auth/Autenticacion'
import Cargando from '../cargando/Cargando'

function NavBar() {
	const [paginas, setPaginas] = useState([])
	const { logout, urlApi, user } = useAuth()

	useEffect(() => {
		axios
			.get(`${urlApi}/api/pagina/getAll/${user.perfilId}`)
			.then((respuesta) => {
				if (respuesta.data.length !== 0) {
					setPaginas(respuesta.data)
				}
			})
			.catch((error) => {
				console.log(error)
				setPaginas([])
			})
	}, [urlApi])

	const location = useLocation()

	return (
		<aside className='fixed left-0 z-10 h-full p-1 transition-all transit w-4/24 sm:w-2/24 sm:hover:w-3/24 lg:w-1/24 md:hover:w-4/24 lg:hover:w-3/24'>
			<nav className='grid w-full h-full grid-cols-1 grid-rows-6 bg-opacity-100 rounded-lg rtl bg-clRoj'>
				<img className='w-auto h-auto row-span-1 mx-auto mt-2 max-h-24' src={Logo} alt='' />
				<ul className='h-full row-span-4 py-4 overflow-x-hidden overflow-y-auto text-sm list-none rtl:mr-2'>
					{paginas.length !== 0 ? (
						paginas.map((pg) => {
							const { paginaId, paginaNom, paginaRuta, paginaIcon } = pg
							const { perfilId } = user
							if (perfilId === pg.perfilId) {
								return (
									<li id={paginaId} key={paginaId} className={`font-bold menuItem ${location.pathname === paginaRuta ? 'acti' : ''}`}>
										<Link className='flex items-center justify-center w-full h-full gap-2' to={paginaRuta}>
											<span className='hidden text-ellipsis'>{paginaNom}</span>
											<i className={`fa ${paginaIcon} fa-xl `}></i>
										</Link>
									</li>
								)
							}
						})
					) : (
						<Cargando />
					)}
					<li key={0} className='mt-10 menuItem' onClick={logout}>
						<div>
							<i className='fa fa-power-off fa-lg menuItem'></i>
							<span className='hidden'>Salir</span>
						</div>
					</li>
				</ul>
			</nav>
		</aside>
	)
}

export default NavBar

// {
//   paginas.length > 0
//     ? paginas.map((pg) => {
//         return (
//           <li
//             id={pg.paginaId}
//             key={pg.paginaId}
//             className={`font-bold ${
//               location.pathname === pg.paginaRuta ? 'acti' : ''
//             }`}
//           >
//             <Link
//               className='flex items-center justify-center w-full h-full gap-2'
//               to={pg.paginaRuta}
//             >
//               <i className={`fa ${pg.paginaIcon} fa-xl `}></i>
//               <span className='hidden text-ellipsis'>{pg.paginaNom}</span>
//             </Link>
//           </li>
//         );
//       })
//     : null;
// }
