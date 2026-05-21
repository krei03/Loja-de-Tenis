import { Router } from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/categoryController.js'
import { requireAdmin } from '../middleware/adminAuth.js'

export const categoryRoutes = Router()

categoryRoutes.get('/', getCategories)
categoryRoutes.post('/', requireAdmin, createCategory)
categoryRoutes.put('/:id', requireAdmin, updateCategory)
categoryRoutes.delete('/:id', requireAdmin, deleteCategory)
