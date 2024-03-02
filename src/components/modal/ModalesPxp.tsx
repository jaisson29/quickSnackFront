import { useEffect, useState } from 'react';
import Button from '../boton/Button';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/Auth/Autenticacion';

function Modales({ titu, perfilId, paginas }: any) {
	const { urlApi, instance, authToken }: any = useAuth();
	const [show, setShow] = useState(false);

	const [pxp, setPxp] = useState<any[]>([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const formpxpHandler = async (e: any) => {
		e.preventDefault();
		const pagpef = {
			perfilId: e.target.perfilId.value,
			pxp: [],
		};

		for (let i = 0; i < e.target.chk.length; i++) {
			if (e.target.chk[i].checked) {
				pagpef.pxp.push(e.target.chk[i].value as never);
			}
		}

		const result = await instance.post(`${urlApi}/api/perfil/createPxP`, pagpef, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		handleClose();
		console.log(result);
	};

	useEffect(() => {
		const getPxp = async () => {
			const response = await instance.get(`${urlApi}/api/perfil/selPxP/${perfilId}`, {
				Headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});

			setPxp(response.data.map((item: any) => item.paginaId));
		};

		getPxp();
	}, [perfilId, urlApi, instance, authToken]);
	return (
		<>
			<Button onClick={handleShow}>
				<i className='fa-solid fa-list-check'></i>
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>{titu}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={formpxpHandler} className='flex flex-wrap'>
						{paginas?.map((pag: any) => {
							return (
								<div className='flex items-center w-full md:w-1/2' key={pag.paginaId}>
									<input
										type='checkbox'
										name={`chk`}
										placeholder='pagina'
										className=''
										value={`${pag.paginaId}`}
										defaultChecked={pxp.includes(pag.paginaId)}
									/>
									<span className='flex justify-start'>
										<i className={`fa ${pag.paginaIcon}`}></i>
										{pag.paginaNom}
									</span>
								</div>
							);
						})}
						<input type='hidden' name='perfilId' value={perfilId} />
						<Button type='submit'>Actualizar</Button>
					</form>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button variant='secondary' onClick={handleClose}>
						Cerrar
					</Button>
					<Button variant='primary' onClick={handleClose}>
						Guardar
					</Button> */}
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Modales;
