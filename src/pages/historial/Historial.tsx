/** @format */

import { useEffect, useState } from 'react';
import './historial.css';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';
import { useAuth } from '../../contexts/Auth/Autenticacion';

const Historial = () => {
	const { urlApi, user, authToken, instance }: any = useAuth();
	const [usuTransacs, setUsuTransacs]: any = useState([]);
	const [error, setError] = useState('');
	const [cargando, setCargando] = useState(true);
	const [hasFetched, setHasFetched] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setCargando(true);
				const response = await instance.get(`${urlApi}/api/transac/getByUser/${user.usuId}`, {
					headers: { Authorization: `Bearer ${authToken}` },
				});
				console.log(response)
				if (response.status === 204 && response.data.length === 0) {
					setError('No se encontraron resultados');
				} else {
					setUsuTransacs(response?.data);
				}
			} catch (error: any) {
				setError(error?.response?.data?.message);
			} finally {
				setCargando(false);
			}
		};

		if (!hasFetched) {
			fetchData();
			setHasFetched(true);
		}
	}, [urlApi, authToken, user, instance, hasFetched]);

	return (
		<>
			{/* <Monto></Monto> */}

			<section className='flex flex-col bg-clBlan'>
				{error && <Error mensaje={error} twStyles={'bg-red-200 ring-red-400'} onClick={() => setError('')} />}
				{cargando ? (
					<Cargando />
				) : (
					usuTransacs.length !== 0 &&
					usuTransacs[0].catId &&
					usuTransacs
						.sort((a: any, b: any) => -(new Date(a.transacFecha) as any - new Date(b.transacFecha).getTime()))
						.map(function (trs: any) {
							let dt = trs.transacFecha.split('T');
							return (
								<div key={trs.transacId} className='flex items-center px-4 gap-7'>
									<div
										className={`rounded-full ${trs.transacTipo === 6 ? 'bg-green-600' : 'bg-red-600'} w-6 h-6 text-center ring-2 ${
											trs.transacTipo === 6 ? 'ring-green-600' : 'ring-red-600'
										} ring-offset-2`}>
										<i className={`fa fa-${trs.transacTipo === 6 ? 'plus' : 'minus'} text-white`}></i>
									</div>
									<div>
										<p>{`${trs.transacTipo === 6 ? trs.tot : -trs.tot}`}</p>
										<p>{`${dt[0]} ${dt[1].split('.')[0]}`}</p>
									</div>
								</div>
							);
						})
				)}
			</section>
		</>
	);
};

export default Historial;

