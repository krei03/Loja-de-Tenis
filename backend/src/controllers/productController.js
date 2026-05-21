import { randomUUID } from 'node:crypto'
import { mapProduct, query, isDatabaseReady } from '../database/mysql.js'
import { products, setProducts } from '../database/store.js'

export async function getProducts(req, res) {
  const filters = normalizeFilters(req.query)

  if (isDatabaseReady()) {
    const { where, params } = buildProductWhere(filters)
    const rows = await query(`SELECT * FROM products ${where} ORDER BY created_at DESC`, params)
    return res.json(rows.map(mapProduct))
  }

  return res.json(filterMemoryProducts(products, filters))
}

export async function getProductById(req, res) {
  const product = await findProduct(req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Produto nao encontrado.' })
  }

  return res.json(product)
}

export async function createProduct(req, res) {
  const product = normalizeProduct(req.body)

  if (!product.name || !product.category || !product.image) {
    return res.status(400).json({ message: 'Nome, categoria e imagem sao obrigatorios.' })
  }

  if (isDatabaseReady()) {
    await query(
      `INSERT INTO products
        (id, name, brand, category, price, badge, color, sizes, image, gallery, description, stock)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.id,
        product.name,
        product.brand,
        product.category,
        product.price,
        product.badge,
        product.color,
        JSON.stringify(product.sizes),
        product.image,
        JSON.stringify(product.gallery),
        product.description,
        product.stock,
      ],
    )
  } else {
    setProducts([product, ...products])
  }

  return res.status(201).json(product)
}

export async function updateProduct(req, res) {
  const currentProduct = await findProduct(req.params.id)

  if (!currentProduct) {
    return res.status(404).json({ message: 'Produto nao encontrado.' })
  }

  const product = normalizeProduct({ ...currentProduct, ...req.body, id: req.params.id })

  if (isDatabaseReady()) {
    await query(
      `UPDATE products
       SET name = ?, brand = ?, category = ?, price = ?, badge = ?, color = ?,
           sizes = ?, image = ?, gallery = ?, description = ?, stock = ?
       WHERE id = ?`,
      [
        product.name,
        product.brand,
        product.category,
        product.price,
        product.badge,
        product.color,
        JSON.stringify(product.sizes),
        product.image,
        JSON.stringify(product.gallery),
        product.description,
        product.stock,
        product.id,
      ],
    )
  } else {
    setProducts(products.map((item) => (item.id === product.id ? product : item)))
  }

  return res.json(product)
}

export async function deleteProduct(req, res) {
  const product = await findProduct(req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Produto nao encontrado.' })
  }

  if (isDatabaseReady()) {
    await query('DELETE FROM products WHERE id = ?', [req.params.id])
  } else {
    setProducts(products.filter((item) => item.id !== req.params.id))
  }

  return res.status(204).send()
}

async function findProduct(id) {
  if (isDatabaseReady()) {
    const rows = await query('SELECT * FROM products WHERE id = ?', [id])
    return rows[0] ? mapProduct(rows[0]) : null
  }

  return products.find((item) => item.id === id)
}

function normalizeProduct(input) {
  const image = input.image || ''
  const gallery = normalizeList(input.gallery, image ? [image] : [])

  return {
    id: input.id || slugify(input.name || randomUUID()),
    name: input.name || '',
    brand: input.brand || 'Vertex',
    category: input.category || 'launch',
    price: Number(input.price || 0),
    badge: input.badge || 'Novo',
    color: input.color || 'Premium',
    sizes: normalizeList(input.sizes, []),
    image,
    gallery: gallery.length ? gallery : [image],
    description: input.description || '',
    stock: Number(input.stock || 0),
  }
}

function normalizeList(value, fallback) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()

    if (!trimmed) {
      return fallback
    }

    try {
      const parsed = JSON.parse(trimmed)
      return Array.isArray(parsed) ? parsed : fallback
    } catch {
      return trimmed.split(',').map((item) => {
        const clean = item.trim()
        const asNumber = Number(clean)
        return Number.isNaN(asNumber) ? clean : asNumber
      })
    }
  }

  return fallback
}

function normalizeFilters(queryParams) {
  return {
    category: queryParams.category,
    brand: queryParams.brand,
    size: queryParams.size ? Number(queryParams.size) : null,
    minPrice: queryParams.minPrice ? Number(queryParams.minPrice) : null,
    maxPrice: queryParams.maxPrice ? Number(queryParams.maxPrice) : null,
  }
}

function buildProductWhere(filters) {
  const clauses = []
  const params = []

  if (filters.category && filters.category !== 'all') {
    clauses.push('category = ?')
    params.push(filters.category)
  }

  if (filters.brand) {
    clauses.push('brand = ?')
    params.push(filters.brand)
  }

  if (filters.minPrice !== null) {
    clauses.push('price >= ?')
    params.push(filters.minPrice)
  }

  if (filters.maxPrice !== null) {
    clauses.push('price <= ?')
    params.push(filters.maxPrice)
  }

  if (filters.size) {
    clauses.push('JSON_CONTAINS(sizes, ?)')
    params.push(JSON.stringify(filters.size))
  }

  return {
    where: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    params,
  }
}

function filterMemoryProducts(items, filters) {
  return items.filter((product) => {
    if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
      return false
    }

    if (filters.brand && product.brand !== filters.brand) {
      return false
    }

    if (filters.size && !product.sizes.includes(filters.size)) {
      return false
    }

    if (filters.minPrice !== null && product.price < filters.minPrice) {
      return false
    }

    if (filters.maxPrice !== null && product.price > filters.maxPrice) {
      return false
    }

    return true
  })
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .concat(`-${Date.now()}`)
}
