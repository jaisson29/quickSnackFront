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
    <aside className='inline-block w-2/12 h-full p-1 transition-all sm:w-1/12 md:hover:w-2/12'>
      <nav className='grid w-full h-full grid-rows-6 bg-opacity-100 rounded-lg bg-clRos'>
        <img
          className='w-auto h-auto row-span-1 mx-auto max-h-24'
          src={Logo}
          alt=''
        />
        <ul className='row-span-4 overflow-y-auto list-none h-10/12'>
          {paginas.map((pg) => {
            return (
              <li
                key={pg.paginaId}
                className={` ${
                  location.pathname === pg.paginaRuta ? 'acti' : ''
                }`}
              >
                <Link
                  className='flex items-center justify-center w-full h-full gap-2'
                  to={pg.paginaRuta}
                >
                  <i className={`fa ${pg.paginaIcon} fa-lg`}></i>
                  <span className='hidden'>{pg.paginaNom}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className='grid row-span-1 place-content-center'>
          <Button onClick={logout}>
            <i className='fa fa-power-off'></i>
          </Button>
        </div>
      </nav>
    </aside>
  );
}

export default NavBar;
