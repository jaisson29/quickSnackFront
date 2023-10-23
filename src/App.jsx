/** @format */

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login.jsx'
// import Inicio from './pages/inicio/Inicio.jsx';
import Registro from './pages/registro/Registro.jsx'
import PageNotFound from './pages/PageNotFound/404.jsx'
import Home from './pages/home/Home.jsx'
import Menu from './pages/menu/Menu.jsx'
import Transaccion from './pages/transaccion/Transaccion.jsx'
import { AuthProvider } from './components/Auth/Autenticacion.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import Productos from './pages/productos/Productos.jsx'
import Categoria from './pages/categoria/Categoria.jsx'
import Compra from './pages/compra/Compra.jsx'
import Usuarios from './pages/usuario/Usuario.jsx'

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route index exact path='/' element={<Login />} />
				<Route exact path='/registro' element={<Registro />} />
				<Route exact path='/home' element={<ProtectedRoute children={<Home />} />} />
				<Route path='/menu' element={<ProtectedRoute children={<Menu />} />} />
				<Route path='/productos' element={<ProtectedRoute children={<Productos />} />} />
				<Route path='/compra' element={<ProtectedRoute children={<Compra />} />} />
				<Route path='/historial' element={<ProtectedRoute children={<Historial />} />} />
				<Route path='*' element={<PageNotFound />} />
				<Route path='/categorias' element={<ProtectedRoute children={<Categoria />} />} />
				<Route path='/usuarios' element={<ProtectedRoute children={<Usuarios />} />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</AuthProvider>
	)
}

export default App
