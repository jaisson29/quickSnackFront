/** @format */

import { useState } from 'react'
import './operaciones.css'

const Operaciones = () => {
	const [tipoTrs, setTipoTrs] = useState(7)
	function formHandler(event) {}

	return (
		<>
			<section className={'w-full md:w-10/12 m-auto'}>
				<div className='flex w-full gap-10 align-items-end card-head'>
					<button className={`cardTab btn-ven ${tipoTrs === 7 && "activeTab"}`} onClick={() => setTipoTrs(7)}>
						Venta
					</button>
					<button className={`cardTab btn-rec ${tipoTrs === 6 && "activeTab"}`} onClick={() => setTipoTrs(6)}>
						Recarga
					</button>
				</div>
				<div className='card-body'>
					<form method='POST' className='' onSubmit={formHandler}>
						<h1>{tipoTrs === 7 ? 'Pagando' : 'Recargando'}</h1>
					</form>
				</div>
			</section>
		</>
	)
}

export default Operaciones
