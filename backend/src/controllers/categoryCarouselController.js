import {
  createCategoryCarouselItem,
  deleteCategoryCarouselItem,
  listCategoryCarousel,
  updateCategoryCarouselItem,
} from '../database/categoryCarousel.js'

export async function getCategoryCarousel(req, res) {
  const items = await listCategoryCarousel()
  return res.json(items)
}

export async function getAdminCategoryCarousel(req, res) {
  const items = await listCategoryCarousel({ includeInactive: true })
  return res.json(items)
}

export async function createCategoryCarousel(req, res) {
  if (!req.body.name) {
    return res.status(400).json({ message: 'Nome da categoria e obrigatorio.' })
  }

  const item = await createCategoryCarouselItem(req.body)
  return res.status(201).json(item)
}

export async function updateCategoryCarousel(req, res) {
  const item = await updateCategoryCarouselItem(req.params.id, req.body)

  if (!item) {
    return res.status(404).json({ message: 'Categoria do carrossel nao encontrada.' })
  }

  return res.json(item)
}

export async function deleteCategoryCarousel(req, res) {
  const deleted = await deleteCategoryCarouselItem(req.params.id)

  if (!deleted) {
    return res.status(404).json({ message: 'Categoria do carrossel nao encontrada.' })
  }

  return res.status(204).send()
}
