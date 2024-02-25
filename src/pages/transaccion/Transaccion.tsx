/** @format */

import './transaccion.css';
import Operaciones from '../../components/operaciones/Operaciones';
import Historial from '../historial/Historial';
import { useAuth } from '../../contexts/Auth/Autenticacion';

const Transaccion = () => {
	const { user }: any = useAuth();
	if (user.perfilId === 3) {
		return <Operaciones />;
	} else {
		return <Historial />;
	}
};

export default Transaccion;

