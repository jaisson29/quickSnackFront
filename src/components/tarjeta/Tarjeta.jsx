import { useAuth } from '../Auth/Autenticacion'

const Tarjeta = ({ id, nom, descr, cat, img, precio }) => {
  const { urlApi } = useAuth()
  return (
    <li className="w-full rounded-lg bg-slate-200" key={id}>
      <div className="flex items-center justify-center w-full rounded-lg">
        <img
          className="object-contain h-52 w-52"
          src={`${urlApi}/uploads/${img}`}
          alt={nom}
        />
      </div>
      <p>{nom}</p>
      <p>{descr}</p>
      <p>{cat}</p>
      <p>{precio}</p>
    </li>
  )
}
export default Tarjeta
