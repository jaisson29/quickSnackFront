import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import Inicio from './pages/inicio/Inicio.jsx'
import Registro from './pages/registro/Registro.jsx'
import PageNotFound from './components/PageNotFound/404.jsx'
import Menu from './pages/menu/Menu.jsx'
import { AuthProvider } from './components/Auth/Autenticacion.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" exact element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<ProtectedRoute component={<Menu />} />} />
        <Route path="/registro" component={<Registro />} />
        <Route path="*" element={<PageNotFound />} />
        <Route>
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
