import { useState, useEffect } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import './productos.css';
import { redirect, useNavigate } from 'react-router-dom';

const Productos = () => {
  const { urlApi, authToken } = useAuth();

  const [productos, setProductos] = useState([]);
  const [tablaActualizada, setTablaActualizada] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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

  const [prodData, setProdData] = useState(null);
  function handleInputs(event) {
    setProdData({
      ...prodData,
      [event.target.name]: event.target.value,
    });
  }

  function nuevoProducto(e) {
    e.preventDefault();

    axios
      .post(`${urlApi}/api/producto/create`, prodData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((respuesta) => {
        console.log('nuevo producto', respuesta);
        setTablaActualizada((prev) => !prev);
        window.location.reload();
      })
      .catch((err) => {
        console.log('Error al crear el producto', err);
      });
  }

  return (
    <>
      <form method='post' onSubmit={nuevoProducto}>
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
            <label htmlFor='catId' className='form-label'>
              Categoria
            </label>
            <select
              type='number'
              name='catId'
              id='catId'
              className='input'
              onChange={handleInputs}
              required
            >
              <option value='' selected>
                Seleccione una Categoria
              </option>
              <option value='2'>Bebidas</option>
            </select>
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
              className='inputFile'
              onInput={handleInputs}
              required
            />
          </div>
        </div>
        <div className='row'>
          <Button>
            <input type='submit' value='Crear' />
          </Button>
        </div>
      </form>
      <DataTable
        key={tablaActualizada ? 'actualizada' : 'no actualizada'}
        data={productos}
        columns={[
          {
            name: 'Producto',
            selector: (row) => row.prodNom,
            sortable: true,
          },
          {
            name: 'Precio de compra',
            selector: (row) => row.prodValCom,
            sortable: true,
          },
          {
            name: 'Precio de venta',
            selector: (row) => row.prodValVen,
            sortable: true,
          },
        ]}
        pagination
      />
    </>
  );
};

export default Productos;
