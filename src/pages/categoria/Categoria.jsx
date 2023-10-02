import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import './categoria.css';
import $ from 'jquery';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';

const Categoria = () =>{
    const { urlApi, authToken} = useAuth();
    const [categoria, setCategoria] = useState([]);
    const [tablaActualizada, setTablaActualizada] = useState(true);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(()=> {
        setCargando(true);
        axios
      .get(`${urlApi}/api/Catego/getAll`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((respuesta) => {
        setCargando(false);
        setCategoria(respuesta.data);
    })
      .catch((err) => {
        setCargando(false);
        setError(err.message);
      });
  }, [urlApi, authToken, tablaActualizada]);

  const [catData, setCatData] = useState({
    catId: '',
    catNom: '',
  });

  function inputHandler(event) {
    setCatData({
        ...catData,
        [event.target.name]: event.target.value,
    });
  }
  function formHandler(e){
    e.preventDefault();

    if(catData.catid){
        axios
        .put(`${urlApi}/api/catego/update`,{
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((res) => {
            setTablaActualizada(!tablaActualizada);
            setCargando(true);
            setCatData({
                catId: '',
                catNom: '',
            });
        })
        .catch((err) => {
            console.log('error', err);
        });
    }else {
        axios
        .post(`${urlApi}/api/catego/create`,{
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((respuesta) => {
            setTablaActualizada(!tablaActualizada);
            setCargando(true);
            setCatData({
                catId: '',
                catNom: '',
            });
        })
        .catch((err) => {
            console.log('Error al crear la categoria', err);
        });
    }
  }
  
  function editar(id){
    const cat = categoria.find((c) => c.catId === id);
    setCatData({
        ...cat,
        catId: id,
    })
  }

  function eliminar(id){
    axios
    .delete(`${urlApi}/api/catego/delete/${id}`,{
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
    <DataTable
      key={tablaActualizada ? 'actualizada' : 'no actualizada'}
      title={'Categorias'}
      data={categoria}
      columns={[
        {
          name: 'Categorias',
          selector: (row) => (
            <>
              <p>{row.catNom}</p>
            </>
          ),
          sortable: true,
        },
        {
          cell: (row) => (
            <>
              <Button onClick={() => editar(row.catId)}>
                <i className='fa-solid fa-pen'></i>
              </Button>
              <Button onClick={() => eliminar(row.catId)}>
                <i className='fa-solid fa-trash'></i>
              </Button>
            </>
          ),
        },
      ]}
      pagination
    />
</>
);
};

export default Categoria;