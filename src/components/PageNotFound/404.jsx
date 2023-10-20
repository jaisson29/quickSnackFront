/** @format */

import { Link } from 'react-router-dom'
import './404.css'
import Button from '../boton/Button'
import { useAuth } from '../Auth/Autenticacion'

const PageNotFound = () => {
	const { logout } = useAuth()
	return (
		<section className='w-full h-full flex flex-col items-center justify-center'>
			<h1 className=''>Page Not Found</h1>
			<Button>
				<Link to='/'>
					<i className='fa-solid fa-house'></i> Go back home.
				</Link>
			</Button>
			<Button onClick={logout}>
				<Link to='/'>
					<i className='fa-solid fa-close'></i> Logout.
				</Link>
			</Button>
		</section>
	)
}

export default PageNotFound
