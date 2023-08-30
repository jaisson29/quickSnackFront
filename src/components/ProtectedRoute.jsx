import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth/Autenticacion';
import NavBar from '../components/navbar/navBar.jsx';
import Header from './header/header';

export const ProtectedRoute = ({ children, ...rest }) => {
  const { authToken, isAuth } = useAuth();
  return authToken && isAuth ? (
    <>
      <NavBar /> <Header></Header>
      <main className='w-10/12 md:w-11/12'>{children}</main>
    </>
  ) : (
    <Navigate to='/' />
  );
};
