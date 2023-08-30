import Logo from '../../assets/QSLogo.webp';
import LogoNom from '../../assets/QSNom.webp';
import './login.css';
import Button from '../../components/boton/Button.jsx';
import { Link, Navigate, redirect } from 'react-router-dom';
import ContEntrada from '../../components/contEntrada/ContEntrada';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import { useState } from 'react';

function Login() {
  const { login, isAuth } = useAuth();
  const [usuData, setUsuData] = useState({
    usuEmail: null,
    usuContra: null,
  });

  function iniciarSesion(event) {
    event.preventDefault();

    axios
      .post('http://localhost:5000/api/login/loguear', {
        ...usuData,
      })
      .then((respuesta) => {
        const loginToken = respuesta.data;
        login(loginToken);
        redirect('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        onSubmit={iniciarSesion}
      >
        <div className='group'>
          <label htmlFor='usuEmail' className='form-label'>
            Correo eléctronico
          </label>
          <input
            id='usuEmail'
            name='usuEmail'
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
            type='text'
            className='block border border-black inputL form-control'
            onInput={handleInputs}
            required
          />
        </div>
        <div className='group'>
          <Link className='pl-5' to='/register'>
            Crear una cuenta
          </Link>
        </div>
        <div className='group'>
          <Link className='pl-5' to='/register'>
            Olvido su Contraseña
          </Link>
        </div>
        <div className='text-center group'>
          <Button>
            <input type='submit' value='Iniciar sesión' />
          </Button>
        </div>
      </form>
    </ContEntrada>
  );
}

export default Login;
