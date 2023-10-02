import { useAuth } from '../Auth/Autenticacion';
import './header.css';
import male from '../../assets/icon-male-100.png';
import female from '../../assets/icon-female-100.png';
import Monto from '../monto/Monto';

const Header = () => {
  const { user } = useAuth();

  const { usuNom, perfilNom, usuGen } = user;

  return (
    <header className='flex justify-end w-full text-right'>
      <section className='grid mx-5 place-content-center'>
        <Monto />
      </section>
      <section className='flex items-center gap-4'>
        <div>
          <p>{usuNom}</p>
          <p>{perfilNom}</p>
        </div>
        <img
          src={usuGen === 1 ? male : female}
          alt='../../assets/logoQS.svg'
          className='w-10 h-10 rounded-full'
        />
        <i className='fa fa-caret-down'></i>
      </section>
    </header>
  );
};

export default Header;
