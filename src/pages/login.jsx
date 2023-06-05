import React from 'react'
import Logo from '../assets/QSLogo.svg'
import '../css/login.css'


const Login = () => {
  let nombre = "Duvan Guayabero"
  return (
    <div className='loginContainer'>
      <h1>W</h1>
      <h1>W</h1>
      <img src={Logo} alt=''></img>
      <p>{nombre}</p>
    </div>
  )
}

export default Login
