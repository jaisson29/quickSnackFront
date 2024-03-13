import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import male from '../../assets/icon-male-100.png';
import female from '../../assets/icon-female-100.png';

const UsuarioInfo = () => {
	const { user, setAuthToken, authToken, urlApi, instance }: any = useAuth();
	const inputFileRef: any = useRef(null);

	const [editable, setEditable] = useState<boolean>(false);
	const [file, setFile] = useState(null);
	const [edituse, setEdituse] = useState({
		usuId: user.usuId,
		usuNom: user.usuNom,
		usuEmail: user.usuEmail,
		usuNoDoc: user.usuNoDoc,
		usuImg: user.usuImg,
	});

	const usuImg = user.usuImg ? `${urlApi}/uploads/${user.usuImg}` : user.usuGen === 1 ? male : female;

	const toggleEdit = () => {
		setEditable(!editable);
	};
	function handleFiles(event: any) {
		setFile(event.target.files[0]);
	}

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setEdituse({
			...edituse,
			[name]: value,
		});
	};

	const handleSave = async (e: any) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('usuId', edituse.usuId);
			formData.append('usuNom', edituse.usuNom);
			formData.append('usuImg', file ?? user.usuImg);
			formData.append('usuEmail', edituse.usuEmail);
			formData.append('usuNoDoc', edituse.usuNoDoc);

			const newData = await instance.put(`${urlApi}/api/usuario/actualizarPersonal`, formData, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});

			// const newUserData = await instance.post(
			// 	`${urlApi}/api/usuario/getOne`,
			// 	{ usuId: user.usuId },
			// 	{
			// 		headers: {
			// 			Authorization: `Bearer ${authToken}`,
			// 		},
			// 	},
			// );
			setEditable(false);
			setAuthToken(newData.token);
			setFile(null);
			if (inputFileRef.current) {
				inputFileRef.current.value = '';
			}
		} catch (error) {
			console.error('error', error);
		}
	};

	return (
		<div
			className={`bg-clBlan w-96  min-h-[500px] flex flex-col justify-evenly rounded-b-lg shadow-md shadow-black/40 border-slate-300 items-center`}>
			<div className={`border flex items-center rounded-full h-40 w-40 overflow-hidden justify-center`}>
				{editable ? (
					<>
						<input
							className='hidden'
							type='file'
							id='usuImg'
							name='usuImg'
							title='imagen de usuario'
							accept='image/*'
							onChange={handleFiles}
							ref={inputFileRef}
						/>
						<label htmlFor='usuImg' className='w-full h-full'>
							<img
								className={`object-cover h-full w-full`}
								src={file ? URL.createObjectURL(file!) : usuImg}
								alt={edituse.usuNom}
							/>
						</label>
					</>
				) : (
					<img className={`object-cover h-full w-full`} src={usuImg} alt={edituse.usuNom} />
				)}
			</div>
			<div>
				<div>
					<span>
						<strong>Nombre:</strong>
						{!editable ? (
							user.usuNom
						) : (
							<input type='text' name='usuNom' value={edituse.usuNom} onChange={handleChange} />
						)}
					</span>
				</div>
				<div>
					<span>
						<strong>E-mail:</strong>
						{!editable ? (
							user.usuEmail
						) : (
							<input type='email' name='usuEmail' value={edituse.usuEmail} onChange={handleChange} />
						)}
					</span>
				</div>
				<div>
					<span>
						<strong>No. Documento:</strong>
						{!editable ? (
							user.usuNoDoc
						) : (
							<input type='text' name='usuNoDoc' value={edituse.usuNoDoc} onChange={handleChange} />
						)}
					</span>
				</div>
			</div>
			{!editable && <button onClick={toggleEdit}>Editar</button>}
			{editable && <button onClick={handleSave}>Guardar</button>}
		</div>
	);
};

export { UsuarioInfo };
