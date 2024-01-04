import './error.css';

const Error = ({ mensaje, twStyles, ...rest }: any) => {
  return (
    <div
      {...rest}
      className={`relative top-5 w-full rounded-lg text-center whitespace-normal ring-2 ring-offset-2 ${twStyles}`}
    >
      <span>{mensaje}</span>
    </div>
  );
};

export default Error;
