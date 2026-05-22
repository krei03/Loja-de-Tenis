# Purpose / Big Picture

> Histórico completo movido para `Archive.md`

Criar e evoluir um ecommerce premium de tênis/sneakers e streetwear com experiência visual moderna, responsiva e inspirada em plataformas premium como Droper, mantendo identidade própria.

O projeto deve continuar priorizando:

- experiência visual premium em desktop e mobile;
- catálogo de produtos com fotos, galeria, tamanhos, categorias e marcas;
- navegação por carrossel de marcas/categorias;
- perfis individuais de marcas;
- painel admin funcional para catálogo, imagens e carrossel;
- execução consistente em Docker;
- código simples de manter para futuras integrações reais.

---

# Current Progress

O projeto já possui base funcional com frontend React/Vite, backend Node/Express, MySQL no Docker, painel admin, cadastro de produtos, upload de imagens, checkout, carrinho, carrossel de categorias, página de produto com galeria, perfis de marca/categoria, modo claro/escuro, simulador visual de frete e relatório administrativo de vendas.

O foco atual deixa de ser reconstrução da base e passa a ser evolução de produto: integrações reais, refinamento administrativo, melhoria de dados e validação visual contínua.

---

# Active Tasks

- [ ] Integrar simulador de frete com API real ou serviço definido.
- [ ] Adicionar autenticação admin robusta com senha com hash e sessão/token mais seguro.
- [ ] Criar histórico/gestão de pedidos no painel admin.
- [x] Persistir tamanho selecionado e dados completos do item dentro do pedido.
- [ ] Integrar pagamento real ou preparar camada de checkout para gateway futuro.
- [ ] Melhorar cadastro de marcas/categorias com campos de descrição, banner e metadados para perfis de marca.
- [ ] Revisar visualmente perfis de marca em mobile, tablet e desktop após cadastro de dados reais.
- [ ] Revisar acessibilidade básica: labels, foco visível, aria-labels e navegação por teclado.
- [x] Criar página detalhada de vendas ao clicar em “Total de vendas”.
- [x] Exibir detalhes completos das vendas para envio ao destinatário.
- [x] Criar registro mensal geral com base nos dados do cadastro/login do cliente.

---

# Current Bugs

Nenhum bug ativo confirmado neste momento.

Possíveis pontos para observar nas próximas alterações:

- consistência visual do modo claro em telas ainda pouco testadas;
- qualidade das logos enviadas para o carrossel quando arquivos têm muito espaço vazio;
- comportamento de dados antigos do MySQL ao mudar estrutura de marcas/categorias;
- responsividade de páginas novas após inclusão de banners reais.

---

# Next Steps

1. Validar visualmente o fluxo completo no Docker: home, carrossel, perfil de marca, perfil do produto, carrinho, checkout e admin.
2. Definir qual serviço/API será usado para frete real.
3. Modelar os campos definitivos para perfil de marca: banner, descrição, slug, status e ordem.
4. Evoluir segurança do admin antes de expor o projeto fora do ambiente local.
5. Evoluir o relatório de vendas para permitir alteração de status dos pedidos.

---

# Current Decisions

- Manter frontend e backend separados, com execução principal via Docker Compose.
- Usar React, React Router, Framer Motion e Lucide React no frontend.
- Usar Node.js, Express e MySQL no backend.
- Manter o carrossel de categorias/marcas como fonte de navegação para `/brand/:brandId`.
- Persistir tema claro/escuro no `localStorage` e aplicar via `data-theme` no documento.
- Manter o simulador de frete atual como placeholder visual até integração real.
- Evitar novas abstrações grandes sem necessidade clara; seguir os padrões já existentes do projeto.
- Usar `/admin/sales` como página dedicada de relatório de vendas, acessada pelo card “Total de vendas”.
- Reutilizar a API existente de pedidos (`/api/orders`) para alimentar o relatório de vendas antes de criar endpoints administrativos mais complexos.

---

# Context and Orientation

Estrutura principal do projeto:

```txt
frontend/
backend/
assets/
docker-compose.yml
PLANS.MD
Archive.md
```

Pontos importantes do frontend:

```txt
frontend/src/App.jsx
frontend/src/pages/Home.jsx
frontend/src/pages/ProductDetail.jsx
frontend/src/pages/BrandProfile.jsx
frontend/src/pages/Admin.jsx
frontend/src/pages/SalesReport.jsx
frontend/src/components/CategoryCarousel.jsx
frontend/src/components/Navbar.jsx
frontend/src/components/ProductCard.jsx
frontend/src/components/Cart.jsx
frontend/src/services/api.js
frontend/src/styles/app.css
frontend/src/styles/categoryCarousel.css
```

Pontos importantes do backend:

```txt
backend/src/server.js
backend/src/controllers/productController.js
backend/src/controllers/categoryCarouselController.js
backend/src/controllers/orderController.js
backend/src/controllers/authController.js
backend/src/database/mysql.js
backend/src/database/categoryCarousel.js
backend/src/routes/productRoutes.js
backend/src/routes/categoryCarouselRoutes.js
backend/src/routes/orderRoutes.js
backend/src/routes/authRoutes.js
```

Assets de referência ainda relevantes:

```txt
assets/carrosel_categoria .png
assets/navbar.png
assets/foter.png
assets/perfil_marca.png
assets/video_hero.mp4
```

Comandos de rotina:

```bash
docker compose up --build -d
npm run lint
npm run build
npm run test:responsive
npm run test:hero
```

---

# Plan of Work

A próxima fase deve priorizar melhorias que aumentam a maturidade real do ecommerce, sem quebrar a experiência premium já criada.

Ordem recomendada:

1. Segurança do admin.
2. Evolução de pedidos no admin: status, filtros e ações operacionais.
3. Dados completos de marca/categoria.
4. Integração real de frete.
5. Checkout/pagamento real.
6. Revisão visual e responsiva após dados reais.
O card “Total de vendas” no painel admin já redireciona para `/admin/sales`, página dedicada de detalhes e registro mensal de vendas.

---

# Concrete Steps

Para autenticação admin:

- adicionar hash de senha no backend;
- substituir token fixo por sessão/JWT ou estratégia equivalente;
- revisar login/logout no frontend;
- proteger rotas administrativas existentes.

Para gestão de pedidos:

- permitir atualização de status;
- adicionar filtros por período/status/cliente;
- revisar autenticação da rota de pedidos antes de expor o projeto fora do ambiente local.

Para marcas/categorias:

- expandir dados do carrossel com descrição e banner;
- permitir edição desses campos no admin;
- usar esses dados no `BrandProfile.jsx`;
- manter fallback visual quando a marca não tiver banner/logo.

Para frete real:

- escolher provedor/API;
- criar rota backend para consulta de CEP/frete;
- trocar cálculo local do frontend por chamada à API;
- manter mensagens de erro e loading no perfil do produto.

Criar uma nova página no frontend:

```txt
frontend/src/pages/SalesReport.jsx
```

Página criada e integrada em `/admin/sales`.

Validação executada nesta etapa:

```txt
frontend npm run lint: OK
frontend npm run build: OK
frontend npm run test:responsive: OK, 5 testes aprovados
frontend npm run test:hero: OK, 2 testes aprovados
git diff --check: OK, apenas avisos CRLF do Windows
docker compose up --build -d: OK
frontend http://localhost:5173: HTTP 200
frontend http://localhost:5173/admin/sales: HTTP 200
backend http://localhost:8080/health: OK com database mysql
backend http://localhost:8080/api/orders: OK
```

# Validation Pending

Validações a executar após próximas alterações:

```bash
npm run lint
npm run build
npm run test:responsive
npm run test:hero
docker compose up --build -d
```

Também validar manualmente:

- `http://localhost:5173`
- `http://localhost:8080/health`
- home e carrossel de categorias;
- página `/brand/:brandId`;
- página de produto com galeria e frete;
- painel admin;
- cadastro/edição de produto;
- cadastro/edição de categoria do carrossel;
- carrinho e checkout.
