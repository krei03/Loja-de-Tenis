import { NavLink } from 'react-router-dom'
import {
  Bell,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  PackageCheck,
  PenLine,
  ShieldQuestion,
  User,
} from 'lucide-react'

const primaryLinks = [
  { to: '/account', label: 'Meus Dados', icon: User, end: true },
  { to: '/account/orders', label: 'Meus Pedidos', icon: PackageCheck },
  { to: '/account/favorites', label: 'Favoritos', icon: Heart },
]

const registrationLinks = [
  { to: '/account/edit', label: 'Alterar dados', icon: PenLine },
  { to: '/account/addresses', label: 'Meus enderecos', icon: MapPin },
  { to: '/account/preferences', label: 'Preferencias de comunicacao', icon: Bell },
  { to: '/account/cards', label: 'Meus cartoes', icon: CreditCard },
]

const supportLinks = [
  { to: '/account/help', label: 'Atendimento e FAQ', icon: ShieldQuestion },
]

export function AccountSidebar({ customer, onLogout }) {
  return (
    <aside className="account-sidebar">
      <div>
        <span>Minha Conta</span>
        <strong>{customer.name}</strong>
        <small>{customer.email}</small>
      </div>

      <nav aria-label="Menu da conta">
        {primaryLinks.map(({ end, icon: Icon, label, to }) => (
          <NavLink end={end} key={to} to={to}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        <div className="account-nav-group">
          <span>Meu Cadastro</span>
          {registrationLinks.map(({ icon: Icon, label, to }) => (
            <NavLink key={to} to={to}>
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </div>

        {supportLinks.map(({ icon: Icon, label, to }) => (
          <NavLink key={to} to={to}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button type="button" onClick={onLogout}>
        <LogOut size={18} />
        Sair
      </button>
    </aside>
  )
}
