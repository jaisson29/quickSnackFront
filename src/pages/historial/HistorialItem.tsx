import React, { useState } from 'react';
import { DetVenta as DetVentaType } from '../../types';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import Cargando from '../../components/cargando/Cargando';

const HistorialItem = ({ trs }: any) => {
	const [showDetail, setShowDetail] = useState<boolean>(false);
	const [detailData, setDetailData] = useState<DetVentaType[]>([]);
	const [cargando, setCargando] = useState<boolean>(false);

	const { instance, urlApi, authToken }: any = useAuth();

	const toggleDetail = async () => {
		!showDetail && setCargando(true);

		const resultado = await instance.get(`${urlApi}/api/detventa/getAll/${trs.transacId}`, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});

		setCargando(false);
		setDetailData(resultado.data);
		setShowDetail(!showDetail);
	};

	return (
		<div
			key={trs.transacId}
			onClick={toggleDetail}
			className={`flex flex-col items-center w-64 px-3 shadow-md border-2 rounded-lg ${
				trs.transacTipo === 6 ? 'self-start' : 'self-end'
			}`}>
			<div
				className={`flex items-center w-full ${
					trs.transacTipo === 6 ? 'justify-start' : 'justify-end'
				} py-[12px] gap-6 rounded-lg`}>
				{trs.transacTipo === 6 && (
					<div className={`rounded-full bg-green-600 w-6 h-6 text-center ring-2 ring-green-600 ring-offset-2`}>
						<i className={`fa fa-plus text-white`}></i>
					</div>
				)}
				<div className={`relative ${trs.transacTipo === 6 ? '' : 'text-end'}`}>
					<span
						className={`absolute text-xs text-black/50 font-bold ${
							trs.transacTipo === 6 ? 'left-0 -top-3' : 'right-0 -top-3'
						}`}>
						{trs.transacTipo === 6 ? 'Recarga' : 'Pago'}
					</span>
					<p className='text-xl font-bold'>{`$ ${parseInt(trs.tot).toLocaleString('es-CO')}`}</p>
					<p className='text-sm'>{`${new Date(trs.transacFecha).toLocaleDateString('es-CO')} ${new Date(
						trs.transacFecha,
					).toLocaleTimeString('es-CO')}`}</p>
				</div>
				{trs.transacTipo === 7 && (
					<div className={`rounded-full bg-red-600 w-6 h-6 text-center ring-2 ring-red-600 ring-offset-2`}>
						<i className={`fa fa-plus text-white`}></i>
					</div>
				)}
			</div>
			{cargando && <Cargando />}
			<div className='flex flex-col w-full'>
				{showDetail &&
					detailData.map((det: any) => {
						return (
							<div key={det.detVentaId} className='flex justify-between'>
								<span className='w-24'>
									{det.catId === 1 ? '$' : ''}
									{det.prodNom}
								</span>
								<span>{det.detVenCant} und </span>
								{det.catId !== 1 && <span className='font-semibold'>{`$ ${det.detVenCant * det.prodValVen}`}</span>}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export { HistorialItem };
