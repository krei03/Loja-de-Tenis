import { seedCategories, seedCategoryCarousel, seedProducts } from './seed.js'

export const categories = [...seedCategories]
export let categoryCarousel = [...seedCategoryCarousel]
export let products = [...seedProducts]

export const orders = []

export function setCategoryCarousel(nextItems) {
  categoryCarousel = nextItems
}

export function setProducts(nextProducts) {
  products = nextProducts
}
