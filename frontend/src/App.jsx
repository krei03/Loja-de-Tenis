import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Cart } from './components/Cart'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { BrandProfile } from './pages/BrandProfile'
import { Admin } from './pages/Admin'
import { Checkout } from './pages/Checkout'
import { SalesReport } from './pages/SalesReport'
import { api } from './services/api'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [theme, setTheme] = useState(() => localStorage.getItem('vertex-theme') || 'dark')

  useEffect(() => {
    api.getProducts().then(setProducts)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('vertex-theme', theme)
  }, [theme])

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  const addToCart = (product) => {
    const cartKey = product.selectedSize ? `${product.id}-${product.selectedSize}` : product.id

    setCart((items) => {
      const existing = items.find((item) => item.cartKey === cartKey)

      if (existing) {
        return items.map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...items, { ...product, cartKey, quantity: 1 }]
    })
  }

  const increment = (cartKey) => {
    setCart((items) =>
      items.map((item) => (item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const decrement = (cartKey) => {
    setCart((items) =>
      items
        .map((item) => (item.cartKey === cartKey ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const remove = (cartKey) => {
    setCart((items) => items.filter((item) => item.cartKey !== cartKey))
  }

  const refreshProducts = () => {
    api.getProducts().then(setProducts)
  }

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home onAdd={addToCart} />} />
        <Route path="/brand/:brandId" element={<BrandProfile products={products} onAdd={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail products={products} onAdd={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onIncrement={increment}
              onDecrement={decrement}
              onRemove={remove}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cart={cart} onOrderPlaced={() => setCart([])} />} />
        <Route
          path="/admin"
          element={<Admin products={products} onProductsChanged={refreshProducts} />}
        />
        <Route path="/admin/sales" element={<SalesReport />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
