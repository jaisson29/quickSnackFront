import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import Cargando from '../../components/cargando/Cargando';
import Tarjeta from '../../components/tarjeta/Tarjeta';
import Error from '../../components/error/Error';
import './menu.css';
import { Producto } from '../../types';

function Menu() {
	const { urlApi, authToken, instance }: any = useAuth();
	const [productos, setProductos] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState('');

	const obtenerProductos = useCallback(async () => {
		try {
			setCargando(true);
			const response = await instance.get(`${urlApi}/api/producto/getAll`, {
				headers: { Authorization: `Bearer ${authToken}` },
			});

			const menuProducts = response.data.filter((producto: Producto) => producto.prodEst === 1);
			setProductos(menuProducts);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setCargando(false);
		}
	},[authToken, instance, urlApi]);

	const obtenerProductosMemo = useMemo(() => obtenerProductos, [obtenerProductos]);

	useEffect(() => {
		obtenerProductosMemo();
	}, [obtenerProductosMemo]);

	return (
		<>
			{error && <Error mensaje={error} />}
			{cargando && <Cargando />}
			<ul className='listaProd'>
				{productos.length > 0 && productos?.map((prod: any) => <Tarjeta key={prod.prodId} prod={prod} />)}
			</ul>
		</>
	);
}

export default Menu;
