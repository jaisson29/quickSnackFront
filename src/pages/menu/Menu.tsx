import { useEffect, useState } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import Cargando from '../../components/cargando/Cargando';
import Tarjeta from '../../components/tarjeta/Tarjeta';
import './menu.css';

function Menu() {
  const { urlApi, authToken, instance }: any = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setCargando(true);
    instance
      .get(`${urlApi}/api/producto/getAll`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((respuesta: any) => {
        setCargando(false);
        setProductos(respuesta.data);
      })
      .catch((err: any) => {
        setCargando(false);
        setError(err.message);
      });
  }, [urlApi, authToken, instance]);

  return (
    <>
      <h1>Productos</h1>
      <ul className='listaProd'>
        {cargando ? (
          <Cargando />
        ) : productos.length > 0 ? (
          productos.map((prod: any) => (
            <Tarjeta prod ={prod}
              key={prod.prodId}
              id={prod.prodId}
              nom={prod.prodNom}
              descr={prod.prodDescr}
              cat={prod.catNom}
              img={prod.prodImg}
              precio={prod.prodValVen}
            />
          ))
        ) : (
          <h1>No hay productos para mostrar</h1>
        )}
      </ul>
    </>
  );
}

export default Menu;
