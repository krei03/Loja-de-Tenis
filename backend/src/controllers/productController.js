import { randomUUID } from 'node:crypto'
import { products, setProducts } from '../database/store.js'

export function getProducts(req, res) {
  const { category } = req.query

  if (category && category !== 'all') {
    return res.json(products.filter((product) => product.category === category))
  }

  return res.json(products)
}

export function getProductById(req, res) {
  const product = products.find((item) => item.id === req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Produto nao encontrado.' })
  }

  return res.json(product)
}

export function createProduct(req, res) {
  const product = {
    id: req.body.id || randomUUID(),
    name: req.body.name,
    category: req.body.category,
    price: Number(req.body.price || 0),
    badge: req.body.badge || 'Novo',
    color: req.body.color || 'Premium',
    sizes: req.body.sizes || [],
    image: req.body.image,
    gallery: req.body.gallery || [req.body.image],
    description: req.body.description || '',
  }

  setProducts([...products, product])
  return res.status(201).json(product)
}

export function updateProduct(req, res) {
  const product = products.find((item) => item.id === req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Produto nao encontrado.' })
  }

  const nextProducts = products.map((item) =>
    item.id === req.params.id ? { ...item, ...req.body, id: item.id } : item,
  )
  setProducts(nextProducts)

  return res.json(nextProducts.find((item) => item.id === req.params.id))
}

export function deleteProduct(req, res) {
  const exists = products.some((item) => item.id === req.params.id)

  if (!exists) {
    return res.status(404).json({ message: 'Produto nao encontrado.' })
  }

  setProducts(products.filter((item) => item.id !== req.params.id))
  return res.status(204).send()
}
