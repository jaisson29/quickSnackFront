/** @format */

import Logo from '../../assets/logoQS.svg'
import LogoNom from '../../assets/QSName.svg'
import './restablecer.css'
import Button from '../../components/boton/Button.jsx'
import { Link, Navigate, redirect } from 'react-router-dom'
import ContEntrada from '../../components/contEntrada/ContEntrada'
import { useAuth } from '../../components/Auth/Autenticacion'
import axios from 'axios'
import { useState } from 'react'

function Reset() {
	const { login, isAuth, urlApi, user } = useAuth()
	const [usuData, setUsuData] = useState({
		usuEmail: null,
		usuContra: null,
	})

	function iniciarSesion(event) {
		event.preventDefault()

		axios
			.post(`${urlApi}/api/auth/loguear`, {
				...usuData,
			})
			.then(async (respuesta) => {
				const loginToken = respuesta.data.token
				await login(loginToken)
				redirect(`/${respuesta.data.pg}`)
			})
			.catch((error) => {
				console.error(error)

				redirect('/')
			})
	}

	function handleInputs(event) {
		setUsuData({
			...usuData,
			[event.target.name]: event.target.value,
		})
	}

	if (isAuth) return <Navigate to={`/${user.paginaRuta}`} />
	return (
		<ContEntrada>
			<div className='text-center'>
				<img className='mx-auto w-28 h-28' src={Logo} alt=''></img>
				<img className='mx-auto w-60 h-26' src={LogoNom} alt='' />
			</div>
			<form action='' className='flex flex-col gap-4 my-2' method='POST' onSubmit={iniciarSesion}>
				<div className='row'>
					<div className=''>
						<label htmlFor='usuContra' className='form-label'>
							Nueva Contraseña
						</label>
						<input
							id='usuContra'
							name='usuContra'
							autoComplete='pass'
							type='password'
							className='input'
							onInput={handleInputs}
							required
						/>
					</div><div className=''>
						<label htmlFor='usuContra' className='form-label'>
							Confirmar nueva contraseña
						</label>
						<input
							id='usuContra'
							name='usuContra'
							autoComplete='pass'
							type='password'
							className='input'
							onInput={handleInputs}
							required
						/>
					</div>
				</div>
				<div className='text-center group'>
					<Button extraClass='px-0 py-0'>
						<input type='submit' className='h-full px-4 cursor-pointer' value='Confirmar' />
					</Button>
				</div>
			</form>
		</ContEntrada>
	)
}

export default Reset
