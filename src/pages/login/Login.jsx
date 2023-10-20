/** @format */

import Logo from '../../assets/logoQS.svg'
import LogoNom from '../../assets/QSName.svg'
import './login.css'
import Button from '../../components/boton/Button.jsx'
import { Link, Navigate, redirect } from 'react-router-dom'
import ContEntrada from '../../components/contEntrada/ContEntrada'
import { useAuth } from '../../components/Auth/Autenticacion'
import axios from 'axios'
import { useState } from 'react'

function Login() {
	const { login, isAuth, urlApi, user } = useAuth()
	const [usuData, setUsuData] = useState({
		usuEmail: null,
		usuContra: null,
	})

	function iniciarSesion(event) {
		event.preventDefault()

		axios
			.post(`${urlApi}/api/login/loguear`, {
				...usuData,
			})
			.then((respuesta) => {
				const loginToken = respuesta.data
				login(loginToken)
				redirect(`/${user.paginaRuta}`)
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
						<label htmlFor='usuEmail' className='form-label'>
							Correo eléctronico
						</label>
						<input
							id='usuEmail'
							name='usuEmail'
							autoComplete='email'
							type='text'
							className='input'
							onInput={handleInputs}
							required
						/>
					</div>

					<div className=''>
						<label htmlFor='usuContra' className='form-label'>
							Contraseña
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
				<div className='group'>
					<Link className='pl-5 hover:text-clNar' to='/registro'>
						Crear una cuenta
					</Link>
				</div>
				<div className='group'>
					<Link className='pl-5 underline hover:text-clNar' to='/recuperar'>
						Olvido su Contraseña
					</Link>
				</div>
				<div className='text-center group'>
					<Button extraClass='px-0 py-0'>
						<input type='submit' className='cursor-pointer px-4 h-full' value='Iniciar sesión' />
					</Button>
				</div>
			</form>
		</ContEntrada>
	)
}

export default Login
