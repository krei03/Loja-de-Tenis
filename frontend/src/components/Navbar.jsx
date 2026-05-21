import { Link, NavLink } from 'react-router-dom'
import { Menu, Search, ShoppingBag, UserRound } from 'lucide-react'

export function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <Link className="brand" to="/">
        VERTEX
      </Link>

      <nav className="nav-links" aria-label="Principal">
        <NavLink to="/">Drops</NavLink>
        <a href="/#launches">Lancamentos</a>
        <a href="/#categories">Categorias</a>
        <NavLink to="/admin">Admin</NavLink>
      </nav>

      <div className="nav-actions">
        <button className="icon-button" type="button" aria-label="Buscar">
          <Search size={20} />
        </button>
        <button className="icon-button" type="button" aria-label="Conta">
          <UserRound size={20} />
        </button>
        <Link className="icon-button cart-link" to="/cart" aria-label="Carrinho">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span>{cartCount}</span>}
        </Link>
        <button className="icon-button mobile-only" type="button" aria-label="Menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  )
}
