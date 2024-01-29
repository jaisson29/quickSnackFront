/** @format */

import './restablecer.css';
import Button from '../../components/boton/Button';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import ContEntrada from '../../components/contEntrada/ContEntrada';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import { useState } from 'react';
import Swal from 'sweetalert2';

function Reset() {
	const { isAuth, urlApi, instance }: any = useAuth();
	const [passData, setPassData] = useState({
		usuEmail: null,
		usuContra: null,
	});
	const params = useParams();
	const navigate = useNavigate();

	const handleForm = (event: any) => {
		event.preventDefault();

		instance
			.post(`${urlApi}/api/auth/resetPass`, passData, {
				headers: {
					Authorization: `Bearer ${params.token}`,
				},
			})
			.then(async (respuesta: any) => {
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
			.catch((error: any) => {
				Swal.fire({
					title: 'Error!',
					text: error.message,
					icon: 'error',
					confirmButtonText: 'Continuar',
				}).then((res) => {
					if (res.isConfirmed) {
						navigate('/');
					}
				});
			});
	};

	const handleInput = (event: any) => {
		setPassData({
			...passData,
			[event.target.name]: event.target.value,
		});
	};

	if (isAuth) return <Navigate to={`/`} />;
	return (
		<ContEntrada>
			<div className='flex flex-col items-end h-44'>
				<img className='mr-8 w-28 h-28 md:mx-auto qsLogo' alt='Logo Qs' />
				<img className='w-60 h-26 md:mx-auto qsNom' alt='QuickSnack' />
			</div>
			<form action='' className='flex flex-col gap-4 my-2' method='POST' onSubmit={handleForm}>
				<div className='row'>
					<div className='form-group'>
						<input id='usuContra' name='usuContra' autoComplete='pass' type='password' className='input' onInput={handleInput} required />
						<label htmlFor='usuContra' className='form-label'>
							Nueva Contraseña
						</label>
					</div>
					<div className='form-group'>
						<input id='usuContra' name='usuContra' autoComplete='pass' type='password' className='input' onInput={handleInput} required />
						<label htmlFor='usuContra' className='form-label'>
							Confirmar nueva contraseña
						</label>
					</div>
				</div>
				<div className='text-center group'>
					<Button twStyles='px-0 py-0'>
						<input type='submit' className='h-full px-4 cursor-pointer' value='Confirmar' />
					</Button>
				</div>
			</form>
		</ContEntrada>
	);
}

export default Reset;

