import { useEffect, useState } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';

function Menu() {
  const { urlApi, authToken } = useAuth();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta = await axios.get(`${urlApi}/api/producto/getAll`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log(respuesta.data);
        setProductos(respuesta.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductos();
  }, []);

  return (
    <>
      <h1>Productos</h1>
      <ul>
        {productos.map((prod) => {
          return (
            <li key={prod.prodId} className='p-5 my-4 bg-clRos'>
              {prod.prodNom}
              {prod.prodDescr}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Menu;
