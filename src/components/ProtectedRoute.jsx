/** @format */

import { Navigate } from 'react-router-dom'
import { useAuth } from './Auth/Autenticacion'
import NavBar from '../components/navbar/navBar.jsx'
import Header from './header/Header.jsx'

export const ProtectedRoute = ({ children }) => {
	const { authToken, user } = useAuth()
	return authToken && user ? (
		<> 
			<NavBar />
			<section className='absolute right-0 z-0 flex-grow float-right h-full px-3 bg-clBlan dark:bg-clNeg text-clNeg dark:text-clBlan w-20/24 md:w-22/24'>
				<Header></Header>
				<main className='flex flex-col w-full'>{children}</main>
			</section>
		</>
	) : (
		<Navigate to='/' />
	)
}
