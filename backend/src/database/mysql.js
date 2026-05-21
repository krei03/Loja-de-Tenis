import mysql from 'mysql2/promise'
import { seedCategories, seedProducts } from './seed.js'

let pool
let ready = false

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'vertex',
  password: process.env.DB_PASSWORD || 'vertex',
  database: process.env.DB_NAME || 'vertex_store',
  waitForConnections: true,
  connectionLimit: 10,
}

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }

  return pool
}

export function isDatabaseReady() {
  return ready
}

export async function query(sql, params = []) {
  if (!ready) {
    throw new Error('Database is not ready')
  }

  const [rows] = await getPool().execute(sql, params)
  return rows
}

export async function initializeDatabase() {
  const attempts = Number(process.env.DB_CONNECT_RETRIES || 12)

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const database = getPool()
      await database.query('SELECT 1')
      await database.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id VARCHAR(80) PRIMARY KEY,
          name VARCHAR(120) NOT NULL
        )
      `)
      await database.query(`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(120) PRIMARY KEY,
          name VARCHAR(160) NOT NULL,
          brand VARCHAR(120) NOT NULL,
          category VARCHAR(80) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          badge VARCHAR(80) NOT NULL,
          color VARCHAR(120) NOT NULL,
          sizes JSON NOT NULL,
          image TEXT NOT NULL,
          gallery JSON NOT NULL,
          description TEXT NOT NULL,
          stock INT NOT NULL DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      await database.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(120) PRIMARY KEY,
          customer JSON NOT NULL,
          items JSON NOT NULL,
          subtotal DECIMAL(10,2) NOT NULL,
          shipping DECIMAL(10,2) NOT NULL,
          total DECIMAL(10,2) NOT NULL,
          status VARCHAR(40) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)

      await seedIfEmpty()
      ready = true
      console.log('MySQL connected and schema ready')
      return
    } catch (error) {
      ready = false

      if (attempt === attempts) {
        console.warn(`MySQL unavailable, using memory fallback: ${error.message}`)
        return
      }

      await wait(2500)
    }
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function seedIfEmpty() {
  const database = getPool()
  const [[categoryCount]] = await database.query('SELECT COUNT(*) AS total FROM categories')
  const [[productCount]] = await database.query('SELECT COUNT(*) AS total FROM products')

  if (categoryCount.total === 0) {
    await Promise.all(
      seedCategories.map((category) =>
        database.execute('INSERT INTO categories (id, name) VALUES (?, ?)', [
          category.id,
          category.name,
        ]),
      ),
    )
  }

  if (productCount.total === 0) {
    await Promise.all(
      seedProducts.map((product) =>
        database.execute(
          `INSERT INTO products
            (id, name, brand, category, price, badge, color, sizes, image, gallery, description, stock)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            product.id,
            product.name,
            product.brand,
            product.category,
            product.price,
            product.badge,
            product.color,
            JSON.stringify(product.sizes),
            product.image,
            JSON.stringify(product.gallery),
            product.description,
            product.stock,
          ],
        ),
      ),
    )
  }
}

export function mapProduct(row) {
  return {
    ...row,
    price: Number(row.price),
    sizes: parseJson(row.sizes, []),
    gallery: parseJson(row.gallery, []),
  }
}

export function parseJson(value, fallback) {
  if (Array.isArray(value) || (value && typeof value === 'object')) {
    return value
  }

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}
