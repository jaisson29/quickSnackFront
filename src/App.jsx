import Login from './pages/login/Login.jsx'
import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/inicio/Inicio.jsx'
import Registro from './pages/registro/Registro.jsx'
import Menu from './pages/menu/Menu.jsx'
import { AuthProvider } from './components/Auth/Autenticacion.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <ProtectedRoute component={Registro} path="/register" />
          {/* <ProtectedRoute path="/menu" element={<Menu />} /> */}
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
