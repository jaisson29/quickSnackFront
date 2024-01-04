/** @format */

import { Link } from 'react-router-dom'
import './404.css'
import Button from '../../components/boton/Button'
import { useAuth } from '../../components/Auth/Autenticacion'

const PageNotFound = () => {
	const { logout }: any = useAuth()
	return (
		<section className='flex flex-col items-center justify-center w-full h-full'>
			<h1 className='text-clNeg dark:text-clBlan'>Page Not Found</h1>
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
