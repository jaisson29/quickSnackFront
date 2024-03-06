/** @format */

import { useAuth } from '../../contexts/Auth/Autenticacion';
import male from '../../assets/icon-male-100.png';
import female from '../../assets/icon-female-100.png';
import { useState } from 'react';

const UsuarioInfo = () => {
	const { user, urlApi }: any = useAuth();

	const [editable, setEditable] = useState<boolean>(false);

	const usuImg = user.usuImg ? `${urlApi}/uploads/${user.usuImg}` : user.usuGen === 1 ? male : female;

	const toggleEdit = () => {
		setEditable(!editable);
	};

	return (
		<div
			className={`bg-clBlan w-96  min-h-[500px] flex flex-col justify-evenly rounded-b-lg shadow-md shadow-black/40 border-slate-300 items-center`}>
			<div
				className={`border flex h-full items-center rounded-full h-40 w-40 overflow-hidden justify-center items-center`}>
				<img className={`object-cover h-full `} src={usuImg} alt={user.usuNom} />
			</div>
			<div>
				<div>
					<span>
						<strong>Nombre:</strong>
						{user.usuNom}
					</span>
				</div>
				<div>
					<span>
						<strong>E-mail:</strong>
						{user.usuEmail}
					</span>
				</div>
				<div>
					<span>
						<strong> No. Documento: </strong>
						{user.usuNoDoc}
					</span>
				</div>
			</div>
			{!editable && <button onClick={toggleEdit}>Editar</button>}
		</div>
	);
};

export { UsuarioInfo };
