import { categories } from '../database/store.js'

export function getCategories(_req, res) {
  return res.json(categories)
}
