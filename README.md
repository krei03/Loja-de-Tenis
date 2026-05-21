# Vertex Sneaker Ecommerce

Ecommerce premium de tenis com frontend React/Vite, backend Node.js/Express e execucao via Docker.

## Rodar com Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend healthcheck: http://localhost:8080/health
- API de produtos: http://localhost:8080/api/products
- Admin: http://localhost:5173/admin
- Login admin padrao: `admin` / `vertex123`

## Rodar localmente sem Docker

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

## Funcionalidades

- Hero cinematografico fullscreen com `video_hero.mp4` sincronizado ao scroll.
- Navbar premium fixa.
- Secao de lancamentos e filtros por categoria.
- Filtros por marca, tamanho e faixa de preco.
- Cards animados com imagens grandes.
- Pagina individual de produto com galeria, tamanhos e compra.
- Carrinho com quantidade, subtotal, beneficios e remocao.
- Checkout com criacao de pedido na API.
- Painel admin com login, cadastro real de produtos, upload de imagem e exclusao.
- API Express com produtos, categorias, pedidos, auth admin e upload.
- MySQL 8.4 no Docker Compose com seed automatico de catalogo.

## Estrutura

```txt
frontend/
backend/
docker-compose.yml
README.md
PLANS.MD
```

## API principal

```txt
GET    /health
GET    /api/products
GET    /api/products?brand=Vertex%20Lab&size=40&minPrice=500&maxPrice=1500
POST   /api/auth/admin/login
POST   /api/products
DELETE /api/products/:id
POST   /api/uploads/image
POST   /api/orders
GET    /api/orders
```
