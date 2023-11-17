/** @format */

import ContEntrada from '../../components/contEntrada/ContEntrada';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoQS.svg';
import './olvido.css';
import LogoNom from '../../assets/QSName.svg';
import { useState } from 'react';
import Button from '../../components/boton/Button';
import axios from 'axios';
import { useAuth } from '../../components/Auth/Autenticacion';

function Olvid() {
	const navigate = useNavigate();
	const { isAuth, urlApi, authToken } = useAuth();
	const [usuData, setUsuData] = useState({
		usuTipoDoc: null,
		usuGen: null,
		usuNom: null,
		usuEmail: null,
		usuContra: null,
		usuIngreso: null,
	});
	// const [valor, setValor] = useState(null);

	const crearUsu = (e) => {
		e.preventDefault();
		alert('se pulso ');
		axios
			.post(`${urlApi}/api/auth/crearUsu`, usuData, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((respuesta) => {
				console.log(respuesta);
				if (respuesta.status === 200) {
					navigate('/');
				} else {
					console.error('no se pudo registrar');
				}
			})
			.catch((error) => {
				redirect('/registro');
				console.error('error', error);
			});
	};

	function handleInputs(event) {
		setUsuData({
			...usuData,
			[event.target.name]: event.target.value,
		});
	}

	if (isAuth) return <Navigate to='/menu' />;
	return (
		<ContEntrada>
			<div className='text-center'>
				<img className='mx-auto w-28 h-28' src={Logo} alt=''></img>
				<img className='mx-auto w-60 h-26' src={LogoNom} alt='' />
			</div>
			<form className='flex flex-col gap-4 my-4' method='POST' onSubmit={crearUsu}>
				<div className='row'>
					<div className='w-full group'>
						<label htmlFor='usuEmail' className='form-label'>
							Correo eléctronico
						</label>
						<input
							id='usuEmail'
							name='usuEmail'
							autoComplete='usuEmail'
							type='email'
							className='block border border-black input'
							onInput={handleInputs}
							required
						/>
					</div>
					<div className='w-full group'>
						<label htmlFor='usuEmail' className='form-label'>
							Confirmar Correo eléctronico
						</label>
						<input
							id='cusuEmail'
							name='cusuEmail'
							autoComplete='cusuEmail'
							type='email'
							className='block border border-black input'
							onInput={handleInputs}
							required
						/>
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
