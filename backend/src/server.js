import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { authRoutes } from './routes/authRoutes.js'
import { categoryRoutes } from './routes/categoryRoutes.js'
import { categoryCarouselRoutes } from './routes/categoryCarouselRoutes.js'
import { orderRoutes } from './routes/orderRoutes.js'
import { productRoutes } from './routes/productRoutes.js'
import { shippingRoutes } from './routes/shippingRoutes.js'
import { uploadRoutes } from './routes/uploadRoutes.js'
import { initializeDatabase, isDatabaseReady } from './database/mysql.js'
import { notFound } from './middleware/notFound.js'

const app = express()
const port = process.env.PORT || 8080
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.resolve(__dirname, '../public/uploads')))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'vertex-api', database: isDatabaseReady() ? 'mysql' : 'memory' })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/category-carousel', categoryCarouselRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/shipping', shippingRoutes)
app.use('/api/uploads', uploadRoutes)
app.use(notFound)

initializeDatabase().finally(() => {
  app.listen(port, () => {
    console.log(`Vertex API running on port ${port}`)
  })
})
