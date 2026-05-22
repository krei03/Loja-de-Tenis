import { Router } from 'express'
import {
  createCategoryCarousel,
  deleteCategoryCarousel,
  getAdminCategoryCarousel,
  getCategoryCarousel,
  updateCategoryCarousel,
} from '../controllers/categoryCarouselController.js'
import { requireAdmin } from '../middleware/adminAuth.js'

export const categoryCarouselRoutes = Router()

categoryCarouselRoutes.get('/', getCategoryCarousel)
categoryCarouselRoutes.get('/admin', requireAdmin, getAdminCategoryCarousel)
categoryCarouselRoutes.post('/', requireAdmin, createCategoryCarousel)
categoryCarouselRoutes.put('/:id', requireAdmin, updateCategoryCarousel)
categoryCarouselRoutes.delete('/:id', requireAdmin, deleteCategoryCarousel)
