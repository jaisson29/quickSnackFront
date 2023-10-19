/** @format */

import './transaccion.css'
import Operaciones from '../../components/operaciones/Operaciones'
import Historial from '../../components/historial/Historial'
import { useAuth } from '../../components/Auth/Autenticacion'

const Transaccion = () => {
	const { user } = useAuth()
	if (user.perfilId == 3) {
		return <Operaciones />
	} else {
		return <Historial />
	}
}

export default Transaccion
