import { seedCategories, seedProducts } from './seed.js'

export const categories = [...seedCategories]
export let products = [...seedProducts]

export const orders = []

export function setProducts(nextProducts) {
  products = nextProducts
}
