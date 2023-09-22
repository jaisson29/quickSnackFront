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

    // if(catData.catid){
    //     axios
    //     .put(`${urlApi}/api/producto/update`)
    // }
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
              {/* <Button onClick={() => editarProd(row.catId)}>
                <i className='fa-solid fa-pen'></i>
              </Button>
              <Button onClick={() => eliminar(row.catId)}>
                <i className='fa-solid fa-trash'></i>
              </Button> */}
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