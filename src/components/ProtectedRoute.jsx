import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth/Autenticacion';
import NavBar from '../components/navbar/navBar.jsx';
import Header from './header/header';

export const ProtectedRoute = ({ children }) => {
  const { authToken, isAuth } = useAuth();
  return authToken && isAuth ? (
    <>
      <NavBar />
      <section className='absolute right-0 float-right h-full px-3 mx-1 w-21/24 md:w-23/24'>
        <Header></Header>
        <main className='w-full h-full md:w-full'>{children}</main>
      </section>
    </>
  ) : (
    <Navigate to='/' />
  );
};
