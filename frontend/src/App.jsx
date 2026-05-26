import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Cart } from './components/Cart'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { BrandProfile } from './pages/BrandProfile'
import { Admin } from './pages/Admin'
import { Checkout } from './pages/Checkout'
import { SalesReport } from './pages/SalesReport'
import { CustomerAccount, CustomerLogin } from './pages/CustomerPortal'
import { api } from './services/api'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [theme, setTheme] = useState(() => localStorage.getItem('vertex-theme') || 'dark')
  const [customer, setCustomer] = useState(readCustomerSession)
  const [customerOrders, setCustomerOrders] = useState(() => readStorage('vertex-customer-orders') || [])

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

  const loginCustomer = (session) => {
    setCustomer(session)
    localStorage.setItem('vertex-customer-session', JSON.stringify(session))
  }

  const logoutCustomer = () => {
    setCustomer(null)
    localStorage.removeItem('vertex-customer-session')
  }

  const saveCustomerOrder = (order) => {
    if (!customer || order.customer?.email !== customer.email) {
      return
    }

    const nextOrders = [order, ...customerOrders].slice(0, 20)
    setCustomerOrders(nextOrders)
    localStorage.setItem('vertex-customer-orders', JSON.stringify(nextOrders))
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar cartCount={cartCount} customer={customer} theme={theme} onToggleTheme={toggleTheme} />
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
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              customer={customer}
              onOrderPlaced={(order) => {
                saveCustomerOrder(order)
                setCart([])
              }}
            />
          }
        />
        <Route path="/login" element={<CustomerLogin customer={customer} onLogin={loginCustomer} />} />
        <Route
          path="/account"
          element={<CustomerAccount customer={customer} customerOrders={customerOrders} onLogout={logoutCustomer} />}
        />
        <Route
          path="/account/orders"
          element={<CustomerAccount customer={customer} customerOrders={customerOrders} onLogout={logoutCustomer} page="orders" />}
        />
        <Route
          path="/account/favorites"
          element={<CustomerAccount customer={customer} customerOrders={customerOrders} onLogout={logoutCustomer} page="favorites" />}
        />
        <Route
          path="/account/profile"
          element={<CustomerAccount customer={customer} customerOrders={customerOrders} onLogout={logoutCustomer} page="profile" />}
        />
        <Route
          path="/account/edit"
          element={<CustomerAccount customer={customer} customerOrders={customerOrders} onLogout={logoutCustomer} page="edit" />}
        />
        <Route
          path="/account/addresses"
          element={<CustomerAccount customer={customer} customerOrders={customerOrders} onLogout={logoutCustomer} page="addresses" />}
        />
        <Route
          path="/account/preferences"
          element={<CustomerAccount customer={customer} customerOrders={customerOrders} onLogout={logoutCustomer} page="preferences" />}
        />
        <Route
          path="/account/cards"
          element={<CustomerAccount customer={customer} customerOrders={customerOrders} onLogout={logoutCustomer} page="cards" />}
        />
        <Route
          path="/account/help"
          element={<CustomerAccount customer={customer} customerOrders={customerOrders} onLogout={logoutCustomer} page="help" />}
        />
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

function readStorage(key) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

function readCustomerSession() {
  const session = readStorage('vertex-customer-session')

  if (!session || !session.email || !session.provider) {
    localStorage.removeItem('vertex-customer-session')
    return null
  }

  if (session.expiresAt && Date.parse(session.expiresAt) <= Date.now()) {
    localStorage.removeItem('vertex-customer-session')
    return null
  }

  if (session.provider === 'email' && !session.token) {
    localStorage.removeItem('vertex-customer-session')
    return null
  }

  return session
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default App
