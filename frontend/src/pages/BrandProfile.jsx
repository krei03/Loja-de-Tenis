import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDown, ChevronLeft, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { api } from '../services/api'

const fallbackFilters = ['Genero', 'Tamanho', 'Preco', 'Modelos', 'Marca']
const genderOptions = ['Feminino', 'Masculino', 'Unissex']
const priceOptions = [
  { label: 'R$ 100 - R$ 200', min: 100, max: 200 },
  { label: 'R$ 200 - R$ 300', min: 200, max: 300 },
  { label: 'R$ 300 - R$ 400', min: 300, max: 400 },
  { label: 'R$ 400 - R$ 500', min: 400, max: 500 },
  { label: 'Acima de R$ 500', min: 500, max: Infinity },
]
const sizeOptions = ['32,5', '33', '33,5', '34', '34,5', '34.5', '35', '35,5', '36', '36,5', '37', '37,5', '38', '39', '39,5', '40', '40,5', '41', '41,5', '42', '42,5', '43', '43,5', '44']

export function BrandProfile({ onAdd, products }) {
  const { brandId } = useParams()
  const [carouselItems, setCarouselItems] = useState([])
  const [expandedFilter, setExpandedFilter] = useState('Genero')
  const [selectedGender, setSelectedGender] = useState('Masculino')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    api.getCategoryCarousel().then(setCarouselItems)
  }, [])

  const brand = useMemo(
    () => carouselItems.find((item) => item.id === brandId) || createFallbackBrand(brandId),
    [brandId, carouselItems],
  )
  const modelOptions = brand.models || []
  const activeSelectedModel = modelOptions.includes(selectedModel) ? selectedModel : ''

  useEffect(() => {
    const previousTitle = document.title
    const metaDescription = document.querySelector('meta[name="description"]')
    const previousDescription = metaDescription?.getAttribute('content') || ''

    document.title = brand.meta_title || `${brand.name} | Vertex`
    metaDescription?.setAttribute(
      'content',
      brand.meta_description || brand.description || `Explore produtos ${brand.name} na Vertex.`,
    )

    return () => {
      document.title = previousTitle
      metaDescription?.setAttribute('content', previousDescription)
    }
  }, [brand])

  const brandProducts = useMemo(() => {
    const normalizedName = brand.name.toLowerCase()
    const normalizedId = brand.id.toLowerCase()

    return products.filter((product) => {
      const productBrand = product.brand.toLowerCase()
      const productCategory = product.category.toLowerCase()

      return productBrand === normalizedName || productBrand.includes(normalizedName) || productCategory === normalizedId
    })
  }, [brand, products])

  const visibleProducts = useMemo(() => {
    const sourceProducts = brandProducts.length ? brandProducts : products

    return sourceProducts.filter((product) => {
      const matchesSize = selectedSize ? product.sizes?.includes(selectedSize) : true
      const productGender = product.gender || product.genero
      const matchesGender = selectedGender && productGender ? productGender === selectedGender : true
      const matchesModel = activeSelectedModel
        ? product.name.toLowerCase().includes(activeSelectedModel.toLowerCase())
        : true
      const priceRange = priceOptions.find((option) => option.label === selectedPrice)
      const matchesPrice = priceRange ? product.price >= priceRange.min && product.price < priceRange.max : true

      return matchesSize && matchesGender && matchesModel && matchesPrice
    })
  }, [activeSelectedModel, brandProducts, products, selectedGender, selectedPrice, selectedSize])

  return (
    <main className="brand-profile-page">
      <Link className="back-link" to="/">
        <ChevronLeft size={18} />
        Voltar
      </Link>

      <section
        className={`brand-hero ${brand.banner ? 'has-banner' : ''}`}
        style={brand.banner ? { backgroundImage: `url(${brand.banner})` } : undefined}
      >
        <div className="brand-hero-logo">
          {brand.logo ? <img src={brand.logo} alt={brand.name} /> : getLogoFallback(brand.name)}
        </div>
        <div className="brand-results-heading">
          <p>Perfil da marca</p>
          <h1>{brand.name}</h1>
          <span>{brand.description || 'Selecao premium com curadoria de sneakers, roupas e drops especiais.'}</span>
        </div>
        <strong>{visibleProducts.length} produto(s)</strong>
      </section>

      <section className="brand-catalog-layout">
        <aside className="brand-filter-panel" aria-label="Filtros da marca">
          <div className="brand-filter-title">
            <SlidersHorizontal size={18} />
            Filtros
          </div>
          {fallbackFilters.map((filter) => (
            <div className="brand-filter-group" key={filter}>
              <button
                type="button"
                aria-expanded={expandedFilter === filter}
                onClick={() => setExpandedFilter((current) => (current === filter ? '' : filter))}
              >
                {getFilterLabel(filter, { selectedGender, selectedModel: activeSelectedModel, selectedPrice })}
                <ChevronDown size={18} />
              </button>

              {filter === 'Genero' && expandedFilter === 'Genero' && (
                <div className="brand-option-list">
                  {genderOptions.map((gender) => (
                    <label key={gender}>
                      <input
                        type="checkbox"
                        checked={selectedGender === gender}
                        onChange={() => setSelectedGender((current) => (current === gender ? '' : gender))}
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              )}

              {filter === 'Tamanho' && expandedFilter === 'Tamanho' && (
                <div className="brand-size-grid">
                  {sizeOptions.map((size) => (
                    <button
                      type="button"
                      className={selectedSize === size ? 'active' : ''}
                      key={size}
                      onClick={() => setSelectedSize((current) => (current === size ? '' : size))}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}

              {filter === 'Preco' && expandedFilter === 'Preco' && (
                <div className="brand-option-list">
                  {priceOptions.map((option) => (
                    <label key={option.label}>
                      <input
                        type="checkbox"
                        checked={selectedPrice === option.label}
                        onChange={() => setSelectedPrice((current) => (current === option.label ? '' : option.label))}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {filter === 'Modelos' && expandedFilter === 'Modelos' && (
                <div className="brand-option-list">
                  {modelOptions.length > 0 ? (
                    modelOptions.map((model) => (
                      <label key={model}>
                        <input
                          type="checkbox"
                          checked={activeSelectedModel === model}
                          onChange={() => setSelectedModel((current) => (current === model ? '' : model))}
                        />
                        <span>{model}</span>
                      </label>
                    ))
                  ) : (
                    <p className="brand-filter-empty">Nenhum modelo cadastrado.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </aside>

        <div className="brand-product-area">
          <div className="brand-results-heading">
            <p>Catalogo</p>
            <h2>{activeSelectedModel || brand.name}</h2>
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

function getFilterLabel(filter, { selectedGender, selectedModel, selectedPrice }) {
  if (filter === 'Genero' && selectedGender) {
    return `${filter} (1)`
  }

  if (filter === 'Preco' && selectedPrice) {
    return `${filter} (1)`
  }

  if (filter === 'Modelos' && selectedModel) {
    return `${filter} (1)`
  }

  return filter
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
    models: [],
    name: name || 'Marca',
    banner: '',
    description: '',
    meta_title: '',
    meta_description: '',
  }
}

function getLogoFallback(name = '') {
  return name
    .split(/\s|-/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}
