import ContEntrada from '../../components/contEntrada/ContEntrada';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoQS.svg';
import './registro.css';
import LogoNom from '../../assets/QSNom.png';
import { useState } from 'react';
import Button from '../../components/boton/Button';
import axios from 'axios';
import { useAuth } from '../../components/Auth/Autenticacion';

function Registro() {
  const navigate = useNavigate();
  const { isAuth, urlApi, authToken } = useAuth();
  const [usuData, setUsuData] = useState({
    usuTipoDoc: null,
    usuGen: null,
    usuNom: null,
    usuEmail: null,
    usuContra: null,
    usuIngreso: null,
  });
  // const [valor, setValor] = useState(null);

  const crearUsu = (e) => {
    e.preventDefault();

    axios
      .post(`${urlApi}/api/login/crearUsu`, usuData, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((respuesta) => {
        console.log(respuesta);
        if (respuesta.status === 200) {
          console.log('object');
          navigate('/');
        } else {
          console.error('no se pudo registrar');
        }
      })
      .catch((error) => {
        redirect('/registro');
        console.error('error', error);
      });
  };

  function handleInputs(event) {
    setUsuData({
      ...usuData,
      [event.target.name]: event.target.value,
    });
    console.log(usuData);
  }

  if (isAuth) return <Navigate to='/menu' />;
  return (
    <ContEntrada>
      <div className='text-center'>
        <img className='mx-auto w-28 h-28' src={Logo} alt=''></img>
        <img className='mx-auto w-60 h-26' src={LogoNom} alt='' />
      </div>
      <form
        className='flex flex-col gap-4 my-4'
        method='POST'
        onSubmit={crearUsu}
      >
        <div className='row'>
          <div className='group md:w-1/2'>
            <label htmlFor='usuNom' className='form-label'>
              Nombre y apellido
            </label>
            <input
              id='usuNom'
              name='usuNom'
              autoComplete='usuNom'
              type='text'
              className='block border border-black inputL form-control'
              onInput={handleInputs}
              required
            />
          </div>
          <div className='group md:w-1/2'>
            <label htmlFor='usuTipoDoc' className='form-label'>
              Tipo de documento
            </label>
            <select
              id='usuTipoDoc'
              name='usuTipoDoc'
              autoComplete='current-password'
              type='password'
              className='inputh inputSelect'
              onChange={handleInputs}
              defaultValue=''
              required
            >
              <option value='' defaultChecked>
                Tipo de documento
              </option>
              <option value='3'>Targeta de identidad</option>
              <option value='4'>Cedula de ciudadania</option>
              <option value='5'>Cedula de extranjeria</option>
            </select>
          </div>
          <div className='group md:w-1/2'>
            <label htmlFor='usuNoDoc' className='form-label'>
              Numero de documento
            </label>
            <input
              type='text'
              id='usuNoDoc'
              name='usuNoDoc'
              autoComplete='usuNoDoc'
              className='inputL form-control'
              onInput={handleInputs}
              required
            />
          </div>
          <div className='group md:w-1/2'>
            <label htmlFor='usuEmail' className='form-label'>
              Correo eléctronico
            </label>
            <input
              id='usuEmail'
              name='usuEmail'
              autoComplete='usuEmail'
              type='email'
              className='block border border-black inputL form-control'
              onInput={handleInputs}
              required
            />
          </div>
          <div className='group md:w-1/2'>
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
          <div className='group md:w-1/2'>
            <input
              id='masculino'
              name='usuGen'
              type='radio'
              className='inputR'
              value={1}
              onChange={handleInputs}
              required
            />
            <label htmlFor='femenino' className='form-label'>
              Masculino
            </label>
            <input
              id='femenino'
              name='usuGen'
              type='radio'
              className='inputR'
              value={2}
              onChange={handleInputs}
              required
            />
            <label htmlFor='masculino' className='form-label'>
              Femenino
            </label>
          </div>
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
