import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Flame, ShieldCheck, Truck } from 'lucide-react'
import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'
import { api } from '../services/api'

export function Home({ onAdd }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    category: 'all',
    brand: 'all',
    size: '',
    minPrice: '',
    maxPrice: '',
  })

  useEffect(() => {
    Promise.all([api.getProducts(filters), api.getCategories()]).then(([productData, categoryData]) => {
      setProducts(productData)
      setCategories(categoryData)
    })
  }, [filters])

  const brands = useMemo(() => [...new Set(products.map((product) => product.brand))], [products])
  const sizes = useMemo(
    () => [...new Set(products.flatMap((product) => product.sizes || []))].sort((a, b) => a - b),
    [products],
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
            <h2>Selecao premium em tempo real</h2>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} onAdd={onAdd} />
            ))}
          </div>
        </section>

        <section className="category-band" id="categories">
          <div className="section-heading">
            <p>Categorias</p>
            <h2>Escolha pelo momento do fit</h2>
          </div>

          <div className="category-controls" aria-label="Categorias de produto">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={filters.category === category.id ? 'active' : ''}
                onClick={() => setCategory(category.id)}
              >
                <Filter size={16} />
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
