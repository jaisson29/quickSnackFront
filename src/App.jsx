import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
// import Inicio from './pages/inicio/Inicio.jsx';
import Registro from './pages/registro/Registro.jsx';
import PageNotFound from './components/PageNotFound/404.jsx';
import Home from './pages/home/Home.jsx';
import Menu from './pages/menu/Menu.jsx';
import { AuthProvider } from './components/Auth/Autenticacion.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index exact path='/' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/home' element={<ProtectedRoute children={<Home />} />} />
        <Route path='/menu' element={<ProtectedRoute children={<Menu />} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
