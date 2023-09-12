import { useState, useEffect } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import './productos.css';
import Cargando from '../../components/cargando/Cargando';

const Productos = () => {
  const { urlApi, authToken } = useAuth();

  const [productos, setProductos] = useState([]);
  const [tablaActualizada, setTablaActualizada] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

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
  }, [urlApi, authToken, tablaActualizada]);

  const [prodData, setProdData] = useState({
    prodNom: '',
    prodDescr: '',
    prodImg: 'assets/defaultProd.jpg',
    prodValCom: '',
    prodValVen: '',
    catId: '',
  });
  function handleInputs(event) {
    setProdData({
      ...prodData,
      [event.target.name]: event.target.value,
    });
  }

  function nuevoProd(e) {
    e.preventDefault();

    axios
      .post(`${urlApi}/api/producto/create`, prodData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((respuesta) => {
        // console.log('nuevo producto', respuesta);
        setTablaActualizada(!tablaActualizada);
        setCargando(true);
        setProdData({
          prodNom: '',
          prodDescr: '',
          prodImg: 'assets/defaultProd.jpg',
          prodValCom: '',
          prodValVen: '',
          catId: '',
        });
      })
      .catch((err) => {
        console.log('Error al crear el producto', err);
      });
  }

  function editarProd(id) {
    console.log(id);
    return id;
  }

  function eliminarProd(id) {
    axios
      .delete(`${urlApi}/api/producto/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((respuesta) => {
        console.log(respuesta);
        setTablaActualizada(!tablaActualizada);
        setCargando(true);
      })
      .catch((err) => {
        console.log(err);
      });
    return id;
  }

  // const ExpandedComponent = ({ data }) => (
  //   <>
  //     <Button onClick={() => editarProd(data.prodNom)}>
  //       <i className='fa-solid fa-pen'></i>
  //     </Button>
  //     <Button onClick={() => eliminarProd(data.prodId)}>
  //       <i className='fa-solid fa-trash'></i>
  //     </Button>
  //   </>
  // );

  return (
    <>
      <form method='post' onSubmit={nuevoProd}>
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
              value={prodData.prodNom}
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
              value={prodData.prodDescr}
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
              value={prodData.prodValCom}
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
              value={prodData.prodValVen}
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
              <option value=''>Seleccione una Categoria</option>
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
            />
          </div>
        </div>
        <div className='row'>
          <Button>
            <input id='prodSubBtn' type='submit' value='Crear' />
          </Button>
        </div>
      </form>
      {cargando ? (
        <Cargando />
      ) : (
        <DataTable
          key={tablaActualizada ? 'actualizada' : 'no actualizada'}
          title={'Productos'}
          // expandableRows
          // expandableRowsComponent={ExpandedComponent}
          data={productos}
          columns={[
            {
              name: 'Producto',
              selector: (row) => (
                <>
                  <p>{row.prodNom}</p>
                  <p>{row.prodDescr}</p>
                </>
              ),
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
            {
              // name: 'Acciones',
              cell: (row) => (
                <>
                  <Button onClick={() => editarProd(row.prodId)}>
                    <i className='fa-solid fa-pen'></i>
                  </Button>
                  <Button onClick={() => eliminarProd(row.prodId)}>
                    <i className='fa-solid fa-trash'></i>
                  </Button>
                </>
              ),
            },
          ]}
          pagination
        />
      )}
    </>
  );
};

export default Productos;
