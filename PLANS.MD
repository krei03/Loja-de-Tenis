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

O projeto já possui base funcional com frontend React/Vite, backend Node/Express, MySQL no Docker, painel admin, autenticação admin com hash/token assinado, cadastro de produtos, upload de imagens, checkout com camada preparada para pagamento, carrinho, carrossel de categorias, página de produto com galeria, perfis de marca/categoria com banner/descrição/metadados, modo claro/escuro, reset global de scroll em navegação, simulador visual de frete e relatório/gestão administrativa de vendas com filtros e status.

O foco atual deixa de ser reconstrução da base e passa a ser evolução de produto: integrações reais, refinamento administrativo, melhoria de dados e validação visual contínua.

---

# Active Tasks

- [ ] Integrar simulador de frete com API real ou serviço definido.
- [x] Adicionar autenticação admin robusta com senha com hash e sessão/token mais seguro.
- [x] Criar histórico/gestão de pedidos no painel admin.
- [x] Persistir tamanho selecionado e dados completos do item dentro do pedido.
- [x] Integrar pagamento real ou preparar camada de checkout para gateway futuro.
- [x] Melhorar cadastro de marcas/categorias com campos de descrição, banner e metadados para perfis de marca.
- [ ] Revisar visualmente perfis de marca em mobile, tablet e desktop após cadastro de dados reais.
- [ ] Revisar acessibilidade básica: labels, foco visível, aria-labels e navegação por teclado.
- [x] Criar página detalhada de vendas ao clicar em “Total de vendas”.
- [x] Exibir detalhes completos das vendas para envio ao destinatário.
- [x] Criar registro mensal geral com base nos dados do cadastro/login do cliente.
- [ ] Corrigir sensação de zoom excessivo no ecommerce e ajustar escala geral do layout.
- [ ] Padronizar largura, espaçamento e escala visual para aparência profissional de ecommerce real.
- [ ] Adicionar login social com Google.
- [ ] Adicionar login social com Apple.
- [ ] Criar área “Minha Conta” para clientes autenticados.
- [ ] Criar menu lateral “Meus Dados” dentro da conta do cliente.
- [ ] Criar página “Meus Pedidos”.
- [ ] Criar página “Favoritos”.
- [ ] Criar área “Meu Cadastro”.
- [ ] Criar página “Alterar dados cadastrais”.
- [ ] Criar página “Meus endereços”.
- [ ] Criar página “Preferências de comunicação”.
- [ ] Criar página “Meus cartões”.
- [ ] Criar seção “Atendimento e FAQ”.
- [ ] Criar “Portal do cliente”.
- [ ] botao de registro na hora do login
- [x] Corrigir comportamento de scroll ao trocar de página.
- [x] Garantir que toda página nova abra automaticamente no topo.

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
2. Corrigir escala visual geral do ecommerce e validar em desktop/mobile.
3. Definir qual serviço/API será usado para frete real.
4. Evoluir portal do cliente, cadastro/login social e área Minha Conta.
5. Revisar acessibilidade básica em formulários, foco e navegação por teclado.

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
- Proteger a listagem e atualização administrativa de pedidos com token admin assinado.
- Usar `/api/orders` com autenticação admin para alimentar o relatório de vendas e a gestão operacional de pedidos.
- Manter criação de pedidos pública em `POST /api/orders`, pois checkout precisa registrar compras sem sessão admin.
- Usar `category_carousel` como fonte de dados de perfil de marca, incluindo banner, descrição e metadados.
- Preparar checkout com uma camada de pagamento interna (`paymentGateway`) em modo manual até escolha de provedor real.
- Usar um componente global de scroll no topo em mudanças de rota para evitar páginas abrindo na posição anterior.

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
backend/src/services/adminSecurity.js
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


Atualmente, quando o usuário entra em uma nova página, o site mantém a posição anterior do scroll e carrega a tela já embaixo.

Esse comportamento precisa ser corrigido para que toda navegação interna do ecommerce sempre comece no topo da página.

Ao acessar qualquer rota,

A próxima fase deve priorizar melhorias que aumentam a maturidade real do ecommerce, sem quebrar a experiência premium já criada.

Ordem recomendada:

1. Segurança do admin.
2. Evolução de pedidos no admin: status, filtros e ações operacionais.
3. Dados completos de marca/categoria.
4. Integração real de frete.
5. Checkout/pagamento real.
6. Revisão visual e responsiva após dados reais.
O card “Total de vendas” no painel admin já redireciona para `/admin/sales`, página dedicada de detalhes e registro mensal de vendas.
O ecommerce atualmente aparenta estar com escala visual muito ampliada, semelhante a um zoom excessivo.

Toda a estrutura visual deverá ser refinada para seguir proporções reais de grandes ecommerce modernos.

O layout deverá possuir:

- largura mais equilibrada;
- containers mais centralizados;
- escala visual padrão;
- espaçamentos mais profissionais;
- melhor aproveitamento da tela;
- aparência semelhante a ecommerce reais desktop/mobile.

A implementação deverá revisar:

- largura máxima das seções;
- tamanho de fontes;
- espaçamento vertical;
- tamanho dos cards;
- escala da navbar;
- grid de produtos;
- containers gerais;
- paddings laterais;
- responsividade geral.

O sistema de login do cliente também deverá evoluir.

Na tela de login deverá existir autenticação social premium com:

- Entrar com Google;
- Entrar com Apple.

Os botões deverão seguir visual premium semelhante a plataformas modernas.

Após login, o cliente deverá possuir uma área exclusiva chamada:

```txt
Minha Conta
```

---

# Concrete Steps

Para autenticação admin:

- [x] adicionar hash de senha no backend;
- [x] substituir token fixo por sessão/JWT ou estratégia equivalente;
- [x] revisar login/logout no frontend;
- [x] proteger rotas administrativas existentes.

Para gestão de pedidos:

- [x] permitir atualização de status;
- [x] adicionar filtros por período/status/cliente;
- [x] revisar autenticação da rota de pedidos antes de expor o projeto fora do ambiente local.

Para marcas/categorias:

- [x] expandir dados do carrossel com descrição e banner;
- [x] permitir edição desses campos no admin;
- [x] usar esses dados no `BrandProfile.jsx`;
- [x] manter fallback visual quando a marca não tiver banner/logo.

Para checkout/pagamento:

- [x] criar camada backend de pagamento preparada para provedor futuro;
- [x] enviar método de pagamento do checkout junto com o pedido;
- [x] persistir dados de pagamento no pedido;
- [x] exibir método/status de pagamento no relatório administrativo.

Para comportamento de navegação:

- [x] criar reset global de scroll ao trocar de rota;
- [x] garantir abertura de novas páginas no topo.

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
backend http://localhost:8080/api/orders: OK na etapa anterior, antes da proteção admin
```

Validação executada na etapa de autenticação admin e gestão de pedidos:

```txt
frontend npm run lint: OK
frontend npm run build: OK
frontend npm run test:responsive: OK, 5 testes aprovados
frontend npm run test:hero: OK, 2 testes aprovados
backend node --check src/server.js: OK
backend teste via node --input-type=module para hash/token admin: OK
git diff --check: OK, apenas avisos CRLF do Windows
docker compose up --build -d: OK
frontend http://localhost:5173: HTTP 200
frontend http://localhost:5173/admin/sales: HTTP 200
backend http://localhost:8080/health: OK com database mysql
backend http://localhost:8080/api/orders sem token: HTTP 401 esperado
backend login admin + GET http://localhost:8080/api/orders com token: HTTP 200
```

Validação executada na etapa de perfis de marca, scroll e checkout preparado para pagamento:

```txt
frontend npm run lint: OK
frontend npm run build: OK
frontend npm run test:responsive: OK, 5 testes aprovados
frontend npm run test:hero: OK, 2 testes aprovados
backend node --check src/server.js: OK
backend node --check src/controllers/orderController.js: OK
git diff --check: OK, apenas avisos CRLF do Windows
docker compose up --build -d: OK
frontend http://localhost:5173: HTTP 200
frontend http://localhost:5173/brand/nike: HTTP 200
frontend http://localhost:5173/admin/sales: HTTP 200
backend http://localhost:8080/health: OK com database mysql
backend http://localhost:8080/api/category-carousel: OK com descrição/metadados em Nike
backend POST http://localhost:8080/api/orders com payment pix: OK, payment manual_review persistido
cleanup MySQL do pedido de teste criado na validação: OK
```

# Decision Log

- 2026-05-25: Autenticação admin passou a usar hash PBKDF2 (`ADMIN_PASSWORD_HASH` quando definido, ou hash em runtime de `ADMIN_PASSWORD` para desenvolvimento local) e token admin assinado com HMAC e expiração.
- 2026-05-25: `GET /api/orders` e `PATCH /api/orders/:id/status` passam a exigir autenticação admin; `POST /api/orders` permanece público para o checkout.
- 2026-05-25: A sessão admin é persistida no `localStorage` como `vertex-admin-session` para permitir acesso direto a `/admin/sales` após login.
- 2026-05-25: Campos de perfil de marca foram adicionados ao `category_carousel` para evitar criar uma segunda entidade de marca antes de haver necessidade real.
- 2026-05-25: Checkout passa a gerar dados de pagamento em modo manual por meio de `backend/src/services/paymentGateway.js`, mantendo o contrato pronto para gateway futuro.
- 2026-05-25: Scroll de navegação passa a ser tratado globalmente em `App.jsx`, no nível do React Router.

# Surprises & Discoveries

- O `PLANS.MD` tinha uma cerca Markdown aberta em `Minha Conta`, fazendo `# Concrete Steps` ficar dentro de bloco de código; a cerca foi fechada.
- O relatório de vendas consumia `/api/orders` sem token; ao proteger a rota, foi necessário persistir a sessão admin e enviar `Authorization` também em `/admin/sales`.
- A geração de hash foi implementada sem nova dependência, usando `node:crypto`, para evitar ampliar a superfície do backend nesta etapa.
- O `PLANS.MD` já chegou nesta rodada com itens novos de scroll e registro no login; os itens de scroll foram priorizados por serem bug de navegação confirmado no plano.
- A tabela `category_carousel` já funcionava como marca/categoria; expandir a tabela foi menor risco do que introduzir uma nova tabela de marcas agora.
- O preparo de pagamento não é integração real com gateway; ele cria um contrato persistido e substituível, ainda em modo manual.

# Artifacts and Notes

- Arquivos alterados nesta etapa: `backend/src/services/adminSecurity.js`, `backend/src/controllers/authController.js`, `backend/src/middleware/adminAuth.js`, `backend/src/controllers/orderController.js`, `backend/src/routes/orderRoutes.js`, `docker-compose.yml`, `frontend/src/services/api.js`, `frontend/src/pages/Admin.jsx`, `frontend/src/pages/SalesReport.jsx`, `frontend/src/styles/app.css`, `PLANS.MD`.
- Comandos usados nesta etapa: `npm run lint` em `frontend`, `npm run build` em `frontend`, `npm run test:responsive` em `frontend`, `npm run test:hero` em `frontend`, `node --check src/server.js` em `backend`, `node --input-type=module -e "..."` em `backend`, `git diff --check`, `docker compose up --build -d`, checagens HTTP com `Invoke-WebRequest`/`Invoke-RestMethod`.
- Observação operacional: para produção, definir `ADMIN_PASSWORD_HASH` e `ADMIN_SESSION_SECRET` com valores fortes; o fallback com `ADMIN_PASSWORD` existe para manter o ambiente Docker local funcionando.
- Arquivos alterados na etapa seguinte: `frontend/src/App.jsx`, `frontend/src/pages/Admin.jsx`, `frontend/src/pages/BrandProfile.jsx`, `frontend/src/pages/Checkout.jsx`, `frontend/src/pages/SalesReport.jsx`, `frontend/src/styles/app.css`, `backend/src/database/categoryCarousel.js`, `backend/src/database/mysql.js`, `backend/src/database/seed.js`, `backend/src/controllers/orderController.js`, `backend/src/services/paymentGateway.js`, `PLANS.MD`.
- Comandos usados na etapa seguinte: `npm run lint` em `frontend`, `npm run build` em `frontend`, `npm run test:responsive` em `frontend`, `npm run test:hero` em `frontend`, `node --check src/server.js` em `backend`, `node --check src/controllers/orderController.js` em `backend`, `git diff --check`, `docker compose up --build -d`, checagens HTTP com `Invoke-WebRequest`/`Invoke-RestMethod`, cleanup do pedido de teste com `docker compose exec -T mysql mysql ... DELETE FROM orders WHERE id = ...`.
- Observação operacional: bancos MySQL existentes recebem colunas novas por migração defensiva em startup (`banner`, `description`, `meta_title`, `meta_description`, `payment`).

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
