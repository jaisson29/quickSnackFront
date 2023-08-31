import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth/Autenticacion';
import NavBar from '../components/navbar/navBar.jsx';
import Header from './header/header';

export const ProtectedRoute = ({ children, ...rest }) => {
  const { authToken, isAuth } = useAuth();
  return authToken && isAuth ? (
    <section className='float-right w-23/24 md:w-23/24'>
      <NavBar /> <Header></Header>
      <main className='w-full md:w-full'>{children}</main>
    </section>
  ) : (
    <Navigate to='/' />
  );
};
