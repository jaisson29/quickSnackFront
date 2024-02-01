/** @format */

import ContEntrada from '../../components/contEntrada/ContEntrada';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import './registro.css';
import { useState } from 'react';
import Button from '../../components/boton/Button';
import { useAuth } from '../../contexts/Auth/Autenticacion';

function Registro() {
	const navigate = useNavigate();
	const { isAuth, urlApi, authToken, instance }: any = useAuth();
	const [usuData, setUsuData] = useState({
		usuTipoDoc: null,
		usuGen: null,
		usuNom: null,
		usuEmail: null,
		usuContra: null,
		usuIngreso: null,
	});

	const crearUsu = (e: any) => {
		e.preventDefault();
		instance
			.post(`${urlApi}/api/auth/crearUsu`, usuData, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta: any) => {
				console.log(respuesta);
				if (respuesta.status === 200) {
					navigate('/');
				} else {
					console.error('no se pudo registrar');
				}
			})
			.catch((error: any) => {
				redirect('/registro');
				console.error('error', error);
			});
	};

	function handleInputs(event: any) {
		setUsuData({
			...usuData,
			[event.target.name]: event.target.value,
		});
	}

	if (isAuth) return <Navigate to='/menu' />;
	return (
		<ContEntrada>
			<div className='flex flex-col items-end justify-end h-44'>
				<img className='mr-8 w-28 h-28 md:mx-auto qsLogo' alt='Logo Qs' />
				<img className='w-60 h-26 md:mx-auto qsNom' alt='QuickSnack' />
			</div>
			<form className='flex flex-col gap-4 my-4' method='POST' onSubmit={crearUsu}>
				<div className='row'>
					<div className='w-full form-group'>
						<input id='usuNom' name='usuNom' autoComplete='username' type='text' className='input' onInput={handleInputs} required />
						<label htmlFor='usuNom' className='form-label'>
							Nombre completo
						</label>
					</div>
					<div className='radio md:w-1/2'>
						<div className='form-check form-check-inline'>
							<input id='masculino' name='usuGen' type='radio' className='input-radio form-check-input' value={1} onChange={handleInputs} required />
							<label htmlFor='femenino' className='form-label'>
								Masculino
							</label>
						</div>
						<div className='form-check form-check-inline'>
							<input id='femenino' name='usuGen' type='radio' className='input-radio form-check-input' value={2} onChange={handleInputs} required />
							<label htmlFor='masculino' className='form-label'>
								Femenino
							</label>
						</div>
					</div>
					<div className='md:w-1/2'>
						<select
							id='usuTipoDoc'
							name='usuTipoDoc'
							title='Seleccione su tipo de documento'
							autoComplete='current-password'
							className='input inputSelect'
							onChange={handleInputs}
							defaultValue=''
							required>
							<option value='3'>Tarjeta de identidad</option>
							<option value='4'>Cedula de ciudadania</option>
							<option value='5'>Cedula de extranjeria</option>
						</select>
					</div>
					<div className='w-full form-group'>
						<input type='text' id='usuNoDoc' name='usuNoDoc' className='input' onInput={handleInputs} required />
						<label htmlFor='usuNoDoc' className='form-label'>
							Numero de documento
						</label>
					</div>
					<div className='w-full form-group'>
						<input id='usuEmail' name='usuEmail' autoComplete='email' type='email' className='input' onInput={handleInputs} required />
						<label htmlFor='usuEmail' className='form-label'>
							Correo eléctronico
						</label>
					</div>
					<div className='w-full form-group'>
						<input id='usuContra' name='usuContra' autoComplete='off' type='password' className='input' onInput={handleInputs} required />
						<label htmlFor='usuContra' className='form-label'>
							Contraseña
						</label>
					</div>
					<Link className='underline link' to='/'>
						Iniciar sesión
					</Link>
				</div>
				<div className='text-center row'>
					<Button>
						<input type='submit' className='cursor-pointer' value='Registrarse' />
					</Button>
				</div>
			</form>
		</ContEntrada>
	);
}

export default Registro;