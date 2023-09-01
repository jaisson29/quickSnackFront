import { useAuth } from '../../components/Auth/Autenticacion';
import ContEntrada from '../../components/contEntrada/ContEntrada';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../assets/logoQS.svg';
import LogoNom from '../../assets/QSNom.png';
import { useState } from 'react';
import Button from '../../components/boton/Button';

function Registro() {
  const { isAuth } = useAuth;
  const [usuData, setUsuData] = useState({});

  const crearUsu = () => {};

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
      <form
        action=''
        className='flex flex-col gap-4'
        method='POST'
        onSubmit={crearUsu}
      >
        <div className='row'>
          <label htmlFor='usuNom' className='form-label'>
            Nombre y apellido
          </label>
          <input
            id='usuNom'
            name='usuNom'
            autoComplete='usuNom'
            type='email'
            className='block border border-black inputL form-control'
            onInput={handleInputs}
            required
          />
        </div>
        <div className='row'>
          <label htmlFor='usuEmail' className='form-label'>
            Correo eléctronico
          </label>
          <input
            id='usuEmail'
            name='usuEmail'
            autoComplete='usuEmail'
            type='text'
            className='block border border-black inputL form-control'
            onInput={handleInputs}
            required
          />
        </div>
        <div className='row'>
          <label htmlFor='usuContra' className='form-label'>
            Contraseña
          </label>
          <input
            id='usuContra'
            name='usuContra'
            autoComplete='off'
            type='password'
            className='inputL'
            onInput={handleInputs}
            required
          />
        </div>
        <div className='row'>
          <div className='group'>
            <label htmlFor='genero' className='form-label'>
              Genero
            </label>
            <input
              id='usuGen'
              name='usuGen'
              autoComplete='current-password'
              type='password'
              className='inputh'
              onInput={handleInputs}
              required
            />
          </div>
          <div className=' group'>
            <div className='group'>
              <label htmlFor='usuTipoDoc' className='form-label'>
                Tipo de docuemnto
              </label>
              <input
                id='usuTipoDoc'
                name='usuTipoDoc'
                autoComplete='current-password'
                type='password'
                className='inputh'
                onInput={handleInputs}
                required
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <Link className='pl-5 underline hover:text-clNar' to='/'>
            Iniciar sesión
          </Link>
        </div>
        <div className='text-center row'>
          <Button>
            <input
              type='submit'
              className='cursor-pointer'
              value='Registrarse'
            />
          </Button>
        </div>
      </form>
    </ContEntrada>
  );
}

export default Registro;
