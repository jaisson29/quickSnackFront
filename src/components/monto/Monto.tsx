/** @format */

import { useEffect, useState } from 'react'
import { useAuth } from '../Auth/Autenticacion'

const Monto = (props) => {
	const { urlApi, user, authToken, balance, setBalance, instance } = useAuth()

	useEffect(() => {
		instance
			.get(`${urlApi}/api/transac/getByUser/${user.usuId}`, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			})
			.then((res) => {
				if (res.data.length !== 0) {
					const monto = res.data.reduce(
						(total, obj) => (obj.transacTipo === 6 ? total + parseFloat(obj.tot) : total - parseFloat(obj.tot)),
						0,
					)
					setBalance(monto)
				}
			})
	}, [urlApi, user, authToken])
	return (
		<>
			<h2 className='m-2'>$ {balance.toLocaleString('es-CO')}</h2>
		</>
	)
}

export default Monto
