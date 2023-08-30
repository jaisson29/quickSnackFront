import React from 'react'
import './contEntrada.css'

const ConEntrada = ({ children }) => {
  return (
    <main className="flex items-center justify-center w-full h-full p-2 bg-clRos">
      <section className="entrada grid grid-cols-1 place-content-center w-full h-full py-10 rounded-xl md:w-150 md:h-150 bg-clPiel">
        {children}
      </section>
    </main>
  )
}

export default ConEntrada
