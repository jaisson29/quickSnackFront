import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import $ from 'jquery';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';

const Usuarios = () => {
  const { urlApi, authToken } = useAuth();
  const inputFileRef = useRef(null);
  const [usuarios, setUsuarios] = useState([]);
  const [file, setFile] = useState(null);
  const [tablaActualizada, setTablaActualizada] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setCargando(true);
    axios
      .get(`${urlApi}/api/usuario/getAll`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((respuesta) => {
        setCargando(false);
        setUsuarios(respuesta.data);
      })
      .catch((err) => {
        setCargando(false);
        setError(err.message);
      });
  }, [urlApi, authToken, tablaActualizada]);

  const [usuData, setUsuData] = useState({
    usuId: '',
    usuTipoDoc: '',
    usuNoDoc: '',
    usuGen: '',
    usuNom: '',
    usuEmail: '',
    usuContra: '',
    usuIngreso: '',
    usuImg: '',
    perfilId: '',
    usuFecha: '',
    usuPassCode: '',
  });

  const formData = new FormData();
  formData.append('usuId', usuData.usuId);
  formData.append('usuTipoDoc', usuData.usuTipoDoc);
  formData.append('usuNoDoc', usuData.usuNoDoc);
  formData.append('usuGen', usuData.usuGen);
  formData.append('usuNom', usuData.usuNom);
  formData.append('usuEmail', usuData.usuEmail);
  formData.append('usuContra', usuData.usuContra);
  formData.append('usuIngreso', usuData.usuIngreso);
  formData.append('perfilId', usuData.perfilId);
  formData.append('usuFecha', usuData.usuFecha);
  formData.append('usuPassCode', usuData.usuPassCode);
  formData.append('usuImg', file ? file : usuData.usuImg);

  function inputHandler(event) {
    setUsuData({
      ...usuData,
      [event.target.name]: event.target.value,
    });
  }
  function handleFiles(event) {
    setFile(event.target.files[0]);
  }

  function formHandler(e) {
    e.preventDefault();

    if (usuData.prodId) {
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
          setUsuData({
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
        .post(`${urlApi}/api/usuarios/crearUsu`, formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((respuesta) => {
          console.log('nuevo producto', respuesta);
          setTablaActualizada(!tablaActualizada);
          setCargando(true);
          setUsuData({
            usuId: '',
            usuTipoDoc: '',
            usuNoDoc: '',
            usuGen: '',
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
    const usu = usuarios.find((u) => u.usuId === id);
    setUsuData({
      ...usu,
      usuId: id,
    //   catId: prod.catId,
    });
    // $('#catId').val(prod.catId);
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
            <label htmlFor='usuNom' className='form-label'>
              Nombre completo 
            </label>
            <input
              type='text'
              name='usuNom'
              id='usuNom'
              className='input'
              onInput={inputHandler}
              value={usuData.usuNom}
              required
            />
          </div>
          <div className='w-full md:w-1/2'>
            <label htmlFor='usuEmail' className='form-label'>
              Correo electrónico
            </label>
            <input
              type='text'
              name='usuEmail'
              id='usuEmail'
              className='input'
              value={usuData.usuEmail}
              onInput={inputHandler}
              required
            />
          </div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='usuTipoDoc' >Tipo de documento</label>
						<select name="usuTipoDoc" id="usuTipoDoc" className='input'>
							<option value="">Seleccine un tipo de documento</option>
							<option value="3">C.C</option>
							<option value="4">T.I</option>
							<option value="5"></option>
						</select>
					</div>
          <div className='w-full md:w-1/2'>
            <label htmlFor='usuNoDoc' className='form-label'>
              No. Documento
            </label>
            <input
              type='number'
              name='usuNoDoc'
              id='usuNoDoc'
              className='input'
              value={usuData.usuNoDoc}
              onInput={inputHandler}
              required
            />
          </div>
          <div className='group md:w-1/2'>
            <label htmlFor='usuContra' className='form-label'> Contraseña </label>
            <input id='usuContra' name='usuContra' type='password' className='input' onInput={inputHandler} required />
          </div>
          <div className='group md:w-1/2'>
            <label htmlFor="perfilId" className='form-label'> Perfil </label>
            <select name="perfilId" id="perfilId" className='input' Onchange={inputHandler} required>
              <option value="">Seleccione un Perfil</option>
              <option value="1">Administrador</option>
              <option value="2">Usuario</option>
              <option value="1">Cajero</option>
              {/* {perfilId} */}
            </select>
          </div>
          <div className='w-full md:w-1/2'>
            <label htmlFor='usuGen' className='form-label'> Genéro</label>
            <div>     
            <input type='radio' name='usuGen' id='masculino' className='input-radio ' value={1} onChange={inputHandler} required/>
            <label htmlFor=''>Masculino</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	
            <input type='radio' name='usuGen' id='femenino' clasName='input-radio' value={2} onChange={inputHandler} required/>
						<label htmlFor=''>Femenino</label>
            </div>
          </div>
          <div className='w-full md:w-1/2'>
            <label htmlFor='usuImg' className='form-label'>
              Subir una imagen
            </label>
            <input
              type='file'
              name='usuImg'
              accept='image/*'
              id='usuImg'
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
              value={usuData.usuId ? 'Actualizar' : 'Crear'}
            />
          </Button>
        </div>
      </form>
      {cargando ? (
        <Cargando />
      ) : (
        <DataTable
          title={'Usuarios'}
          data={usuarios}
          pagination
          progressPending={cargando}
          progressComponent={<Cargando />}
          columns={[
            {
              name: 'usuario',
              selector: (row) => (
                <>
                  <p>{row.usuNom}</p>
                  <p>{row.usuEmail}</p>
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
                  <Button
                    key={`editar-${row.usuId}`}
                    onClick={() => editarProd(row.usuId)}
                  >
                    <i className='fa-solid fa-pen'></i>
                  </Button>
                  <Button
                    key={`eliminar-${row.usuId}`}
                    onClick={() => eliminarProd(row.usuId)}
                  >
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

export default Usuarios;
