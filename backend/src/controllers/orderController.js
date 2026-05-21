import { randomUUID } from 'node:crypto'
import { isDatabaseReady, parseJson, query } from '../database/mysql.js'
import { orders } from '../database/store.js'

export async function getOrders(_req, res) {
  if (isDatabaseReady()) {
    const rows = await query('SELECT * FROM orders ORDER BY created_at DESC')
    return res.json(
      rows.map((order) => ({
        ...order,
        subtotal: Number(order.subtotal),
        shipping: Number(order.shipping),
        total: Number(order.total),
        customer: parseJson(order.customer, {}),
        items: parseJson(order.items, []),
      })),
    )
  }

  return res.json(orders)
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
