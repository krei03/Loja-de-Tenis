import { useMemo, useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  ImagePlus,
  LockKeyhole,
  PackagePlus,
  Pencil,
  Save,
  Tags,
  Trash2,
  X,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '../services/api'

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

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

function productToForm(product) {
  const images = [...new Set([product.image, ...(product.gallery || [])].filter(Boolean))].slice(0, 5)

  return {
    name: product.name || '',
    brand: product.brand || '',
    category: product.category || 'launch',
    price: product.price ?? '',
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
  const [session, setSession] = useState(null)
  const [productForm, setProductForm] = useState(emptyProduct)
  const [editingProductId, setEditingProductId] = useState(null)
  const [message, setMessage] = useState('')

  const totalInventory = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price, 0)
  const brands = useMemo(() => [...new Set(products.map((product) => product.brand))], [products])
  const editingProduct = products.find((product) => product.id === editingProductId)

  const updateCredentials = (event) => {
    setCredentials((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const updateProduct = (event) => {
    setProductForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const login = async (event) => {
    event.preventDefault()
    const result = await api.loginAdmin(credentials)
    setSession(result)
    setMessage('Admin autenticado.')
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
    price: Number(productForm.price),
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
        <input required name="brand" placeholder="Marca" value={productForm.brand} onChange={updateProduct} />
        <select name="category" value={productForm.category} onChange={updateProduct}>
          <option value="launch">Lancamentos</option>
          <option value="running">Performance</option>
          <option value="streetwear">Streetwear</option>
          <option value="limited">Limitados</option>
        </select>
        <input required name="price" type="number" placeholder="Preco" value={productForm.price} onChange={updateProduct} />
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
      <main className="admin-page">
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
      </div>

      <section className="admin-metrics">
        <article>
          <PackagePlus size={24} />
          <span>Produtos ativos</span>
          <strong>{totalInventory}</strong>
        </article>
        <article>
          <Tags size={24} />
          <span>Valor de vitrine</span>
          <strong>{money.format(totalValue)}</strong>
        </article>
        <article>
          <Tags size={24} />
          <span>Marcas</span>
          <strong>{brands.length}</strong>
        </article>
      </section>

      {!editingProductId && renderProductForm('Cadastrar produto')}
      {message && <p className="admin-message">{message}</p>}

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
