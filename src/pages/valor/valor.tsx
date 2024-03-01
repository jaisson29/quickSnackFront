import { Valor as ValorType, Dominio as DominioType } from '../../types';
import Button from '../../components/boton/Button';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import Error from '../../components/error/Error';
import DataTable from 'react-data-table-component';
import Cargando from '../../components/cargando/Cargando';

const Valor = () => {
	const { urlApi, authToken, instance }: any = useAuth();

	const [valores, setValores] = useState<ValorType[]>([]);
	const [dominio, setDominio] = useState<DominioType[]>([]);
	const [tablaActualizada, setTablaActualizada] = useState(true);
	const [valorData, setValorData] = useState<ValorType>();
	const [error, setError] = useState('');
	const [cargando, setCargando] = useState(true);

	function inputHandler(event: any) {
		setValorData({
			...valorData,
			[event.target.name]: event.target.value,
		});
	}

	const formHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (!valorData?.valorId) {
			const response = await instance.post(`${urlApi}/api/valor/crear`, valorData, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			console.log(response);
		} else {
			const response = await instance.put(`${urlApi}/api/valor/actualizar`, valorData, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			console.log(response);
			setValorData({});

			setTablaActualizada(false);
		}
	};

	const editar = async (valorId: number) => {
		const valor: ValorType | undefined = valores.find((val: ValorType) => val.valorId === valorId);
		valor && setValorData({ param: valor.param, domId: valor.domId, valorId: valor.valorId });
	};

	useEffect(() => {
		const getValores = async () => {
			const response = await instance.get(`${urlApi}/api/valor/getAll`, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setValores(response.data);
			setCargando(false);
		};

		const getDominios = async () => {
			const response = await instance.get(`${urlApi}/api/dominio/getAll`, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setDominio(response.data);
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
						<label htmlFor='param' className='form-label'>
							valor
						</label>
						<input
							placeholder='Nombre del valor'
							type='text'
							name='param'
							id='param'
							className='input'
							onInput={inputHandler}
							value={valorData?.param}
							required
						/>
					</div>
					<div className='w-full md:w-1/2'>
						<label htmlFor='domId' className='form-label'>
							Dominio
						</label>
						<select name='domId' className='input' id='domId' required onChange={inputHandler}>
							<option value=''>Seleccione un dominio</option>
							{dominio.map((dom) => {
								return (
									<option selected={dom.domId === valorData?.domId} key={dom.domId} value={dom.domId}>
										{dom.domNom}
									</option>
								);
							})}
						</select>
					</div>
					<div className='row'>
						<Button>
							<input className='cursor-pointer' type='submit' value={valorData?.valorId ? 'Actualizar' : 'Crear'} />
						</Button>
					</div>
				</div>
			</form>
			{cargando ? (
				<Cargando />
			) : (
				<DataTable
					key={tablaActualizada ? 'actualizada' : 'no actualizada'}
					title={'Valor'}
					data={valores}
					columns={[
						{
							name: 'Valor',
							cell: (row: any) => (
								<div className='flex flex-col'>
									<span className='text-sm font-bold'>{row.param}</span>
									<span className='text-xs text-black/70'>{row.domNom}</span>
								</div>
							),
						},
						{
							cell: (row: ValorType) => (
								<>
									<div className='flex justify-end w-full'>
										<Button onClick={() => editar(row?.valorId!)}>
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

export { Valor };
