import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import './pagina.css';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';

const Pagina = () => {
	const { urlApi, authToken, instance }: any = useAuth();
	const [pagina, setPagina] = useState([]);
	const [valEli, setvalEli]: any = useState([]);
	const [tablaActualizada, setTablaActualizada] = useState(true);
	const [error, setError] = useState('');
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		setCargando(true);
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
		instance
			.get(`${urlApi}/api/pagina/getpagxpef`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				const fnList: any = [];
				respuesta.data.map((element: any) => {
					fnList.push(element.paginaId);
				});
				setvalEli(fnList);
			})
			.catch((err: any) => {
				setError(err.message);
			});
	}, [urlApi, authToken, tablaActualizada, instance]);

	const [pagData, setPagData] = useState({
		paginaId: '',
		paginaNom: '',
		paginaIcon: '',
		paginaRuta: '',
	});

	function inputHandler(event: any) {
		setPagData({
			...pagData,
			[event.target.name]: event.target.value,
		});
	}
	function formHandler(e: any) {
		e.preventDefault();

		if (pagData.paginaId) {
			instance
				.put(`${urlApi}/api/pagina/update`, pagData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((res: any) => {
					console.log(res);
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setPagData({
						paginaId: '',
						paginaNom: '',
						paginaIcon: '',
						paginaRuta: '',
					});
				})
				.catch((err: any) => {
					console.log('error', err);
				});
		} else {
			instance
				.post(`${urlApi}/api/pagina/create`, pagData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((respuesta: any) => {
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setPagData({
						paginaId: '',
						paginaNom: '',
						paginaIcon: '',
						paginaRuta: '',
					});
				})
				.catch((err: any) => {
					console.log('Error al crear la pagina', err);
				});
		}
	}

	function editar(id: number) {
		const pag: any = pagina.find((p: any) => p.paginaId === id);
		setPagData({
			...pag,
			paginaId: id,
		});
	}

	function eliminar(id: number) {
		instance
			.delete(`${urlApi}/api/pagina/delete/${id}`, {
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
			{/* {error ? <Error /> : null} */}
			<form method='post' onSubmit={formHandler}>
				<div className='row'>
					<div className='w-full md:w-1/2'>
						<label htmlFor='paginaNom' className='form-label'>
							Nombre de la pagina
						</label>
						<input type='text' name='paginaNom' id='paginaNom' className='input' onInput={inputHandler} value={pagData.paginaNom} required />
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='paginaIcon' className='form-label'>
							Icono
						</label>
						<input type='text' name='paginaIcon' id='paginaIcon' className='input' onInput={inputHandler} value={pagData.paginaIcon} required />
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='paginaRuta' className='form-label'>
							Ruta de la pagina
						</label>
						<input type='text' name='paginaRuta' id='paginaRuta' className='input' onInput={inputHandler} value={pagData.paginaRuta} required />
					</div>
					<div className='row'>
						<Button>
							<input className='cursor-pointer' id='catSubBtn' type='submit' value={pagData.paginaId ? 'Actualizar' : 'Crear'} />
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
					data={pagina}
					columns={[
						{
							name: 'Icono',
							selector: (row: any) => row.paginaId,
							sortable: true,
						},
						{
							name: 'Paginas',
							selector: (row) => (
								<>
									<i className={`fa ${row.paginaIcon} fa-xl `}></i>
									<p>
										<strong>Nombre pagina:</strong>
										{row.paginaNom}
									</p>
									<p>
										<strong>Ruta: </strong>
										{row.paginaRuta}
									</p>
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
									{valEli.indexOf(row.paginaId) !== -1 ? null : (
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

