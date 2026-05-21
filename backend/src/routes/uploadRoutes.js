import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Router } from 'express'
import multer from 'multer'
import { uploadImage } from '../controllers/uploadController.js'
import { requireAdmin } from '../middleware/adminAuth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadDir = path.resolve(__dirname, '../../public/uploads')

mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname)
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`
    cb(null, safeName)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Apenas imagens sao permitidas.'))
    }

    return cb(null, true)
  },
})

export const uploadRoutes = Router()

uploadRoutes.post('/image', requireAdmin, upload.single('image'), uploadImage)
