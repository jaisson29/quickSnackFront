/** @format */

import { useEffect, useState } from 'react'
import axios from 'axios'
import './historial.css'
import Error from '../error/Error'
import Cargando from '../cargando/Cargando'
import { useAuth } from '../Auth/Autenticacion'
import Monto from '../monto/Monto'

const Historial = ({ nom }) => {
	const { urlApi, user, authToken } = useAuth()
	const [usuTransacs, setUsuTransacs] = useState([])
	const [error, setError] = useState('')
	const [cargando, setCargando] = useState(true)

	useEffect(() => {
		setCargando(true)
		axios
			.get(`${urlApi}/api/transac/getByUser/${user.usuId}`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((res) => {
				res.status === 204 || !res.data[0].catId ? setError('No se encontraron resultados') : setUsuTransacs(res.data)
				setCargando(false)
				console.log(res)
			})
			.catch((err) => {
				setError(err.response.data.error)
				setCargando(false)
			})
	}, [urlApi, authToken, user])

	return (
		<>
			<Monto></Monto>

			<section className='flex flex-col bg-slate-100'>
				{error ? <Error mensaje={error} estilos={'bg-red-200 ring-red-400'} onClick={() => setError('')} /> : null}
				{cargando ? (
					<Cargando />
				) : (
					usuTransacs.length !== 0 &&
					usuTransacs[0].catId &&
					usuTransacs.map(function (trs) {
						let dt = trs.transacFecha.split('T')
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
									<p>{dt[0] + ' ' + dt[1].split('.')[0]}</p>
								</div>
							</div>
						)
					})
				)}
			</section>
		</>
	)
}

export default Historial