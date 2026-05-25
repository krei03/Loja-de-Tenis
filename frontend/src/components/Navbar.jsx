import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, Moon, Search, ShoppingBag, Sun, User, X } from 'lucide-react'

export function Navbar({ cartCount, customer, onToggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)

  const scrollHome = (event) => {
    closeMenu()

    if (location.pathname === '/') {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToBrands = (event) => {
    closeMenu()

    if (location.pathname === '/') {
      event.preventDefault()
      document.getElementById('brand-carousel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
        <a href="/#brand-carousel" onClick={scrollToBrands}>Marcas</a>
        <Link to="/" onClick={scrollHome}>Feed</Link>
      </nav>

      <label className="nav-search">
        <Search size={20} />
        <input placeholder="Drops, produtos ou marcas" aria-label="Buscar drops, produtos ou marcas" />
      </label>

      <div className="nav-actions">
        <button className="icon-button" type="button" onClick={onToggleTheme} aria-label="Alternar tema">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Link className="icon-button cart-link" to="/cart" aria-label="Carrinho" onClick={closeMenu}>
          <ShoppingBag size={20} />
          {cartCount > 0 && <span>{cartCount}</span>}
        </Link>
        <Link className="icon-button" to={customer ? '/account' : '/login'} aria-label="Conta" onClick={closeMenu}>
          <User size={20} />
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
        <NavLink className="sell-link" to={customer ? '/account' : '/login'} onClick={closeMenu}>
          {customer ? 'Minha Conta' : 'Entrar'}
          <ArrowRight size={22} />
        </NavLink>
      </div>

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Menu mobile">
          <a href="/#brand-carousel" onClick={scrollToBrands}>Marcas</a>
          <Link to="/" onClick={scrollHome}>Feed</Link>
          <Link to={customer ? '/account' : '/login'} onClick={closeMenu}>
            {customer ? 'Minha Conta' : 'Entrar / Registrar'}
          </Link>
          <Link to="/admin" onClick={closeMenu}>Admin</Link>
        </nav>
      )}
    </header>
  )
}
