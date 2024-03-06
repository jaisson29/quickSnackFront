/** @format */

import { useEffect, useState } from 'react';
import './historial.css';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import { HistorialItem } from './HistorialItem';

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
				if (response.status === 204 && response.data.length === 0) {
					setError('No se encontraron resultados');
				} else {
					console.log(response.data);
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

			<section className='flex gap-3 md:m-auto flex-col bg-clBlan w-full max-w-[600px]'>
				{error && <Error mensaje={error} twStyles={'bg-red-200 ring-red-400'} onClick={() => setError('')} />}
				{cargando ? (
					<Cargando />
				) : (
					usuTransacs.length !== 0 &&
					usuTransacs[0].catId &&
					usuTransacs
						.sort((a: any, b: any) => -((new Date(a.transacFecha) as any) - new Date(b.transacFecha).getTime()))
						.map(function (trs: any) {
							return <HistorialItem trs={trs} />;
						})
				)}
			</section>
		</>
	);
};

export default Historial;
