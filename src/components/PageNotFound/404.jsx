import { Link } from 'react-router-dom';
import './404.css';
import Button from '../boton/Button';

const PageNotFound = () => {
  return (
    <section className='w-full h-full flex flex-col items-center justify-center'>
      <h1 className=''>Page Not Found</h1>
      <Button>
        <Link to='/'>
          <i className='fa-solid fa-house'></i> Go back home.
        </Link>
      </Button>
    </section>
  );
};

export default PageNotFound;
