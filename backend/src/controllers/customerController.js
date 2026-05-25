import { randomUUID } from 'node:crypto'
import { query } from '../database/mysql.js'
import {
  createCustomerPasswordHash,
  createCustomerToken,
  verifyCustomerPassword,
} from '../services/customerSecurity.js'

function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase()
}

function mapCustomer(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    provider: row.provider || 'email',
    createdAt: row.created_at,
  }
}

function createSession(customer) {
  const session = createCustomerToken(customer)

  return {
    token: session.token,
    expiresAt: session.expiresAt,
    user: mapCustomer(customer),
  }
}

export async function registerCustomer(req, res, next) {
  try {
    const name = String(req.body.name || '').trim()
    const email = normalizeEmail(req.body.email)
    const phone = String(req.body.phone || '').trim()
    const password = String(req.body.password || '')

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Informe nome, email e senha para criar a conta.' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'A senha precisa ter pelo menos 6 caracteres.' })
    }

    const existing = await query('SELECT id FROM customers WHERE email = ? LIMIT 1', [email])

    if (existing.length) {
      return res.status(409).json({ message: 'Este email ja possui uma conta.' })
    }

    const id = randomUUID()
    const passwordHash = createCustomerPasswordHash(password)

    await query(
      `INSERT INTO customers (id, name, email, phone, password_hash, provider)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, email, phone, passwordHash, 'email'],
    )

    const [customer] = await query('SELECT * FROM customers WHERE id = ? LIMIT 1', [id])

    return res.status(201).json(createSession(customer))
  } catch (error) {
    return next(error)
  }
}

export async function loginCustomer(req, res, next) {
  try {
    const email = normalizeEmail(req.body.email)
    const password = String(req.body.password || '')

    if (!email || !password) {
      return res.status(400).json({ message: 'Informe email e senha.' })
    }

    const [customer] = await query('SELECT * FROM customers WHERE email = ? LIMIT 1', [email])

    if (!customer || !verifyCustomerPassword(password, customer.password_hash)) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' })
    }

    return res.json(createSession(customer))
  } catch (error) {
    return next(error)
  }
}
