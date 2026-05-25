import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import {
  Apple,
  Bell,
  CreditCard,
  Heart,
  Home,
  LogOut,
  MapPin,
  PackageCheck,
  PenLine,
  ShieldQuestion,
  User,
} from 'lucide-react'

const accountLinks = [
  { to: '/account', label: 'Meus Dados', icon: User, end: true },
  { to: '/account/orders', label: 'Meus Pedidos', icon: PackageCheck },
  { to: '/account/favorites', label: 'Favoritos', icon: Heart },
  { to: '/account/profile', label: 'Meu Cadastro', icon: PenLine },
  { to: '/account/edit', label: 'Alterar dados', icon: PenLine },
  { to: '/account/addresses', label: 'Meus enderecos', icon: MapPin },
  { to: '/account/preferences', label: 'Preferencias', icon: Bell },
  { to: '/account/cards', label: 'Meus cartoes', icon: CreditCard },
  { to: '/account/help', label: 'Atendimento e FAQ', icon: ShieldQuestion },
]

export function CustomerLogin({ onLogin, customer }) {
  const navigate = useNavigate()

  if (customer) {
    return <Navigate to="/account" replace />
  }

  const submit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const session = {
      name: data.get('name') || 'Cliente Vertex',
      email: data.get('email'),
      phone: data.get('phone') || '',
      provider: 'email',
      createdAt: new Date().toISOString(),
    }

    onLogin(session)
    navigate('/account')
  }

  const socialLogin = (provider) => {
    onLogin({
      name: provider === 'google' ? 'Cliente Google' : 'Cliente Apple',
      email: `${provider}@cliente.vertex`,
      phone: '',
      provider,
      createdAt: new Date().toISOString(),
    })
    navigate('/account')
  }

  return (
    <main className="customer-auth-page">
      <section className="customer-auth-shell">
        <div className="section-heading">
          <p>Portal do cliente</p>
          <h1>Minha Conta</h1>
        </div>

        <div className="customer-auth-grid">
          <form className="form-panel customer-auth-form" onSubmit={submit}>
            <h2>Entrar ou criar cadastro</h2>
            <input required name="name" placeholder="Nome completo" autoComplete="name" />
            <input required name="email" type="email" placeholder="Email" autoComplete="email" />
            <input name="phone" placeholder="Telefone" autoComplete="tel" />
            <button type="submit">
              <User size={18} />
              Entrar / Registrar
            </button>
          </form>

          <section className="social-login-panel" aria-label="Login social">
            <button type="button" onClick={() => socialLogin('google')}>
              <span>G</span>
              Entrar com Google
            </button>
            <button type="button" onClick={() => socialLogin('apple')}>
              <Apple size={19} />
              Entrar com Apple
            </button>
          </section>
        </div>
      </section>
    </main>
  )
}

export function CustomerAccount({ customer, customerOrders, onLogout, page = 'dashboard' }) {
  if (!customer) {
    return <Navigate to="/login" replace />
  }

  return (
    <main className="customer-account-page">
      <section className="customer-account-shell">
        <aside className="account-sidebar">
          <div>
            <span>Minha Conta</span>
            <strong>{customer.name}</strong>
            <small>{customer.email}</small>
          </div>

          <nav aria-label="Menu da conta">
            {accountLinks.map(({ end, icon: Icon, label, to }) => (
              <NavLink end={end} key={to} to={to}>
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

        <section className="account-content">{renderAccountPage(page, customer, customerOrders)}</section>
      </section>
    </main>
  )
}

function renderAccountPage(page, customer, customerOrders) {
  const pages = {
    dashboard: {
      eyebrow: 'Meus Dados',
      title: 'Resumo da conta',
      body: (
        <div className="account-info-grid">
          <Info label="Nome" value={customer.name} />
          <Info label="Email" value={customer.email} />
          <Info label="Telefone" value={customer.phone || 'Nao informado'} />
          <Info label="Login" value={customer.provider === 'email' ? 'Email' : customer.provider} />
        </div>
      ),
    },
    orders: {
      eyebrow: 'Historico',
      title: 'Meus Pedidos',
      body: customerOrders.length ? (
        <div className="account-order-list">
          {customerOrders.map((order) => (
            <article key={order.id}>
              <PackageCheck size={20} />
              <div>
                <strong>Pedido {order.id}</strong>
                <span>{order.items?.length || 0} item(ns) / {order.payment?.method || 'pagamento'}</span>
              </div>
              <small>{order.status || 'created'}</small>
            </article>
          ))}
        </div>
      ) : (
        <EmptyAccount icon={PackageCheck} text="Nenhum pedido vinculado a esta conta ainda." />
      ),
    },
    favorites: {
      eyebrow: 'Lista',
      title: 'Favoritos',
      body: <EmptyAccount icon={Heart} text="Seus favoritos ficarao aqui quando voce salvar produtos." />,
    },
    profile: {
      eyebrow: 'Cadastro',
      title: 'Meu Cadastro',
      body: <ProfileForm customer={customer} />,
    },
    edit: {
      eyebrow: 'Cadastro',
      title: 'Alterar dados cadastrais',
      body: <ProfileForm customer={customer} editable />,
    },
    addresses: {
      eyebrow: 'Entrega',
      title: 'Meus enderecos',
      body: <EmptyAccount icon={Home} text="Cadastre enderecos para acelerar proximas compras." />,
    },
    preferences: {
      eyebrow: 'Comunicacao',
      title: 'Preferencias de comunicacao',
      body: (
        <div className="preference-list">
          <label><input type="checkbox" defaultChecked /> Receber novidades de drops</label>
          <label><input type="checkbox" defaultChecked /> Receber status de pedidos</label>
          <label><input type="checkbox" /> Receber ofertas por SMS</label>
        </div>
      ),
    },
    cards: {
      eyebrow: 'Pagamento',
      title: 'Meus cartoes',
      body: <EmptyAccount icon={CreditCard} text="Cartoes salvos serao exibidos quando houver gateway real." />,
    },
    help: {
      eyebrow: 'Suporte',
      title: 'Atendimento e FAQ',
      body: (
        <div className="faq-list">
          <article><strong>Envio</strong><span>Pedidos recebem rastreio apos separacao.</span></article>
          <article><strong>Trocas</strong><span>Solicitacoes podem ser abertas pelo atendimento.</span></article>
          <article><strong>Pagamento</strong><span>Checkout esta preparado para gateway real.</span></article>
        </div>
      ),
    },
  }
  const current = pages[page] || pages.dashboard

  return (
    <>
      <div className="account-page-title">
        <span>{current.eyebrow}</span>
        <h1>{current.title}</h1>
      </div>
      {current.body}
    </>
  )
}

function Info({ label, value }) {
  return (
    <article>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function EmptyAccount({ icon: Icon, text }) {
  return (
    <div className="empty-cart">
      <Icon size={38} />
      <p>{text}</p>
    </div>
  )
}

function ProfileForm({ customer, editable = false }) {
  return (
    <form className="form-panel account-profile-form">
      <input disabled={!editable} defaultValue={customer.name} aria-label="Nome completo" />
      <input disabled={!editable} defaultValue={customer.email} aria-label="Email" />
      <input disabled={!editable} defaultValue={customer.phone || ''} placeholder="Telefone" aria-label="Telefone" />
      {editable && <button type="button">Salvar alteracoes</button>}
    </form>
  )
}
