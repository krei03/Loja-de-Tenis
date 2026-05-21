import { useMemo, useState } from 'react'
import { ImagePlus, LockKeyhole, PackagePlus, Pencil, Save, Tags, Trash2, X } from 'lucide-react'
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
  image: '',
  description: '',
  stock: 1,
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

  const upload = async (event) => {
    const file = event.target.files?.[0]

    if (!file || !session) {
      return
    }

    const result = await api.uploadImage(file, session.token)
    setProductForm((current) => ({ ...current, image: result.url }))
    setMessage('Imagem enviada.')
  }

  const buildProductPayload = () => ({
    ...productForm,
    price: Number(productForm.price),
    stock: Number(productForm.stock),
    sizes: productForm.sizes,
    gallery: productForm.image,
  })

  const resetProductForm = () => {
    setEditingProductId(null)
    setProductForm(emptyProduct)
  }

  const editProduct = (product) => {
    setEditingProductId(product.id)
    setProductForm({
      name: product.name || '',
      brand: product.brand || '',
      category: product.category || 'launch',
      price: product.price ?? '',
      badge: product.badge || '',
      color: product.color || '',
      sizes: product.sizes?.join(',') || '',
      image: product.image || '',
      description: product.description || '',
      stock: product.stock ?? 0,
    })
    setMessage(`Editando ${product.name}.`)
  }

  const saveProduct = async (event) => {
    event.preventDefault()

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

      <form className="admin-product-form form-panel" onSubmit={saveProduct}>
        <h2>{editingProductId ? 'Editar produto' : 'Cadastrar produto'}</h2>
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
          <label>
            <ImagePlus size={18} />
            Upload
            <input type="file" accept="image/*" onChange={upload} />
          </label>
          <input required name="image" placeholder="URL da imagem" value={productForm.image} onChange={updateProduct} />
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
        {message && <p className="admin-message">{message}</p>}
      </form>

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
    </main>
  )
}
