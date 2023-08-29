import React from 'react';
import './contEntrada.css';

const ConEntrada = ({ children }) => {
  return (
    <main className='flex items-center justify-center w-full h-full p-2 bg-clDRos'>
      <section className='flex flex-col w-full h-full gap-12 py-10 rounded-xl md:w-150 md:h-150 bg-clNar'>
        {children}
      </section>
    </main>
  );
};

export default ConEntrada;
