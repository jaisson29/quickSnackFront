const Button = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      type="button"
      className="w-full h-10 flex justify-center items-center font-bold rounded-lg bg-clNar bg-opacity-60 text-clNeg"
    >
      {children}
    </button>
  )
}

export default Button
