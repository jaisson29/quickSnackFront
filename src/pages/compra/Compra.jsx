import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import './compra.css';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';


const Compra = () => {
  const { urlApi, authToken } = useAuth(); 
  const [compra, setCompra] = useState([]);
  const [tablaActualizada, setTablaActualizada] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');


  useEffect(() =>{
    setCargando(true);
    axios
      .get(`${urlApi}/api/compra/getAll`, {
        headers :{Authorizathion: `Bearer ${authToken}`},
      })
      .then((respuesta) => {
        setCargando(false);
        setCompra(respuesta.data);
      })
      .catch((err) => {
        setCargando(false);
        setError(err.message);
      });
  }, [urlApi, authToken, tablaActualizada]);

  const [comData, setComData] = useState({
    compraId: '',
    provId: '',
    fechaCompra: '',
  });

  const formData = new FormData();
  formData.append('compraId', comData.compraId);
  formData.append('provId', comData.provId);
  formData.append('fechaCompra', comData.fechaComrpa);


  function inputHandler(event) {
    setComData({
      ...comData,
      [event.target.name]: event.target.value,
    });
  }

  function formHandler(e) {
    e.preventDefault();

    if(comData.compraId){
      axios
        .put(`${urlApi}/api/compra/update`, formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) =>{
          console.log(res);
          setTablaActualizada(!tablaActualizada);
          setCargando(true);
          setComData({
            compraId: '',
            provId: '',
            fechaCompra: '',
          });
        })
        .catch((err) =>{
          console.log('error', err);
        });
      }else {
        axios
        .post(`${urlApi}/api/compra/create`,{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((respuesta) => {
          setTablaActualizada(!tablaActualizada);
          setCargando(true);
          setComData({
            compraId: '',
            provId: '',
            fechaCompra: '',
          });
        })
        .catch((err) => {
          console.log('Error al crear la compra', err);
        });
      }
    }

    function editar(id){
      const com = compra.find((c) => c.compraId === id);
      setComData({
        ...com,
        compraId: id,
      })
    }
    function eliminar(id){
      axios
      .delte(`${urlApi}/api/compra/delete/${id}`,{
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
  return(
    <>
  
    <div className='w-full md:w-1/2'>
    <label htmlFor='provId' className='form-label'>
    Proveedor 
    </label>
    <select
    type='number'
    name='provId'
    id='provId'
    className='input'
    onChange={inputHandler}
    required
    >
    <option value=''>Seleccione unn proveedor</option>
    <option value='1'>Postobón</option>
    <option value='2'>Coca Cola</option>
    <option value='3'>Pepsi</option>
    </select>
    </div>
    <DataTable
          key={tablaActualizada ? 'actualizada' : 'no actualizada'}
          title={'Compra'}
          data={compra}
          pagination
          progressPending={cargando}
          progressComponent={<Cargando />}
          columns={[
            {
              name: 'Compra',
              selector: (row) => (
                <>
                  <p>{row.compraId}</p>
                  <p>{row.provId}</p> 
                  <p>{row.fechaCompra}</p>
                </>
              ),
              sortable: true,
            },
            {
              cell: (row) => (
                <>
                  <Button
                    onClick={() => editar(row.compraId)}
                  >
                    <i className='fa-solid fa-pen'></i>
                  </Button>
                  <Button
                    onClick={() => eliminar(row.compraId)}
                  >
                    <i className='fa-solid fa-trash'></i>
                  </Button>
                </>
              ),
            },
          ]}
        />
    </>

  );
};

export default Compra;