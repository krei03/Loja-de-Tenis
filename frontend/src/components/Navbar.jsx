import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight, Menu, Moon, Search, ShoppingBag, Sun, UserRound, X } from 'lucide-react'

export function Navbar({ cartCount, onToggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 24)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link className="brand" to="/" onClick={closeMenu} aria-label="Vertex home">
        <span>V</span>
        VERTEX
      </Link>

      <nav className="nav-links" aria-label="Principal">
        <NavLink to="/">Marcas</NavLink>
        <a href="/#categories">Categorias</a>
        <a href="/#launches">Calendario</a>
        <a href="/#launches">Feed</a>
        <NavLink to="/admin">Vender</NavLink>
      </nav>

      <label className="nav-search">
        <Search size={20} />
        <input placeholder="Drops, produtos ou marcas" aria-label="Buscar drops, produtos ou marcas" />
      </label>

      <div className="nav-actions">
        <button className="icon-button" type="button" onClick={onToggleTheme} aria-label="Alternar tema">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="icon-button desktop-account" type="button" aria-label="Conta">
          <UserRound size={20} />
        </button>
        <Link className="icon-button cart-link" to="/cart" aria-label="Carrinho" onClick={closeMenu}>
          <ShoppingBag size={20} />
          {cartCount > 0 && <span>{cartCount}</span>}
        </Link>
        <button
          className="icon-button mobile-only"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <NavLink className="sell-link" to="/admin" onClick={closeMenu}>
          Entrar
          <ArrowRight size={22} />
        </NavLink>
      </div>

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Menu mobile">
          <NavLink to="/" onClick={closeMenu}>Drops</NavLink>
          <a href="/#launches" onClick={closeMenu}>Lancamentos</a>
          <a href="/#categories" onClick={closeMenu}>Categorias</a>
          <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>
        </nav>
      )}
    </header>
  )
}
