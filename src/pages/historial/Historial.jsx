import { useEffect, useState } from 'react';
import axios from 'axios';
import './historial.css';
import Error from '../../components/error/Error';
import Cargando from '../../components/cargando/Cargando';
import { useAuth } from '../../components/Auth/Autenticacion';
import Monto from '../../components/monto/Monto';

const Historial = ({ nom }) => {
  const { urlApi, user, authToken } = useAuth();
  const [usuTransacs, setUsuTransacs] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    axios
      .get(`${urlApi}/api/transac/getByUser/${user.usuId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        res.status === 204
          ? setError('No se encontraron resultados')
          : setUsuTransacs(res.data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setCargando(false);
      });
  }, [urlApi, authToken, user]);

  return (
    <>
      <Monto></Monto>

      <section className='bg-slate-100 flex flex-col'>
        {error ? <Error mensaje={error} onclick={() => setError('')} /> : null}

        {cargando ? (
          <Cargando />
        ) : (
          usuTransacs.length !== 0 &&
          usuTransacs.map(function (trs) {
            return (
              <div className='flex items-center px-4 gap-7'>
                <div
                  className={`rounded-full bg-${
                    trs.tot > 0 ? 'blue' : 'red'
                  }-600 w-6 h-6 text-center ring-2 ring-${
                    trs.tot > 0 ? 'blue' : 'red'
                  }-600 ring-offset-2`}
                >
                  <i
                    className={`fa fa-${
                      trs.tot > 0 ? 'plus' : 'minus'
                    } text-white`}
                  ></i>
                </div>
                <div>
                  <p>{trs.tot}</p>
                  <p>{trs.transacFecha}</p>
                </div>
              </div>
            );
          })
        )}
      </section>
    </>
  );
};

export default Historial;
