import { useState } from 'react'
import './historial.css'

const Historial = ({ nom }) => {
  const [dominios, setDominios] = useState(['camilo', 'daniel', 'duvan'])

  return (
    <>
      {dominios.map(function (dom) {
        return (
          <>
            <p>{dom}</p>
            <p>{nom}</p>
          </>
        )
      })}
    </>
  )
}

export default Historial
