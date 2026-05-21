import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Ruler, ShieldCheck, ShoppingBag } from 'lucide-react'

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function ProductDetail({ products, onAdd }) {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)

  if (!product) {
    return (
      <main className="product-detail missing">
        <h1>Produto nao encontrado</h1>
        <Link to="/">Voltar para drops</Link>
      </main>
    )
  }

  return (
    <main className="product-detail">
      <Link className="back-link" to="/">
        <ChevronLeft size={18} />
        Voltar
      </Link>

      <section className="detail-grid">
        <div className="gallery">
          {product.gallery.map((image) => (
            <img src={image} alt={product.name} key={image} />
          ))}
        </div>

        <aside className="detail-panel">
          <p>{product.badge}</p>
          <h1>{product.name}</h1>
          <strong>{money.format(product.price)}</strong>
          <span>{product.description}</span>

          <div className="sizes">
            <div>
              <Ruler size={18} />
              Tamanhos
            </div>
            <div className="size-grid">
              {product.sizes.map((size) => (
                <button type="button" key={size}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="primary-action" type="button" onClick={() => onAdd(product)}>
            <ShoppingBag size={19} />
            Adicionar ao carrinho
          </button>

          <div className="premium-note">
            <ShieldCheck size={20} />
            Produto verificado, envio rastreado e embalagem premium inclusa.
          </div>
        </aside>
      </section>
    </main>
  )
}
