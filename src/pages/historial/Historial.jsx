import { useEffect, useState } from 'react';
import axios from 'axios';
import './historial.css';
import { useAuth } from '../../components/Auth/Autenticacion';

const Historial = ({ nom }) => {
  const { urlApi, user, authToken } = useAuth();
  const [usuTransacs, setUsuTransacs] = useState([]);

  useEffect(() => {
    axios
      .get(`${urlApi}/api/transac/getByUser/${user.usuId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        setUsuTransacs(res.data);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, [urlApi, authToken, user]);

  return (
    <>
      {usuTransacs.length === 0
        ? usuTransacs.map(function (trs) {
            console.log(trs);
            return (
              <>
                <p>{trs}</p>
                <p>{trs.transacCant}</p>
                <p>{trs.transacFecha}</p>
              </>
            );
          })
        : null}
    </>
  );
};

export default Historial;
