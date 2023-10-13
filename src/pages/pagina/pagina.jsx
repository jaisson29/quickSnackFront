import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import './pagina.css';
import $ from 'jquery';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';


const Pagina = () =>{
    const {urlApi,authToken} = useAuth();
    const [pagina, setPagina] = useState([]);
    const [valEli, setvalEli] = useState([]);
    const [tablaActualizada, setTablaActualizada] = useState(true);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(()=> {
        setCargando(true);
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
      axios.get(`${urlApi}/api/pagina/getpagxpef`, {
        headers: {Authorization: `Bearer ${authToken}` },
      })
      .then((respuesta) =>{
        const fnList = []
        respuesta.data.map((element) =>{
          fnList.push(element.paginaId)
        })
        setvalEli(fnList);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [urlApi, authToken, tablaActualizada]);

  const [pagData, setPagData] = useState({
    paginaId: '',
    paginaNom: '',
    paginaIcon: '',
    paginaRuta: '',
  });

  function inputHandler(event) {
    setPagData({
        ...pagData,
        [event.target.name]: event.target.value,
    });
  }
  function formHandler(e){
    e.preventDefault();

    if(pagData.paginaId){
        axios
        .put(`${urlApi}/api/pagina/update`,pagData,{
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((res) => {
            setTablaActualizada(!tablaActualizada);
            setCargando(true);
            setPagData({
                paginaId: '',
                paginaNom: '',
                paginaIcon: '',
                paginaRuta: '',
            });
        })
        .catch((err) => {
            console.log('error', err);
        });
    }else {
        axios
        .post(`${urlApi}/api/pagina/create`,pagData, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((respuesta) => {
            setTablaActualizada(!tablaActualizada);
            setCargando(true);
            setPagData({
                paginaId: '',
                paginaNom: '',
                paginaIcon: '',
                paginaRuta: '',
            });
        })
        .catch((err) => {
            console.log('Error al crear la pagina', err);
        });
    }
  }

  function editar(id){
    const pag = pagina.find((p) => p.paginaId === id);
    setPagData({
        ...pag,
        paginaId: id,
    })
  }

  function eliminar(id){
    axios
    .delete(`${urlApi}/api/pagina/delete/${id}`,{
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
          <label htmlFor="paginaNom" className='form-label'>
            Nombre de la pagina
          </label>
          <input type="text" 
          name='paginaNom' 
          id='paginaNom' 
          className='input' 
          onInput={inputHandler} 
          value={pagData.paginaNom} 
          required
          />
        </div>
        <div className='w-full md:w-1/2'>
          <label htmlFor="paginaIcon" className='form-label'>
            Icono
          </label>
          <input type="text" 
          name='paginaIcon' 
          id='paginaIcon' 
          className='input' 
          onInput={inputHandler} 
          value={pagData.paginaIcon} 
          required
          />
        </div>
        <div className='w-full md:w-1/2'>
          <label htmlFor="paginaRuta" className='form-label'>
            Ruta de la pagina
          </label>
          <input type="text" 
          name='paginaRuta' 
          id='paginaRuta' 
          className='input' 
          onInput={inputHandler} 
          value={pagData.paginaRuta} 
          required
          />
        </div>
        <div className='row'>
          <Button>
            <input 
            className='cursor-pointer'
            id='catSubBtn'
            type="submit" 
            value={pagData.paginaId ? 'Actualizar' : 'Crear'}
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
      data={pagina}
      columns={[
        {
            name: 'Icono',
            selector: (row) => (
              <>
              <i class='{row.paginaIcon}'></i>
                <i>{row.paginaIcon}</i>
              </>
            ),
            sortable: true,
        },
        {
          name: 'Paginas',
          selector: (row) => (
            <>
              <strong>Nombre pagina:</strong><p>{row.paginaNom}</p>
              <strong>Ruta: </strong><p>{row.paginaRuta}</p>
            </>
          ),
          sortable: true,
        },
        {
          cell: (row) => (
            <>
              <Button onClick={() => editar(row.paginaId)}>
                <i className='fa-solid fa-pen'></i>
              </Button>
                {valEli.indexOf(row.paginaId) != -1  ? null : (
                    <Button onClick={() => eliminar(row.paginaId)}>
                      <i className='fa-solid fa-trash'></i>
                    </Button>
                )}
                
              
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

export default Pagina;