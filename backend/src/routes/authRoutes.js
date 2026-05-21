import { Router } from 'express'
import { loginAdmin } from '../controllers/authController.js'

export const authRoutes = Router()

authRoutes.post('/admin/login', loginAdmin)
