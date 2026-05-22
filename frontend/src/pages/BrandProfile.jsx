import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDown, ChevronLeft, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { api } from '../services/api'

const fallbackFilters = ['Genero', 'Tipo de produto', 'Tamanho', 'Preco', 'Modelos', 'Cores', 'Esportes', 'Marca']

export function BrandProfile({ onAdd, products }) {
  const { brandId } = useParams()
  const [carouselItems, setCarouselItems] = useState([])

  useEffect(() => {
    api.getCategoryCarousel().then(setCarouselItems)
  }, [])

  const brand = useMemo(
    () => carouselItems.find((item) => item.id === brandId) || createFallbackBrand(brandId),
    [brandId, carouselItems],
  )

  const brandProducts = useMemo(() => {
    const normalizedName = brand.name.toLowerCase()
    const normalizedId = brand.id.toLowerCase()

    return products.filter((product) => {
      const productBrand = product.brand.toLowerCase()
      const productCategory = product.category.toLowerCase()

      return productBrand === normalizedName || productBrand.includes(normalizedName) || productCategory === normalizedId
    })
  }, [brand, products])

  const visibleProducts = brandProducts.length ? brandProducts : products

  return (
    <main className="brand-profile-page">
      <Link className="back-link" to="/">
        <ChevronLeft size={18} />
        Voltar
      </Link>

      <section className="brand-hero">
        <div className="brand-hero-logo">
          {brand.logo ? <img src={brand.logo} alt={brand.name} /> : <span>{brand.name.slice(0, 2).toUpperCase()}</span>}
        </div>
        <div>
          <p>Perfil da marca</p>
          <h1>{brand.name}</h1>
          <span>
            Curadoria premium de sneakers e streetwear com produtos cadastrados em tempo real.
          </span>
        </div>
        <strong>{brandProducts.length} produto(s)</strong>
      </section>

      <section className="brand-catalog-layout">
        <aside className="brand-filter-panel" aria-label="Filtros da marca">
          <div className="brand-filter-title">
            <SlidersHorizontal size={18} />
            Filtros
          </div>
          {fallbackFilters.map((filter) => (
            <button type="button" key={filter}>
              {filter}
              <ChevronDown size={18} />
            </button>
          ))}
        </aside>

        <div className="brand-product-area">
          <div className="brand-results-heading">
            <p>{brand.name}</p>
            <h2>Modelos cadastrados</h2>
          </div>

          <div className="product-grid brand-product-grid">
            {visibleProducts.map((product) => (
              <ProductCard product={product} key={product.id} onAdd={onAdd} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function createFallbackBrand(id = '') {
  const name = id
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')

  return {
    id,
    logo: '',
    name: name || 'Marca',
  }
}
