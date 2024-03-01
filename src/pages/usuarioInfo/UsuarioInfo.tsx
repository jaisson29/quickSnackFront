/** @format */

import { useAuth } from '../../contexts/Auth/Autenticacion';
import male from '../../assets/icon-male-100.png';
import female from '../../assets/icon-female-100.png';

const UsuarioInfo = () => {
	const { user, urlApi }: any = useAuth();

	const usuImg = user.usuImg ? `${urlApi}/uploads/${user.usuImg}` : user.usuGen === 1 ? male : female;

	return (
		<div className={`bg-clBlan grid grid-cols-2`}>
			<div className={`flex justify-center items-center`}>
				<img className={`h-{70} w-{40} object-cover`} src={usuImg} alt={user.usuNom} />
			</div>
			<div>
				<div>
					<span>
						<strong>Nombre:</strong><br />{user.usuNom}
					</span>
				</div>
				<div>
					<span>
						<strong>E-mail:</strong><br />{user.usuEmail}
					</span>
				</div>
				<div>
					<span> 
						<strong> No. Documento: </strong><br /> {user.usuNoDoc}
					</span>
				</div>
			</div>
		</div>
	);
};

export { UsuarioInfo };

