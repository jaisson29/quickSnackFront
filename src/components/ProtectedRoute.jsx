import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth/Autenticacion';
import NavBar from '../components/navbar/navBar.jsx';
import Header from './header/header';

export const ProtectedRoute = ({ children }) => {
  const { authToken, isAuth } = useAuth();
  return authToken && isAuth ? (
    <>
      <NavBar />
      <section className='w-22/24 md:w-23/24 h-full overflow-x-auto mx-1 px-3'>
        <Header></Header>
        <main className='w-full md:w-full h-full'>{children}</main>
      </section>
    </>
  ) : (
    <Navigate to='/' />
  );
};
