const Button = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      type='button'
      className='px-3 py-3 h-max font-bold rounded-lg bg-clAma outline-2 text-clNeg outline-black'
    >
      {children}
    </button>
  );
};

export default Button;
