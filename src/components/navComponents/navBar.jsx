import React from "react";
import '../../css/navBar.css'

const NavBar = () => {
  return (
    <nav>
      <h1 className="text-red">Navbar</h1>

      <ul className="list-none">
        <li>Inicio</li>
        <li>Productos</li>
        <li>Monedero</li>
      </ul>
    </nav>
  )
}

export default NavBar