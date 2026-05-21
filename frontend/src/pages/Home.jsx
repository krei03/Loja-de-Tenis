import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Flame, ShieldCheck, Truck } from 'lucide-react'
import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'
import { api } from '../services/api'

export function Home({ onAdd }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    Promise.all([api.getProducts(), api.getCategories()]).then(([productData, categoryData]) => {
      setProducts(productData)
      setCategories(categoryData)
    })
  }, [])

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products
    }

    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory, products])

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
            {visibleProducts.map((product) => (
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
                className={activeCategory === category.id ? 'active' : ''}
                onClick={() => setActiveCategory(category.id)}
              >
                <Filter size={16} />
                {category.name}
              </button>
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
