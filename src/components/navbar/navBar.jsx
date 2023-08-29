import React, { useEffect, useState } from 'react';
import './navBar.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/QSLogo.webp';
import Button from '../boton/Button';
import { useAuth } from '../Auth/Autenticacion';

function NavBar({ page }) {
  const [paginas, setPaginas] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchPaginas = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/pagina/getAll'
        );
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
    <aside className='w-3/12 h-full p-1 transition-all sm:w-1/12 md:hover:w-2/12'>
      <nav className='grid /w-full h-full grid-cols-1 grid-rows-6 bg-opacity-100 rounded-lg bg-clRos'>
        <img
          className='w-auto h-auto row-span-1 mx-auto max-h-24 mt-2'
          src={Logo}
          alt=''
        />
        <ul className='row-span-4 overflow-y-auto list-none h-full text-xs py-4'>
          {paginas.map((pg) => {
            return (
              <li
                key={pg.paginaId}
                className={` ${
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
          <li>
            <Button onClick={logout}>
              <i className='fa fa-power-off fa-xl'></i>
              <span className='hidden  ml-2 float-right'>Salir</span>
            </Button>
          </li>
        </ul>
        {/* <div className='grid row-span-1 place-content-center text-xs'>
          <Button onClick={logout}>
            <i className='fa fa-power-off'></i>
          </Button>
        </div> */}
      </nav>
    </aside>
  );
}

export default NavBar;
