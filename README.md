# Vertex Sneaker Ecommerce

Ecommerce premium de tenis com frontend React/Vite, backend Node.js/Express e execucao via Docker.

## Rodar com Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend healthcheck: http://localhost:8080/health
- API de produtos: http://localhost:8080/api/products

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
- Cards animados com imagens grandes.
- Pagina individual de produto com galeria, tamanhos e compra.
- Carrinho com quantidade, subtotal e remocao.
- Painel admin simples para acompanhar drops cadastrados.
- API Express com produtos, categorias e pedidos.

## Estrutura

```txt
frontend/
backend/
docker-compose.yml
README.md
assets/PLANS.MD
```
