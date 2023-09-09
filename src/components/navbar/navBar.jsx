import { useEffect, useState } from 'react';
import './navBar.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/logoQS.svg';
import { useAuth } from '../Auth/Autenticacion';
import Error from '../error/Error';

function NavBar() {
  const [paginas, setPaginas] = useState([]);
  const { logout, urlApi } = useAuth();

  useEffect(() => {
    axios
      .get(`${urlApi}/api/pagina/getAll`)
      .then((respuesta) => {
        setPaginas(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
        setPaginas([]);
      });
  }, [urlApi]);

  const location = useLocation();

  return (
    <aside className='fixed left-0 z-10 h-full p-1 transition-all w-3/24 sm:w-2/24 sm:hover:w-5/24 lg:w-1/24 md:hover:w-3/24 lg:hover:w-2/24'>
      <nav className='grid h-full grid-cols-1 grid-rows-6 bg-opacity-100 rounded-lg /w-full bg-clRoj'>
        <img
          className='w-auto h-auto row-span-1 mx-auto mt-2 max-h-24'
          src={Logo}
          alt=''
        />
        <ul className='h-full row-span-4 py-4 overflow-x-hidden overflow-y-auto text-sm list-none'>
          {paginas.length > 0
            ? paginas.map((pg) => {
                const { paginaId, paginaNom, paginaRuta, paginaIcon } = pg;
                return (
                  <li
                    id={paginaId}
                    key={paginaId}
                    className={`font-bold ${
                      location.pathname === paginaRuta ? 'acti' : ''
                    }`}
                  >
                    <Link
                      className='flex items-center justify-center w-full h-full gap-2'
                      to={paginaRuta}
                    >
                      <i className={`fa ${paginaIcon} fa-xl `}></i>
                      <span className='hidden text-ellipsis'>{paginaNom}</span>
                    </Link>
                  </li>
                );
              })
            : '<Error />'}
          <li key={99} onClick={logout}>
            <i className='fa fa-power-off fa-lg'></i>
            <span className='hidden ml-2'>Salir</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default NavBar;

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
