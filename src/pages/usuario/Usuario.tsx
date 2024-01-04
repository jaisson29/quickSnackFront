/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import $ from 'jquery';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';

const Usuarios = () => {
	const { urlApi, authToken, tableTheme, instance }: any = useAuth();
	const inputFileRef: any = useRef(null);

	const [usuarios, setUsuarios] = useState([]);
	const [perfiles, setPerfiles] = useState([]);
	const [file, setFile] = useState(null);
	const [tablaActualizada, setTablaActualizada] = useState(true);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setCargando(true);
		instance
			.get(`${urlApi}/api/usuario/getAll`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				setCargando(false);
				setUsuarios(respuesta.data);
			})
			.catch((err: any) => {
				setCargando(false);
				setError(err.message);
			});

		instance
			.get(`${urlApi}/api/perfil/getAll`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				setPerfiles(respuesta.data);
			})
			.catch((err: any) => {
				setError('No se pudo obtener los perfiles');
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

	function inputHandler(event: any) {
		setUsuData({
			...usuData,
			[event.target.name]: event.target.value,
		});
	}
	function handleFiles(event: any) {
		setFile(event.target.files[0]);
	}

	function formHandler(e: any) {
		e.preventDefault();

		if (usuData.usuId) {
			instance
				.put(`${urlApi}/api/usuario/actualizar`, formData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((res: any) => {
					console.log(res);
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setUsuData({
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
					$('#perfilId').val('');
					setFile(null);
					if (inputFileRef.current) {
						inputFileRef.current.value = '';
					}
				})
				.catch((err: any) => {
					console.log('error', err);
				});
		} else {
			instance
				.post(`${urlApi}/api/usuario/crear`, formData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((respuesta: any) => {
					console.log('nuevo producto', respuesta);
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setUsuData({
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
					$('#perfilId').val('');
					setFile(null);
					// document.getElementById('usuImg').value = '';
					if (inputFileRef.current) {
						inputFileRef.current.value = '';
					}
				});
			// .catch((err) => {
			//   console.log('Error al crear el usuario', err);
			// });
		}
	}
	function editarProd(id: number) {
		const usu: any = usuarios.find((u: any) => u.usuId === id);
		setUsuData({
			...usu,
			usuId: id,
			//   catId: prod.catId,
		});
		// $('#catId').val(prod.catId);
	}

	function eliminarUsu(id: number) {
		instance
			.delete(`${urlApi}/api/usuario/borrar/${id}`, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			})
			.then((respuesta: any) => {
				console.log(respuesta);
				setTablaActualizada(!tablaActualizada);
				setCargando(true);
			})
			.catch((err: any) => {
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
						<label htmlFor='usuTipoDoc' className='form-label'>
							Tipo de documento
						</label>
						<select name='usuTipoDoc' id='usuTipoDoc' className='input' onChange={inputHandler}>
							<option value=''>Seleccine un tipo de documento</option>
							<option value='3'>T.I</option>
							<option value='4'>C.C</option>
							<option value='5'>C.E</option>
						</select>
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='usuNom' className='form-label'>
							Nombre completo{' '}
						</label>
						<input type='text' name='usuNom' id='usuNom' className='input' onInput={inputHandler} value={usuData.usuNom} required />
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='usuEmail' className='form-label'>
							Correo electrónico
						</label>
						<input type='text' name='usuEmail' id='usuEmail' className='input' value={usuData.usuEmail} onInput={inputHandler} required />
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='usuNoDoc' className='form-label'>
							No. Documento
						</label>
						<input type='number' name='usuNoDoc' id='usuNoDoc' className='input' value={usuData.usuNoDoc} onInput={inputHandler} required />
					</div>
					<div className='group md:w-1/2'>
						<label htmlFor='usuContra' className='form-label'>
							{' '}
							Contraseña{' '}
						</label>
						<input id='usuContra' name='usuContra' type='password' className='input' value={usuData.usuContra} onInput={inputHandler} required />
					</div>
					<div className='group md:w-1/2'>
						<label htmlFor='perfilId' className='form-label'>
							{' '}
							Perfil{' '}
						</label>
						<select name='perfilId' id='perfilId' className='input' onChange={inputHandler} required>
							<option value=''>Seleccione un Perfil</option>
							{perfiles.length !== 0
								? perfiles.map((per: any) => {
										return (
											<option key={per.perfilId} value={per.perfilId}>
												{per.perfilNom}
											</option>
										);
								  })
								: null}
							{/* {perfilId} */}
						</select>
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='usuGen' className='form-label'>
							{' '}
							Genéro
						</label>
						<div>
							<input type='radio' name='usuGen' id='masculino' className='input-radio ' value='1' onChange={inputHandler} checked />
							<label htmlFor=''>Masculino</label>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<input type='radio' name='usuGen' id='femenino' className='input-radio' value='2' onChange={inputHandler} />
							<label htmlFor=''>Femenino</label>
						</div>
					</div>
					{/* <div className='w-full md:w-1/2'>
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
          </div> */}
				</div>
				<div className='row'>
					<Button>
						<input className='cursor-pointer' id='prodSubBtn' type='submit' value={usuData.usuId ? 'Actualizar' : 'Crear'} />
					</Button>
				</div>
			</form>
			{cargando ? (
				<Cargando />
			) : (
				<DataTable
					theme={tableTheme ? 'oscuro' : 'claro'}
					title={'Usuarios'}
					data={usuarios}
					pagination
					progressPending={cargando}
					progressComponent={<Cargando />}
					columns={[
						{
							name: 'usuario',
							selector: (row: any) => row.usuId,
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
									<p>{row.usuNom}</p>
									<p>{row.usuEmail}</p>
									<Button key={`editar-${row.usuId}`} onClick={() => editarProd(row.usuId)}>
										<i className='fa-solid fa-pen'></i>
									</Button>
									<Button key={`eliminar-${row.usuId}`} onClick={() => eliminarUsu(row.usuId)}>
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

