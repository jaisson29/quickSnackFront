import React, { useEffect, useState } from 'react';
import './navBar.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/logoQS.svg';
import { useAuth } from '../Auth/Autenticacion';

function NavBar({ page }) {
  const [paginas, setPaginas] = useState([]);
  const { logout, urlApi } = useAuth();

  useEffect(() => {
    const fetchPaginas = async () => {
      try {
        const response = await axios.get(`${urlApi}/api/pagina/getAll`);
        setPaginas(response.data);
      } catch (error) {
        console.log(error);
        setPaginas([]);
      }
    };
    fetchPaginas();
  }, []);

  const location = useLocation();

  return (
    <aside className='fixed left-0 h-full p-1 transition-all w-3/24 sm:w-2/24 sm:hover:w-5/24 lg:w-1/24 md:hover:w-3/24'>
      <nav className='grid h-full grid-cols-1 grid-rows-6 bg-opacity-100 rounded-lg /w-full bg-clRos'>
        <img
          className='w-auto h-auto row-span-1 mx-auto mt-2 max-h-24'
          src={Logo}
          alt=''
        />
        <ul className='h-full row-span-4 py-4 overflow-x-hidden overflow-y-auto text-sm list-none'>
          {paginas.map((pg) => {
            return (
              <li
                key={pg.paginaId}
                className={`font-bold ${
                  location.pathname === pg.paginaRuta ? 'acti' : ''
                }`}
              >
                <Link
                  className='flex items-center justify-center w-full h-full gap-2 px-3'
                  to={pg.paginaRuta}
                >
                  <i className={`fa ${pg.paginaIcon} fa-xl `}></i>
                  <span className='hidden text-ellipsis'>{pg.paginaNom}</span>
                </Link>
              </li>
            );
          })}
          <li onClick={logout}>
            <i className='fa fa-power-off fa-lg'></i>
            <span className='hidden ml-2'>Salir</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default NavBar;
