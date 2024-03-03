import { Proveedor as ProveedorType } from '../../types';
import Button from '../../components/boton/Button';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import Error from '../../components/error/Error';
import DataTable from 'react-data-table-component';
import Cargando from '../../components/cargando/Cargando';

const Proveedor = () => {
	const { urlApi, authToken, instance }: any = useAuth();

	const [proveedores, setProveedores] = useState<ProveedorType[]>([]);
	const [tablaActualizada, setTablaActualizada] = useState(true);

	const initiaProveedorData = { provId: 0, provNom: '', provNit: '' };
	const [proveedorData, setDominioData] = useState<ProveedorType>(initiaProveedorData);
	const [error, setError] = useState('');
	const [cargando, setCargando] = useState(true);

	function inputHandler(event: any) {
		setDominioData({
			...proveedorData,
			[event.target.name]: event.target.value,
		});
	}

	const formHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (!proveedorData?.provId) {
			await instance.post(`${urlApi}/api/proveedor/crear`, proveedorData, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setDominioData(initiaProveedorData);
			setTablaActualizada(!tablaActualizada);
		} else {
			await instance.put(`${urlApi}/api/proveedor/actualizar`, proveedorData, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setDominioData(initiaProveedorData);
			setTablaActualizada(!tablaActualizada);
		}
	};

	const editar = async (provId: number) => {
		const proveedor: ProveedorType | undefined = proveedores.find((prov: ProveedorType) => prov.provId === provId);
		proveedor && setDominioData(proveedor);
	};

	useEffect(() => {
		const getValores = async () => {
			setTablaActualizada(false);
			const response = await instance.get(`${urlApi}/api/proveedor/getAll`, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setTablaActualizada(true);
			setProveedores(response.data);
			setCargando(false);
		};

		const getDominios = async () => {
			const response = await instance.get(`${urlApi}/api/proveedor/getAll`, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setProveedores(response.data);
			setCargando(false);
		};

		getValores();
		getDominios();
	}, [authToken, instance, urlApi, tablaActualizada]);

	return (
		<>
			{error && <Error mensaje={error} />}
			<form method='post' onSubmit={formHandler}>
				<div className='row'>
					<div className='w-full md:w-1/2'>
						<label htmlFor='provNom' className='form-label'>
							proveedor
						</label>
						<input
							placeholder='Nombre del proveedor'
							type='text'
							name='provNom'
							id='provNom'
							className='input'
							onInput={inputHandler}
							value={proveedorData?.provNom}
							required
						/>
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='provNom' className='form-label'>
							proveedor
						</label>
						<input
							placeholder='Nit del proveedor'
							type='text'
							name='provNit'
							id='provNit'
							className='input'
							onInput={inputHandler}
							value={proveedorData?.provNit}
							required
						/>
					</div>
					<div className='row'>
						<Button>
							<input className='cursor-pointer' type='submit' value={proveedorData?.provId ? 'Actualizar' : 'Crear'} />
						</Button>
					</div>
				</div>
			</form>
			{cargando ? (
				<Cargando />
			) : (
				<DataTable
					key={tablaActualizada ? 'actualizada' : 'no actualizada'}
					title={'Dominio'}
					data={proveedores}
					columns={[
						{
							name: 'Dominio',
							cell: (row: any) => (
								<div className='flex flex-col'>
									<span className='text-sm font-bold'>{row.provNom}</span>
									<span className='text-xs text-black/70'>{row.provNit}</span>
								</div>
							),
						},
						{
							cell: (row: ProveedorType) => (
								<>
									<div className='flex justify-end w-full'>
										<Button onClick={() => editar(row?.provId!)}>
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

export { Proveedor };
