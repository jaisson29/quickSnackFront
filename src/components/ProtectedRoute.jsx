import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth/Autenticacion';
import NavBar from '../components/navbar/navBar.jsx';
import Header from './header/header';

export const ProtectedRoute = ({ children }) => {
  const { authToken, user } = useAuth();
  return authToken ? (
    <>
      <NavBar />
<<<<<<< HEAD
      <section className='absolute right-0 z-0 float-right h-full px-3 mx-1 w-21/24 md:w-22/24'>
=======
      <section className='absolute right-0 z-0 float-right min-h-full px-3 mx-1 w-20/24 md:w-22/24'>
>>>>>>> 71fab051ab21a964f7f0520aa802f8963085288e
        <Header></Header>
        <main className='w-full h-full md:w-full'>{children}</main>
      </section>
    </>
  ) : (
    <Navigate to='/' />
  );
};
