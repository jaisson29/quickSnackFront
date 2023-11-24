/** @format */

import Logo from '../../assets/logoQS.svg';
import LogoNom from '../../assets/QSName.svg';
import './login.css';
import Button from '../../components/boton/Button.jsx';
import { Link, Navigate, redirect } from 'react-router-dom';
import ContEntrada from '../../components/contEntrada/ContEntrada';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import { useState } from 'react';

function Login() {
	const { login, isAuth, urlApi, user } = useAuth();
	const [usuData, setUsuData] = useState({
		usuEmail: null,
		usuContra: null,
	});

	function iniciarSesion(event) {
		event.preventDefault();

		axios
			.post(`${urlApi}/api/auth/loguear`, {
				...usuData,
			})
			.then(async (respuesta) => {
				const loginToken = respuesta.data.token;
				await login(loginToken);
				redirect(`/${respuesta.data.pg}`);
			})
			.catch((error) => {
				console.error(error);

				redirect('/');
			});
	}

	function handleInputs(event) {
		setUsuData({
			...usuData,
			[event.target.name]: event.target.value,
		});
	}

	if (isAuth) return <Navigate to={`/${user.paginaRuta}`} />;
	return (
		<ContEntrada>
			<div className='flex flex-col items-end h-44'>
				<img className='mr-8 w-28 h-28 md:mx-auto qsLogo' alt='Logo Qs' />
				<img className='w-60 h-26 md:mx-auto qsNom' alt='QuickSnack' />
			</div>
			<form action='' className='flex flex-col gap-4 px-2 mt-10' method='POST' onSubmit={iniciarSesion}>
				<div className='row'>
					<div className='form-group'>
						<input
							id='usuEmail'
							name='usuEmail'
							autoComplete='email'
							type='text'
							className='input'
							onInput={handleInputs}
							required
						/>
						<label htmlFor='usuEmail' className='form-label'>
							Correo eléctronico
						</label>
					</div>

					<div className='form-group'>
						<input
							id='usuContra'
							name='usuContra'
							autoComplete='pass'
							type='password'
							className='input'
							onInput={handleInputs}
							required
						/>
						<label htmlFor='usuContra' className='form-label'>
							Contraseña
						</label>
					</div>
				</div>
				<div className='flex justify-end'>
					<Link className='underline link' to='/recuperar'>
						Olvido su Contraseña
					</Link>
				</div>
				<div className='text-center group'>
					<Button extraClass='px-0 py-0'>
						<input type='submit' className='h-full px-4 cursor-pointer' value='Iniciar sesión' />
					</Button>
				</div>
				<div className='w-full text-center'>
					<Link className='underline link' to='/registro'>
						Crear una cuenta
					</Link>
				</div>
			</form>
		</ContEntrada>
	);
}

export default Login;
