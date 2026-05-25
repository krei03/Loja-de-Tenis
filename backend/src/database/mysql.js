import mysql from 'mysql2/promise'
import { seedCategories, seedCategoryCarousel, seedProducts } from './seed.js'

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
          payment JSON NULL,
          status VARCHAR(40) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      await database.query(`
        CREATE TABLE IF NOT EXISTS customers (
          id VARCHAR(120) PRIMARY KEY,
          name VARCHAR(160) NOT NULL,
          email VARCHAR(180) NOT NULL UNIQUE,
          phone VARCHAR(40) NULL,
          password_hash VARCHAR(255) NOT NULL,
          provider VARCHAR(40) NOT NULL DEFAULT 'email',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      await database.query(`
        CREATE TABLE IF NOT EXISTS category_carousel (
          id VARCHAR(120) PRIMARY KEY,
          name VARCHAR(140) NOT NULL,
          logo TEXT NOT NULL,
          banner TEXT NULL,
          description TEXT NULL,
          meta_title VARCHAR(180) NULL,
          meta_description TEXT NULL,
          models JSON NOT NULL,
          display_order INT NOT NULL DEFAULT 0,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      await ensureCategoryCarouselColumns(database)
      await ensureOrdersColumns(database)
      await ensureDefaultCategoryCarouselModels(database)
      await ensureDefaultCategoryCarouselMetadata(database)

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

async function ensureOrdersColumns(database) {
  const [columns] = await database.query('SHOW COLUMNS FROM orders')
  const columnNames = new Set(columns.map((column) => column.Field))

  if (!columnNames.has('payment')) {
    await database.query('ALTER TABLE orders ADD COLUMN payment JSON NULL AFTER total')
  }
}

async function ensureCategoryCarouselColumns(database) {
  const [columns] = await database.query('SHOW COLUMNS FROM category_carousel')
  const columnNames = new Set(columns.map((column) => column.Field))

  if (!columnNames.has('banner')) {
    await database.query('ALTER TABLE category_carousel ADD COLUMN banner TEXT NULL AFTER logo')
  }

  if (!columnNames.has('description')) {
    await database.query('ALTER TABLE category_carousel ADD COLUMN description TEXT NULL AFTER banner')
  }

  if (!columnNames.has('meta_title')) {
    await database.query('ALTER TABLE category_carousel ADD COLUMN meta_title VARCHAR(180) NULL AFTER description')
  }

  if (!columnNames.has('meta_description')) {
    await database.query('ALTER TABLE category_carousel ADD COLUMN meta_description TEXT NULL AFTER meta_title')
  }

  if (!columnNames.has('models')) {
    await database.query("ALTER TABLE category_carousel ADD COLUMN models JSON NULL AFTER logo")
    await database.query("UPDATE category_carousel SET models = JSON_ARRAY() WHERE models IS NULL")
  }
}

async function ensureDefaultCategoryCarouselModels(database) {
  await Promise.all(
    seedCategoryCarousel
      .filter((item) => item.models?.length)
      .map((item) =>
        database.execute(
          `UPDATE category_carousel
           SET models = ?
           WHERE id = ? AND (models IS NULL OR JSON_LENGTH(models) = 0)`,
          [JSON.stringify(item.models), item.id],
        ),
      ),
  )
}

async function ensureDefaultCategoryCarouselMetadata(database) {
  await Promise.all(
    seedCategoryCarousel.map((item) =>
      database.execute(
        `UPDATE category_carousel
         SET description = COALESCE(NULLIF(description, ''), ?),
             meta_title = COALESCE(NULLIF(meta_title, ''), ?),
             meta_description = COALESCE(NULLIF(meta_description, ''), ?)
         WHERE id = ?`,
        [
          item.description || '',
          item.meta_title || item.metaTitle || '',
          item.meta_description || item.metaDescription || item.description || '',
          item.id,
        ],
      ),
    ),
  )
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
  const [[categoryCarouselCount]] = await database.query('SELECT COUNT(*) AS total FROM category_carousel')

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

  if (categoryCarouselCount.total === 0) {
    await Promise.all(
      seedCategoryCarousel.map((item) =>
        database.execute(
          `INSERT INTO category_carousel
            (id, name, logo, banner, description, meta_title, meta_description, models, display_order, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            item.id,
            item.name,
            item.logo,
            item.banner || '',
            item.description || '',
            item.meta_title || item.metaTitle || '',
            item.meta_description || item.metaDescription || '',
            JSON.stringify(item.models || []),
            item.display_order,
            item.is_active,
          ],
        ),
      ),
    )
  }
}

export function mapCategoryCarouselItem(row) {
  return {
    id: row.id,
    name: row.name,
    logo: row.logo,
    banner: row.banner || '',
    description: row.description || '',
    meta_title: row.meta_title || '',
    meta_description: row.meta_description || '',
    models: parseJson(row.models, []),
    display_order: Number(row.display_order),
    is_active: Boolean(row.is_active),
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
