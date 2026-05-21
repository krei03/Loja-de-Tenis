import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js'

export const productRoutes = Router()

productRoutes.get('/', getProducts)
productRoutes.get('/:id', getProductById)
productRoutes.post('/', createProduct)
productRoutes.put('/:id', updateProduct)
productRoutes.delete('/:id', deleteProduct)
