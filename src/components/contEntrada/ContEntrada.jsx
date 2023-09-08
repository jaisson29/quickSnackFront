import React from 'react';
import './contEntrada.css';

const ConEntrada = ({ children }) => {
  return (
    <main className='flex items-center justify-center w-full min-h-full p-2 bg-clNar'>
      <section className='grid w-full h-full grid-cols-1 py-10 entrada place-content-center rounded-xl md:w-150 md:h-fit bg-clRoj'>
        {children}
      </section>
    </main>
  );
};

export default ConEntrada;
