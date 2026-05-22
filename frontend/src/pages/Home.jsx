import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CircleDot, Flame, ShieldCheck, Truck } from 'lucide-react'
import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'
import { api } from '../services/api'

const categoryIcons = {
  all: 'VX',
  launch: '01',
  running: 'RUN',
  streetwear: 'ST',
  limited: 'LTD',
}

export function Home({ onAdd }) {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    category: 'all',
    brand: 'all',
    size: '',
    minPrice: '',
    maxPrice: '',
  })

  useEffect(() => {
    Promise.all([api.getProducts(), api.getCategories()]).then(([productData, categoryData]) => {
      setAllProducts(productData)
      setCategories(categoryData)
    })
  }, [])

  useEffect(() => {
    api.getProducts(filters).then(setFilteredProducts)
  }, [filters])

  const launches = useMemo(() => {
    const launchProducts = allProducts.filter((product) => product.category === 'launch')
    return [...launchProducts, ...allProducts.filter((product) => product.category !== 'launch')].slice(0, 4)
  }, [allProducts])

  const brands = useMemo(() => [...new Set(allProducts.map((product) => product.brand))], [allProducts])
  const sizes = useMemo(
    () => [...new Set(allProducts.flatMap((product) => product.sizes || []))].sort((a, b) => a - b),
    [allProducts],
  )

  const updateFilter = (event) => {
    setFilters((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const setCategory = (category) => {
    setFilters((current) => ({ ...current, category }))
  }

  return (
    <>
      <Hero />

      <main>
        <section className="launches" id="launches">
          <div className="section-heading">
            <p>Lancamentos</p>
            <h2>4 tenis premium para entrar no radar agora</h2>
          </div>

          <div className="product-grid launches-grid">
            {launches.map((product) => (
              <ProductCard product={product} key={product.id} onAdd={onAdd} />
            ))}
          </div>
        </section>

        <section className="category-band" id="categories">
          <div className="section-heading">
            <p>Categorias</p>
            <h2>Escolha pelo momento do fit</h2>
          </div>

          <div className="category-carousel" aria-label="Categorias de produto">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={filters.category === category.id ? 'active' : ''}
                onClick={() => setCategory(category.id)}
              >
                <span>{categoryIcons[category.id] || <CircleDot size={22} />}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className="advanced-filters">
            <select name="brand" value={filters.brand} onChange={updateFilter}>
              <option value="all">Todas as marcas</option>
              {brands.map((brand) => (
                <option value={brand} key={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select name="size" value={filters.size} onChange={updateFilter}>
              <option value="">Todos os tamanhos</option>
              {sizes.map((size) => (
                <option value={size} key={size}>
                  {size}
                </option>
              ))}
            </select>
            <input name="minPrice" type="number" placeholder="Preco min." value={filters.minPrice} onChange={updateFilter} />
            <input name="maxPrice" type="number" placeholder="Preco max." value={filters.maxPrice} onChange={updateFilter} />
          </div>
        </section>

        <section className="catalog-section">
          <div className="section-heading">
            <p>Vitrine</p>
            <h2>Selecao premium em tempo real</h2>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} onAdd={onAdd} />
            ))}
          </div>
        </section>

        <section className="trust-band">
          {[
            ['Drops verificados', Flame],
            ['Entrega rastreada', Truck],
            ['Compra protegida', ShieldCheck],
          ].map(([label, Icon]) => (
            <motion.div className="trust-item" key={label} whileHover={{ y: -4 }}>
              <Icon size={24} />
              <span>{label}</span>
            </motion.div>
          ))}
        </section>
      </main>
    </>
  )
}
