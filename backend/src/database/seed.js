export const seedCategories = [
  { id: 'all', name: 'Todos' },
  { id: 'launch', name: 'Lancamentos' },
  { id: 'running', name: 'Performance' },
  { id: 'streetwear', name: 'Streetwear' },
  { id: 'limited', name: 'Limitados' },
]

const nikeModels = [
  'Air Max',
  'Dunk',
  'Air Force',
  'Air Max 90',
  'Air Max Plus',
  'Air Max Plus Drift',
  'Air Max 97',
  'Nike Air More',
  'AIR DT MAX 96',
  'Nike Fear of God',
  'Uptempo',
  'Nike Air Yeezy',
  'Asuna',
  'Blazer',
  'Nike Daybreak',
  'Powerpuff',
]

export const seedCategoryCarousel = [
  createSeedBrand('nike', 'Nike', nikeModels, 1, 'Drops esportivos, retros e colabs que atravessam performance e cultura sneaker.'),
  createSeedBrand('adidas', 'Adidas', [], 2, 'Classicos de arquivo, runners modernos e silhuetas urbanas para rotinas premium.'),
  createSeedBrand('air-jordan', 'Air Jordan', [], 3, 'Basquete, legado e pares de colecionador com presenca forte no streetwear.'),
  createSeedBrand('yeezy', 'Yeezy', [], 4, 'Design escultural, conforto e edicoes desejadas por quem busca visual de impacto.'),
  createSeedBrand('new-balance', 'New Balance', [], 5, 'Runners premium, materiais nobres e proporcoes equilibradas para uso diario.'),
  createSeedBrand('supreme', 'Supreme', [], 6, 'Streetwear de alto desejo com drops pontuais, collabs e pecas de arquivo.'),
  createSeedBrand('stussy', 'Stussy', [], 7, 'Essenciais relaxed, heranca surf-street e pecas versateis para camadas urbanas.'),
  createSeedBrand('corteiz', 'Corteiz', [], 8, 'Energia underground, lancamentos disputados e identidade visual direta.'),
  createSeedBrand('off-white', 'Off-White', [], 9, 'Design conceitual, referencias industriais e sneakers com assinatura de passarela.'),
  createSeedBrand('bape', 'Bape', [], 10, 'Camo, graficos marcantes e classicos japoneses de streetwear colecionavel.'),
  createSeedBrand('essentials', 'Essentials', [], 11, 'Basics premium, tons neutros e modelagens amplas para compor qualquer fit.'),
  createSeedBrand('chrome-hearts', 'Chrome Hearts', [], 12, 'Luxo artesanal, detalhes goticos e pecas raras para colecionadores.'),
]

function createSeedBrand(id, name, models, displayOrder, description) {
  return {
    id,
    name,
    logo: '',
    banner: '',
    description,
    meta_title: `${name} na Vertex`,
    meta_description: description,
    models,
    display_order: displayOrder,
    is_active: true,
  }
}

export const seedProducts = [
  {
    id: 'aero-volt-01',
    name: 'Aero Volt 01',
    brand: 'Vertex Lab',
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
    stock: 18,
  },
  {
    id: 'noir-runner',
    name: 'Noir Runner',
    brand: 'Northline',
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
    stock: 12,
  },
  {
    id: 'court-archive',
    name: 'Court Archive',
    brand: 'Courtline',
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
    stock: 24,
  },
  {
    id: 'phantom-lux',
    name: 'Phantom Lux',
    brand: 'Atelier VX',
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
    stock: 7,
  },
]
