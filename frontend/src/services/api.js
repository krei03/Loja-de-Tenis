import { categories as localCategories, products as localProducts } from '../data/products'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

async function request(path, options) {
  try {
    const response = await fetch(`${API_URL}${path}`, options)

    if (!response.ok) {
      throw new Error(`API error ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (path.startsWith('/products')) {
      return localProducts
    }

    if (path.startsWith('/categories')) {
      return localCategories
    }

    throw error
  }
}

export const api = {
  getProducts: () => request('/products'),
  getCategories: () => request('/categories'),
  createOrder: (payload) =>
    request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
}
