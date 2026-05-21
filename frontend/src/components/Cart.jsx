import { Link } from 'react-router-dom'
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from 'lucide-react'

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function Cart({ cart, onIncrement, onDecrement, onRemove }) {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <section className="cart-shell">
      <div className="section-heading">
        <p>Carrinho</p>
        <h1>Seu drop reservado</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={40} />
          <p>O carrinho esta vazio.</p>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.cartKey}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{[item.color, item.selectedSize ? `Tam. ${item.selectedSize}` : null].filter(Boolean).join(' / ')}</p>
                  <strong>{money.format(item.price)}</strong>
                </div>
                <div className="quantity">
                  <button type="button" onClick={() => onDecrement(item.cartKey)} aria-label="Diminuir">
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => onIncrement(item.cartKey)} aria-label="Aumentar">
                    <Plus size={16} />
                  </button>
                </div>
                <button type="button" onClick={() => onRemove(item.cartKey)} aria-label="Remover">
                  <Trash2 size={18} />
                </button>
              </article>
            ))}
          </div>

          <aside className="checkout-panel">
            <p>Subtotal</p>
            <strong>{money.format(subtotal)}</strong>
            <span>
              <Truck size={16} />
              Frete gratis acima de R$ 1.200
            </span>
            <span>
              <ShieldCheck size={16} />
              Compra protegida
            </span>
            <Link to="/checkout">Finalizar pedido</Link>
          </aside>
        </div>
      )}
    </section>
  )
}
