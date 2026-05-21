import { randomUUID } from 'node:crypto'
import { isDatabaseReady, query } from '../database/mysql.js'
import { categories } from '../database/store.js'

export async function getCategories(_req, res) {
  if (isDatabaseReady()) {
    const rows = await query('SELECT * FROM categories ORDER BY name')
    return res.json(rows)
  }

  return res.json(categories)
}

export async function createCategory(req, res) {
  const category = {
    id: req.body.id || slugify(req.body.name || randomUUID()),
    name: req.body.name,
  }

  if (!category.name) {
    return res.status(400).json({ message: 'Nome da categoria e obrigatorio.' })
  }

  if (isDatabaseReady()) {
    await query('INSERT INTO categories (id, name) VALUES (?, ?)', [category.id, category.name])
  } else {
    categories.push(category)
  }

  return res.status(201).json(category)
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function updateCategory(req, res) {
  const name = req.body.name

  if (!name) {
    return res.status(400).json({ message: 'Nome da categoria e obrigatorio.' })
  }

  if (isDatabaseReady()) {
    await query('UPDATE categories SET name = ? WHERE id = ?', [name, req.params.id])
  } else {
    const category = categories.find((item) => item.id === req.params.id)

    if (category) {
      category.name = name
    }
  }

  return res.json({ id: req.params.id, name })
}

export async function deleteCategory(req, res) {
  if (req.params.id === 'all') {
    return res.status(400).json({ message: 'A categoria Todos nao pode ser removida.' })
  }

  if (isDatabaseReady()) {
    await query('DELETE FROM categories WHERE id = ?', [req.params.id])
  } else {
    const index = categories.findIndex((item) => item.id === req.params.id)

    if (index >= 0) {
      categories.splice(index, 1)
    }
  }

  return res.status(204).send()
}
