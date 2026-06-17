import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  ImagePlus,
  LockKeyhole,
  LogOut,
  Pencil,
  Save,
  Tags,
  Trash2,
  X,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { AdminMetrics } from '../components/AdminMetrics'
import { CategoryCarousel } from '../components/CategoryCarousel'
import { api } from '../services/api'

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function formatPriceInput(value) {
  const digits = String(value ?? '').replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  return money.format(Number(digits) / 100)
}

function parsePriceInput(value) {
  const digits = String(value ?? '').replace(/\D/g, '')
  return digits ? Number(digits) / 100 : 0
}

const emptyProduct = {
  name: '',
  brand: '',
  category: 'launch',
  price: '',
  badge: 'Novo',
  color: '',
  sizes: '38,39,40,41,42',
  images: [],
  imageUrl: '',
  description: '',
  stock: 1,
}

const emptyCarouselItem = {
  name: '',
  logo: '',
  banner: '',
  description: '',
  meta_title: '',
  meta_description: '',
  models: '',
  display_order: 1,
  is_active: true,
}

function getStoredAdminSession() {
  try {
    const stored = localStorage.getItem('vertex-admin-session')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function productToForm(product) {
  const images = [...new Set([product.image, ...(product.gallery || [])].filter(Boolean))].slice(0, 5)

  return {
    name: product.name || '',
    brand: product.brand || '',
    category: product.category || 'launch',
    price: formatPriceInput(Math.round((product.price ?? 0) * 100)),
    badge: product.badge || '',
    color: product.color || '',
    sizes: product.sizes?.join(',') || '',
    images,
    imageUrl: '',
    description: product.description || '',
    stock: product.stock ?? 0,
  }
}

export function Admin({ products, onProductsChanged }) {
  const [credentials, setCredentials] = useState({ username: 'admin', password: 'vertex123' })
  const [session, setSession] = useState(getStoredAdminSession)
  const [productForm, setProductForm] = useState(emptyProduct)
  const [editingProductId, setEditingProductId] = useState(null)
  const [carouselItems, setCarouselItems] = useState([])
  const [carouselForm, setCarouselForm] = useState(emptyCarouselItem)
  const [editingCarouselId, setEditingCarouselId] = useState(null)
  const [carouselEditorOpen, setCarouselEditorOpen] = useState(false)
  const [carouselListOpen, setCarouselListOpen] = useState(false)
  const [brandSearchOpen, setBrandSearchOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [message, setMessage] = useState('')
  const carouselEditorRef = useRef(null)

  const totalInventory = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price, 0)
  const totalSales = orders.reduce((sum, order) => sum + Number(order.total || 0), 0)
  const brands = useMemo(() => [...new Set(products.map((product) => product.brand))], [products])
  const productBrandOptions = useMemo(
    () =>
      [...new Set([...carouselItems.map((item) => item.name), ...brands].filter(Boolean))]
        .sort((first, second) => first.localeCompare(second)),
    [brands, carouselItems],
  )
  const filteredBrandOptions = productBrandOptions.filter((brand) =>
    brand.toLowerCase().includes(productForm.brand.toLowerCase()),
  )
  const editingProduct = products.find((product) => product.id === editingProductId)

  useEffect(() => {
    if (session?.token) {
      Promise.all([
        api.getAdminCategoryCarousel(session.token).then(setCarouselItems),
        api.getOrders(session.token).then(setOrders),
      ]).catch(() => {
        localStorage.removeItem('vertex-admin-session')
        setSession(null)
        setMessage('Sessao expirada. Entre novamente.')
      })
    }
  }, [session?.token])

  const updateCredentials = (event) => {
    setCredentials((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const updateProduct = (event) => {
    const { name, value } = event.target
    setProductForm((current) => ({
      ...current,
      [name]: name === 'price' ? formatPriceInput(value) : value,
    }))
  }

  const selectProductBrand = (brand) => {
    setProductForm((current) => ({ ...current, brand }))
    setBrandSearchOpen(false)
  }

  const updateCarousel = (event) => {
    const { checked, name, type, value } = event.target
    setCarouselForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      const result = await api.loginAdmin(credentials)
      localStorage.setItem('vertex-admin-session', JSON.stringify(result))
      setSession(result)
      setMessage('Admin autenticado.')
    } catch {
      setMessage('Credenciais invalidas ou sessao indisponivel.')
    }
  }

  const logout = () => {
    localStorage.removeItem('vertex-admin-session')
    setSession(null)
    setOrders([])
    setMessage('')
  }

  const refreshCarousel = async () => {
    if (!session?.token) {
      return
    }

    const items = await api.getAdminCategoryCarousel(session.token)
    setCarouselItems(items)
  }

  const addImages = (urls) => {
    setProductForm((current) => ({
      ...current,
      images: [...new Set([...current.images, ...urls.filter(Boolean)])].slice(0, 5),
      imageUrl: '',
    }))
  }

  const upload = async (event) => {
    const files = [...(event.target.files || [])].slice(0, 5 - productForm.images.length)

    if (!files.length || !session) {
      return
    }

    const uploaded = await Promise.all(files.map((file) => api.uploadImage(file, session.token)))
    addImages(uploaded.map((item) => item.url))
    setMessage(`${uploaded.length} imagem(ns) enviada(s).`)
    event.target.value = ''
  }

  const uploadCarouselLogo = async (event) => {
    const file = event.target.files?.[0]

    if (!file || !session) {
      return
    }

    const uploaded = await api.uploadImage(file, session.token)
    setCarouselForm((current) => ({ ...current, logo: uploaded.url }))
    setMessage('Logo do carrossel enviada.')
    event.target.value = ''
  }

  const uploadCarouselBanner = async (event) => {
    const file = event.target.files?.[0]

    if (!file || !session) {
      return
    }

    const uploaded = await api.uploadImage(file, session.token)
    setCarouselForm((current) => ({ ...current, banner: uploaded.url }))
    setMessage('Banner da marca enviado.')
    event.target.value = ''
  }

  const addImageUrl = () => {
    if (!productForm.imageUrl.trim()) {
      return
    }

    addImages([productForm.imageUrl.trim()])
    setMessage('Imagem adicionada a galeria.')
  }

  const removeImage = (image) => {
    setProductForm((current) => ({
      ...current,
      images: current.images.filter((item) => item !== image),
    }))
  }

  const moveImage = (index, direction) => {
    setProductForm((current) => {
      const nextIndex = index + direction

      if (nextIndex < 0 || nextIndex >= current.images.length) {
        return current
      }

      const images = [...current.images]
      const [image] = images.splice(index, 1)
      images.splice(nextIndex, 0, image)

      return { ...current, images }
    })
  }

  const buildProductPayload = () => ({
    ...productForm,
    price: parsePriceInput(productForm.price),
    stock: Number(productForm.stock),
    sizes: productForm.sizes,
    image: productForm.images[0] || '',
    gallery: productForm.images,
  })

  const resetProductForm = () => {
    setEditingProductId(null)
    setProductForm(emptyProduct)
  }

  const editProduct = (product) => {
    setEditingProductId(product.id)
    setProductForm(productToForm(product))
    setMessage(`Editando ${product.name}.`)
  }

  const saveProduct = async (event) => {
    event.preventDefault()

    if (!productForm.images.length) {
      setMessage('Adicione pelo menos uma imagem.')
      return
    }

    if (editingProductId) {
      await api.updateProduct(editingProductId, buildProductPayload(), session.token)
      setMessage('Produto atualizado.')
    } else {
      await api.createProduct(buildProductPayload(), session.token)
      setMessage('Produto cadastrado.')
    }

    resetProductForm()
    onProductsChanged()
  }

  const deleteProduct = async (id) => {
    await api.deleteProduct(id, session.token)
    setMessage('Produto removido.')
    onProductsChanged()
  }

  const resetCarouselForm = () => {
    setEditingCarouselId(null)
    setCarouselForm({
      ...emptyCarouselItem,
      display_order: carouselItems.length + 1,
    })
  }

  const editCarouselItem = (item) => {
    setCarouselEditorOpen(true)
    setEditingCarouselId(item.id)
    setCarouselForm({
      name: item.name,
      logo: item.logo || '',
      banner: item.banner || '',
      description: item.description || '',
      meta_title: item.meta_title || '',
      meta_description: item.meta_description || '',
      models: item.models?.join('\n') || '',
      display_order: item.display_order,
      is_active: item.is_active,
    })
    setMessage(`Editando ${item.name}.`)
    window.setTimeout(() => {
      carouselEditorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const saveCarouselItem = async (event) => {
    event.preventDefault()

    const payload = {
      ...carouselForm,
      models: carouselForm.models,
      display_order: Number(carouselForm.display_order),
      is_active: Boolean(carouselForm.is_active),
    }

    if (editingCarouselId) {
      await api.updateCategoryCarouselItem(editingCarouselId, payload, session.token)
      setMessage('Categoria do carrossel atualizada.')
    } else {
      await api.createCategoryCarouselItem(payload, session.token)
      setMessage('Categoria adicionada ao carrossel.')
    }

    resetCarouselForm()
    setCarouselEditorOpen(false)
    await refreshCarousel()
  }

  const deleteCarouselItem = async (id) => {
    await api.deleteCategoryCarouselItem(id, session.token)
    setMessage('Categoria removida do carrossel.')
    await refreshCarousel()
  }

  const toggleCarouselItem = async (item) => {
    await api.updateCategoryCarouselItem(item.id, { is_active: !item.is_active }, session.token)
    await refreshCarousel()
  }

  const moveCarouselItem = async (item, direction) => {
    const orderedItems = [...carouselItems].sort((first, second) => first.display_order - second.display_order)
    const index = orderedItems.findIndex((current) => current.id === item.id)
    const swap = orderedItems[index + direction]

    if (!swap) {
      return
    }

    await Promise.all([
      api.updateCategoryCarouselItem(item.id, { display_order: swap.display_order }, session.token),
      api.updateCategoryCarouselItem(swap.id, { display_order: item.display_order }, session.token),
    ])
    await refreshCarousel()
  }

  const renderCarouselManager = () => {
    const activePreviewItems = carouselItems.filter((item) => item.is_active)

    return (
      <section className="carousel-admin-shell">
        <div className="form-title-row carousel-admin-header">
          <div>
            <span>Carrossel premium</span>
            <h2>Gerenciar Carrossel de Categorias</h2>
          </div>
          <div className="carousel-admin-controls">
            <button
              type="button"
              className="carousel-admin-toggle"
              onClick={() => {
                setCarouselEditorOpen((current) => !current)

                if (carouselEditorOpen) {
                  resetCarouselForm()
                }
              }}
            >
              {carouselEditorOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              Criar categoria
            </button>
            <button
              type="button"
              className="carousel-admin-toggle secondary-toggle"
              onClick={() => setCarouselListOpen((current) => !current)}
            >
              {carouselListOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              {carouselListOpen ? 'Ocultar lista' : 'Mostrar lista'}
            </button>
          </div>
        </div>

        {carouselEditorOpen && (
          <motion.form
            ref={carouselEditorRef}
            className="form-panel carousel-admin-form"
            onSubmit={saveCarouselItem}
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="form-grid">
              <input required name="name" placeholder="Nome da marca" value={carouselForm.name} onChange={updateCarousel} />
              <input
                required
                name="display_order"
                type="number"
                placeholder="Lugar / ordem"
                value={carouselForm.display_order}
                onChange={updateCarousel}
              />
              <input name="logo" placeholder="URL da foto/logo" value={carouselForm.logo} onChange={updateCarousel} />
              <input name="banner" placeholder="URL do banner da marca" value={carouselForm.banner} onChange={updateCarousel} />
              <input
                name="meta_title"
                placeholder="Meta titulo"
                value={carouselForm.meta_title}
                onChange={updateCarousel}
              />
              <label className="toggle-field">
                <input
                  name="is_active"
                  type="checkbox"
                  checked={carouselForm.is_active}
                  onChange={updateCarousel}
                />
                Ativa
              </label>
            </div>

            <textarea
              required
              name="description"
              placeholder="Descricao da marca para o perfil"
              value={carouselForm.description}
              onChange={updateCarousel}
            />

            <textarea
              name="meta_description"
              placeholder="Meta descricao para buscadores"
              value={carouselForm.meta_description}
              onChange={updateCarousel}
            />

            <textarea
              name="models"
              placeholder="Modelos da marca, um por linha"
              value={carouselForm.models}
              onChange={updateCarousel}
            />

            <div className="upload-row">
              <label>
                <ImagePlus size={18} />
                Upload foto/logo
                <input type="file" accept="image/*" onChange={uploadCarouselLogo} />
              </label>
              <div className="carousel-logo-preview">
                {carouselForm.logo ? <img src={carouselForm.logo} alt="Preview do logo" /> : <span>Preview</span>}
              </div>
              <label>
                <ImagePlus size={18} />
                Upload banner
                <input type="file" accept="image/*" onChange={uploadCarouselBanner} />
              </label>
              <div className="carousel-banner-preview">
                {carouselForm.banner ? <img src={carouselForm.banner} alt="Preview do banner" /> : <span>Banner</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit">
                <Save size={18} />
                {editingCarouselId ? 'Atualizar categoria' : 'Adicionar categoria'}
              </button>
              <button type="button" className="secondary-action" onClick={resetCarouselForm}>
                <X size={18} />
                {editingCarouselId ? 'Cancelar edicao' : 'Limpar'}
              </button>
            </div>
          </motion.form>
        )}

        <CategoryCarousel items={activePreviewItems} />

        {carouselListOpen && (
          <motion.div
            className="admin-table carousel-admin-list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            {carouselItems.map((item) => (
              <article key={item.id}>
                <div className="carousel-admin-logo">
                  {item.logo ? <img src={item.logo} alt={item.name} /> : <span>{item.name.slice(0, 2).toUpperCase()}</span>}
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    Ordem {item.display_order} / {item.is_active ? 'ativa' : 'inativa'} / {(item.models || []).length} modelo(s)
                    {item.description ? ' / perfil completo' : ' / sem descricao'}
                  </p>
                </div>
                <span>{item.is_active ? 'Ativa' : 'Off'}</span>
                <div className="admin-actions">
                  <button type="button" onClick={() => moveCarouselItem(item, -1)} aria-label={`Subir ${item.name}`}>
                    <ChevronUp size={18} />
                  </button>
                  <button type="button" onClick={() => moveCarouselItem(item, 1)} aria-label={`Descer ${item.name}`}>
                    <ChevronDown size={18} />
                  </button>
                  <button type="button" onClick={() => toggleCarouselItem(item)} aria-label={`Alternar ${item.name}`}>
                    <Tags size={18} />
                  </button>
                  <button type="button" onClick={() => editCarouselItem(item)} aria-label={`Editar ${item.name}`}>
                    <Pencil size={18} />
                  </button>
                  <button type="button" onClick={() => deleteCarouselItem(item.id)} aria-label={`Remover ${item.name}`}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </article>
            ))}
          </motion.div>
        )}
      </section>
    )
  }

  const renderProductForm = (title) => (
    <form className="admin-product-form form-panel" onSubmit={saveProduct}>
      <div className="form-title-row">
        <div>
          <span>{editingProductId ? 'Edicao premium' : 'Novo drop'}</span>
          <h2>{title}</h2>
        </div>
        {editingProductId && (
          <button type="button" className="icon-close" onClick={resetProductForm} aria-label="Fechar edicao">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="form-grid">
        <input required name="name" placeholder="Nome" value={productForm.name} onChange={updateProduct} />
        <div className="product-brand-search">
          <input
            required
            name="brand"
            placeholder="Buscar marca"
            value={productForm.brand}
            autoComplete="off"
            onChange={updateProduct}
            onFocus={() => setBrandSearchOpen(true)}
            onBlur={() => window.setTimeout(() => setBrandSearchOpen(false), 120)}
          />
          {brandSearchOpen && filteredBrandOptions.length > 0 && (
            <div className="brand-search-list">
              {filteredBrandOptions.map((brand) => (
                <button type="button" key={brand} onMouseDown={() => selectProductBrand(brand)}>
                  {brand}
                </button>
              ))}
            </div>
          )}
        </div>
        <select name="category" value={productForm.category} onChange={updateProduct}>
          <option value="launch">Lancamentos</option>
          <option value="running">Performance</option>
          <option value="streetwear">Streetwear</option>
          <option value="limited">Limitados</option>
        </select>
        <input
          required
          name="price"
          type="text"
          inputMode="numeric"
          placeholder="R$ 0,00"
          value={productForm.price}
          onChange={updateProduct}
        />
        <input name="badge" placeholder="Selo" value={productForm.badge} onChange={updateProduct} />
        <input name="color" placeholder="Cor" value={productForm.color} onChange={updateProduct} />
        <input name="sizes" placeholder="Tamanhos" value={productForm.sizes} onChange={updateProduct} />
        <input name="stock" type="number" placeholder="Estoque" value={productForm.stock} onChange={updateProduct} />
      </div>

      <textarea
        required
        name="description"
        placeholder="Descricao"
        value={productForm.description}
        onChange={updateProduct}
      />

      <div className="upload-row">
        <label className={productForm.images.length >= 5 ? 'disabled' : undefined}>
          <ImagePlus size={18} />
          Upload ate 5
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={productForm.images.length >= 5}
            onChange={upload}
          />
        </label>
        <div className="image-url-field">
          <input
            name="imageUrl"
            placeholder="URL da imagem"
            value={productForm.imageUrl}
            onChange={updateProduct}
            disabled={productForm.images.length >= 5}
          />
          <button type="button" onClick={addImageUrl} disabled={productForm.images.length >= 5}>
            Adicionar
          </button>
        </div>
      </div>

      <div className="image-preview-grid" aria-label="Previews de imagens">
        {productForm.images.map((image, index) => (
          <figure key={image}>
            <img src={image} alt={`Preview ${index + 1}`} />
            <figcaption>{index === 0 ? 'Principal' : `Galeria ${index + 1}`}</figcaption>
            <div>
              <button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0} aria-label="Mover imagem para esquerda">
                <ChevronUp size={16} />
              </button>
              <button type="button" onClick={() => moveImage(index, 1)} disabled={index === productForm.images.length - 1} aria-label="Mover imagem para direita">
                <ChevronDown size={16} />
              </button>
              <button type="button" onClick={() => removeImage(image)} aria-label="Remover imagem">
                <X size={16} />
              </button>
            </div>
          </figure>
        ))}
      </div>

      <div className="form-actions">
        <button type="submit">
          <Save size={18} />
          {editingProductId ? 'Atualizar produto' : 'Salvar produto'}
        </button>
        {editingProductId && (
          <button type="button" className="secondary-action" onClick={resetProductForm}>
            <X size={18} />
            Cancelar
          </button>
        )}
      </div>
    </form>
  )

  if (!session) {
    return (
      <main className="admin-page admin-login-page">
        <div className="section-heading">
          <p>Painel admin</p>
          <h1>Login do admin</h1>
        </div>

        <form className="admin-login form-panel" onSubmit={login}>
          <LockKeyhole size={28} />
          <input
            required
            name="username"
            placeholder="Usuario"
            value={credentials.username}
            onChange={updateCredentials}
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Senha"
            value={credentials.password}
            onChange={updateCredentials}
          />
          <button type="submit">
            <LockKeyhole size={18} />
            Entrar
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <div className="section-heading">
        <p>Painel admin</p>
        <h1>Controle real dos drops</h1>
        <button type="button" className="admin-logout" onClick={logout}>
          <LogOut size={18} />
          Sair
        </button>
      </div>

      <AdminMetrics
        brandCount={brands.length}
        formatMoney={(value) => money.format(value)}
        totalInventory={totalInventory}
        totalSales={totalSales}
        totalValue={totalValue}
      />

      {!editingProductId && renderProductForm('Cadastrar produto')}
      {message && <p className="admin-message">{message}</p>}
      {renderCarouselManager()}

      <section className="admin-table">
        {products.map((product) => (
          <article key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.brand} / {product.category} / estoque {product.stock ?? 0}</p>
            </div>
            <span>{product.badge}</span>
            <div className="admin-actions">
              <button type="button" onClick={() => editProduct(product)} aria-label={`Editar ${product.name}`}>
                <Pencil size={18} />
              </button>
              <button type="button" onClick={() => deleteProduct(product.id)} aria-label="Remover produto">
                <Trash2 size={18} />
              </button>
            </div>
          </article>
        ))}
      </section>

      {editingProductId && (
        <motion.div
          className="admin-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Editar ${editingProduct?.name || 'produto'}`}
        >
          <motion.div
            className="admin-modal"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22 }}
          >
            {renderProductForm(`Editar ${editingProduct?.name || 'produto'}`)}
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
