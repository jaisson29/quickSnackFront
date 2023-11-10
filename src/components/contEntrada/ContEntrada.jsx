import React from 'react';
import './contEntrada.css';

const ConEntrada = ({ children }) => {
  return (
    <main className='flex items-center justify-center w-full min-h-full p-2 bg-clNar'>
      <section className='grid w-full p-4 h-full grid-cols-1 py-10 entrada place-content-center rounded-xl md:w-10/24 md:h-fit bg-clRoj'>
        {children}
      </section>
    </main>
  );
};

export default ConEntrada;
