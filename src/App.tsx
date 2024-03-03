/** @format */

import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/Auth/Autenticacion';
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
import { UsuarioInfo } from './pages/usuarioInfo/UsuarioInfo'
import { Valor } from './pages/valor/valor';
import { Dominio } from './pages/dominio/dominio';
import { Proveedor } from './pages/proveedor/Proveedor';

function App() {

	return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/registro' element={<Registro />} />
				<Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
				<Route path='/menu' element={<ProtectedRoute><Menu /></ProtectedRoute>} />
				<Route path='/productos' element={<ProtectedRoute><Productos /></ProtectedRoute>} />
				<Route path='/transaccion' element={<ProtectedRoute><Transaccion /></ProtectedRoute>} />
				<Route path='/usuarios' element={<ProtectedRoute><Usuario /></ProtectedRoute>} />
				<Route path='/categorias' element={<ProtectedRoute><Categoria /></ProtectedRoute>} />
				<Route path='/paginas' element={<ProtectedRoute><Pagina /></ProtectedRoute>} />
				<Route path='/perfil' element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
				<Route path='/compra' element={<ProtectedRoute><Compra /></ProtectedRoute>} />
				<Route path='/usuarios' element={<ProtectedRoute><Usuario /></ProtectedRoute>} />
				<Route path='/carrito' element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
				<Route path='/valor' element={<ProtectedRoute><Valor /></ProtectedRoute>} />
				<Route path='/dominio' element={<ProtectedRoute><Dominio /></ProtectedRoute>} />
				<Route path='/proveedor' element={<ProtectedRoute><Proveedor /></ProtectedRoute>} />
				<Route path='/personal' element={<ProtectedRoute><UsuarioInfo /></ProtectedRoute>} />
				<Route path='/olvid' element={<Olvid />} />
				<Route path='/reset/:token' element={<Reset />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;

