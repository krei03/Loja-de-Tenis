import { randomUUID } from 'node:crypto'
import { isDatabaseReady, mapCategoryCarouselItem, query } from './mysql.js'
import { categoryCarousel, setCategoryCarousel } from './store.js'

export async function listCategoryCarousel({ includeInactive = false } = {}) {
  if (isDatabaseReady()) {
    const where = includeInactive ? '' : 'WHERE is_active = TRUE'
    const rows = await query(
      `SELECT * FROM category_carousel ${where} ORDER BY display_order ASC, name ASC`,
    )
    return rows.map(mapCategoryCarouselItem)
  }

  return [...categoryCarousel]
    .filter((item) => includeInactive || item.is_active)
    .sort(sortCategoryCarousel)
}

export async function findCategoryCarouselItem(id) {
  if (isDatabaseReady()) {
    const rows = await query('SELECT * FROM category_carousel WHERE id = ?', [id])
    return rows[0] ? mapCategoryCarouselItem(rows[0]) : null
  }

  return categoryCarousel.find((item) => item.id === id) || null
}

export async function createCategoryCarouselItem(input) {
  const item = normalizeCategoryCarouselItem(input)

  if (isDatabaseReady()) {
    await query(
      `INSERT INTO category_carousel (id, name, logo, models, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [item.id, item.name, item.logo, JSON.stringify(item.models), item.display_order, item.is_active],
    )
  } else {
    setCategoryCarousel([...categoryCarousel, item].sort(sortCategoryCarousel))
  }

  return item
}

export async function updateCategoryCarouselItem(id, input) {
  const current = await findCategoryCarouselItem(id)

  if (!current) {
    return null
  }

  const item = normalizeCategoryCarouselItem({ ...current, ...input, id })

  if (isDatabaseReady()) {
    await query(
      `UPDATE category_carousel
       SET name = ?, logo = ?, models = ?, display_order = ?, is_active = ?
       WHERE id = ?`,
      [item.name, item.logo, JSON.stringify(item.models), item.display_order, item.is_active, id],
    )
  } else {
    setCategoryCarousel(
      categoryCarousel.map((currentItem) => (currentItem.id === id ? item : currentItem)).sort(sortCategoryCarousel),
    )
  }

  return item
}

export async function deleteCategoryCarouselItem(id) {
  const item = await findCategoryCarouselItem(id)

  if (!item) {
    return false
  }

  if (isDatabaseReady()) {
    await query('DELETE FROM category_carousel WHERE id = ?', [id])
  } else {
    setCategoryCarousel(categoryCarousel.filter((currentItem) => currentItem.id !== id))
  }

  return true
}

function normalizeCategoryCarouselItem(input) {
  const name = String(input.name || '').trim()

  return {
    id: input.id || slugify(name || randomUUID()),
    name,
    logo: String(input.logo || '').trim(),
    models: normalizeModels(input.models),
    display_order: Number(input.display_order ?? input.displayOrder ?? 0),
    is_active: normalizeBoolean(input.is_active ?? input.isActive ?? true),
  }
}

function normalizeModels(value) {
  if (Array.isArray(value)) {
    return value.map((model) => String(model).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,/)
      .map((model) => model.trim())
      .filter(Boolean)
  }

  return []
}

function normalizeBoolean(value) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    return !['false', '0', 'off'].includes(value.toLowerCase())
  }

  return Boolean(value)
}

function sortCategoryCarousel(first, second) {
  return first.display_order - second.display_order || first.name.localeCompare(second.name)
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
