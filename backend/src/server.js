import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { categoryRoutes } from './routes/categoryRoutes.js'
import { orderRoutes } from './routes/orderRoutes.js'
import { productRoutes } from './routes/productRoutes.js'
import { notFound } from './middleware/notFound.js'

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'vertex-api' })
})

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use(notFound)

app.listen(port, () => {
  console.log(`Vertex API running on port ${port}`)
})
