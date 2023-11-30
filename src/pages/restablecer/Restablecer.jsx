/** @format */

import './restablecer.css';
import Button from '../../components/boton/Button.jsx';
import { Navigate, redirect, useParams, useNavigate } from 'react-router-dom';
import ContEntrada from '../../components/contEntrada/ContEntrada';
import { useAuth } from '../../components/Auth/Autenticacion';
import { useState } from 'react';
import Swal from 'sweetalert2';

function Reset() {
	const { isAuth, urlApi, instance } = useAuth();
	const [passData, setPassData] = useState({
		usuEmail: null,
		usuContra: null,
	});
	const params = useParams();
	const navigate = useNavigate();

	const handleForm = (event) => {
		event.preventDefault();

		instance
			.post(`${urlApi}/api/auth/resetPass`, passData, {
				headers: {
					Authorization: `Bearer ${params.token}`,
				},
			})
			.then(async (respuesta) => {
				Swal.fire({
					title: 'Exito!',
					text: respuesta.data.message,
					icon: 'success',
					confirmButtonText: 'Continuar',
				}).then((res) => {
					if (res?.isConfirmed) {
						navigate('/');
					}
				});
			})
			.catch((error) => {
				Swal.fire({
					title: 'Error!',
					text: error.message,
					icon: 'error',
					confirmButtonText: 'Continuar',
				}).then((res) => {
					if (res.isConfirmed()) {
						navigate('/');
					}
				});
			});
	};

	const handleInput = (event) => {
		setPassData({
			...passData,
			[event.target.name]: event.target.value,
		});
	};

	if (isAuth) return <Navigate to={`/`} />;
	return (
		<ContEntrada>
			<div className='text-center'>
				<img className='mx-auto w-28 h-28 qsLogo' alt=''></img>
				<img className='mx-auto w-60 h-26 qsNom' alt='' />
			</div>
			<form action='' className='flex flex-col gap-4 my-2' method='POST' onSubmit={handleForm}>
				<div className='row'>
					<div className='form-group'>
						<input
							id='usuContra'
							name='usuContra'
							autoComplete='pass'
							type='password'
							className='input'
							onInput={handleInput}
							required
						/>
						<label htmlFor='usuContra' className='form-label'>
							Nueva Contraseña
						</label>
					</div>
					<div className='form-group'>
						<input
							id='usuContra'
							name='usuContra'
							autoComplete='pass'
							type='password'
							className='input'
							onInput={handleInput}
							required
						/>
						<label htmlFor='usuContra' className='form-label'>
							Confirmar nueva contraseña
						</label>
					</div>
				</div>
				<div className='text-center group'>
					<Button extraClass='px-0 py-0'>
						<input type='submit' className='h-full px-4 cursor-pointer' value='Confirmar' />
					</Button>
				</div>
			</form>
		</ContEntrada>
	);
}

export default Reset;
