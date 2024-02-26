import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import Modales from '../../components/modal/Modales';
import './perfil.css';
import $ from 'jquery';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';

const Perfil = () => {
	const { urlApi, authToken, instance }: any = useAuth();
	const [perfil, setPerfil] = useState([]);
	const [pagina, setPagina] = useState([]);
	// const [valEli, setvalEli] = useState([]);
	const [tablaActualizada, setTablaActualizada] = useState(true);
	const [error, setError] = useState('');
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		setCargando(true);
		instance
			.get(`${urlApi}/api/perfil/getAll`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				setCargando(false);
				setPerfil(respuesta.data);
			})
			.catch((err: any) => {
				setCargando(false);
				setError(err.message);
			});
		instance
			.get(`${urlApi}/api/pagina/getAll`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				setCargando(false);
				setPagina(respuesta.data);
			})
			.catch((err: any) => {
				setCargando(false);
				setError(err.message);
			});
		//   instance.get(`${urlApi}/api/perfil/getpagxpef`, {
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
	}, [urlApi, authToken, tablaActualizada, instance]);

	const [pefData, setPefData] = useState({
		perfilId: '',
		perfilNom: '',
		paginaRuta: '',
	});

	function inputHandler(event: any) {
		setPefData({
			...pefData,
			[event.target.name]: event.target.value,
		});
	}
	function formHandler(e: any) {
		e.preventDefault();

		if (pefData.perfilId) {
			instance
				.put(`${urlApi}/api/perfil/actualizar`, pefData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((res: any) => {
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setPefData({
						perfilId: '',
						perfilNom: '',
						paginaRuta: '',
					});
					$('#paginaRuta').val('');
				})
				.catch((err: any) => {
					console.log('error', err);
				});
		} else {
			instance
				.post(`${urlApi}/api/perfil/crear`, pefData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((respuesta: any) => {
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setPefData({
						perfilId: '',
						perfilNom: '',
						paginaRuta: '',
					});
					$('#paginaRuta').val('');
				})
				.catch((err: any) => {
					console.log('Error al crear el perfil', err);
				});
		}
	}

	function editar(id: number) {
		const pef: any = perfil.find((p: any) => p.perfilId === id);
		setPefData({
			...pef,
			perfilId: id,
			paginaRuta: pef.paginaRuta,
		});
		$('#paginaRuta').val(pef.paginaRuta);
	}

	// function eliminar(id: any) {
	// 	instance
	// 		.delete(`${urlApi}/api/perfil/eliminar/${id}`, {
	// 			headers: {
	// 				Authorization: `Bearer ${authToken}`,
	// 			},
	// 		})
	// 		.then((respuesta: any) => {
	// 			console.log(respuesta);
	// 			setTablaActualizada(!tablaActualizada);
	// 			setCargando(true);
	// 		})
	// 		.catch((err: any) => {
	// 			console.log(err);
	// 		});
	// 	return id;
	// }

	return (
		<>
			{error && <Error mensaje={error} />}
			<form method='post' onSubmit={formHandler}>
				<div className='row'>
					<div className='w-full md:w-1/2'>
						<label htmlFor='perfilNom' className='form-label'>
							Nombre del perfil
						</label>
						<input type='text' name='perfilNom' id='perfilNom' className='input' onInput={inputHandler} value={pefData.perfilNom} required />
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='paginaRuta' className='form-label'>
							Pagina ruta
						</label>
						<input type='text' name='paginaRuta' id='paginaRuta' className='input' onInput={inputHandler} value={pefData.paginaRuta} readOnly />
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='paginaInicial' className='form-label'>
							Pagina inicial
						</label>
						<select name='paginaInicial' id='paginaInicial' className='input' onChange={inputHandler} required>
							<option value=''>Seleccione una pagina</option>
							{pagina.length !== 0 &&
								pagina.map((pag: any) => {
									return (
										<option key={pag.paginaRuta} value={pag.paginaRuta}>
											{pag.paginaNom}
										</option>
									);
								})}
						</select>
					</div>
					<div className='row'>
						<Button>
							<input className='cursor-pointer' id='catSubBtn' type='submit' value={pefData.perfilId ? 'Actualizar' : 'Crear'} />
						</Button>
					</div>
				</div>
			</form>
			{cargando ? (
				<Cargando />
			) : (
				<DataTable
					key={tablaActualizada ? 'actualizada' : 'no actualizada'}
					title={'Paginas'}
					data={perfil}
					columns={[
						{
							name: 'Perfiles',
							selector: (row: any) => row.perfilId,
							sortable: true,
						},
						{
							cell: (row: any) => (
								<>
									<p>
										<strong>{row.perfilId} - Nombre perfil: </strong>
										{row.perfilNom}
									</p>
									<p>
										<strong>Ruta: </strong>
										{row.paginaRuta}
									</p>
									<Button onClick={() => editar(row.perfilId)}>
										<i className='fa-solid fa-pen'></i>
									</Button>
									<Modales wuye='hola mundo' />
									<Button>
										<i className='fa-solid fa-list-check'></i>
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

export default Perfil;
