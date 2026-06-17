import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Apple, User } from 'lucide-react'
import { AccountSidebar } from '../components/AccountSidebar'
import { CustomerAccountContent } from '../components/CustomerAccountContent'
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

        <section className="account-content">
          <CustomerAccountContent customer={customer} customerOrders={customerOrders} page={page} />
        </section>
      </section>
    </main>
  )
}
