import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import './compra.css';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';

const Compra = () => {
	const { urlApi, authToken, instance }: any = useAuth();
	const [compra, setCompra] = useState([]);
	const [proveedor, setProveedor] = useState([]);
	const [tablaActualizada, setTablaActualizada] = useState(true);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setCargando(true);
		instance
			.get(`${urlApi}/api/compra/getAll`, {
				headers: { Authorizathion: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				setCargando(false);
				setCompra(respuesta.data);
			})
			.catch((err: any) => {
				setCargando(false);
				setError(err.message);
			});
		instance
			.get(`${urlApi}/api/compra/getAll`, {
				headers: { Authorizathion: `Bearer ${authToken}` },
			})
			.then((res: any) => {
				setProveedor(res.data);
			})
			.catch(() => {
				setError('No se pudo obtener los proveedores');
			});
	}, [urlApi, authToken, tablaActualizada, instance]);

	const [comData, setComData] = useState({
		compraId: '',
		provId: '',
		fechaCompra: '',
	});

	const formData = new FormData();
	formData.append('compraId', comData.compraId);
	formData.append('provId', comData.provId);
	formData.append('fechaCompra', comData.fechaCompra);

	function inputHandler(event: any) {
		setComData({
			...comData,
			[event.target.name]: event.target.value,
		});
	}

	function formHandler(e: any) {
		e.preventDefault();

		if (comData.compraId) {
			instance
				.put(`${urlApi}/api/compra/update`, formData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((res: any) => {
					console.log(res);
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setComData({
						compraId: '',
						provId: '',
						fechaCompra: '',
					});
				})
				.catch((err: any) => {
					console.log('error', err);
				});
		} else {
			instance
				.post(`${urlApi}/api/compra/create`, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((respuesta: any) => {
					console.log(respuesta);
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setComData({
						compraId: '',
						provId: '',
						fechaCompra: '',
					});
				})
				.catch((err: any) => {
					console.log('Error al crear la compra', err);
				});
		}
	}

	function editar(id: any) {
		const com: any = compra.find((c: any) => c.compraId === id);
		setComData({
			...com,
			compraId: id,
		});
	}
	function eliminar(id: any) {
		instance
			.delte(`${urlApi}/api/compra/delete/${id}`, {
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
			<div className='w-full md:w-1/2'>
				<label htmlFor='provId' className='form-label' onSubmit={formHandler}>
					Proveedor
				</label>
				<select name='provId' id='provId' className='input' onChange={inputHandler} required>
					<option value=''>Seleccione un proveedor</option>
					{proveedor.length !== 0
						? proveedor.map((prov: any) => {
								return (
									<option key={prov.provId} value={prov.provId}>
										{prov.provNom}
									</option>
								);
						  })
						: null}
				</select>
			</div>
			<div className='mt-2 row'>
				<Button>
					<input className='cursor-pointer' id='prodSubBtn' type='submit' value={comData.compraId ? 'Actualizar' : 'Crear'} />
				</Button>
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
						selector: (row: any) => row.compraId,
						sortable: true,
					},
					{
						cell: (row) => (
							<>
								<p>{row.compraId}</p>
								<p>{row.provId}</p>
								<p>{row.fechaCompra}</p>
								<Button onClick={() => editar(row.compraId)}>
									<i className='fa-solid fa-pen'></i>
								</Button>
								<Button onClick={() => eliminar(row.compraId)}>
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

