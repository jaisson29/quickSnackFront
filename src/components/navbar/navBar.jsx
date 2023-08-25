import React, { useEffect, useState } from 'react'
import './navBar.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

function NavBar({ page }) {
  const [paginas, setPaginas] = useState([])

  useEffect(() => {
    const fetchPaginas = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/pagina/getAll'
        )
        setPaginas(response.data)
      } catch (error) {
        console.log(error)
        setPaginas([])
      }
    }
    fetchPaginas()
  }, [])

  const location = useLocation()

  return (
    <aside className="inline-block w-2/12 h-full transition-all p-1 sm:w-1/12 md:hover:w-2/12">
      <nav className="w-full h-full rounded-lg bg-clRos">
        <h1 className="block w-full text-2xl h-1/12">{page}</h1>
        <ul className="list-none h-10/12">
          {paginas.map((pg) => {
            return (
              <li
                key={pg.paginaId}
                className={` ${
                  location.pathname === pg.paginaRuta ? 'acti' : ''
                }`}
              >
                <Link
                  className="flex items-center justify-center w-full h-full gap-2"
                  to={pg.paginaRuta}
                >
                  <i className={`fa ${pg.paginaIcon} fa-lg`}></i>
                  <span className="hidden">{pg.paginaNom}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        <button type="button" title="Salir" className="h-1/12"></button>
      </nav>
    </aside>
  )
}

export default NavBar
