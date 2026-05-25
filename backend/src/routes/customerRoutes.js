import { Router } from 'express'
import {
  loginCustomer,
  registerCustomer,
  resetCustomerPassword,
} from '../controllers/customerController.js'

export const customerRoutes = Router()

customerRoutes.post('/register', registerCustomer)
customerRoutes.post('/login', loginCustomer)
customerRoutes.post('/reset-password', resetCustomerPassword)
