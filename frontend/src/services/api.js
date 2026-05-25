import {
  categories as localCategories,
  categoryCarousel as localCategoryCarousel,
  products as localProducts,
} from '../data/products'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
const API_ORIGIN = API_URL.replace(/\/api$/, '')

function buildQuery(params = {}) {
  const search = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'all') {
      search.set(key, value)
    }
  })

  return search.toString() ? `?${search.toString()}` : ''
}

async function request(path, options) {
  try {
    const response = await fetch(`${API_URL}${path}`, options)

    if (!response.ok) {
      throw new Error(`API error ${response.status}`)
    }

    if (response.status === 204) {
      return null
    }

    return await response.json()
  } catch (error) {
    if (path.startsWith('/products')) {
      return localProducts
    }

    if (path.startsWith('/categories')) {
      return localCategories
    }

    if (path.startsWith('/category-carousel')) {
      return localCategoryCarousel
    }

    throw error
  }
}

export const api = {
  getProducts: (params) => request(`/products${buildQuery(params)}`),
  getCategories: () => request('/categories'),
  getCategoryCarousel: () => request('/category-carousel'),
  getAdminCategoryCarousel: (token) =>
    request('/category-carousel/admin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  loginAdmin: (payload) =>
    request('/auth/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
  registerCustomer: (payload) =>
    request('/customers/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
  loginCustomer: (payload) =>
    request('/customers/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
  createProduct: (payload, token) =>
    request('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }),
  updateProduct: (id, payload, token) =>
    request(`/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }),
  deleteProduct: (id, token) =>
    request(`/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  createCategoryCarouselItem: (payload, token) =>
    request('/category-carousel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }),
  updateCategoryCarouselItem: (id, payload, token) =>
    request(`/category-carousel/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }),
  deleteCategoryCarouselItem: (id, token) =>
    request(`/category-carousel/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  uploadImage: async (file, token) => {
    const body = new FormData()
    body.append('image', file)

    const result = await request('/uploads/image', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    })

    return {
      ...result,
      url: result.url?.startsWith('/uploads') ? `${API_ORIGIN}${result.url}` : result.url,
    }
  },
  createOrder: (payload) =>
    request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
  quoteShipping: (cep) => request(`/shipping/quote${buildQuery({ cep })}`),
  getOrders: (token, params) =>
    request(`/orders${buildQuery(params)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateOrderStatus: (id, status, token) =>
    request(`/orders/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }),
}
