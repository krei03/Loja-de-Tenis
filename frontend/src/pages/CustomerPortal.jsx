import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  Apple,
  Calendar,
  CreditCard,
  FilePenLine,
  Heart,
  Home,
  Mail,
  PackageCheck,
  Phone,
  User,
} from 'lucide-react'
import { AccountSidebar } from '../components/AccountSidebar'
import { api } from '../services/api'

export function CustomerLogin({ onLogin, customer }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [authError, setAuthError] = useState('')
  const [authSuccess, setAuthSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (customer) {
    return <Navigate to="/account" replace />
  }

  const setCustomerSession = (session) => ({
    ...session.user,
    token: session.token,
    expiresAt: session.expiresAt,
  })

  const login = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setAuthError('')
    setAuthSuccess('')
    setIsSubmitting(true)

    try {
      const session = await api.loginCustomer({
        email: data.get('email'),
        password: data.get('password'),
      })

      onLogin(setCustomerSession(session))
      navigate('/account')
    } catch {
      setAuthError('Email ou senha incorretos.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const register = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setAuthError('')
    setAuthSuccess('')
    setIsSubmitting(true)

    try {
      const session = await api.registerCustomer({
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        password: data.get('password'),
      })

      onLogin(setCustomerSession(session))
      navigate('/account/edit')
    } catch (error) {
      setAuthError(error.message.includes('409') ? 'Este email ja possui uma conta.' : 'Nao foi possivel criar sua conta.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetPassword = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setAuthError('')
    setAuthSuccess('')
    setIsSubmitting(true)

    try {
      const session = await api.resetCustomerPassword({
        email: data.get('email'),
        password: data.get('password'),
      })

      onLogin(setCustomerSession(session))
      navigate('/account')
    } catch (error) {
      setAuthError(error.message.includes('404') ? 'Conta nao encontrada.' : 'Nao foi possivel redefinir a senha.')
    } finally {
      setIsSubmitting(false)
    }
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
          <section className="customer-auth-main">
            <div className="auth-mode-switch" role="tablist" aria-label="Tipo de acesso">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                onClick={() => {
                  setAuthError('')
                  setAuthSuccess('')
                  setMode('login')
                }}
              >
                Entrar
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'register'}
                onClick={() => {
                  setAuthError('')
                  setAuthSuccess('')
                  setMode('register')
                }}
              >
                Criar conta
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'reset'}
                onClick={() => {
                  setAuthError('')
                  setAuthSuccess('')
                  setMode('reset')
                }}
              >
                Redefinir senha
              </button>
            </div>

            {mode === 'login' ? (
              <form className="form-panel customer-auth-form" onSubmit={login}>
                <h2>Entrar na minha conta</h2>
                <label>
                  <span>Email</span>
                  <input required name="email" type="email" placeholder="Email" autoComplete="email" />
                </label>
                <label>
                  <span>Senha</span>
                  <input required name="password" type="password" placeholder="Senha" autoComplete="current-password" />
                </label>
                {authError && <p className="auth-error" role="alert">{authError}</p>}
                <button type="submit" disabled={isSubmitting}>
                  <User size={18} />
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
            ) : mode === 'register' ? (
              <form className="form-panel customer-auth-form" onSubmit={register}>
                <h2>Criar conta</h2>
                <label>
                  <span>Nome completo</span>
                  <input required name="name" placeholder="Nome completo" autoComplete="name" />
                </label>
                <label>
                  <span>Email</span>
                  <input required name="email" type="email" placeholder="Email" autoComplete="email" />
                </label>
                <label>
                  <span>Telefone</span>
                  <input name="phone" placeholder="Telefone" autoComplete="tel" />
                </label>
                <label>
                  <span>Senha</span>
                  <input required name="password" type="password" placeholder="Senha" autoComplete="new-password" />
                </label>
                {authError && <p className="auth-error" role="alert">{authError}</p>}
                <button type="submit" className="create-account-button" disabled={isSubmitting}>
                  <User size={18} />
                  {isSubmitting ? 'Criando...' : 'Criar conta'}
                </button>
              </form>
            ) : (
              <form className="form-panel customer-auth-form" onSubmit={resetPassword}>
                <h2>Redefinir senha</h2>
                <label>
                  <span>Email</span>
                  <input required name="email" type="email" placeholder="Email" autoComplete="email" />
                </label>
                <label>
                  <span>Nova senha</span>
                  <input required name="password" type="password" placeholder="Nova senha" autoComplete="new-password" minLength={6} />
                </label>
                {authError && <p className="auth-error" role="alert">{authError}</p>}
                {authSuccess && <p className="auth-success" role="status">{authSuccess}</p>}
                <button type="submit" disabled={isSubmitting}>
                  <FilePenLine size={18} />
                  {isSubmitting ? 'Salvando...' : 'Salvar nova senha'}
                </button>
              </form>
            )}
          </section>

          <section className="social-login-panel" aria-label="Login social">
            <div>
              <span>Acesso rapido</span>
              <strong>Use sua conta preferida</strong>
            </div>
            <button type="button" onClick={() => socialLogin('google')}>
              <span>G</span>
              Entrar com Google
            </button>
            <button type="button" onClick={() => socialLogin('apple')}>
              <Apple size={19} />
              Entrar com Apple
            </button>
            <button
              type="button"
              className="secondary-create-account"
              onClick={() => {
                setAuthError('')
                setAuthSuccess('')
                setMode('register')
              }}
            >
              Criar conta com email
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
        <AccountSidebar customer={customer} onLogout={onLogout} />

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
    edit: {
      eyebrow: 'Cadastro',
      title: 'Meu cadastro',
      body: <RegistrationPanel customer={customer} />,
    },
    addresses: {
      eyebrow: 'Entrega',
      title: 'Meus enderecos',
      body: <AddressManager customer={customer} />,
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

function RegistrationPanel({ customer }) {
  const [firstName, ...lastNameParts] = customer.name.split(' ')
  const lastName = lastNameParts.join(' ') || 'Nao informado'

  return (
    <div className="registration-panel">
      <p>Acesse ou altere dados cadastrais da sua conta Vertex.</p>

      <section className="registration-card" aria-labelledby="access-data-title">
        <h2 id="access-data-title">Dados de acesso</h2>
        <div className="registration-grid">
          <EditableData icon={Mail} label="Email" action="Alterar e-mail" value={maskEmail(customer.email)} />
          <EditableData icon={FilePenLine} label="Senha" action="Alterar senha" value="********" />
          <EditableData icon={Phone} label="Telefone" action="Alterar telefone" value={maskPhone(customer.phone)} />
        </div>
      </section>

      <section className="registration-card" aria-labelledby="personal-data-title">
        <h2 id="personal-data-title">Dados pessoais</h2>
        <div className="registration-grid personal-data-grid">
          <ReadOnlyData label="CPF" value="57*******07" />
          <ReadOnlyData label="Nome" value={firstName || customer.name} />
          <ReadOnlyData label="Sobrenome" value={lastName} />
          <ReadOnlyData label="Data de nascimento" value="1*/**/***3" icon={Calendar} />
          <ReadOnlyData label="Genero" value="Masculino" />
        </div>
        <button className="danger-account-action" type="button">
          <FilePenLine size={18} />
          Alterar dados pessoais
        </button>
      </section>
    </div>
  )
}

function AddressManager({ customer }) {
  const city = customer.email?.includes('apple') ? 'Rio de Janeiro' : 'Sao Paulo'

  return (
    <div className="address-manager">
      <div className="address-toolbar">
        <p>Gerencie os locais de entrega vinculados a sua conta.</p>
        <button type="button">
          <Home size={18} />
          Cadastrar endereco
        </button>
      </div>

      <section className="address-grid" aria-label="Enderecos cadastrados">
        <article className="address-card selected">
          <span>Principal</span>
          <strong>{customer.name}</strong>
          <p>Praca da Se, 100 / Centro</p>
          <p>{city} / SP / 01001-000</p>
          <div>
            <button type="button">Editar</button>
            <button type="button">Remover</button>
          </div>
        </article>
        <article className="address-card empty-address">
          <Home size={28} />
          <p>Adicione um novo endereco para acelerar proximas compras.</p>
        </article>
      </section>
    </div>
  )
}

function EditableData({ action, icon: Icon, label, value }) {
  return (
    <article className="editable-data">
      <div>
        <strong>{label}</strong>
        <button type="button">
          {action}
          <Icon size={18} />
        </button>
      </div>
      <span>{value}</span>
    </article>
  )
}

function ReadOnlyData({ icon: Icon, label, value }) {
  return (
    <article className="readonly-data">
      <strong>{label}</strong>
      <span>{value}</span>
      {Icon && <Icon size={18} aria-hidden="true" />}
    </article>
  )
}

function maskEmail(email = '') {
  const [name, domain] = email.split('@')

  if (!domain) {
    return 'Nao informado'
  }

  return `${name.slice(0, 1)}*****@${domain}`
}

function maskPhone(phone = '') {
  const digits = phone.replace(/\D/g, '')

  if (digits.length < 4) {
    return 'Nao informado'
  }

  return `(**) 9******${digits.slice(-2)}`
}
