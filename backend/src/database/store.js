export const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'launch', name: 'Lancamentos' },
  { id: 'running', name: 'Performance' },
  { id: 'streetwear', name: 'Streetwear' },
  { id: 'limited', name: 'Limitados' },
]

export let products = [
  {
    id: 'aero-volt-01',
    name: 'Aero Volt 01',
    category: 'launch',
    price: 1299,
    badge: 'Drop novo',
    color: 'Verde pulse',
    sizes: [38, 39, 40, 41, 42, 43],
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Silhueta agressiva com cabedal respiravel, solado leve e acabamento premium para quem usa sneaker como assinatura visual.',
  },
  {
    id: 'noir-runner',
    name: 'Noir Runner',
    category: 'running',
    price: 949,
    badge: 'Performance',
    color: 'Black ice',
    sizes: [37, 38, 39, 40, 41, 42, 44],
    image:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Amortecimento macio, linhas minimalistas e tracao urbana para alternar treino, rua e noite sem perder presenca.',
  },
  {
    id: 'court-archive',
    name: 'Court Archive',
    category: 'streetwear',
    price: 799,
    badge: 'Essencial',
    color: 'Gelo e grafite',
    sizes: [36, 37, 38, 39, 40, 41, 42],
    image:
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Inspirado nas quadras vintage, com couro texturizado, entressola limpa e proporcao perfeita para fits amplos.',
  },
  {
    id: 'phantom-lux',
    name: 'Phantom Lux',
    category: 'limited',
    price: 1699,
    badge: 'Limitado',
    color: 'Chrome shadow',
    sizes: [39, 40, 41, 42, 43],
    image:
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Drop numerado com mix de materiais tecnicos, detalhe refletivo e construcao robusta de colecionador.',
  },
]

export const orders = []

export function setProducts(nextProducts) {
  products = nextProducts
}
