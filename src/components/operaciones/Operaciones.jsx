/** @format */

import { useState } from 'react'
import './operaciones.css'

const Operaciones = () => {
	const [tipoTrs, setTipoTrs] = useState(7)
	function formHandler(event) {}

	return (
		<>
			<section>
				<div>
					<button onClick={() => setTipoTrs(7)}>Venta</button>
					<button onClick={() => setTipoTrs(6)}>Recarga</button>
				</div>
				<div>
					<form method='POST' className='' onSubmit={formHandler}>
						<h1>{tipoTrs === 7 ? 'Pagando' : 'Recargando'}</h1>
					</form>
				</div>
			</section>
		</>
	)
}

export default Operaciones
