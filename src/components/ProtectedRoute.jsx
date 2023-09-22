import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth/Autenticacion';
import NavBar from '../components/navbar/navBar.jsx';
import Header from './header/header';

export const ProtectedRoute = ({ children }) => {
  const { authToken, user } = useAuth();
  return authToken ? (
    <>
      <NavBar />
      <section className='absolute right-0 z-0 float-right min-h-full px-3 mx-1 w-20/24 md:w-22/24'>
        <Header></Header>
        <main className='w-full h-full md:w-full'>{children}</main>
      </section>
    </>
  ) : (
    <Navigate to='/' />
  );
};
