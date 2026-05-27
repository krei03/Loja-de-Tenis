import { useEffect, useMemo, useState } from 'react'
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
            <h2>Drops exclusivos para elevar seu estilo</h2>
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
            <h2>Mais moderno/streetwear</h2>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} onAdd={onAdd} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
