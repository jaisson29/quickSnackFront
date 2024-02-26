import { useEffect, useState } from 'react';
import { Dominio as domType } from '../../types';
import Button from '../../components/boton/Button';
import { useAuth } from '../../contexts/Auth/Autenticacion';

const Dominio = () => {
	const { instance, urlApi }: any = useAuth();

	const [domData, setDomData] = useState<domType>({ domId: 0, domNom: '' });
	const [dominios, setDominios] = useState<domType[]>([]);

	const formHandler = () => {};

	const inputHandler = () => {};

	useEffect(() => {
		const obtenerDominio = async () => {
			try {
				const dominios = instance.get(`${urlApi}/api/dominio/getAll`);
			} catch (_error) {}
		};

		obtenerDominio();
	}, []);

	return (
		<>
			<form method='post' onSubmit={formHandler} encType='multipart/form-data'>
				<div className='row'>
					<div className='w-full md:w-1/2'>
						<label htmlFor='prodNom' className='form-label'>
							Nombre de el producto
						</label>
						<input
							type='text'
							name='prodNom'
							id='prodNom'
							className='input'
							onInput={inputHandler}
							value={domData.domNom}
							required
						/>
					</div>
				</div>
				<div className='row'>
					<Button>
						<input
							className='cursor-pointer'
							id='prodSubBtn'
							type='submit'
							value={domData.domId ? 'Actualizar' : 'Crear'}
						/>
					</Button>
				</div>
			</form>
			<div></div>
		</>
	);
};

export { Dominio };
