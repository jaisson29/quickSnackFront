import './css/App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './pages/login.jsx'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/navComponents/navBar'

function App() {
  const url = 'http://localhost:5000'
  const [datum, setDatum] = useState({
    value: '',
    value2: '',
  })
  useEffect(() => {
    axios.get(url).then((response) => {
      const { value, value2 } = response.data // Accede a la propiedad data de la respuesta
      setDatum({
        value: value,
        value2: value2,
      })
    })
  }, [])
  console.log(datum);
  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>{datum.value} {datum.value2}</h1>
              <button>
                {' '}
                {/* bg-blue-500 sm:bg-orange-400 lg:bg-green-400 hover:bg-green -700 font-bold text-white py-2 px-4 rounded */}
                Mybutton
              </button>
              <h1>1</h1>
              <h2>2</h2>
              <h3>3</h3>
              <h4>4</h4>
              <h5>5</h5>
              <h6>6</h6>
              <div className="m-10 mt-20 border p-2 pr-12">
                <p className="text-xl md:text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet impedit accusantium quas inventore placeat perferendis
                  possimus pariatur excepturi optio, aperiam quos accusamus
                  ipsam quod sed suscipit aspernatur eaque ab consequatur?
                </p>
              </div>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<></>} />
        <Route path="/menu" element={<NavBar></NavBar>} />
      </Routes>
      </div>
  )
}

export default App
