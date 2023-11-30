/** @format */

const Button = ( {children , extraClass, ...rest}) => {
	return (
		<button
			{...rest}
			type='button'
			className={`${extraClass} w-fit px-4 py-2 cursor-pointer mx-auto h-10 flex justify-center items-center font-bold rounded-full bg-clNar text-clNeg`}>
			{children}
		</button>
	)
}

export default Button
