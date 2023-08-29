const Button = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      type='button'
      className='px-5 py-3 font-bold rounded-lg bg-clAma outline-2 text-clNeg outline-black'
    >
      {children}
    </button>
  );
};

export default Button;
