import { Router } from 'express'
import { quoteShipping } from '../controllers/shippingController.js'

export const shippingRoutes = Router()

shippingRoutes.get('/quote', quoteShipping)
