import './header.css'

const Header = () => {
  return (
    <header className="flex text-right justify-end w-10/12">
      <section className="flex gap-4 items-center">
        <div>
          <p>Jaisson Valbuena</p>
          <p>Administrador </p>
        </div>
        <img
          src=""
          alt="user"
          className="rounded-full h-10 w-10 bg-slate-600"
        />
      </section>
    </header>
  )
}

export default Header
