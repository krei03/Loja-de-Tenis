import { randomUUID } from 'node:crypto'
import { isDatabaseReady, parseJson, query } from '../database/mysql.js'
import { orders } from '../database/store.js'

const validStatuses = new Set(['created', 'paid', 'separating', 'shipped', 'delivered', 'canceled'])

function mapOrder(order) {
  return {
    ...order,
    subtotal: Number(order.subtotal),
    shipping: Number(order.shipping),
    total: Number(order.total),
    customer: parseJson(order.customer, {}),
    items: parseJson(order.items, []),
  }
}

function orderMatchesFilters(order, filters) {
  const createdAt = new Date(order.created_at || order.createdAt || 0).getTime()
  const queryText = filters.q.toLowerCase()
  const customer = parseJson(order.customer, {})

  if (filters.status && order.status !== filters.status) {
    return false
  }

  if (filters.from && createdAt < new Date(`${filters.from}T00:00:00`).getTime()) {
    return false
  }

  if (filters.to && createdAt > new Date(`${filters.to}T23:59:59`).getTime()) {
    return false
  }

  if (!queryText) {
    return true
  }

  return [order.id, customer.name, customer.email, customer.phone]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(queryText))
}

export async function getOrders(req, res) {
  const filters = {
    status: req.query.status || '',
    from: req.query.from || '',
    to: req.query.to || '',
    q: req.query.q || '',
  }

  if (isDatabaseReady()) {
    const where = []
    const params = []

    if (filters.status) {
      where.push('status = ?')
      params.push(filters.status)
    }

    if (filters.from) {
      where.push('created_at >= ?')
      params.push(`${filters.from} 00:00:00`)
    }

    if (filters.to) {
      where.push('created_at <= ?')
      params.push(`${filters.to} 23:59:59`)
    }

    const rows = await query(
      `SELECT * FROM orders ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY created_at DESC`,
      params,
    )
    const mappedOrders = rows.map(mapOrder)

    return res.json(filters.q ? mappedOrders.filter((order) => orderMatchesFilters(order, filters)) : mappedOrders)
  }

  return res.json(orders.filter((order) => orderMatchesFilters(order, filters)))
}

export async function createOrder(req, res) {
  const items = req.body.items || []
  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
  const shipping = subtotal > 1200 ? 0 : 29.9
  const order = {
    id: randomUUID(),
    items,
    customer: req.body.customer || {},
    subtotal,
    shipping,
    total: subtotal + shipping,
    status: 'created',
    createdAt: new Date().toISOString(),
  }

  if (items.length === 0) {
    return res.status(400).json({ message: 'Pedido sem produtos.' })
  }

  if (isDatabaseReady()) {
    await query(
      `INSERT INTO orders (id, customer, items, subtotal, shipping, total, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        order.id,
        JSON.stringify(order.customer),
        JSON.stringify(order.items),
        order.subtotal,
        order.shipping,
        order.total,
        order.status,
      ],
    )
  } else {
    orders.push(order)
  }

  return res.status(201).json(order)
}

export async function updateOrderStatus(req, res) {
  const { status } = req.body

  if (!validStatuses.has(status)) {
    return res.status(400).json({ message: 'Status de pedido invalido.' })
  }

  if (isDatabaseReady()) {
    const result = await query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pedido nao encontrado.' })
    }

    const [order] = await query('SELECT * FROM orders WHERE id = ?', [req.params.id])
    return res.json(mapOrder(order))
  }

  const order = orders.find((current) => current.id === req.params.id)

  if (!order) {
    return res.status(404).json({ message: 'Pedido nao encontrado.' })
  }

  order.status = status
  return res.json(order)
}
