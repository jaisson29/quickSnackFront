
import Login from './pages/login/Login.jsx'
import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/inicio/Inicio.jsx'
import Registro from './pages/registro/Registro.jsx'
import Menu from './pages/menu/Menu.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  )
}

export default App
