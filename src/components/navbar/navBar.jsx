import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react'
import './navBar.css'
import { Link, useLocation } from 'react-router-dom'

function NavBar({ page }) {
  const location = useLocation()

  return (
    <aside className="fixed w-2/12 h-full p-1 sm:w-1/12">
      <nav className="w-full h-full rounded-lg bg-clRos">
        <h1 className="block w-full text-2xl h-1/12">{page}</h1>

        <ul className="list-non h-10/12">
          <li className={`${location.pathname === '/home' ? 'acti' : ''}`}>
            <Link to="/home">
              <FontAwesomeIcon icon={icon({ name: 'house' })} size="lg" />
            </Link>
          </li>
          <li
            className={`button ${location.pathname === '/login' ? 'acti' : ''}`}
          >
            <Link to="/login">
              <FontAwesomeIcon icon={icon({ name: 'check' })} size="lg" />
            </Link>
          </li>
          <li
            className={`button ${location.pathname === '/menu' ? 'acti' : ''}`}
          >
            <Link to="/menu">
              <FontAwesomeIcon icon={icon({ name: 'bars' })} size="lg" />
            </Link>
          </li>
        </ul>
        <button type="button" title="Salir" className="h-1/12"></button>
      </nav>
    </aside>
  )
}

export default NavBar
