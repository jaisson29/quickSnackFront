import { Dominio as DominioType } from '../../types';
import Button from '../../components/boton/Button';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import Error from '../../components/error/Error';
import DataTable from 'react-data-table-component';
import Cargando from '../../components/cargando/Cargando';

const Dominio = () => {
	const { urlApi, authToken, instance }: any = useAuth();

	const [dominios, setDominios] = useState<DominioType[]>([]);
	const [tablaActualizada, setTablaActualizada] = useState(true);

	const initialDominioData = { domId: 0, domNom: '' };
	const [dominioData, setDominioData] = useState<DominioType>(initialDominioData);
	const [error, setError] = useState('');
	const [cargando, setCargando] = useState(true);

	function inputHandler(event: any) {
		setDominioData({
			...dominioData,
			[event.target.name]: event.target.value,
		});
	}

	const formHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (!dominioData?.domId) {
			await instance.post(`${urlApi}/api/dominio/crear`, dominioData, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setDominioData(initialDominioData);
			setTablaActualizada(!tablaActualizada);
		} else {
			await instance.put(`${urlApi}/api/dominio/actualizar`, dominioData, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setDominioData(initialDominioData);
			setTablaActualizada(!tablaActualizada);
		}
	};

	const editar = async (domId: number) => {
		const dominio: DominioType | undefined = dominios.find((dom: DominioType) => dom.domId === domId);
		dominio && setDominioData(dominio);
	};

	useEffect(() => {
		const getValores = async () => {
			setTablaActualizada(false);
			const response = await instance.get(`${urlApi}/api/dominio/getAll`, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setTablaActualizada(true);
			setDominios(response.data);
			setCargando(false);
		};

		const getDominios = async () => {
			const response = await instance.get(`${urlApi}/api/dominio/getAll`, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setDominios(response.data);
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
						<label htmlFor='domNom' className='form-label'>
							dominio
						</label>
						<input
							placeholder='Nombre del dominio'
							type='text'
							name='domNom'
							id='domNom'
							className='input'
							onInput={inputHandler}
							value={dominioData?.domNom}
							required
						/>
					</div>
					<div className='row'>
						<Button>
							<input className='cursor-pointer' type='submit' value={dominioData?.domId ? 'Actualizar' : 'Crear'} />
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
					data={dominios}
					columns={[
						{
							name: 'Dominio',
							cell: (row: any) => (
								<div className='flex flex-col'>
									<span className='text-sm font-bold'>{row.param}</span>
									<span className='text-xs text-black/70'>{row.domNom}</span>
								</div>
							),
						},
						{
							cell: (row: DominioType) => (
								<>
									<div className='flex justify-end w-full'>
										<Button onClick={() => editar(row?.domId!)}>
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

export { Dominio };
