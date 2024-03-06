import { useEffect, useMemo, useState } from 'react';
import { Transaccion as TransacType, Usuario as UsuarioType } from '../../types';
import { useAuth } from '../../contexts/Auth/Autenticacion';

const CarritoOrden = ({ numeroPago }: any) => {
	const initialTransacData: TransacType & UsuarioType = useMemo(
		() => ({
			transacId: 0,
			transacTipo: 0,
			transacEst: 0,
			transacFecha: new Date(Date.now()),
			usuId: 0,
			usuNom: '',
		}),
		[],
	);

	const [ordenData, setOrdenData] = useState<TransacType & UsuarioType>(initialTransacData);

	const { instance, urlApi, authToken }: any = useAuth();
	useEffect(() => {
		const getTransacData = async () => {
			try {
				const resultado = await instance.get(`${urlApi}/api/transac/getOne/${numeroPago}`, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				});
				const { transacFecha, ...trsData } = resultado.data[0];
				setOrdenData({transacFecha: new Date(transacFecha), ...trsData});
			} catch (error) {
				console.error(error);
				setOrdenData(initialTransacData);
			}
		};
		if (numeroPago) {
			getTransacData();
		}
	}, [authToken, initialTransacData, instance, numeroPago, urlApi]);

	return (
		<div className='border-2 border-black/20 flex flex-col m-auto justify-center rounded-lg shadow-md items-center w-[350px] min-h-[300px]'>
			<p className='text-3xl font-semibold text-black/60'>Numero de pago</p>
			<span className='text-[60px] font-bold'>{numeroPago}</span>
			<div className='flex flex-col justify-start w-full gap-2 px-5'>
				<span className='font-semibold'>Fecha: {ordenData.transacFecha?.toLocaleDateString('es-CO')} {ordenData.transacFecha?.toLocaleTimeString()}</span>
				<span className='font-semibold'>Nombre: {ordenData.usuNom}</span>
			</div>
		</div>
	);
};

export { CarritoOrden };
