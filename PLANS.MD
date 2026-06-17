# Purpose / Big Picture

Criar e evoluir um ecommerce premium de tênis/sneakers e streetwear com experiência visual moderna, responsiva e inspirada em plataformas premium como Droper, mantendo identidade própria.

O projeto deve continuar priorizando:

- experiência visual premium em desktop e mobile;
- catálogo de produtos com fotos, galeria, tamanhos, categorias e marcas;
- navegação por carrossel de marcas/categorias;
- perfis individuais de marcas;
- painel admin funcional para catálogo, imagens, carrossel e vendas;
- portal do cliente com login/cadastro, conta, pedidos, dados, endereços e cartões;
- execução consistente em Docker;
- código simples de manter para futuras integrações reais.

---

# Progress

- [x] Corrigir o arquivo: `frontend/src/styles/app.css`
- [x] Criar mais arquivos de componentes em: `frontend/src/components`


# Current Progress

O projeto já possui base funcional com frontend React/Vite, backend Node/Express, MySQL no Docker, painel admin, autenticação admin com hash/token assinado, cadastro de produtos, upload de imagens, checkout com camada preparada para pagamento, carrinho, carrossel de categorias, página de produto com galeria, perfis de marca/categoria com banner/descrição/metadados, modo claro/escuro, reset global de scroll em navegação, portal do cliente, login/registro por email com backend e senha validada, botões sociais preparados, simulador de frete com ViaCEP e relatório/gestão administrativa de vendas com filtros e status.

As tarefas estruturais anteriores foram concluídas e arquivadas em `Archive.md`. Nesta execução, `app.css` foi transformado em agregador de imports, estilos foram separados por domínio, o conteúdo interno da conta do cliente foi extraído para componente dedicado e os cards de métricas do admin foram extraídos para componente próprio. O foco atual volta a ser maturidade de produto: integrações reais, persistência completa de dados do cliente, revisão visual com dados reais e preparação para uso fora do ambiente local.

---

# Active Tasks

- Integrar OAuth real para Google/Apple quando as credenciais dos provedores forem definidas.
- Substituir a cotação interna de frete por integração comercial com transportadora quando o provedor for escolhido.
- Persistir dados reais do cliente no backend, incluindo endereços, cartões, preferências e vínculo com pedidos.
- Executar revisão visual manual completa com dados reais em desktop, tablet e mobile.
- Preparar o fluxo de pagamento para um gateway real quando o provedor for definido.

---

# Current Bugs

Nenhum bug ativo confirmado neste momento.

Pontos de atenção nas próximas alterações:

- consistência visual do modo claro em telas ainda pouco testadas;
- qualidade das logos enviadas para o carrossel quando arquivos têm muito espaço vazio;
- comportamento de dados antigos do MySQL ao mudar estrutura de marcas/categorias;
- responsividade de páginas novas após inclusão de banners reais;
- rota backend `POST /api/customers/reset-password` permanece existente, mas sem acesso pela tela atual de login.

---

# Next Steps

1. Validar visualmente o fluxo completo no Docker: home, carrossel, perfil de marca, perfil do produto, carrinho, checkout, login, portal do cliente e admin.
2. Definir provedores reais para OAuth, frete e pagamento.
3. Persistir endereços, cartões e preferências do cliente no backend.
4. Revisar a experiência de dados reais no admin: produtos, categorias, vendas, pedidos e status.
5. Fazer auditoria visual e responsiva após cadastrar banners, logos e produtos reais.

---

# Current Decisions

- Manter frontend e backend separados, com execução principal via Docker Compose.
- Usar React, React Router, Framer Motion e Lucide React no frontend.
- Usar Node.js, Express e MySQL no backend.
- Manter o carrossel de categorias/marcas como fonte de navegação para `/brand/:brandId`.
- Usar `category_carousel` como fonte de dados de perfil de marca, incluindo banner, descrição e metadados.
- Persistir tema claro/escuro no `localStorage` e aplicar via `data-theme` no documento.
- Proteger a listagem e atualização administrativa de pedidos com token admin assinado.
- Manter criação de pedidos pública em `POST /api/orders`, pois o checkout precisa registrar compras sem sessão admin.
- Usar `/admin/sales` como página dedicada de relatório de vendas, acessada pelo card “Total de vendas”.
- Preparar checkout com uma camada de pagamento interna (`paymentGateway`) em modo manual até escolha de provedor real.
- Usar ViaCEP para validar/consultar CEP no simulador de frete, mantendo cálculo interno de preço/prazo até escolha de transportadora.
- Implementar Portal do Cliente com sessão persistida no `localStorage`, usando backend para login/cadastro por email.
- Tratar Google/Apple como botões sociais preparados; OAuth real depende de credenciais e configuração de provedores.
- Evitar novas abstrações grandes sem necessidade clara; seguir os padrões já existentes do projeto.

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
frontend/src/pages/CustomerPortal.jsx
frontend/src/components/AccountSidebar.jsx
frontend/src/components/AdminMetrics.jsx
frontend/src/components/CustomerAccountContent.jsx
frontend/src/components/CategoryCarousel.jsx
frontend/src/components/Navbar.jsx
frontend/src/components/ProductCard.jsx
frontend/src/components/Cart.jsx
frontend/src/services/api.js
frontend/src/styles/app.css
frontend/src/styles/appBase.css
frontend/src/styles/customerAccount.css
frontend/src/styles/footer.css
frontend/src/styles/responsive.css
frontend/src/styles/salesReport.css
frontend/src/styles/categoryCarousel.css
```

Pontos importantes do backend:

```txt
backend/src/server.js
backend/src/controllers/productController.js
backend/src/controllers/categoryCarouselController.js
backend/src/controllers/orderController.js
backend/src/controllers/authController.js
backend/src/controllers/customerController.js
backend/src/controllers/shippingController.js
backend/src/services/adminSecurity.js
backend/src/services/customerSecurity.js
backend/src/services/paymentGateway.js
backend/src/database/mysql.js
backend/src/database/categoryCarousel.js
backend/src/routes/productRoutes.js
backend/src/routes/categoryCarouselRoutes.js
backend/src/routes/orderRoutes.js
backend/src/routes/authRoutes.js
backend/src/routes/customerRoutes.js
backend/src/routes/shippingRoutes.js
```

Assets de referência ainda relevantes:

```txt
assets/carrosel_categoria .png
assets/navbar.png
assets/foter.png
assets/perfil_marca.png
assets/meu_cadastro.png
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

A próxima fase deve priorizar melhorias que aumentam a maturidade real do ecommerce sem quebrar a experiência premium já criada.

Ordem recomendada:

1. Validar a experiência atual ponta a ponta no Docker.
2. Definir provedores externos: OAuth, transportadora e gateway de pagamento.
3. Persistir dados completos do cliente no backend.
4. Integrar frete real e pagamento real.
5. Revisar admin e portal do cliente com dados reais.
6. Fazer revisão visual/responsiva final antes de expor o projeto fora do ambiente local.

---

# Concrete Steps

- Rodar a validação atual e registrar qualquer falha nova em `Current Bugs`.
- Conferir manualmente rotas principais em `http://localhost:5173`.
- Escolher provedor de frete e mapear contrato esperado da API.
- Escolher gateway de pagamento e mapear dados mínimos necessários no pedido.
- Criar persistência backend para endereços, cartões e preferências do cliente.
- Revisar telas do modo claro depois que houver dados reais cadastrados.

---

# Validation and Acceptance

Validações atuais antes/depois de mudanças relevantes:

```bash
npm run lint
npm run build
npm run test:responsive
npm run test:hero
docker compose up --build -d
```

Também validar manualmente:

- `http://localhost:5173`
- `http://localhost:5173/login`
- `http://localhost:5173/account`
- `http://localhost:5173/admin/sales`
- `http://localhost:8080/health`
- home e carrossel de categorias;
- página `/brand/:brandId`;
- página de produto com galeria e frete;
- painel admin;
- cadastro/edição de produto;
- cadastro/edição de categoria do carrossel;
- carrinho e checkout.

---

# Decision Log

- 2026-06-17: `frontend/src/styles/app.css` passou a ser um agregador de imports para manter o ponto de entrada CSS estável e reduzir a concentração de estilos em um único arquivo.
- 2026-06-17: Os estilos extraídos foram separados por domínio em `appBase.css`, `customerAccount.css`, `salesReport.css`, `footer.css` e `responsive.css`, preservando a ordem de cascata por meio dos imports.
- 2026-06-17: O conteúdo das páginas internas da conta do cliente foi movido de `CustomerPortal.jsx` para `CustomerAccountContent.jsx`, mantendo login/registro no arquivo de página.
- 2026-06-17: Os cards de métricas do painel admin foram extraídos para `AdminMetrics.jsx`, deixando `Admin.jsx` menos concentrado sem alterar o fluxo administrativo.

---

# Surprises & Discoveries

- O Docker Desktop/daemon não estava rodando; `docker compose up --build -d` falhou ao tentar acessar `npipe:////./pipe/dockerDesktopLinuxEngine`.
- Os testes Playwright falharam inicialmente porque não havia servidor em `http://localhost:5173`; foi necessário subir um servidor Vite temporário.
- Depois da separação dos estilos, o teste responsivo mobile revelou overflow horizontal de 5px causado pelo título `Mais moderno/streetwear`; a correção foi adicionar `overflow-wrap: anywhere` aos headings de seção.

---

# Artifacts and Notes

Arquivos alterados nesta execução:

```txt
PLANS.MD
Archive.md
frontend/src/pages/CustomerPortal.jsx
frontend/src/pages/Admin.jsx
frontend/src/components/AdminMetrics.jsx
frontend/src/components/CustomerAccountContent.jsx
frontend/src/styles/app.css
frontend/src/styles/appBase.css
frontend/src/styles/customerAccount.css
frontend/src/styles/footer.css
frontend/src/styles/responsive.css
frontend/src/styles/salesReport.css
```

Comandos usados nesta execução:

```bash
Get-Content -Raw -LiteralPath PLANS.MD
git status --short
rg --files
npm run lint
npm run build
npm run test:responsive
npm run test:hero
docker compose up --build -d
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:5173
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:5173/login
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:5173/account
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:5173/admin/sales
```

Validação executada nesta etapa:

```txt
frontend npm run lint: OK
frontend npm run build: OK
frontend npm run test:hero: OK, 2 testes aprovados
frontend npm run test:responsive: OK, 5 testes aprovados após ajuste de overflow mobile
frontend http://localhost:5173: HTTP 200 com servidor Vite temporário
frontend http://localhost:5173/login: HTTP 200 com servidor Vite temporário
frontend http://localhost:5173/account: HTTP 200 com servidor Vite temporário
frontend http://localhost:5173/admin/sales: HTTP 200 com servidor Vite temporário
docker compose up --build -d: bloqueado porque o daemon do Docker Desktop não estava rodando
```
