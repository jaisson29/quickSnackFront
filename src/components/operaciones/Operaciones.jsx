/** @format */

import { useState, useReducer } from 'react'
import './operaciones.css'

const Operaciones = () => {

	function reducer (state, action){
		
	}
	const [tipoTrs, setTipoTrs] = useState(7)
	const [transacData, setTransacData] = useState({
		
	})

	function inputHandler(event) {
		setTransacData({
			...transacData,
			[event.target.name]: event.target.value,
		})
	}

	function formHandler(event) {}

	return (
		<>
			<section className={'w-full md:w-10/12 m-auto'}>
				<div className={`card-head ${tipoTrs === 7 ? 'pr-3' : 'pl-3'}`}>
					<button className={`cardTab btn-ven ${tipoTrs === 7 && 'activeTab'}`} onClick={() => setTipoTrs(7)}>
						Venta
					</button>
					<button className={`cardTab btn-rec ${tipoTrs === 6 && 'activeTab'}`} onClick={() => setTipoTrs(6)}>
						Recarga
					</button>
				</div>
				<div className={`card-body ${tipoTrs === 7 ? 'rounded-tr-lg' : 'rounded-tl-lg'}`}>
					<form method='POST' className='' onSubmit={formHandler}>
						{/* <h1>{tipoTrs === 7 ? 'Pagando' : 'Recargando'}</h1> */}
						<div className='row'>
							<div className='w-full md:w-1/2'>
								<label htmlFor='prodValVen' className='form-label'>
									Precio de Venta
								</label>
								<input
									type='number'
									step={'any'}
									name='prodValVen'
									id='prodValVen'
									className='input'
									onInput={inputHandler}
									required
								/>
							</div>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}

export default Operaciones
