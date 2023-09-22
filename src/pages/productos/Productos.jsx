import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import './productos.css';
import $ from 'jquery';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';

const Productos = () => {
  const { urlApi, authToken } = useAuth();
  const inputFileRef = useRef(null);

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [file, setFile] = useState(null);
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
    axios
      .get(`${urlApi}/api/producto/getAll`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        setCategorias(res.data);
      })
      .catch(() => {
        setError('No se pudo obtener las categorías');
      });
  }, [urlApi, authToken, tablaActualizada]);

  const [prodData, setProdData] = useState({
    prodId: '',
    prodNom: '',
    prodDescr: '',
    prodImg: '',
    prodValCom: '',
    prodValVen: '',
    catId: '',
  });

  const formData = new FormData();
  formData.append('prodId', prodData.prodId);
  formData.append('prodNom', prodData.prodNom);
  formData.append('prodDescr', prodData.prodDescr);
  formData.append('prodValCom', prodData.prodValCom);
  formData.append('prodValVen', prodData.prodValVen);
  formData.append('catId', prodData.catId);
  formData.append('prodImg', file ? file : prodData.prodImg);

  function inputHandler(event) {
    setProdData({
      ...prodData,
      [event.target.name]: event.target.value,
    });
  }
  function handleFiles(event) {
    setFile(event.target.files[0]);
  }

  function formHandler(e) {
    e.preventDefault();

    if (prodData.prodId) {
      axios
        .put(`${urlApi}/api/producto/update`, formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          setTablaActualizada(!tablaActualizada);
          setCargando(true);
          setProdData({
            prodId: '',
            prodNom: '',
            prodDescr: '',
            prodValCom: '',
            prodValVen: '',
            catId: '',
          });
          $('#catId').val('');
          setFile(null);
          if (inputFileRef.current) {
            inputFileRef.current.value = '';
          }
        })
        .catch((err) => {
          console.log('error', err);
        });
    } else {
      axios
        .post(`${urlApi}/api/producto/create`, formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((respuesta) => {
          console.log('nuevo producto', respuesta);
          setTablaActualizada(!tablaActualizada);
          setCargando(true);
          setProdData({
            prodId: '',
            prodNom: '',
            prodDescr: '',
            prodValCom: '',
            prodValVen: '',
            catId: '',
          });
          $('#catId').val('');
          setFile(null);
          // document.getElementById('prodImg').value = '';
          if (inputFileRef.current) {
            inputFileRef.current.value = '';
          }
        })
        .catch((err) => {
          console.log('Error al crear el producto', err);
        });
    }
  }

  function editarProd(id) {
    const prod = productos.find((p) => p.prodId === id);
    setProdData({
      ...prod,
      prodId: id,
      catId: prod.catId,
    });
    $('#catId').val(prod.catId);
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

  return (
    <>
      {error ? <Error /> : null}
      <form method='post' onSubmit={formHandler} encType='multipart/form-data'>
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
              onInput={inputHandler}
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
              onInput={inputHandler}
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
              onInput={inputHandler}
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
              onInput={inputHandler}
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
              onChange={inputHandler}
              required
            >
              <option value=''>Seleccione una Categoria</option>
              {categorias.length !== 0
                ? categorias.map((cat) => {
                    return <option value={cat.catId}>{cat.catNom}</option>;
                  })
                : null}
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
              onChange={handleFiles}
              ref={inputFileRef} // Referencia al campo de entrada de archivo
            />
          </div>
        </div>
        <div className='row'>
          <Button>
            <input
              className='cursor-pointer'
              id='prodSubBtn'
              type='submit'
              value={prodData.prodId ? 'Actualizar' : 'Crear'}
            />
          </Button>
        </div>
      </form>
      {cargando ? (
        <Cargando />
      ) : (
        <DataTable
          title={'Productos'}
          data={productos}
          pagination
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
        />
      )}
    </>
  );
};

export default Productos;
