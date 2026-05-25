import { Router } from 'express'
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js'
import { requireAdmin } from '../middleware/adminAuth.js'

export const orderRoutes = Router()

orderRoutes.get('/', requireAdmin, getOrders)
orderRoutes.post('/', createOrder)
orderRoutes.patch('/:id/status', requireAdmin, updateOrderStatus)
