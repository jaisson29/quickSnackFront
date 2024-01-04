/** @format */

import React from 'react'
import Button from '../boton/Button'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	componentDidCatch(error, errorInfo) {
		// Puedes registrar el error a un servicio de reporte de errores
		console.log(error)
		console.log(errorInfo)
		this.setState({ hasError: true })
	}

	render() {
		if (this.state.hasError) {
			// Puedes renderizar cualquier interfaz de respaldo
			return (
				<>
					<h1>Algo salió mal.</h1>
					<Button>
						<Link to={'/'}>
							<i className='fa-soli fa-close'></i> Cerrar sesión
						</Link>
					</Button>
				</>
			)
		}

		return this.props.children
	}
}
