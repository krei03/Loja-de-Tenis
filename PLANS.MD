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

O projeto já possui base funcional com frontend React/Vite, backend Node/Express, MySQL no Docker, painel admin, autenticação admin com hash/token assinado, cadastro de produtos, upload de imagens, checkout com camada preparada para pagamento, carrinho, carrossel de categorias, página de produto com galeria, perfis de marca/categoria com banner/descrição/metadados, modo claro/escuro, reset global de scroll em navegação, portal do cliente com Minha Conta, login/registro por email com backend e senha validada, botões sociais preparados, simulador visual de frete e relatório/gestão administrativa de vendas com filtros e status.

O foco atual deixa de ser reconstrução da base e passa a ser evolução de produto: integrações reais, refinamento administrativo, melhoria de dados e validação visual contínua.

---

# Active Tasks

- [x] Integrar simulador de frete com API real ou serviço definido.
- [x] Adicionar autenticação admin robusta com senha com hash e sessão/token mais seguro.
- [x] Criar histórico/gestão de pedidos no painel admin.
- [x] Persistir tamanho selecionado e dados completos do item dentro do pedido.
- [x] Integrar pagamento real ou preparar camada de checkout para gateway futuro.
- [x] Melhorar cadastro de marcas/categorias com campos de descrição, banner e metadados para perfis de marca.
- [x] Revisar visualmente perfis de marca em mobile, tablet e desktop após cadastro de dados reais.
- [x] Revisar acessibilidade básica: labels, foco visível, aria-labels e navegação por teclado.
- [x] Criar página detalhada de vendas ao clicar em “Total de vendas”.
- [x] Exibir detalhes completos das vendas para envio ao destinatário.
- [x] Criar registro mensal geral com base nos dados do cadastro/login do cliente.
- [x] Corrigir sensação de zoom excessivo no ecommerce e ajustar escala geral do layout.
- [x] Padronizar largura, espaçamento e escala visual para aparência profissional de ecommerce real.
- [x] Adicionar login social com Google.
- [x] Adicionar login social com Apple.
- [x] Criar área “Minha Conta” para clientes autenticados.
- [x] Criar menu lateral “Meus Dados” dentro da conta do cliente.
- [x] Criar página “Meus Pedidos”.
- [x] Criar página “Favoritos”.
- [x] Criar área “Meu Cadastro”.
- [x] Criar página “Alterar dados cadastrais”.
- [x] Criar página “Meus endereços”.
- [x] Criar página “Preferências de comunicação”.
- [x] Criar página “Meus cartões”.
- [x] Criar seção “Atendimento e FAQ”.
- [x] Criar “Portal do cliente”.
- [x] botao de registro na hora do login
- [x] Corrigir comportamento de scroll ao trocar de página.
- [x] Garantir que toda página nova abra automaticamente no topo.
- [x] Corrigir organização do menu lateral da conta do cliente.
- [x] Colocar “Alterar dados” e “Meus endereços” dentro da seção “Meu Cadastro”.
- [x] Remover o texto “Minha Conta” da navbar e deixar apenas o ícone de usuário/bonequinho.
- [x] Refinar visual da aba “Meu Cadastro” usando a referência visual que esta na pasta assets nomo da imagem meu_cadastro enviada pelo usuário.
- [x] Reestruturar layout da área “Meus endereços”.
- [x] Adicionar botão “Cadastrar endereço”.
- [x] Separar fluxo de login e registro da conta do cliente.
- [x] Criar botão exclusivo para “Criar conta”.
- [x] Melhorar UX da tela de autenticação do cliente.
- [x] Corrigir validação de senha no login do cliente.
- [x] Impedir login com qualquer senha.
- [x] Exibir mensagem de erro quando email ou senha estiverem incorretos.
- [x] Adicionar fluxo de redefinição de senha para recuperar acesso de contas de cliente.

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
2. Evoluir autenticação real do cliente com backend/OAuth quando houver credenciais de provedor.
3. Evoluir revisão visual manual completa do fluxo em navegador real com dados de produção.
4. Substituir cotação interna de frete por integração com transportadora quando o provedor comercial for escolhido.
5. Persistir dados reais do cliente no backend, incluindo endereços e cartões.

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
- Implementar Portal do Cliente com sessão persistida no `localStorage`, usando backend para login/cadastro por email e mantendo telas de conta no frontend.
- Tratar Google/Apple como botões sociais funcionais em modo local/preparado; OAuth real dependerá de credenciais e configuração de provedores.
- Reduzir a escala visual geral com `--page-max` menor, navbar mais compacta, grids mais estreitos e paddings menores.
- Usar ViaCEP como serviço real de validação/consulta de CEP no simulador de frete, mantendo cálculo interno de preço/prazo até escolha de transportadora.
- Manter “Meu Cadastro” como grupo visual no menu da conta, com subitens de dados, endereços, comunicação e cartões.
- Refinar “Meu Cadastro” com cards de dados de acesso/pessoais inspirados em `assets/meu_cadastro.png`, adaptando a referência para a identidade escura premium da Vertex.
- Tratar a área “Meus endereços” como gerenciamento visual local, com card principal e botão “Cadastrar endereco”, até persistência real no backend.

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
backend/src/controllers/shippingController.js
backend/src/services/adminSecurity.js
backend/src/database/mysql.js
backend/src/database/categoryCarousel.js
backend/src/routes/productRoutes.js
backend/src/routes/categoryCarouselRoutes.js
backend/src/routes/orderRoutes.js
backend/src/routes/authRoutes.js
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
Atualmente o login do cliente está aceitando qualquer senha.

Esse comportamento precisa ser corrigido, pois o sistema deve validar corretamente a senha cadastrada pelo usuário.


A tela atual de autenticação do cliente está utilizando apenas um único botão

A autenticação do cliente deverá separar claramente:

- fluxo de entrada para cliente existente;
- fluxo de criação de conta;
- botão dedicado “Criar conta”;
- login social preservado como acesso rápido preparado.

A área “Meu Cadastro” deverá ser refinada visualmente utilizando como base a referência enviada pelo usuário.

O layout deverá seguir aparência premium semelhante ao exemplo mostrado, mantendo:

- menu lateral elegante;
- hierarquia visual organizada;
- espaçamentos modernos;
- aparência clean;
- identidade premium do ecommerce.

A seção “Meus endereços” deverá ser melhorada para funcionar como gerenciamento real de endereços do cliente.

Dentro da página de endereços deverá existir um botão principal

O menu lateral da área do cliente precisa ser reorganizado.

Atualmente, “Meu Cadastro”, “Alterar dados” e “Meus endereços” aparecem como opções separadas no mesmo nível.

O correto é “Meu Cadastro” funcionar como uma seção/título de grupo, e abaixo dele aparecerem as opções relacionadas ao cadastro do cliente.

A estrutura esperada deverá ficar assim:

```txt
Meu Cadastro
  ├── Alterar dados
  ├── Meus endereços
  ├── Preferências de comunicação
  ├── Meus cartões
```


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

Usar a referência visual enviada pelo usuário como base para refinamento da conta do cliente.

Revisar arquivos:

Alterar o componente do menu lateral da conta:

```txt
frontend/src/components/AccountSidebar.jsx
```

Validação desta organização:

- [x] criar `AccountSidebar.jsx`;
- [x] agrupar opções de cadastro sob “Meu Cadastro”;
- [x] remover link textual “Minha Conta” da navbar desktop, mantendo apenas o ícone de usuário;
- [x] manter acesso mobile para conta no menu responsivo.

Validação visual da conta e perfil:

- [x] revisar `/brand/nike` em mobile por screenshot;
- [x] revisar `/brand/nike` em tablet por screenshot;
- [x] revisar `/brand/nike` em desktop por screenshot;
- [x] revisar `/account/edit` em desktop por screenshot usando sessão local;
- [x] revisar `/account/addresses` em desktop por screenshot usando sessão local;
- [x] refinar “Meu Cadastro” com base em `assets/meu_cadastro.png`;
- [x] reestruturar “Meus endereços”;
- [x] adicionar botão “Cadastrar endereco”.

Validação de acessibilidade básica:

- [x] manter foco visível global em links, botões e campos;
- [x] adicionar labels visíveis em login do cliente e checkout;
- [x] adicionar `aria-label` no CEP do simulador de frete;
- [x] manter navegação lateral da conta como `nav` com links de teclado;
- [x] manter ações essenciais com texto acessível.

Validação da autenticação do cliente:

- [x] separar formulário de entrada do formulário de criação;
- [x] criar botão exclusivo “Criar conta”;
- [x] manter botões sociais como acesso rápido;
- [x] usar controle segmentado com `role="tablist"` e `aria-selected`;
- [x] direcionar novo cadastro para `/account/edit`.

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

Para escala visual:

- [x] reduzir largura máxima global;
- [x] compactar navbar, busca e botões de ação;
- [x] reduzir escala de títulos, grids, cards, paddings e página de produto;
- [x] manter responsividade mobile/tablet/desktop validada por testes.

Para Portal do Cliente:

- [x] criar tela de login/registro do cliente;
- [x] adicionar botão de registro na hora do login;
- [x] adicionar botões Entrar com Google e Entrar com Apple;
- [x] criar área Minha Conta autenticada;
- [x] criar menu lateral Meus Dados;
- [x] criar páginas Meus Pedidos, Favoritos, Meu Cadastro, Alterar dados cadastrais, Meus endereços, Preferências de comunicação, Meus cartões e Atendimento/FAQ;
- [x] conectar navbar, checkout e pedidos locais do cliente.

Para frete real:

- [x] escolher provedor/API;
- [x] criar rota backend para consulta de CEP/frete;
- [x] trocar cálculo local do frontend por chamada à API;
- [x] manter mensagens de erro e loading no perfil do produto.

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

Validação executada na etapa de escala visual e Portal do Cliente:

```txt
frontend npm run lint: OK
frontend npm run build: OK
frontend npm run test:responsive: OK, 5 testes aprovados
frontend npm run test:hero: OK, 2 testes aprovados
git diff --check: OK, apenas avisos CRLF do Windows
docker compose up --build -d: OK
frontend http://localhost:5173: HTTP 200
frontend http://localhost:5173/login: HTTP 200
frontend http://localhost:5173/account: HTTP 200
backend http://localhost:8080/health: OK com database mysql
```

Validação executada na etapa de menu da conta e frete ViaCEP:

```txt
frontend npm run lint: OK
frontend npm run build: OK
frontend npm run test:responsive: OK, 5 testes aprovados
frontend npm run test:hero: OK, 2 testes aprovados
backend node --check src/server.js: OK
backend node --check src/controllers/shippingController.js: OK
git diff --check: OK, apenas avisos CRLF do Windows
docker compose up --build -d: OK
frontend http://localhost:5173/account/edit: HTTP 200
backend http://localhost:8080/health: OK com database mysql
backend http://localhost:8080/api/shipping/quote?cep=01001000: OK com ViaCEP e cotação Vertex Express
```

Validação executada na etapa de cadastro, endereços, acessibilidade e revisão visual:

```txt
frontend npm run lint: OK
frontend npm run build: OK
frontend npm run test:responsive: OK, 5 testes aprovados
frontend npm run test:hero: OK, 2 testes aprovados
git diff --check: OK, apenas avisos CRLF do Windows
docker compose up --build -d: OK
frontend http://localhost:5173/account/edit: HTTP 200
frontend http://localhost:5173/account/addresses: HTTP 200
backend http://localhost:8080/health: OK com database mysql
screenshots Playwright:
- /brand/nike mobile: OK
- /brand/nike tablet: OK
- /brand/nike desktop: OK
- /account/edit desktop: OK
- /account/addresses desktop: OK
```

Validação executada na etapa de autenticação do cliente:

```txt
frontend npm run lint: OK
frontend npm run build: OK
frontend npm run test:responsive: OK, 5 testes aprovados
frontend npm run test:hero: OK, 2 testes aprovados
git diff --check: OK, apenas avisos CRLF do Windows
docker compose up --build -d: OK
frontend http://localhost:5173/login: HTTP 200
backend http://localhost:8080/health: OK com database mysql
```

Validação executada na etapa de validação real de senha do cliente:

```txt
backend node --check src/server.js: OK
backend node --check src/controllers/customerController.js: OK
backend node --check src/services/customerSecurity.js: OK
frontend npm run lint: OK
frontend npm run build: OK
frontend npm run test:responsive: OK, 5 testes aprovados
frontend npm run test:hero: OK, 2 testes aprovados
git diff --check: OK, apenas avisos CRLF do Windows
docker compose up --build -d: OK
frontend http://localhost:5173/login: HTTP 200
backend http://localhost:8080/health: OK com database mysql
backend POST http://localhost:8080/api/customers/register: OK, conta de teste criada
backend POST http://localhost:8080/api/customers/login com senha errada: HTTP 401 esperado
backend POST http://localhost:8080/api/customers/login com senha correta: HTTP 200
cleanup MySQL da conta de teste criada na validação: OK
```

Validação executada na etapa de recuperação de login do cliente:

```txt
backend node --check src/controllers/customerController.js: OK
backend node --check src/routes/customerRoutes.js: OK
frontend npm run lint: OK
frontend npm run build: OK
frontend npm run test:responsive: OK, 5 testes aprovados
frontend npm run test:hero: OK, 2 testes aprovados
git diff --check: OK, apenas avisos CRLF do Windows
docker compose up --build -d: OK
frontend http://localhost:5173/login: HTTP 200
backend http://localhost:8080/health: OK com database mysql
backend reset de senha: OK, senha antiga/incorreta bloqueada antes do reset e senha nova aceita depois
teste Playwright do fluxo cadastro/logout/redefinir senha/login: OK
cleanup MySQL das contas de teste criadas na validação: OK
```

# Decision Log

- 2026-05-25: Autenticação admin passou a usar hash PBKDF2 (`ADMIN_PASSWORD_HASH` quando definido, ou hash em runtime de `ADMIN_PASSWORD` para desenvolvimento local) e token admin assinado com HMAC e expiração.
- 2026-05-25: `GET /api/orders` e `PATCH /api/orders/:id/status` passam a exigir autenticação admin; `POST /api/orders` permanece público para o checkout.
- 2026-05-25: A sessão admin é persistida no `localStorage` como `vertex-admin-session` para permitir acesso direto a `/admin/sales` após login.
- 2026-05-25: Campos de perfil de marca foram adicionados ao `category_carousel` para evitar criar uma segunda entidade de marca antes de haver necessidade real.
- 2026-05-25: Checkout passa a gerar dados de pagamento em modo manual por meio de `backend/src/services/paymentGateway.js`, mantendo o contrato pronto para gateway futuro.
- 2026-05-25: Scroll de navegação passa a ser tratado globalmente em `App.jsx`, no nível do React Router.
- 2026-05-25: Portal do Cliente foi implementado primeiro no frontend com sessão local, rotas protegidas e páginas operacionais, deixando backend/OAuth real para uma etapa com credenciais.
- 2026-05-25: Botões Google/Apple criam sessão local marcada pelo provedor; não há OAuth externo real nesta etapa.
- 2026-05-25: Escala visual geral foi reduzida sem trocar a identidade visual: containers, navbar, hero, grids, cards e páginas internas ficaram mais compactos.
- 2026-05-25: Menu da conta foi extraído para `AccountSidebar.jsx`, alinhado ao plano, com “Meu Cadastro” como grupo e não como opção no mesmo nível.
- 2026-05-25: Navbar desktop mantém apenas o ícone de usuário para conta; o texto de conta permanece só no menu mobile para clareza em telas pequenas.
- 2026-05-25: Simulador de frete usa ViaCEP para validar destino e calcular uma cotação interna `Vertex Express`; integração comercial com transportadora fica como etapa futura.
- 2026-05-25: “Meu Cadastro” passa a usar cards de “Dados de acesso” e “Dados pessoais” inspirados na referência enviada, sem copiar a paleta clara/vermelha literalmente para preservar a identidade escura da Vertex.
- 2026-05-25: A revisão de acessibilidade desta rodada é básica e focada em formulários/conta/produto; auditoria formal com axe/leitores de tela fica para etapa futura.
- 2026-05-25: Login e registro do cliente foram separados no frontend com controle segmentado; a criação de conta continua usando sessão local até existir backend real de clientes.
- 2026-05-25: Login/cadastro por email do cliente passam a usar backend com senha PBKDF2 e sessão assinada; Google/Apple continuam como acesso social preparado/local até haver credenciais OAuth.
- 2026-05-25: Foi adicionado fluxo de redefinição de senha para recuperar acesso de contas de cliente no ambiente atual; em produção, esse fluxo deverá evoluir para token por email antes de exposição pública.

# Surprises & Discoveries

- O `PLANS.MD` tinha uma cerca Markdown aberta em `Minha Conta`, fazendo `# Concrete Steps` ficar dentro de bloco de código; a cerca foi fechada.
- O relatório de vendas consumia `/api/orders` sem token; ao proteger a rota, foi necessário persistir a sessão admin e enviar `Authorization` também em `/admin/sales`.
- A geração de hash foi implementada sem nova dependência, usando `node:crypto`, para evitar ampliar a superfície do backend nesta etapa.
- O `PLANS.MD` já chegou nesta rodada com itens novos de scroll e registro no login; os itens de scroll foram priorizados por serem bug de navegação confirmado no plano.
- A tabela `category_carousel` já funcionava como marca/categoria; expandir a tabela foi menor risco do que introduzir uma nova tabela de marcas agora.
- O preparo de pagamento não é integração real com gateway; ele cria um contrato persistido e substituível, ainda em modo manual.
- O botão "Entrar" da navbar apontava para `/admin`; foi redirecionado para login do cliente e o admin permanece acessível por `/admin`.
- O checkout agora preenche dados do cliente logado e vincula pedidos locais quando o email do pedido corresponde à sessão.
- O plano citava `frontend/src/components/AccountSidebar.jsx`, mas o sidebar estava embutido em `CustomerPortal.jsx`; o componente foi criado para alinhar implementação e documentação.
- ViaCEP entrega endereço/UF, mas não preço de transportadora; por isso preço e prazo continuam calculados internamente até um provedor logístico ser escolhido.
- A referência `assets/meu_cadastro.png` tem layout claro com ações vermelhas; a implementação manteve a estrutura e hierarquia, mas adaptou o visual ao tema escuro premium.
- A primeira tentativa de gerar screenshots fora do projeto não resolveu o módulo Playwright; foi necessário apontar para o `node_modules` do frontend.
- A tela de autenticação anterior misturava entrada e cadastro em um único submit, o que deixava ambíguo se o cliente estava entrando ou registrando.
- O bug de senha aceitava qualquer valor porque o login montava a sessão diretamente no frontend, sem consultar um cadastro real.
- Após a autenticação real, contas criadas antes da persistência backend ou usuários que perderam a senha ficavam sem caminho de recuperação pela interface.

# Artifacts and Notes

- Arquivos alterados nesta etapa: `backend/src/services/adminSecurity.js`, `backend/src/controllers/authController.js`, `backend/src/middleware/adminAuth.js`, `backend/src/controllers/orderController.js`, `backend/src/routes/orderRoutes.js`, `docker-compose.yml`, `frontend/src/services/api.js`, `frontend/src/pages/Admin.jsx`, `frontend/src/pages/SalesReport.jsx`, `frontend/src/styles/app.css`, `PLANS.MD`.
- Comandos usados nesta etapa: `npm run lint` em `frontend`, `npm run build` em `frontend`, `npm run test:responsive` em `frontend`, `npm run test:hero` em `frontend`, `node --check src/server.js` em `backend`, `node --input-type=module -e "..."` em `backend`, `git diff --check`, `docker compose up --build -d`, checagens HTTP com `Invoke-WebRequest`/`Invoke-RestMethod`.
- Observação operacional: para produção, definir `ADMIN_PASSWORD_HASH` e `ADMIN_SESSION_SECRET` com valores fortes; o fallback com `ADMIN_PASSWORD` existe para manter o ambiente Docker local funcionando.
- Arquivos alterados na etapa seguinte: `frontend/src/App.jsx`, `frontend/src/pages/Admin.jsx`, `frontend/src/pages/BrandProfile.jsx`, `frontend/src/pages/Checkout.jsx`, `frontend/src/pages/SalesReport.jsx`, `frontend/src/styles/app.css`, `backend/src/database/categoryCarousel.js`, `backend/src/database/mysql.js`, `backend/src/database/seed.js`, `backend/src/controllers/orderController.js`, `backend/src/services/paymentGateway.js`, `PLANS.MD`.
- Comandos usados na etapa seguinte: `npm run lint` em `frontend`, `npm run build` em `frontend`, `npm run test:responsive` em `frontend`, `npm run test:hero` em `frontend`, `node --check src/server.js` em `backend`, `node --check src/controllers/orderController.js` em `backend`, `git diff --check`, `docker compose up --build -d`, checagens HTTP com `Invoke-WebRequest`/`Invoke-RestMethod`, cleanup do pedido de teste com `docker compose exec -T mysql mysql ... DELETE FROM orders WHERE id = ...`.
- Observação operacional: bancos MySQL existentes recebem colunas novas por migração defensiva em startup (`banner`, `description`, `meta_title`, `meta_description`, `payment`).
- Arquivos alterados na etapa de escala/portal: `frontend/src/App.jsx`, `frontend/src/components/Navbar.jsx`, `frontend/src/pages/Checkout.jsx`, `frontend/src/pages/CustomerPortal.jsx`, `frontend/src/styles/app.css`, `PLANS.MD`.
- Comandos usados na etapa de escala/portal: `npm run lint` em `frontend`, `npm run build` em `frontend`, `npm run test:responsive` em `frontend`, `npm run test:hero` em `frontend`, `git diff --check`, `docker compose up --build -d`, checagens HTTP com `Invoke-WebRequest`.
- Observação operacional: login social está em modo local/preparado; para produção será necessário configurar OAuth real e persistência de cliente no backend.
- Arquivos alterados na etapa de menu/frete: `frontend/src/components/AccountSidebar.jsx`, `frontend/src/components/Navbar.jsx`, `frontend/src/pages/CustomerPortal.jsx`, `frontend/src/pages/ProductDetail.jsx`, `frontend/src/services/api.js`, `frontend/src/styles/app.css`, `backend/src/controllers/shippingController.js`, `backend/src/routes/shippingRoutes.js`, `backend/src/server.js`, `PLANS.MD`.
- Comandos usados na etapa de menu/frete: `npm run lint` em `frontend`, `npm run build` em `frontend`, `npm run test:responsive` em `frontend`, `npm run test:hero` em `frontend`, `node --check src/server.js` em `backend`, `node --check src/controllers/shippingController.js` em `backend`, `git diff --check`, `docker compose up --build -d`, checagens HTTP com `Invoke-WebRequest`.
- Observação operacional: a consulta de CEP depende de disponibilidade externa do ViaCEP; falhas retornam mensagem amigável no frontend.
- Arquivos alterados na etapa de cadastro/acessibilidade: `frontend/src/pages/CustomerPortal.jsx`, `frontend/src/pages/Checkout.jsx`, `frontend/src/pages/ProductDetail.jsx`, `frontend/src/styles/app.css`, `PLANS.MD`; referência usada: `assets/meu_cadastro.png`.
- Comandos usados na etapa de cadastro/acessibilidade: `npm run lint` em `frontend`, `npm run build` em `frontend`, `docker compose up --build -d`, script Playwright temporário para screenshots em `%TEMP%\\vertex-visual-review`.
- Observação operacional: screenshots de revisão foram gerados fora do repo em `%TEMP%\\vertex-visual-review` para evitar poluir o versionamento.
- Arquivos alterados na etapa de autenticação do cliente: `frontend/src/pages/CustomerPortal.jsx`, `frontend/src/styles/app.css`, `PLANS.MD`.
- Comandos usados na etapa de autenticação do cliente: `npm run lint` em `frontend`, `npm run build` em `frontend`, `npm run test:responsive` em `frontend`, `npm run test:hero` em `frontend`, `git diff --check`, `docker compose up --build -d`, checagens HTTP com `Invoke-WebRequest`.
- Observação operacional: Docker foi atualizado nesta etapa conforme rotina atual do projeto.
- Arquivos alterados na etapa de validação real de senha do cliente: `backend/src/database/mysql.js`, `backend/src/server.js`, `backend/src/controllers/customerController.js`, `backend/src/routes/customerRoutes.js`, `backend/src/services/customerSecurity.js`, `frontend/src/pages/CustomerPortal.jsx`, `frontend/src/services/api.js`, `frontend/src/styles/app.css`, `PLANS.MD`.
- Comandos usados na etapa de validação real de senha do cliente: `node --check src/server.js` em `backend`, `node --check src/controllers/customerController.js` em `backend`, `node --check src/services/customerSecurity.js` em `backend`, `npm run lint` em `frontend`, `npm run build` em `frontend`, `npm run test:responsive` em `frontend`, `npm run test:hero` em `frontend`, `git diff --check`, `docker compose up --build -d`, checagens HTTP com `Invoke-WebRequest`/`Invoke-RestMethod`, cleanup da conta de teste com `docker compose exec -T mysql mysql ... DELETE FROM customers WHERE email = ...`.
- Observação operacional: contas de cliente por email agora ficam na tabela `customers`; ambientes existentes recebem a tabela no startup do backend.
- Arquivos alterados na etapa de recuperação de login do cliente: `backend/src/controllers/customerController.js`, `backend/src/routes/customerRoutes.js`, `frontend/src/pages/CustomerPortal.jsx`, `frontend/src/services/api.js`, `frontend/src/styles/app.css`, `PLANS.MD`.
- Comandos usados na etapa de recuperação de login do cliente: `node --check src/controllers/customerController.js` em `backend`, `node --check src/routes/customerRoutes.js` em `backend`, `npm run lint` em `frontend`, `npm run build` em `frontend`, `npm run test:responsive` em `frontend`, `npm run test:hero` em `frontend`, `git diff --check`, `docker compose up --build -d`, checagens HTTP com `Invoke-WebRequest`/`Invoke-RestMethod`, script Playwright temporário para o fluxo de redefinição, cleanup de contas de teste com `docker compose exec -T mysql mysql ... DELETE FROM customers WHERE email LIKE ...`.
- Observação operacional: Docker foi atualizado novamente após a correção do login.

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
