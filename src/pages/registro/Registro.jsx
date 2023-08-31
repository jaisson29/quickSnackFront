import { useAuth } from '../../components/Auth/Autenticacion';
import ContEntrada from '../../components/contEntrada/ContEntrada';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../assets/QSLogo.webp';
import LogoNom from '../../assets/QSNom.webp';
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
        <div className='group'>
          <label htmlFor='usuEmail' className='form-label'>
            Nombre y apellido
          </label>
          <input
            id='usuEmail'
            name='usuEmail'
            autoComplete='username'
            type='email'
            className='block border border-black inputL form-control'
            onInput={handleInputs}
            required
          />
        </div>
        <div className='group'>
          <label htmlFor='usuNom' className='form-label'>
            Correo eléctronico
          </label>
          <input
            id='usuNom'
            name='usuNom'
            autoComplete='username'
            type='text'
            className='block border border-black inputL form-control'
            onInput={handleInputs}
            required
          />
        </div>
        <div className='group'>
          <label htmlFor='usuContra' className='form-label'>
            Contraseña
          </label>
          <input
            id='usuContra'
            name='usuContra'
            autoComplete='current-password'
            type='password'
            className='block border border-black inputL form-control bg-clRos'
            onInput={handleInputs}
            required
          />
        </div>
        <div className='group'>
          <div className='w-1/2'>
            <label htmlFor='usuContra' className='form-label'>
              Contraseña
            </label>
            <input
              id='usuContra'
              name='usuContra'
              autoComplete='current-password'
              type='password'
              className='block border border-black inputh form-control bg-clRos'
              onInput={handleInputs}
              required
            />
          </div>
          <div className='w-1/2'>
            <label htmlFor='usuContra' className='form-label'>
              Contraseña
            </label>
            <input
              id='usuContra'
              name='usuContra'
              autoComplete='current-password'
              type='password'
              className='block border border-black inputh form-control bg-clRos'
              onInput={handleInputs}
              required
            />
          </div>
        </div>
        <div className='group'>
          <Link className='pl-5 underline hover:text-clNar' to='/'>
            Iniciar sesión
          </Link>
        </div>
        <div className='text-center group'>
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
