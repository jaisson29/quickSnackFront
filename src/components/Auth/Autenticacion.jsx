import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [isAuth, setIsAuth] = useState(false);
  const urlApi = 'http://localhost:5000';

  const login = async (token) => {
    setAuthToken(token);
    axios
      .get(`${urlApi}/api/login/verify`, {
        headers: {
          //Inicializa el header la el http
          Authorization: `Bearer ${token}`, // Agrega el token al encabezado "Authorization"
        },
      })
      .then((respuesta) => {
        const decodedToken = respuesta.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(decodedToken.payload[0]));
        setAuthToken(sessionStorage.getItem('token'));
        setUser(JSON.parse(sessionStorage.getItem('user')));
        setIsAuth(true);
      })
      .catch((error) => {
        console.error('Error verificando el token', error);
      });
  };

  const logout = () => {
    sessionStorage.clear();
    setAuthToken(null);
    setUser(null);
    setIsAuth(false);
  };

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`${urlApi}/api/login/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const decodedToken = response.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(decodedToken.payload[0]));
      setAuthToken(sessionStorage.getItem('token'));
      setUser(JSON.parse(sessionStorage.getItem('user')));
      setIsAuth(true);
    } catch (error) {
      console.error('Error verificando el token', error);
      logout();
    }
  };

  useEffect(() => {
    // Verificar el token solo si hay un token almacenado en sessionStorage.
    if (authToken) {
      verifyToken(authToken);
    }
  }, [authToken]);

  useEffect(() => {
    authToken && user ? setIsAuth(true) : logout();
  }, [authToken, user]);
  return (
    <AuthContext.Provider
      value={{
        authToken,
        user,
        isAuth,
        login,
        logout,
        urlApi,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
