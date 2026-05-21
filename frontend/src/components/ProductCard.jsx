import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ShoppingBag } from 'lucide-react'

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function ProductCard({ product, onAdd }) {
  return (
    <motion.article
      className="product-card"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
    >
      <Link to={`/product/${product.id}`} className="product-media">
        <img src={product.image} alt={product.name} />
        <span>{product.badge}</span>
      </Link>

      <div className="product-info">
        <div>
          <p>{product.color}</p>
          <h3>{product.name}</h3>
        </div>
        <strong>{money.format(product.price)}</strong>
      </div>

      <div className="card-actions">
        <button type="button" onClick={() => onAdd(product)}>
          <ShoppingBag size={18} />
          Adicionar
        </button>
        <Link to={`/product/${product.id}`} aria-label={`Ver ${product.name}`}>
          <ArrowUpRight size={20} />
        </Link>
      </div>
    </motion.article>
  )
}
