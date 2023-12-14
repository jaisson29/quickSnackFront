import './error.css';

const Error = ({ mensaje, estilos, ...rest }) => {
  return (
    <div
      {...rest}
      className={`relative top-5 w-full rounded-lg text-center whitespace-normal ring-2 ring-offset-2 ${estilos}`}
    >
      <span>{mensaje}</span>
    </div>
  );
};

export default Error;
