import { randomUUID } from 'node:crypto'
import { orders } from '../database/store.js'

export function getOrders(_req, res) {
  return res.json(orders)
}

export function createOrder(req, res) {
  const order = {
    id: randomUUID(),
    items: req.body.items || [],
    customer: req.body.customer || null,
    status: 'created',
    createdAt: new Date().toISOString(),
  }

  orders.push(order)
  return res.status(201).json(order)
}
