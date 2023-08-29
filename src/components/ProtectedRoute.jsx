import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth/Autenticacion';
import NavBar from '../components/navbar/navBar.jsx';

export const ProtectedRoute = ({ children, ...rest }) => {
  const { authToken, isAuth } = useAuth();
  return authToken && isAuth ? (
    <>
      <NavBar /> <main className='w-full '>{children}</main>
    </>
  ) : (
    <Navigate to='/' />
  );
};
