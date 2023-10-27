import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import Modales from '../../components/modal/Modales';
import { Link, useLocation } from 'react-router-dom';
import './perfil.css';
import $ from 'jquery';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';
import { redirect } from 'react-router-dom';

const Perfil = () =>{
    const {urlApi,authToken} = useAuth();
    const [perfil, setPerfil] = useState([]);
    const [pagina, setPagina] = useState([]);
    // const [valEli, setvalEli] = useState([]);
    const [tablaActualizada, setTablaActualizada] = useState(true);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(()=> {
        setCargando(true);
        axios
      .get(`${urlApi}/api/perfil/getAll`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((respuesta) => {
        setCargando(false);
        setPerfil(respuesta.data);
    })
      .catch((err) => {
        setCargando(false);
        setError(err.message);
      });
      axios
      .get(`${urlApi}/api/pagina/getAll`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((respuesta) => {
        setCargando(false);
        setPagina(respuesta.data);
    })
      .catch((err) => {
        setCargando(false);
        setError(err.message);
      });
    //   axios.get(`${urlApi}/api/perfil/getpagxpef`, {
    //     headers: {Authorization: `Bearer ${authToken}` },
    //   })
    //   .then((respuesta) =>{
    //     const fnList = []
    //     respuesta.data.map((element) =>{
    //       fnList.push(element.paginaId)
    //     })
    //     setvalEli(fnList);
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //   });
  }, [urlApi, authToken, tablaActualizada]);


  const [pefData, setPefData] = useState({
    perfilId: '',
    perfilNom: '',
    paginaRuta: '',
  });

  function inputHandler(event) {
    setPefData({
        ...pefData,
        [event.target.name]: event.target.value,
    });
  }
  function formHandler(e){
    e.preventDefault();

    if(pefData.perfilId){
        axios
        .put(`${urlApi}/api/perfil/update`,pefData,{
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((res) => {
            setTablaActualizada(!tablaActualizada);
            setCargando(true);
            setPefData({
                perfilId: '',
                perfilNom: '',
                paginaRuta: '',
            });
            $('#paginaRuta').val('');
        })
        .catch((err) => {
            console.log('error', err);
        });
    }else {
        axios
        .post(`${urlApi}/api/perfil/create`,pefData, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((respuesta) => {
            setTablaActualizada(!tablaActualizada);
            setCargando(true);
            setPefData({
                perfilId: '',
                perfilNom: '',
                paginaRuta: '',
            });
            $('#paginaRuta').val('');
        })
        .catch((err) => {
            console.log('Error al crear el perfil', err);
        });
    }
}

function editar(id){
    const pef = perfil.find((p) => p.perfilId === id);
    setPefData({
        ...pef,
        perfilId: id,
        paginaRuta: pef.paginaRuta,
    });
    $('#paginaRuta').val(pef.paginaRuta);
  }

  function eliminar(id){
    axios
    .delete(`${urlApi}/api/perfil/delete/${id}`,{
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
    {/* {error ? <Error /> : null} */}
    <form method='post' onSubmit={formHandler}>
      <div className='row'>
        <div className='w-full md:w-1/2'>
          <label htmlFor="perfilNom" className='form-label'>
            Nombre del perfil
          </label>
          <input type="text" 
          name='perfilNom' 
          id='perfilNom' 
          className='input' 
          onInput={inputHandler} 
          value={pefData.perfilNom} 
          required
          />
        </div>
        <div className='w-full md:w-1/2'>
          <label htmlFor="paginaRuta" className='form-label'>
            Pagina ruta
          </label>
          <input type="text" 
          name='paginaRuta' 
          id='paginaRuta' 
          className='input' 
          onInput={inputHandler} 
          value={pefData.paginaRuta} 
          readOnly
          />
        </div>
        <div className='w-full md:w-1/2'>
            <label htmlFor='paginaRuta' className='form-label'>
            Pagina inicial
            </label>
            <select
              type='text'
              name='paginaRuta'
              id='paginaRuta'
              className='input'
              onChange={inputHandler}
              required
            >
              <option value=''>Seleccione una pagina</option>
              {pagina.length !== 0
                ? pagina.map((pag) => {
                    return (
                      <option key={pag.paginaRuta} value={pag.paginaRuta}>
                        {pag.paginaNom}
                      </option>
                    );
                  })
                : null}
            </select>
        </div>
        <div className='row'>
          <Button>
            <input 
            className='cursor-pointer'
            id='catSubBtn'
            type="submit" 
            value={pefData.perfilId ? 'Actualizar' : 'Crear'}
            />
          </Button>
        </div>
      </div>
    </form>
    {cargando ? (
      <Cargando />
    ): (<DataTable
      key={tablaActualizada ? 'actualizada' : 'no actualizada'}
      title={'Paginas'}
      data={perfil}
      columns={[
        {
            name: 'Perfiles',
            selector: (row) => (
                <>
                <p><strong>{row.perfilId} - Nombre perfil: </strong>{row.perfilNom}</p>
                <p><strong>Ruta: </strong>{row.paginaRuta}</p>
                </>
            ),
            sortable: true,
        },
        {
          cell: (row) => (
            <>
              <Button onClick={() => editar(row.perfilId)}>
                <i className='fa-solid fa-pen'></i>
              </Button>
              <Modales titu={"Perfil por pagina"}>
              <form action=""></form>
              </Modales>
              
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

export default Perfil;