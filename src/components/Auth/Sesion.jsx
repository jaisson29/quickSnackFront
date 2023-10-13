const Sesion = () => {

  const login = async (token) => {
    setAuthToken(token)
    axios
      .get(`${urlApi}/api/login/verify`, {
        headers: {
          //Inicializa el header la el http
          Authorization: `Bearer ${token}`, // Agrega el token al encabezado "Authorization"
        },
      })
      .then((respuesta) => {
        const decodedToken = respuesta.data
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('user', JSON.stringify(decodedToken.payload[0]))
        setAuthToken(sessionStorage.getItem('token'))
        setUser(JSON.parse(sessionStorage.getItem('user')))
        setIsAuth(true)
      })
      .catch((error) => {
        console.error('Error verificando el token', error)
      })
  }

  const logout = () => {
    sessionStorage.clear()
    setAuthToken(null)
    setUser(null)
    setIsAuth(false)
  }
  return (
    <div>
      
    </div>
  );
};

export default Sesion;