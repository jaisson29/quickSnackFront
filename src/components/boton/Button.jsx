/** @format */

const Button = ( {children , extraClass, ...rest}) => {
	return (
		<button
			{...rest}
			type='button'
			className={`w-fit px-4 py-2 cursor-pointer mx-auto h-10 flex justify-center items-center font-bold rounded-lg bg-clNar bg-opacity-60 text-clNeg ${extraClass}`}>
			{children}
		</button>
	)
}

export default Button
