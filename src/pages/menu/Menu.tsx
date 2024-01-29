import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import Cargando from '../../components/cargando/Cargando';
import Tarjeta from '../../components/tarjeta/Tarjeta';
import Error from '../../components/error/Error';
import './menu.css';

function Menu() {
	const { urlApi, authToken, instance }: any = useAuth();
	const [productos, setProductos] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setCargando(true);
		instance
			.get(`${urlApi}/api/producto/getAll`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				setCargando(false);
				setProductos(respuesta.data);
			})
			.catch((err: any) => {
				setCargando(false);
				setError(err.message);
			});
	}, [urlApi, authToken, instance]);

	return (
		<>
			{error && <Error mensaje={error} />}
			<h1>Productos</h1>
			{cargando && <Cargando />}
			<ul className='listaProd'>
				{productos.length > 0 &&
					productos.map((prod: any) => (
						<Tarjeta
							prod={prod}
							key={prod.prodId}
							id={prod.prodId}
							nom={prod.prodNom}
							descr={prod.prodDescr}
							cat={prod.catNom}
							img={prod.prodImg}
							precio={prod.prodValVen}
						/>
					))}
			</ul>
		</>
	);
}

export default Menu;
