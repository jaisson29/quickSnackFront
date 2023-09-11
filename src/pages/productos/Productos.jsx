import { useState, useEffect } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import './productos.css';

const Productos = () => {
  const { urlApi, authToken } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const [prodData, setProdData] = useState({});

  useEffect(() => {
    setCargando(true);
    axios
      .get(`${urlApi}/api/producto/getAll`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((respuesta) => {
        setCargando(false);
        setProductos(respuesta.data);
      })
      .catch((err) => {
        setCargando(false);
        setError(err.message);
      });
  }, [urlApi, authToken]);

  function handleInputs(event) {
    setProdData({
      ...prodData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <form action='' method='post'>
        <div className='row'>
          <div className='w-full md:w-1/2'>
            <label htmlFor='prodNom' className='form-label'>
              Nombre de el producto
            </label>
            <input
              type='text'
              name='prodNom'
              id='prodNom'
              className='input'
              onInput={handleInputs}
              required
            />
          </div>
          <div className='w-full md:w-1/2'>
            <label htmlFor='prodDescr' className='form-label'>
              Descripción
            </label>
            <input
              type='text'
              name='prodDescr'
              id='prodDescr'
              className='input'
              onInput={handleInputs}
              required
            />
          </div>
          <div className='w-full md:w-1/2'>
            <label htmlFor='prodValCom' className='form-label'>
              Precio de compra
            </label>
            <input
              type='number'
              step={'any'}
              name='prodValCom'
              id='prodValCom'
              className='input'
              onInput={handleInputs}
              required
            />
          </div>
          <div className='w-full md:w-1/2'>
            <label htmlFor='prodValVen' className='form-label'>
              Precio de Venta
            </label>
            <input
              type='number'
              step={'any'}
              name='prodValVen'
              id='prodValVen'
              className='input'
              onInput={handleInputs}
              required
            />
          </div>
          <div className='w-full md:w-1/2'>
            <label htmlFor='prodImg' className='form-label'>
              Subir una imagen
            </label>
            <input
              type='file'
              name='prodImg'
              accept='image/*'
              id='prodImg'
              className='input'
              onInput={handleInputs}
              required
            />
          </div>
          .
        </div>
      </form>
    </>
  );
};

export default Productos;
