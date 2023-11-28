/** @format */

import ContEntrada from '../../components/contEntrada/ContEntrada';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoQS.svg';
import './olvido.css';
import LogoNom from '../../assets/QSName.svg';
import { useState } from 'react';
import Button from '../../components/boton/Button';
import { useAuth } from '../../components/Auth/Autenticacion';
import Swal from 'sweetalert2';

function Olvid() {
	const navigate = useNavigate();
	const { isAuth, urlApi, authToken, instance } = useAuth();
	const [emailData, setEmailData] = useState({
		usuEmail: '',
		cUsuEmail: '',
	});

	const handleForm = (e) => {
		e.preventDefault();
		instance
			.post(`${urlApi}/api/auth/forgotPass`, emailData)
			.then((respuesta) => {
				console.log(respuesta);
				Swal.fire({
					title: 'Error!',
					text: 'Do you want to continue',
					icon: 'success',
					confirmButtonText: 'Cool',
				});
			})
			.catch((error) => {
				redirect('/registro');
				console.error('error', error);
			});
	};

	function handleInput(event) {
		setEmailData({
			...emailData,
			[event.target.name]: event.target.value,
		});
	}

	if (isAuth) return <Navigate to='/' />;
	return (
		<ContEntrada>
			<div className='text-center'>
				<img className='mx-auto w-28 h-28' src={Logo} alt=''></img>
				<img className='mx-auto w-60 h-26' src={LogoNom} alt='' />
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
						/>
						<label htmlFor='usuEmail' className='form-label'>
							Correo eléctronico
						</label>
					</div>
					<div className='form-group'>
						<input
							id='cUsuEmail'
							name='cUsuEmail'
							autoComplete='usuEmail'
							type='mail'
							className='input'
							onInput={handleInput}
							required
						/>
						<label htmlFor='cUsuEmail' className='form-label'>
							Confirmar Correo eléctronico
						</label>
					</div>
					<Link className='pl-5 my-3 underline hover:text-clNar' to='/'>
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
