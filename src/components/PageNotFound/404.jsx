import { Link } from 'react-router-dom';
import './404.css';

const PageNotFound = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <Link to='/'>
        <i className='fa-solid fa-house'></i> Go back home.
      </Link>
    </>
  );
};

export default PageNotFound;
