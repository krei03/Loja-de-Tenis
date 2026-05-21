import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js'
import { requireAdmin } from '../middleware/adminAuth.js'

export const productRoutes = Router()

productRoutes.get('/', getProducts)
productRoutes.get('/:id', getProductById)
productRoutes.post('/', requireAdmin, createProduct)
productRoutes.put('/:id', requireAdmin, updateProduct)
productRoutes.delete('/:id', requireAdmin, deleteProduct)
