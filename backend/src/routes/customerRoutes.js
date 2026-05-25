import { Router } from 'express'
import { loginCustomer, registerCustomer } from '../controllers/customerController.js'

export const customerRoutes = Router()

customerRoutes.post('/register', registerCustomer)
customerRoutes.post('/login', loginCustomer)
