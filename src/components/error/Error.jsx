import './error.css';

const Error = ({ mensaje, ...rest }) => {
  return (
    <div className='relative top-5 w-full rounded-lg text-center whitespace-normal'>
      <span>{mensaje}</span>
    </div>
  );
};

export default Error;
