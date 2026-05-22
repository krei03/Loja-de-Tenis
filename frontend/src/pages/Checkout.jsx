import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, CreditCard, Truck } from 'lucide-react'
import { api } from '../services/api'

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function Checkout({ cart, onOrderPlaced }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    payment: 'credit',
  })
  const [status, setStatus] = useState(null)

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  )
  const shipping = subtotal > 1200 || subtotal === 0 ? 0 : 29.9
  const total = subtotal + shipping

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitOrder = async (event) => {
    event.preventDefault()
    const order = await api.createOrder({
      customer: form,
      items: cart.map(({ brand, color, id, image, name, price, quantity, selectedSize }) => ({
        brand,
        color,
        id,
        image,
        name,
        price,
        quantity,
        selectedSize,
        total: price * quantity,
      })),
    })

    setStatus(order)
    onOrderPlaced()
  }

  if (status) {
    return (
      <main className="checkout-page success-page">
        <CheckCircle2 size={48} />
        <h1>Pedido criado</h1>
        <p>Pedido {status.id} recebido e pronto para separacao.</p>
        <Link className="primary-link" to="/">
          Voltar aos drops
        </Link>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="section-heading">
        <p>Checkout</p>
        <h1>Finalizacao de compra</h1>
      </div>

      <form className="checkout-form" onSubmit={submitOrder}>
        <section className="form-panel">
          <h2>Dados de entrega</h2>
          <input required name="name" placeholder="Nome completo" value={form.name} onChange={updateField} />
          <input required name="email" type="email" placeholder="Email" value={form.email} onChange={updateField} />
          <input required name="phone" placeholder="Telefone" value={form.phone} onChange={updateField} />
          <input required name="cep" placeholder="CEP" value={form.cep} onChange={updateField} />
          <input required name="address" placeholder="Endereco completo" value={form.address} onChange={updateField} />

          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="credit"
                checked={form.payment === 'credit'}
                onChange={updateField}
              />
              <CreditCard size={18} />
              Cartao
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="pix"
                checked={form.payment === 'pix'}
                onChange={updateField}
              />
              <Truck size={18} />
              Pix
            </label>
          </div>
        </section>

        <aside className="checkout-panel">
          <p>Subtotal</p>
          <strong>{money.format(subtotal)}</strong>
          <span>Frete: {money.format(shipping)}</span>
          <span>Total: {money.format(total)}</span>
          <button type="submit" disabled={cart.length === 0}>
            Criar pedido
          </button>
        </aside>
      </form>
    </main>
  )
}
