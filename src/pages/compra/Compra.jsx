import { useState } from 'react';
import { useAuth } from '../../components/Auth/Autenticacion';
import axios from 'axios';
import './compra.css';


const Compra = () => {
  const { urlApi, authToken } = useAuth(); 

  const [compra, setCompra] = useState([]);
  return(
     <>
    <div className='w-full md:w-1/2'>
    <label htmlFor='proId' className='form-label'>
    Proveedor 
    </label>
    <select
    type='number'
    name='provId'
    id='provId'
    className='input'
    // onChange={inputHandler}
    required
    >
    <option value=''>Seleccione unn proveedor</option>
    <option value='1'>Postobón</option>
    <option value='2'>Coca Cola</option>
    <option value='3'>Pepsi</option>
    </select>
    </div>
    </>
  );
};

export default Compra;
