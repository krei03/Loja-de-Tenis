import { useState } from 'react'
import {
  Calendar,
  ChevronDown,
  CreditCard,
  FilePenLine,
  Heart,
  Home,
  Mail,
  PackageCheck,
  Phone,
} from 'lucide-react'

export function CustomerAccountContent({ customer, customerOrders, page = 'dashboard' }) {
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
      body: <PaymentCardManager customer={customer} />,
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

function PaymentCardManager({ customer }) {
  const initialCard = {
    id: 'principal',
    label: 'Principal',
    holder: customer.name,
    brand: 'Visa',
    lastDigits: '4242',
    expiresAt: '12/29',
  }
  const emptyCardForm = {
    holder: customer.name,
    number: '',
    expiresAt: '',
    brand: 'Visa',
  }
  const [cards, setCards] = useState([initialCard])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [cardForm, setCardForm] = useState(emptyCardForm)

  const openCreateForm = () => {
    setCardForm(emptyCardForm)
    setIsFormOpen(true)
  }

  const updateCardForm = (event) => {
    const { name, value } = event.target
    setCardForm((current) => ({ ...current, [name]: value }))
  }

  const saveCard = (event) => {
    event.preventDefault()
    const digits = cardForm.number.replace(/\D/g, '')

    setCards((current) => [
      ...current,
      {
        id: `card-${Date.now()}`,
        label: current.length === 0 ? 'Principal' : 'Pagamento',
        holder: cardForm.holder,
        brand: cardForm.brand,
        lastDigits: digits.slice(-4) || '0000',
        expiresAt: cardForm.expiresAt,
      },
    ])
    setCardForm(emptyCardForm)
    setIsFormOpen(false)
  }

  const removeCard = (id) => {
    setCards((current) => current.filter((card) => card.id !== id))
  }

  return (
    <div className="payment-card-manager">
      <div className="payment-card-toolbar">
        <p>Gerencie os cartoes vinculados a sua conta para proximas compras.</p>
        <button type="button" onClick={openCreateForm}>
          <CreditCard size={18} />
          Cadastrar cartao
        </button>
      </div>

      {isFormOpen && (
        <form className="payment-card-form" onSubmit={saveCard}>
          <div className="payment-card-form-grid">
            <label>
              <span>Nome impresso</span>
              <input required name="holder" value={cardForm.holder} onChange={updateCardForm} />
            </label>
            <label>
              <span>Numero do cartao</span>
              <input
                required
                inputMode="numeric"
                name="number"
                value={cardForm.number}
                onChange={updateCardForm}
                placeholder="0000 0000 0000 0000"
              />
            </label>
            <label>
              <span>Validade</span>
              <input required name="expiresAt" value={cardForm.expiresAt} onChange={updateCardForm} placeholder="MM/AA" />
            </label>
            <label>
              <span>Bandeira</span>
              <select name="brand" value={cardForm.brand} onChange={updateCardForm}>
                <option>Visa</option>
                <option>Mastercard</option>
                <option>Elo</option>
                <option>Amex</option>
              </select>
            </label>
          </div>
          <div className="payment-card-form-actions">
            <button type="submit">Salvar cartao</button>
            <button type="button" onClick={() => setIsFormOpen(false)}>Cancelar</button>
          </div>
        </form>
      )}

      <section className="payment-card-grid" aria-label="Cartoes cadastrados">
        {cards.map((card) => (
          <article className={`payment-card ${card.label === 'Principal' ? 'selected' : ''}`} key={card.id}>
            <span>{card.label}</span>
            <CreditCard size={28} aria-hidden="true" />
            <strong>{card.brand} final {card.lastDigits}</strong>
            <p>{card.holder}</p>
            <p>Validade {card.expiresAt}</p>
            <div>
              <button type="button" onClick={() => removeCard(card.id)}>Remover</button>
            </div>
          </article>
        ))}
        <article className="payment-card empty-payment-card">
          <CreditCard size={28} />
          <p>Cadastre um novo cartao para acelerar proximas compras.</p>
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
