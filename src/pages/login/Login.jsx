import Logo from '../../assets/QSLogo.svg'
import NavBar from '../../components/navbar/navBar'
import './login.css'


function Log() {
  return (
    <>

      <NavBar page="login" />
      <div className='loginContainer'>
        <h1 className='text-red'>W</h1>
        <h2>W</h2>
        <h3>W</h3>
        <h4>W</h4>
        <h5>W</h5>
        <h6>W</h6>
        <img src={Logo} alt=''></img>
      </div>
    </>
  )
}

export default Log
