/** @format */

import ContEntrada from '../../components/contEntrada/ContEntrada';
import { Link, Navigate, redirect } from 'react-router-dom';
import './olvido.css';
import { useState } from 'react';
import Button from '../../components/boton/Button';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import Swal from 'sweetalert2';

function Olvid() {
	const { isAuth, urlApi, instance }: any = useAuth();
	const [isDisabled, setIsDisabled] = useState(true);
	const [emailData, setEmailData] = useState({
		usuEmail: '',
		// cUsuEmail: '',
	});

	const handleForm = (e: any) => {
		e.preventDefault();
		setIsDisabled(false);
		instance
			.post(`${urlApi}/api/auth/forgotPass`, emailData)
			.then((respuesta: any) => {
				console.log(respuesta);
				Swal.fire({
					title: 'Enviado',
					text: respuesta.data.message,
					icon: 'success',
					confirmButtonText: 'Continuar',
				});
			})
			.catch((error: any) => {
				redirect('/registro');
				console.error('error', error);
			});
	};

	function handleInput(event: any) {
		setEmailData({
			...emailData,
			[event.target.name]: event.target.value,
		});
	}

	if (isAuth) return <Navigate to='/' />;
	return (
		<ContEntrada>
			<div className='flex flex-col items-end justify-end h-44'>
				<img className='mr-8 w-28 h-28 md:mx-auto qsLogo' alt='Logo Qs' />
				<img className='w-60 h-26 md:mx-auto qsNom' alt='QuickSnack' />
			</div>
			<form className='flex flex-col gap-4 my-4' method='POST' onSubmit={handleForm}>
				<div className='row'>
					<div className='form-group'>
						<input
							id='usuEmail'
							name='usuEmail'
							autoComplete='usuEmail'
							type='mail'
							className='input'
							onInput={handleInput}
							required
							readOnly={!isDisabled}
						/>
						{isDisabled && (
							<label htmlFor='usuEmail' className='form-label'>
								Correo eléctronico
							</label>
						)}
					</div>
					<Link className='underline link' to='/'>
						Iniciar sesión
					</Link>
				</div>
				<div className='flex justify-center text-center row'>
					{isDisabled && (
						<Button disabled={isDisabled}>
							<input type='submit' className='cursor-pointer' value='Solicitar' />
						</Button>
					)}

					{!isDisabled && (
						<span className='bg-green-200 rounded-2xl ring-2 ring-offset-2 ring-green-400'>
							El mensaje de recuperación esta siendo enviado a el correo proporcionado anteriormente
						</span>
					)}
				</div>
			</form>
		</ContEntrada>
	);
}

export default Olvid;
