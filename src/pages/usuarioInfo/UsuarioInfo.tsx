import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/Auth/Autenticacion';
import male from '../../assets/icon-male-100.png';
import female from '../../assets/icon-female-100.png';

const UsuarioInfo = () => {
    const { user, setUser, authToken, urlApi, instance }: any = useAuth();
	const inputFileRef: any = useRef(null);

    const [editable, setEditable] = useState<boolean>(false);
    const [file, setFile] = useState(null);
    const [edituse, setEdituse] = useState({
        usuId: user.usuId,
        usuNom: user.usuNom,
        usuEmail: user.usuEmail,
        usuNoDoc: user.usuNoDoc,
        usuImg: user.usuImg
    });

    const usuImg = user.usuImg ? `${urlApi}/uploads/${user.usuImg}` : user.usuGen === 1 ? male : female;

    const toggleEdit = () => {
        setEditable(!editable);
    };
    function handleFiles(event: any) {
		setFile(event.target.files[0]);
	};

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setEdituse({
            ...edituse,
            [name]: value
        });
    };
    // const formData = new FormData();
    // formData.append('usuId', edituse.usuId);
    // formData.append('usuNom', edituse.usuNom);
    // formData.append('usuEmail', edituse.usuEmail);
    // formData.append('usuNoDoc', edituse.usuNoDoc);

    const handleSave = async (e: any) => {
        e.preventDefault();    
        try {
    // formData.append('usuNoDoc', edituse.usuNoDoc);

            const response = await instance.put(`${urlApi}/api/usuario/actualizar`, edituse, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
    
            console.log(response.data);
            setEditable(false);
            setUser(edituse);
            setFile(null);
            if (inputFileRef.current) {
                inputFileRef.current.value = '';
            }
        } catch (error) {
            console.error('error', error);
        }
    };

    return (
        <div className={`bg-clBlan w-96  min-h-[500px] flex flex-col justify-evenly rounded-b-lg shadow-md shadow-black/40 border-slate-300 items-center`}>
            <div className={`border flex h-full items-center rounded-full h-40 w-40 overflow-hidden justify-center items-center`}>
    
                {editable ? 
                    <input type="file" name="usuImg" accept="image/*" onChange={handleFiles} ref={inputFileRef}/>
                    : <img className={`object-cover h-full `} src={usuImg} alt={edituse.usuNom} />}
            </div>
            <div>
                <div>
                    <span>
                        <strong>Nombre:</strong>
                        {!editable ? user.usuNom : <input type="text" name="usuNom" value={edituse.usuNom} onChange={handleChange} />}
                    </span>
                </div>
                <div>
                    <span>
                        <strong>E-mail:</strong>
                        {!editable ? user.usuEmail : <input type="email" name="usuEmail" value={edituse.usuEmail} onChange={handleChange} />}
                    </span>
                </div>
                <div>
                    <span>
                        <strong>No. Documento:</strong>
                        {!editable ? user.usuNoDoc : <input type="text" name="usuNoDoc" value={edituse.usuNoDoc} onChange={handleChange} />}
                    </span>
                </div>
            </div>
            {!editable && <button onClick={toggleEdit}>Editar</button>}
            {editable && <button onClick={handleSave}>Guardar</button>}
        </div>
    );
};

export { UsuarioInfo };