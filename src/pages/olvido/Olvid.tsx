/** @format */

import ContEntrada from '../../components/contEntrada/ContEntrada';
import { Link, Navigate, redirect } from 'react-router-dom';
import './olvido.css';
import { useState } from 'react';
import Button from '../../components/boton/Button';
import { useAuth } from '../../components/Auth/Autenticacion';
import Swal from 'sweetalert2';

function Olvid() {
	const { isAuth, urlApi, instance }: any = useAuth();
	const [emailData, setEmailData] = useState({
		usuEmail: '',
		cUsuEmail: '',
	});

	const handleForm = (e: any) => {
		e.preventDefault();
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
						<input id='usuEmail' name='usuEmail' autoComplete='usuEmail' type='mail' className='input' onInput={handleInput} required />
						<label htmlFor='usuEmail' className='form-label'>
							Correo eléctronico
						</label>
					</div>
					<div className='form-group'>
						<input id='cUsuEmail' name='cUsuEmail' autoComplete='usuEmail' type='mail' className='input' onInput={handleInput} required />
						<label htmlFor='cUsuEmail' className='form-label'>
							Confirmar Correo eléctronico
						</label>
					</div>
					<Link className='underline link' to='/'>
						Iniciar sesión
					</Link>
				</div>
				<div className='text-center row'>
					<Button>
						<input type='submit' className='cursor-pointer' value='Solicitar' />
					</Button>
				</div>
			</form>
		</ContEntrada>
	);
}

export default Olvid;
