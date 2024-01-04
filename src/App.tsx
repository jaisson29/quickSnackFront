/** @format */

import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './components/Auth/Autenticacion';
import Login from './pages/login/Login';
import Registro from './pages/registro/Registro';
import PageNotFound from './pages/PageNotFound/404';
import Home from './pages/home/Home';
import Menu from './pages/menu/Menu';
import Transaccion from './pages/transaccion/Transaccion';
import Productos from './pages/productos/Productos';
import Categoria from './pages/categoria/Categoria';
import Compra from './pages/compra/Compra';
import Pagina from './pages/pagina/pagina';
import Perfil from './pages/perfil/perfil';
import Usuario from './pages/usuario/Usuario';
import Olvid from './pages/olvido/Olvid';
import Reset from './pages/restablecer/Restablecer';
import Carrito from './pages/carrito/Carrito';

function App() {


	return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/registro' element={<Registro />} />
				<Route path='/home' element={<ProtectedRoute children={<Home />} />} />
				<Route path='/menu' element={<ProtectedRoute children={<Menu />} />} />
				<Route path='/productos' element={<ProtectedRoute children={<Productos />} />} />
				<Route path='/transaccion' element={<ProtectedRoute children={<Transaccion />} />} />
				<Route path='/usuarios' element={<ProtectedRoute children={<Usuario />} />} />
				<Route path='/categorias' element={<ProtectedRoute children={<Categoria />} />} />
				<Route path='/paginas' element={<ProtectedRoute children={<Pagina />} />} />
				<Route path='/perfil' element={<ProtectedRoute children={<Perfil />} />} />
				<Route path='/compra' element={<ProtectedRoute children={<Compra />} />} />
				<Route path='/usuarios' element={<ProtectedRoute children={<Usuario />} />} />
				<Route path='/carrito' element={<ProtectedRoute children={<Carrito />} />} />
				<Route path='/olvid' element={<Olvid />} />
				<Route path='/reset/:token' element={<Reset />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
