import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, ShieldCheck, Truck } from 'lucide-react'
import { Hero } from '../components/Hero'
import { CategoryCarousel } from '../components/CategoryCarousel'
import { ProductCard } from '../components/ProductCard'
import { api } from '../services/api'

export function Home({ onAdd }) {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCarouselItem, setActiveCarouselItem] = useState(null)

  useEffect(() => {
    api.getProducts().then((productData) => {
      setAllProducts(productData)
      setFilteredProducts(productData)
    })
  }, [])

  const launches = useMemo(() => {
    const launchProducts = allProducts.filter((product) => product.category === 'launch')
    return [...launchProducts, ...allProducts.filter((product) => product.category !== 'launch')].slice(0, 4)
  }, [allProducts])

  const selectCarouselItem = (item) => {
    setActiveCarouselItem(item.id)
  }

  return (
    <>
      <Hero />

      <main>
        <section className="launches" id="launches">
          <div className="section-heading">
            <p>Lancamentos</p>
            <h2>Melhores drops premium para entrar no radar</h2>
          </div>

          <div className="product-grid launches-grid">
            {launches.map((product) => (
              <ProductCard product={product} key={product.id} onAdd={onAdd} />
            ))}
          </div>
        </section>

        <CategoryCarousel activeItemId={activeCarouselItem} onSelect={selectCarouselItem} />

        <section className="catalog-section">
          <div className="section-heading">
            <p>{activeCarouselItem ? 'Categoria selecionada' : 'Vitrine'}</p>
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
