import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Ruler, ShieldCheck, ShoppingBag } from 'lucide-react'

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function ProductDetail({ products, onAdd }) {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)
  const [selectedSizeByProduct, setSelectedSizeByProduct] = useState({})
  const [activeImageByProduct, setActiveImageByProduct] = useState({})
  const [descriptionOpenByProduct, setDescriptionOpenByProduct] = useState({})
  const selectedSize = product ? selectedSizeByProduct[product.id] ?? product.sizes?.[0] ?? null : null
  const galleryImages = product ? [...new Set([product.image, ...(product.gallery || [])].filter(Boolean))] : []
  const hasLongDescription = (product?.description || '').length > 220
  const activeImage = product ? activeImageByProduct[product.id] ?? 0 : 0
  const descriptionOpen = product ? Boolean(descriptionOpenByProduct[product.id]) : false

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
        <div className="gallery-shell">
          <div className="gallery-main">
            <img src={galleryImages[activeImage] || product.image} alt={product.name} />
          </div>
          <div className="gallery-thumbs" aria-label="Galeria do produto">
            {galleryImages.map((image, index) => (
              <button
                type="button"
                key={image}
                className={activeImage === index ? 'active' : undefined}
                onClick={() => setActiveImageByProduct((current) => ({ ...current, [product.id]: index }))}
                aria-label={`Ver imagem ${index + 1}`}
              >
                <img src={image} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <aside className="detail-panel">
          <p>{product.badge}</p>
          <h1>{product.name}</h1>
          <strong>{money.format(product.price)}</strong>
          <small>{product.brand} / estoque {product.stock ?? 0}</small>
          <div className={`product-description ${descriptionOpen ? 'expanded' : ''}`}>
            <span>{product.description}</span>
            {hasLongDescription && (
              <button
                type="button"
                onClick={() =>
                  setDescriptionOpenByProduct((current) => ({ ...current, [product.id]: !descriptionOpen }))
                }
              >
                {descriptionOpen ? 'Ler menos' : 'Ler mais'}
              </button>
            )}
          </div>

          <div className="sizes">
            <div>
              <Ruler size={18} />
              Tamanhos
            </div>
            <div className="size-grid">
              {product.sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  className={selectedSize === size ? 'selected' : undefined}
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSizeByProduct((current) => ({ ...current, [product.id]: size }))}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            className="primary-action"
            type="button"
            onClick={() => onAdd({ ...product, selectedSize })}
          >
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
