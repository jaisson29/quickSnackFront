/** @format */

const Button = ( {children , twStyles = "", ...rest}:any) => {
	return (
		<button
			{...rest}
			className={`${twStyles} disabled:bg-clNegL disabled:text-clBlan w-fit px-4 py-2 cursor-pointer h-10 flex justify-center items-center font-bold rounded-full bg-clNar text-clNeg`}>
			{children}
		</button>
	);
}

export default Button
