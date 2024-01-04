/** @format */

const Button = ( {children , twStyles = "", ...rest}) => {
	return (
		<button
			{...rest}
			type='button'
			className={`w-fit px-4 py-2 cursor-pointer mx-auto h-10 flex justify-center items-center font-bold rounded-full bg-clNar text-clNeg ${twStyles}`}>
			{children}
		</button>
	)
}

export default Button
