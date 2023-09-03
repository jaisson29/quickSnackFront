import { useAuth } from '../Auth/Autenticacion';
import './header.css';

const Header = () => {
  const { user } = useAuth();
  return (
    <header className='flex justify-end w-full text-right'>
      <section className='flex items-center gap-4'>
        <div>
          <p>{user.usuNom}</p>
          <p>{user.perfilNom}</p>
        </div>
        <img
          src=''
          alt='user'
          className='w-10 h-10 rounded-full bg-slate-600'
        />
        <i className='fa fa-caret-down'></i>
      </section>
    </header>
  );
};

export default Header;
