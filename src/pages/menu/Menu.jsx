import { useEffect, useState } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import Tarjeta from '../../components/tarjeta/Tarjeta';
import axios from 'axios';
import './menu.css';

function Menu() {
  const { urlApi, authToken } = useAuth();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta = await axios.get(`${urlApi}/api/producto/getAll`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setProductos(respuesta.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductos();
  }, [urlApi, authToken]);

  return (
    <>
      <h1>Productos</h1>
      <ul className='listaProd'>
        {productos.length > 0
          ? productos.map((prod) => {
              return (
                <Tarjeta
                  key={prod.prodId}
                  id={prod.prodId}
                  nom={prod.prodNom}
                  descr={prod.prodDescr}
                  cat={prod.catNom}
                  img={prod.prodImg}
                  precio={prod.prodValVen}
                />
              );
            })
          : null}
      </ul>
    </>
  );
}

export default Menu;
