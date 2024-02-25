/** @format */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth/Autenticacion';
import NavBar from '../components/navbar/navBar';
import Header from './header/Header';

type ProtectedRouteProps = {
	children: React.ReactElement;
	nav?: boolean;
	header?: boolean;
};

export const ProtectedRoute  = ({ children, nav = true, header = true }: ProtectedRouteProps) => {
	const { authToken, user }: any = useAuth();
	return authToken && user ? (
		<>
			<section className='right-0 z-0 flex-grow float-right w-full h-5/6 md:h-full md:absolute bg-clBlan text-clNeg md:w-21/24'>
				{header && <Header />}
				<main className='flex flex-col w-full px-3 mb-24'>{children}</main>
			</section>
			{nav && <NavBar />}
		</>
	) : (
		<Navigate to='/' />
	);
};


