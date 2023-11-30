import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
// import Inicio from './pages/inicio/Inicio.jsx';
import Registro from './pages/registro/Registro.jsx';
import PageNotFound from './pages/PageNotFound/404.jsx';
import Home from './pages/home/Home.jsx';
import Menu from './pages/menu/Menu.jsx';
import Transaccion from './pages/transaccion/Transaccion.jsx';
import { AuthProvider } from './components/Auth/Autenticacion.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import Productos from './pages/productos/Productos.jsx';
import Categoria from './pages/categoria/Categoria.jsx';
import Compra from './pages/compra/Compra.jsx';
import Pagina from './pages/pagina/pagina.jsx';
import Perfil from './pages/perfil/perfil.jsx';
import Carrito from './pages/carrito/Carrito.jsx';
import Usuario from './pages/usuario/Usuario.jsx';
import Olvid from './pages/olvido/Olvid.jsx';
import Reset from './pages/restablecer/Restablecer.jsx';

import { createTheme } from 'react-data-table-component';

function App() {
	createTheme('claro', {
		text: {
			primary: '#268bd2',
			secondary: '#2aa198',
		},
		background: {
			default: '#3D3B3B',
		},
		context: {
			background: '#cb4b16',
			text: '#FFFFFF',
		},
		divider: {
			default: '#073642',
		},
		action: {
			button: 'rgba(0,0,0,.54)',
			hover: 'rgba(0,0,0,.08)',
			disabled: 'rgba(0,0,0,.12)',
		},
	});

	createTheme('oscuro', {
		text: {
			primary: '#268bd2',
			secondary: '#2aa198',
		},
		background: {
			default: '#3D3B3B',
		},
		context: {
			background: '#cb4b16',
			text: '#FFFFFF',
		},
		divider: {
			default: '#073642',
		},
		action: {
			button: 'rgba(0,0,0,.54)',
			hover: 'rgba(0,0,0,.08)',
			disabled: 'rgba(0,0,0,.12)',
		},
	});

	return (
		<AuthProvider>
			<Routes>
				<Route index exact path='/' element={<Login />} />
				<Route exact path='/registro' element={<Registro />} />
				<Route exact path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
				<Route path='/menu' element={<ProtectedRoute> <Menu /> </ProtectedRoute>} />
				<Route path='/productos' element={<ProtectedRoute> <Productos /> </ProtectedRoute>} />
				<Route path='/transaccion' element={<ProtectedRoute> <Transaccion /> </ProtectedRoute>} />
				<Route path='/usuarios' element={<ProtectedRoute> <Usuario /> </ProtectedRoute>} />
				<Route path='/categorias' element={<ProtectedRoute> <Categoria /> </ProtectedRoute>} />
				<Route path='/paginas' element={<ProtectedRoute> <Pagina /> </ProtectedRoute>} />
				<Route path='/perfil' element={<ProtectedRoute> <Perfil /> </ProtectedRoute>} />
				<Route path='/compra' element={<ProtectedRoute> <Compra /> </ProtectedRoute>} />
				<Route path='/usuarios' element={<ProtectedRoute> <Usuario /> </ProtectedRoute>} />
				<Route path='/carrito' element={<ProtectedRoute> <Carrito /> </ProtectedRoute>} />
				<Route exact path='/olvid' element={<Olvid />} />
				<Route path='/reset/:token' element={<Reset />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
