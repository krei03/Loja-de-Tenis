import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  Apple,
  Calendar,
  ChevronDown,
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
    setIsSubmitting(true)

    try {
      const session = await api.loginCustomer({
        email: data.get('email'),
        password: data.get('password'),
      })

      onLogin(setCustomerSession(session))
      navigate('/account')
    } catch (error) {
      setAuthError(error.status === 401 ? 'Email ou senha incorretos.' : error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const register = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setAuthError('')
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
      setAuthError(error.status === 409 ? 'Este email ja possui uma conta.' : error.message)
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
                  setMode('register')
                }}
              >
                Criar conta
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
            ) : (
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
          <EditableData icon={FilePenLine} label="Senha" action="Alterar senha" value="********" field="password" />
          <EditableData icon={Phone} label="Telefone" action="Alterar telefone" value={maskPhone(customer.phone)} field="phone" />
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
  const initialAddress = {
    id: 'principal',
    label: 'Principal',
    recipient: customer.name,
    street: 'Praca da Se',
    number: '100',
    complement: 'Centro',
    city,
    state: 'SP',
    cep: '01001-000',
  }
  const emptyAddressForm = {
    recipient: customer.name,
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    cep: '',
  }
  const [addresses, setAddresses] = useState([initialAddress])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState('')
  const [addressForm, setAddressForm] = useState(emptyAddressForm)

  const openCreateForm = () => {
    setEditingId('')
    setAddressForm(emptyAddressForm)
    setIsFormOpen(true)
  }

  const editAddress = (address) => {
    setEditingId(address.id)
    setAddressForm({
      recipient: address.recipient,
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      cep: address.cep,
    })
    setIsFormOpen(true)
  }

  const removeAddress = (id) => {
    setAddresses((current) => current.filter((address) => address.id !== id))

    if (editingId === id) {
      setEditingId('')
      setIsFormOpen(false)
    }
  }

  const updateAddressForm = (event) => {
    const { name, value } = event.target
    setAddressForm((current) => ({ ...current, [name]: value }))
  }

  const saveAddress = (event) => {
    event.preventDefault()
    const nextAddress = {
      ...addressForm,
      id: editingId || `address-${Date.now()}`,
      label: addresses.length === 0 || editingId === 'principal' ? 'Principal' : 'Entrega',
      state: addressForm.state.toUpperCase(),
    }

    setAddresses((current) => {
      if (editingId) {
        return current.map((address) => (address.id === editingId ? nextAddress : address))
      }

      return [...current, nextAddress]
    })
    setEditingId('')
    setIsFormOpen(false)
  }

  return (
    <div className="address-manager">
      <div className="address-toolbar">
        <p>Gerencie os locais de entrega vinculados a sua conta.</p>
        <button type="button" onClick={openCreateForm}>
          <Home size={18} />
          Cadastrar endereco
        </button>
      </div>

      {isFormOpen && (
        <form className="address-form" onSubmit={saveAddress}>
          <div className="address-form-grid">
            <label>
              <span>Destinatario</span>
              <input required name="recipient" value={addressForm.recipient} onChange={updateAddressForm} />
            </label>
            <label>
              <span>CEP</span>
              <input required name="cep" value={addressForm.cep} onChange={updateAddressForm} placeholder="00000-000" />
            </label>
            <label>
              <span>Rua</span>
              <input required name="street" value={addressForm.street} onChange={updateAddressForm} />
            </label>
            <label>
              <span>Numero</span>
              <input required name="number" value={addressForm.number} onChange={updateAddressForm} />
            </label>
            <label>
              <span>Complemento</span>
              <input name="complement" value={addressForm.complement} onChange={updateAddressForm} />
            </label>
            <label>
              <span>Cidade</span>
              <input required name="city" value={addressForm.city} onChange={updateAddressForm} />
            </label>
            <label>
              <span>UF</span>
              <input required name="state" value={addressForm.state} onChange={updateAddressForm} maxLength={2} />
            </label>
          </div>
          <div className="address-form-actions">
            <button type="submit">{editingId ? 'Salvar alteracoes' : 'Salvar endereco'}</button>
            <button type="button" onClick={() => setIsFormOpen(false)}>Cancelar</button>
          </div>
        </form>
      )}

      <section className="address-grid" aria-label="Enderecos cadastrados">
        {addresses.map((address) => (
          <article className={`address-card ${address.label === 'Principal' ? 'selected' : ''}`} key={address.id}>
            <span>{address.label}</span>
            <strong>{address.recipient}</strong>
            <p>{formatStreetAddress(address)}</p>
            <p>{address.city} / {address.state} / {address.cep}</p>
            <div>
              <button type="button" onClick={() => editAddress(address)}>Editar</button>
              <button type="button" onClick={() => removeAddress(address.id)}>Remover</button>
            </div>
          </article>
        ))}
        <article className="address-card empty-address">
          <Home size={28} />
          <p>Adicione um novo endereco para acelerar proximas compras.</p>
        </article>
      </section>
    </div>
  )
}

function formatStreetAddress(address) {
  return [address.street, address.number, address.complement].filter(Boolean).join(' / ')
}

function EditableData({ action, field = 'email', icon: Icon, label, value }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownId = `edit-${field}-dropdown`

  return (
    <article className="editable-data">
      <div>
        <strong>{label}</strong>
        <button
          type="button"
          className="editable-link"
          aria-controls={dropdownId}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {action}
          <Icon size={18} />
          <ChevronDown size={16} className={isOpen ? 'dropdown-icon open' : 'dropdown-icon'} aria-hidden="true" />
        </button>
      </div>
      <span>{value}</span>
      {isOpen && <EditableDropdown field={field} id={dropdownId} label={label} onClose={() => setIsOpen(false)} />}
    </article>
  )
}

function EditableDropdown({ field, id, label, onClose }) {
  const isPassword = field === 'password'
  const inputType = isPassword ? 'password' : field === 'phone' ? 'tel' : 'email'
  const primaryLabel = isPassword ? 'Nova senha' : `Novo ${label.toLowerCase()}`

  return (
    <form
      id={id}
      className="editable-dropdown"
      onSubmit={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <label>
        <span>{primaryLabel}</span>
        <input
          required
          type={inputType}
          placeholder={primaryLabel}
          autoComplete={isPassword ? 'new-password' : field}
          minLength={isPassword ? 6 : undefined}
        />
      </label>

      {isPassword && (
        <label>
          <span>Confirmar senha</span>
          <input required type="password" placeholder="Confirmar senha" autoComplete="new-password" minLength={6} />
        </label>
      )}

      <div className="editable-dropdown-actions">
        <button type="submit">Salvar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </div>
    </form>
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
