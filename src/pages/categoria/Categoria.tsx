import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import './categoria.css';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';

const Categoria = () => {
	const { urlApi, authToken, instance }: any = useAuth();
	const [categoria, setCategoria] = useState([]);
	const [valEli, setvalEli]: any = useState([]);
	const [tablaActualizada, setTablaActualizada] = useState(true);
	const [error, setError] = useState('');
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		setCargando(true);
		instance
			.get(`${urlApi}/api/catego/getAll`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				setCargando(false);
				setCategoria(respuesta.data);
			})
			.catch((err: any) => {
				setCargando(false);
				setError(err.message);
			});
		instance
			.get(`${urlApi}/api/catego/getmxp`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				const fnList: any = [];
				respuesta.data.map((element: any) => {
					fnList.push(element.catId);
					return element.catId;
				});
				setvalEli(fnList);
			})
			.catch((err: any) => {
				setError(err.message);
			});
	}, [urlApi, authToken, tablaActualizada, instance]);

	const [catData, setCatData] = useState({
		catId: '',
		catNom: '',
	});

	function inputHandler(event: any) {
		setCatData({
			...catData,
			[event.target.name]: event.target.value,
		});
	}
	function formHandler(e: any) {
		e.preventDefault();

		if (catData.catId) {
			instance
				.put(`${urlApi}/api/catego/actualizar`, catData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((res: any) => {
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setCatData({
						catId: '',
						catNom: '',
					});
				})
				.catch((err: any) => {
					console.log('error', err);
				});
		} else {
			instance
				.post(`${urlApi}/api/catego/crear`, catData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((respuesta: any) => {
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setCatData({
						catId: '',
						catNom: '',
					});
				})
				.catch((err: any) => {
					console.log('Error al crear la categoria', err);
				});
		}
	}

	function editar(id: number) {
		const cat: any = categoria.find((c: any) => c.catId === id);
		setCatData({
			...cat,
			catId: id,
		});
	}

	function eliminar(id: number) {
		instance
			.delete(`${urlApi}/api/catego/eliminar/${id}`, {
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
			{error && <Error mensaje={error} />}
			<form method='post' onSubmit={formHandler}>
				<div className='row'>
					<div className='w-full md:w-1/2'>
						<label htmlFor='catNom' className='form-label'>
							Nombre de la categoria
						</label>
						<input
							type='text'
							name='catNom'
							id='catNom'
							className='input'
							onInput={inputHandler}
							value={catData.catNom}
							required
						/>
					</div>
					<div className='row'>
						<Button>
							<input
								className='cursor-pointer'
								id='catSubBtn'
								type='submit'
								value={catData.catId ? 'Actualizar' : 'Crear'}
							/>
						</Button>
					</div>
				</div>
			</form>
			{cargando ? (
				<Cargando />
			) : (
				<DataTable
					key={tablaActualizada ? 'actualizada' : 'no actualizada'}
					title={'Categorias'}
					data={categoria}
					columns={[
						{
							name: 'Categorias',
							selector: (row: any) => row.catNom,
							sortable: true,
						},
						{
							cell: (row: any) => (
								<>
									<div className='flex justify-end w-full'>
										{valEli.indexOf(row?.catId) !== -1 ? null : (
											<Button onClick={() => eliminar(row.catId)}>
												<i className='fa-solid fa-trash'></i>
											</Button>
										)}
										<Button onClick={() => editar(row.catId)}>
											<i className='fa-solid fa-pen'></i>
										</Button>
									</div>
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

export default Categoria;
