/** @format */

import React from 'react';
import './contEntrada.css';

const ConEntrada = ({ children }: any) => {
	return (
		<>
			{/* div to the colored square */}
			<div className='absolute z-30 rotate-45 rounded-2xl h-72 w-72 lg:h-100 -left-56 sm:-left-36 lg:-left-56 -top-14 lg:-top-8 xl:w-130 xl:h-130 xl:-left-72 xl:-top-16 lg:w-100 dark:bg-clRoj bg-clNar'></div>

			{/* Main content of the entrance views */}
			<main className='z-20 flex items-start justify-center min-w-full px-2 py-4 md:items-center bg-clBlan dark:bg-clNeg'>
				<section className='z-20 mx-auto sm:w-13/24 lg:w-10/24 md:h-fit' id='entradaSec'>{children}</section>
			</main>
		</>
	);
};

export default ConEntrada;
