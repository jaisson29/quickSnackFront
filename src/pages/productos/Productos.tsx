/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import DataTable from 'react-data-table-component';
import Button from '../../components/boton/Button';
import './productos.css';
import $ from 'jquery';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';
import { CheckButton } from '../../components/boton/CheckButton';

const Productos = () => {
	const { urlApi, authToken, instance }: any = useAuth();
	const inputFileRef: any = useRef(null);

	const [productos, setProductos] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [valEli, setValEli]: any = useState([]);
	const [file, setFile] = useState<any>(null);
	const [tablaActualizada, setTablaActualizada] = useState(true);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setCargando(true);
		instance
			.get(`${urlApi}/api/producto/getAll`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				setCargando(false);
				setProductos(respuesta.data.filter((item: any) => item.prodEst === 1 || item.prodEst === 2));
			})
			.catch((err: any) => {
				setCargando(false);
				setError(err.message);
			});

		instance
			.get(`${urlApi}/api/catego/getAll`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((res: any) => {
				setCategorias(res.data);
			})
			.catch(() => {
				setError('No se pudo obtener las categorías');
			});

		instance
			.get(`${urlApi}/api/producto/getVenXProd`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((result: any) => {
				if (result.status === 200) {
					const fnList: any = [];
					result?.data?.map((element: any) => {
						fnList.push(element.prodId);
						return element.prodId;
					});
					setValEli(fnList);
				}
			})
			.catch((err: any) => {
				console.log(err);
			});
	}, [urlApi, authToken, tablaActualizada, instance]);

	const [prodData, setProdData] = useState({
		prodId: '',
		prodNom: '',
		prodDescr: '',
		prodImg: '',
		prodValCom: '',
		prodValVen: '',
		catId: '',
	});

	const formData = new FormData();
	formData.append('prodId', prodData.prodId);
	formData.append('prodNom', prodData.prodNom);
	formData.append('prodDescr', prodData.prodDescr);
	formData.append('prodValCom', prodData.prodValCom);
	formData.append('prodValVen', prodData.prodValVen);
	formData.append('catId', prodData.catId);
	formData.append('prodImg', file ?? prodData.prodImg);

	function inputHandler(event: any) {
		setProdData({
			...prodData,
			[event.target.name]: event.target.value,
		});
	}
	function handleFiles(event: any) {
		setFile(event.target.files[0]);
	}

	function formHandler(e: any) {
		e.preventDefault();

		if (prodData.prodId) {
			instance
				.put(`${urlApi}/api/producto/actualizar`, formData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((res: any) => {
					console.log(res);
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setProdData({
						prodId: '',
						prodNom: '',
						prodDescr: '',
						prodValCom: '',
						prodValVen: '',
						catId: '',
					} as any);
					$('#catId').val('');
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
				.post(`${urlApi}/api/producto/crear`, formData, {
					headers: {
						Authorization: `Bearer ${authToken}`,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((respuesta: any) => {
					setTablaActualizada(!tablaActualizada);
					setCargando(true);
					setProdData({
						prodId: '',
						prodNom: '',
						prodDescr: '',
						prodValCom: '',
						prodValVen: '',
						catId: '',
					} as any);
					$('#catId').val('');
					setFile(null);
					// document.getElementById('prodImg').value = '';
					if (inputFileRef.current) {
						inputFileRef.current.value = '';
					}
				})
				.catch((err: any) => {
					console.log('Error al crear el producto', err);
				});
			console.log(formData.getAll('prodImg'));
		}
	}

	function editarProd(id: any) {
		const prod: any = productos.find((p: any) => p.prodId === id);
		setProdData({
			...prod,
			prodId: id,
			catId: prod.catId,
		});
		$('#catId').val(prod.catId);
	}

	const toggleEst = async (prodEst: number, prodId: number) => {
		await instance.put(
			`${urlApi}/api/producto/estado`,
			{ prodEst, prodId },
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			},
		);
		// setTablaActualizada(!tablaActualizada);
	};

	function eliminarProd(id: number | string) {
		instance
			.delete(`${urlApi}/api/producto/eliminar/${id}`, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			})
			.then((respuesta: any) => {
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
						<label htmlFor='prodNom' className='form-label'>
							Nombre de el producto
						</label>
						<input
							type='text'
							name='prodNom'
							id='prodNom'
							className='input'
							onInput={inputHandler}
							value={prodData.prodNom}
							required
						/>
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='prodDescr' className='form-label'>
							Descripción
						</label>
						<input
							type='text'
							name='prodDescr'
							id='prodDescr'
							className='input'
							value={prodData.prodDescr}
							onInput={inputHandler}
							required
						/>
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='prodValCom' className='form-label'>
							Precio de compra
						</label>
						<input
							type='number'
							step={'any'}
							name='prodValCom'
							id='prodValCom'
							className='input'
							value={prodData.prodValCom}
							onInput={inputHandler}
							required
						/>
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='prodValVen' className='form-label'>
							Precio de Venta
						</label>
						<input
							type='number'
							step={'any'}
							name='prodValVen'
							id='prodValVen'
							className='input'
							value={prodData.prodValVen}
							onInput={inputHandler}
							required
						/>
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='catId' className='form-label'>
							Categoria
						</label>
						<select name='catId' id='catId' className='input' onChange={inputHandler} required>
							<option value=''>Seleccione una Categoria</option>
							{categorias.length !== 0
								? categorias.map((cat: any) => {
										return (
											<option key={cat.catId} value={cat.catId}>
												{cat.catNom}
											</option>
										);
								  })
								: null}
						</select>
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='prodImg' className='form-label'>
							Subir una imagen
						</label>
						<input
							type='file'
							name='prodImg'
							accept='image/*'
							id='prodImg'
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
							value={prodData.prodId ? 'Actualizar' : 'Crear'}
						/>
					</Button>
				</div>
			</form>
			{cargando ? (
				<Cargando />
			) : (
				<DataTable
					title={'Productos'}
					data={productos}
					pagination
					progressPending={cargando}
					progressComponent={<Cargando />}
					columns={[
						{
							name: 'Producto',
							cell: (row: any) => (
								<div className='flex content-center'>
									<div className='object-contain w-16 h-16'>
										<img src={`${urlApi}/uploads/${row.prodImg}`} className='h-full' alt='' />
									</div>
									<div className='pl-5'>
										<div>
											<span className='font-bold'>Producto: </span>
											{row.prodNom}
										</div>
										<div>
											<div>
												<span className='font-bold'>Valor de compra:</span> {row.prodValCom}
											</div>
											<span>
												<strong>Valor de venta: </strong>
												{row.prodValVen}
											</span>
										</div>
									</div>
								</div>
							),
							sortable: true,
						},
						{
							cell: (row: any) => (
								<div className='flex justify-end w-full gap-2'>
									{valEli.indexOf(row.prodId) !== -1 ? null : (
										<Button key={`eliminar-${row.prodId}`} onClick={() => eliminarProd(row.prodId)}>
											<i className='fa-solid fa-trash'></i>
										</Button>
									)}
									<Button key={`editar-${row.prodId}`} onClick={() => editarProd(row.prodId)}>
										<i className='fa-solid fa-pen'></i>
									</Button>
									{/* <Button
										key={`${row.prodId}`}
										twStyles={`${row.prodEst === 1 ? 'bg-green-600/70' : 'bg-red-600/70'}`}
										onClick={() => toggleEst(row.prodEst === 1 ? 2 : 1, row.prodId)}>
										<i className='text-xl fa-solid fa-check'></i>
									</Button> */}
									<CheckButton
										title='Cambiar estado'
										action={() => toggleEst(row.prodEst === 1 ? 2 : 1, row.prodId)}
										active={row.prodEst === 1}
									/>
								</div>
							),
						},
					]}
				/>
			)}
		</>
	);
};

export default Productos;
