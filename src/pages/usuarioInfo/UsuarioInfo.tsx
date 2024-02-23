/** @format */

import { useAuth } from '../../contexts/Auth/Autenticacion';
import male from '../../assets/icon-male-100.png';
import female from '../../assets/icon-female-100.png';

const UsuarioInfo = () => {
	const { user, urlApi }: any = useAuth();

	const usuImg = user.usuImg ? `${urlApi}/uploads/${user.usuImg}` : user.usuGen === 1 ? male : female;

	return (
		<div className={`bg-clBlan`}>
			<img className={`h-10 w-10 object-cover`} src={usuImg} alt={user.usuNom} />
			<span>{user.usuNoDoc}</span>
			{/* <span>{user.usuTipoDoc}</span> */}
		</div>
	);
};

export { UsuarioInfo };

