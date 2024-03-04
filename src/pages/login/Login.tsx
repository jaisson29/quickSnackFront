/** @format */

import './login.css';
import Button from '../../components/boton/Button';
import { Link, Navigate, redirect } from 'react-router-dom';
import ContEntrada from '../../components/contEntrada/ContEntrada';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import { useState } from 'react';
import Swal from 'sweetalert2';

function Login() {
	const { login, urlApi, user, authToken, instance }: any = useAuth();
	const [usuData, setUsuData] = useState({
		usuEmail: '',
		usuContra: '',
	});

	const [loading, setLoading] = useState<boolean>(false);

	async function iniciarSesion(event: any) {
		event.preventDefault();

		try {
			setLoading(true);
			const respuesta = await instance.post(`${urlApi}/api/auth/loguear`, {
				...usuData,
			});

			const loginToken = respuesta.data.token;
			await login(loginToken);
			redirect(`/${respuesta.data.pg}`);
		} catch (err: any) {
			console.log(err);
			Swal.fire({
				title: 'Error!',
				text: err.response?.data?.error ?? 'Fallo al iniciar sesión intentelo de nuevo',
				icon: 'error',
				confirmButtonText: 'Continuar',
			}).then((res) => {
				setUsuData({
					usuEmail: '',
					usuContra: '',
				});
				setLoading(false);
			});
		}
	}

	function handleInputs(event: any) {
		setUsuData({
			...usuData,
			[event.target.name]: event.target.value,
		});
	}

	if (authToken && user) return <Navigate to={`/${user?.paginaRuta}`} replace />;
	else
		return (
			<ContEntrada>
				<div className='flex flex-col items-end justify-end h-44'>
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
								value={usuData.usuEmail}
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
								autoComplete='current-password'
								type='password'
								className='input'
								onInput={handleInputs}
								value={usuData.usuContra}
								required
							/>
							<label htmlFor='usuContra' className='form-label'>
								Contraseña
							</label>
						</div>
					</div>
					<div className='w-full text-end'>
						<Link className='underline link' to='/olvid'>
							Olvido su Contraseña
						</Link>
					</div>
					<div className='flex justify-center text-center group'>
						<Button disabled={loading} twStyles='px-0 py-0'>
							<input disabled={loading} type='submit' className='h-full px-4 cursor-pointer' value='Iniciar sesión' />
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
