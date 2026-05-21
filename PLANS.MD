# Criar ecommerce premium de tênis estilo Droper

Este ExecPlan é um documento vivo. As seções Progress, Surprises & Discoveries,
Decision Log e Outcomes & Retrospective devem ser mantidas atualizadas.

PLANS.md em: .agent/PLANS.md

---

# Purpose / Big Picture

Criar um ecommerce premium de tênis inspirado visualmente em plataformas modernas de sneakers/streetwear como a Droper, porém com identidade própria.

O sistema deverá transmitir sensação de marca premium, moderna e cinematográfica, utilizando animações suaves, visual minimalista e forte impacto visual.

O principal diferencial do projeto será um hero interativo utilizando vídeo sincronizado com o scroll da página, criando uma experiência semelhante a campanhas publicitárias de grandes marcas de sneakers.

O usuário deverá conseguir:

- visualizar produtos premium;
- navegar por categorias;
- visualizar detalhes completos do tênis;
- adicionar produtos ao carrinho;
- explorar lançamentos;
- navegar em uma interface extremamente moderna;
- ter experiência fluida tanto no desktop quanto mobile.

O projeto deverá funcionar completamente em Docker para facilitar desenvolvimento e deploy.

O resultado esperado é um ecommerce com aparência de marca cara e experiência extremamente moderna.

---

# Progress

- [x] Criar estrutura principal do projeto.
- [x] Separar frontend e backend.
- [x] Configurar Docker.
- [x] Criar docker-compose.yml.
- [x] Criar README.md.
- [x] Criar frontend React.
- [x] Criar backend Node.js.
- [x] Criar hero cinematográfico.
- [x] Adicionar `video_hero.mp4`.
- [x] Implementar vídeo controlado pelo scroll.
- [x] Criar navbar premium.
- [x] Criar seção de lançamentos.
- [x] Criar cards premium.
- [x] Criar página individual do produto.
- [x] Criar carrinho.
- [x] Criar sistema de categorias.
- [x] Criar painel admin.
- [x] Criar API de produtos.
- [x] Conectar frontend/backend.
- [x] Implementar responsividade.
- [x] Criar animações suaves.
- [x] Finalizar identidade visual premium.
- [x] Melhorar painel admin
- [x] Criar login do admin
- [x] Conectar produtos em banco MySQL
- [x] Criar cadastro real de produtos
- [x] Criar upload de imagens dos tênis
- [x] Criar checkout/pedidos
- [x] Melhorar carrinho
- [x] Criar página de finalização de compra
- [x] Criar filtros por marca, tamanho e preço
- [x] Melhorar versão mobile
- [x] Otimizar hero com vídeo no scroll
- [x] Corrigir atraso/delay entre o scroll da página e o tempo do vídeo no hero.
- [x] Melhorar sincronização do `video.currentTime` com o progresso real do scroll.
- [x] Evitar sensação de vídeo “pesado”, travado ou desalinhado ao rolar para baixo.
- [x] Ajustar suavização para o vídeo acompanhar o scroll sem atraso perceptível.
- [x] Testar o hero em desktop e mobile após a correção.

---

# Surprises & Discoveries

- Observação: O hero será a principal experiência visual do projeto.
- Evidência: O usuário deseja vídeo sincronizado com scroll semelhante a campanhas premium.

- Observação: O vídeo precisa responder ao movimento da página.
- Evidência: Ao descer o scroll o vídeo avança, ao subir o vídeo retorna.

- Observação: O projeto precisa ser totalmente dockerizado.
- Evidência: O usuário deseja execução completa via Docker.

- Observação: O visual precisa transmitir sensação premium.
- Evidência: Referência visual inspirada em ecommerce moderno de sneakers.

- Observação: O arquivo de plano informa "PLANS.md em: .agent/PLANS.md", mas o arquivo real usado nesta execução está em `assets/PLANS.MD`.
  Evidência: O arquivo aberto no IDE e lido antes das alterações foi `assets/PLANS.MD`.

- Observação: O vídeo já existia no repositório em `assets/video_hero.mp4` e foi copiado para o caminho esperado do frontend.
  Evidência: `frontend/assets/video_hero.mp4` foi criado a partir do arquivo existente.

- Observação: A validação temporária do backend via `npm run start` excedeu o timeout porque o servidor permanece ativo, como esperado.
  Evidência: A validação foi refeita com processo temporário e chamada HTTP para `/health`.

- Observação: A primeira versão do backend usava armazenamento em memória; isso foi mantido apenas como fallback local.
  Evidência: Os dados iniciais foram extraídos para `backend/src/database/seed.js` e o Docker usa MySQL real via `backend/src/database/mysql.js`.

- Observação: Nesta etapa o plano vivo passou a estar na raiz como `PLANS.MD`, enquanto `assets/PLANS.MD` aparece removido no Git.
  Evidência: `Get-Content -Raw -LiteralPath PLANS.MD` funcionou e `assets/PLANS.MD` retornou caminho inexistente.

- Observação: A porta local `3306` já estava ocupada durante a primeira subida do MySQL no Docker.
  Evidência: `docker compose up --build -d` falhou com erro de bind em `0.0.0.0:3306`; a publicação da porta foi removida porque o backend usa a rede interna do Compose.

- Observação: O backend agora inicializa MySQL com retry e usa fallback em memória fora do Docker.
  Evidência: Localmente `/health` retornou `database: memory`; no Docker `/health` retornou `database: mysql`.

- Observação: O upload de imagem foi validado com um SVG local e o arquivo temporário foi removido após o teste.
  Evidência: `curl.exe -F image=@frontend/public/favicon.svg` retornou URL em `/uploads/...`; `backend/public/uploads/.gitkeep` mantém a pasta versionada.

- Observação: O vídeo do hero foi substituído pelo usuário em `assets/video_hero.mp4` e sincronizado com o asset usado pelo frontend.
  Evidência: `frontend/assets/video_hero.mp4` foi atualizado via `Copy-Item` a partir de `assets/video_hero.mp4`.

- Observação: O atraso perceptível do hero estava ligado ao cálculo de layout durante o scroll e ao uso do `requestAnimationFrame` como único momento de atualização.
  Evidência: A implementação antiga lia `getBoundingClientRect()` em todo scroll e atualizava `video.currentTime` apenas dentro do frame seguinte.

- Observação: O teste automatizado do hero confirma avanço do vídeo no desktop e no mobile.
  Evidência: `npm run test:hero` executou 2 testes Playwright em viewports 1440x900 e 390x844, ambos aprovados.

---

# Decision Log

- Decisão: Utilizar arquitetura frontend/backend separada.
  Justificativa: Facilita escalabilidade e organização.
  Data/Autor: 2026-05-21 / Kauã + ChatGPT

- Decisão: Utilizar React no frontend.
  Justificativa: Melhor componentização e experiência moderna.
  Data/Autor: 2026-05-21 / Kauã + ChatGPT

- Decisão: Utilizar Node.js no backend.
  Justificativa: Integração simples com frontend JavaScript.
  Data/Autor: 2026-05-21 / Kauã + ChatGPT

- Decisão: Utilizar vídeo controlado por scroll.
  Justificativa: Criar experiência cinematográfica premium.
  Data/Autor: 2026-05-21 / Kauã + ChatGPT

- Decisão: Utilizar Docker.
  Justificativa: Padronizar ambiente de execução.
  Data/Autor: 2026-05-21 / Kauã + ChatGPT

- Decisão: Implementar a primeira versão do backend com dados em memória e estrutura modular de controllers/routes.
  Justificativa: Entrega API funcional imediatamente, mantendo caminho claro para trocar por MySQL depois.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Reaproveitar `assets/video_hero.mp4` copiando para `frontend/assets/video_hero.mp4`.
  Justificativa: Preserva o asset original e atende o caminho esperado pelo frontend.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Usar imagens remotas de sneakers para os produtos iniciais.
  Justificativa: Garante impacto visual imediato nos cards e galerias enquanto não houver catálogo próprio de imagens.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Adicionar MySQL 8.4 ao Docker Compose sem expor a porta `3306` no host.
  Justificativa: Evita conflito com MySQL local e mantém o banco acessível ao backend pela rede interna do Docker.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Proteger CRUD administrativo com token simples retornado pelo login admin.
  Justificativa: Entrega fluxo admin funcional sem adicionar complexidade de JWT/bcrypt nesta etapa.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Otimizar o scroll-sync do hero com `requestAnimationFrame`.
  Justificativa: Reduz atraso perceptível entre rolagem e atualização de `video.currentTime`.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Cachear a geometria do hero e atualizar `video.currentTime` imediatamente no evento de scroll, usando `requestAnimationFrame` apenas como correção final do frame.
  Justificativa: Evita leitura de layout em cada scroll e reduz a sensação de atraso entre rolagem e vídeo.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Adicionar `@playwright/test` e um teste específico do hero em desktop/mobile.
  Justificativa: O item pendente exigia testar a correção em desktop e mobile; o teste evita regressão no comportamento de scroll-sync.
  Data/Autor: 2026-05-21 / Codex

---

# Outcomes & Retrospective

Primeira versão funcional concluída em 2026-05-21.

O projeto possui frontend React/Vite, backend Express, Docker Compose, hero cinematográfico com vídeo sincronizado ao scroll, catálogo, categorias, página de produto, carrinho e painel admin simples.

Segunda etapa funcional concluída em 2026-05-21.

O projeto agora possui MySQL no Docker, seed automático, filtros por marca/tamanho/preço, login admin, cadastro real de produtos, upload de imagem, checkout com criação de pedido e hero com sincronização otimizada.

Terceira etapa funcional concluída em 2026-05-21.

O hero foi ajustado para sincronizar com menos atraso usando geometria cacheada e atualização imediata do `currentTime`; a validação automatizada desktop/mobile foi adicionada.

Pendência recomendada para evolução: autenticação robusta com hash/JWT, edição visual de produtos, histórico de pedidos no admin e integração de pagamento real.

---

# Context and Orientation

O projeto será dividido em frontend e backend.

Estrutura principal:

```txt
sneaker-ecommerce/
│
├── frontend/
│
├── backend/
│
├── docker-compose.yml
│
└── README.md
```

Estrutura esperada do frontend:

```txt
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.jsx
│
├── assets/
│   └── video_hero.mp4
│
├── public/
│
└── package.json
```

Estrutura esperada do backend:

```txt
backend/
│
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   └── server.js
│
└── package.json
```

O hero principal utilizará o arquivo:

```txt
frontend/assets/video_hero.mp4
```

O vídeo deverá ocupar a tela inteira.

Durante o scroll:

- scroll para baixo → vídeo avança;
- scroll para cima → vídeo retorna.

O vídeo ficará preso na tela utilizando:

```css
position: sticky;
```

O projeto deverá possuir:

- visual premium;
- dark mode elegante;
- estética sneaker/streetwear;
- animações suaves;
- experiência cinematográfica;
- layout responsivo;
- cards modernos;
- muito espaço visual;
- foco nas imagens dos produtos.

Paleta recomendada:

```txt
Preto: #050505
Grafite: #111111
Cinza: #1A1A1A
Branco gelo: #F5F5F5
Cinza texto: #A1A1AA
Verde destaque: #C6FF00
```

Bibliotecas principais:

Frontend:
- React
- React Router DOM
- Framer Motion
- Lucide React

Backend:
- Express
- Cors
- Dotenv
- Mysql2

---

# Plan of Work

Inicialmente será criada toda estrutura principal do projeto separando frontend e backend.

O frontend será desenvolvido utilizando React + Vite.

O backend será desenvolvido utilizando Node.js + Express.

Após criação da estrutura inicial será configurado Docker para execução completa do ambiente.

Será criado um `docker-compose.yml` responsável por subir frontend e backend simultaneamente.

Na home page será desenvolvido um hero cinematográfico fullscreen utilizando o vídeo:

```txt
frontend/assets/video_hero.mp4
```

O hero deverá:

- ocupar 100% da tela;
- possuir vídeo fullscreen;
- manter o vídeo fixo durante scroll;
- sincronizar o tempo do vídeo com a rolagem da página.

A lógica do scroll funcionará alterando:

```js
video.currentTime
```

conforme a posição do scroll.

Será criada uma seção de produtos premium logo após o hero.

Os cards dos produtos deverão possuir:

- imagem grande;
- hover moderno;
- sombra suave;
- animação;
- nome;
- preço;
- botão de detalhes.

Será criada página individual do produto contendo:

- galeria de imagens;
- descrição;
- tamanhos;
- botão adicionar ao carrinho;
- informações premium.

O backend possuirá:

- CRUD de produtos;
- CRUD de categorias;
- gerenciamento de pedidos;
- painel admin simples.

- O projeto deverá funcionar completamente dentro do Docker.
- Transformar o ecommerce de uma versão visual/demonstrativa para uma loja mais real, com produtos salvos no banco, admin funcional e fluxo de compra mais completo.


- Corrigir o comportamento do vídeo cinematográfico do hero, pois atualmente existe um atraso entre o movimento do scroll e a atualização do tempo do vídeo.

- A lógica atual de sincronização deverá ser revisada para garantir que o `currentTime` do vídeo acompanhe o progresso real do scroll de forma mais precisa.

- A correção deve evitar que o vídeo pareça estar “atrasado” em relação à rolagem, principalmente quando o usuário desce a página rapidamente.

- O componente responsável pelo hero, provavelmente em:

```txt
frontend/src/components/Hero.jsx
```


---

# Concrete Steps

## Criar estrutura principal

Dentro do terminal:

```bash
mkdir sneaker-ecommerce

cd sneaker-ecommerce

mkdir frontend backend
```

Estrutura esperada:

```txt
frontend/
backend/
```

---

## Criar frontend React

Dentro de `/frontend` executar:

```bash
npm create vite@latest . -- --template react

npm install

npm install react-router-dom framer-motion lucide-react
```

Resultado esperado:

```txt
frontend/src
frontend/public
frontend/package.json
```

---

## Criar backend Node.js

Dentro de `/backend` executar:

```bash
npm init -y

npm install express cors dotenv mysql2

npm install nodemon -D
```

Resultado esperado:

```txt
backend/package.json
```

---

## Adicionar vídeo do hero

Criar estrutura:

```txt
frontend/assets/video_hero.mp4
```

O arquivo deverá ser utilizado como vídeo principal do hero.

---

## Criar hero fullscreen

Criar estrutura HTML:

```html
<section class="hero">

  <video
    id="heroVideo"
    muted
    playsinline
    preload="auto"
  >

    <source
      src="./assets/video_hero.mp4"
      type="video/mp4"
    >

  </video>

</section>
```

---

## Criar CSS do hero

Criar estilização:

```css
.hero {
  height: 200vh;
  position: relative;
  background: #000;
}

#heroVideo {
  position: sticky;
  top: 0;

  width: 100%;
  height: 100vh;

  object-fit: cover;
}
```

Resultado esperado:

- vídeo ocupa tela inteira;
- vídeo permanece fixo;
- hero cria área de scroll.

---

## Implementar scroll sync

Criar JavaScript:

```js
const video = document.getElementById("heroVideo");

const hero = document.querySelector(".hero");

video.pause();

window.addEventListener("scroll", () => {

  const rect = hero.getBoundingClientRect();

  const scrollable =
    hero.offsetHeight - window.innerHeight;

  let progress =
    Math.abs(rect.top) / scrollable;

  progress =
    Math.min(Math.max(progress, 0), 1);

  if (video.duration) {

    video.currentTime =
      video.duration * progress;

  }

});
```

Resultado esperado:

- vídeo avança ao descer;
- vídeo retorna ao subir;
- animação suave.

---

## Configurar Docker frontend

Criar:

```txt
frontend/Dockerfile
```

Conteúdo:

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

---

## Configurar Docker backend

Criar:

```txt
backend/Dockerfile
```

Conteúdo:

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
```

---

## Criar docker-compose.yml

Na raiz do projeto:

```yml
version: "3.9"

services:

  frontend:
    build: ./frontend

    ports:
      - "5173:5173"

    volumes:
      - ./frontend:/app

  backend:
    build: ./backend

    ports:
      - "8080:8080"

    volumes:
      - ./backend:/app
```

---

## Rodar projeto

Dentro da raiz:

```bash
docker compose up --build
```

Resultado esperado:

- frontend rodando;
- backend rodando;
- Docker funcionando sem erros.

---

# Validation and Acceptance

O projeto será considerado funcional quando:

- O frontend abrir corretamente.
- O backend iniciar corretamente.
- Docker subir sem erros.
- O vídeo ocupar tela inteira.
- O vídeo responder ao scroll.
- O vídeo avançar ao descer.
- O vídeo retornar ao subir.
- Os cards dos produtos carregarem corretamente.
- O layout funcionar no mobile.
- O ecommerce possuir aparência premium.

Testes esperados:

```bash
docker compose up --build
```

Resultado esperado:

```txt
frontend running
backend running
```

---

# Idempotence and Recovery

Executar novamente:

```bash
docker compose up --build
```

não deverá quebrar o ambiente.

Caso o container falhe:

```bash
docker compose down
```

Depois:

```bash
docker compose up --build
```

Caso dependências quebrem:

```bash
rm -rf node_modules
```

Depois reinstalar:

```bash
npm install
```

---

# Artifacts and Notes

Arquivos principais esperados:

```txt
frontend/assets/video_hero.mp4

frontend/src/components/Hero.jsx

frontend/src/pages/Home.jsx

backend/src/server.js

docker-compose.yml
```

O hero deverá ser a principal experiência visual do projeto.

Arquivos alterados/criados nesta execução:

```txt
.gitignore
README.md
docker-compose.yml
assets/PLANS.MD
backend/.dockerignore
backend/Dockerfile
backend/package.json
backend/package-lock.json
backend/src/controllers/categoryController.js
backend/src/controllers/orderController.js
backend/src/controllers/productController.js
backend/src/database/store.js
backend/src/middleware/notFound.js
backend/src/routes/categoryRoutes.js
backend/src/routes/orderRoutes.js
backend/src/routes/productRoutes.js
backend/src/server.js
frontend/.dockerignore
frontend/Dockerfile
frontend/assets/video_hero.mp4
frontend/package.json
frontend/package-lock.json
frontend/src/App.jsx
frontend/src/components/Cart.jsx
frontend/src/components/Hero.jsx
frontend/src/components/Navbar.jsx
frontend/src/components/ProductCard.jsx
frontend/src/data/products.js
frontend/src/index.css
frontend/src/pages/Admin.jsx
frontend/src/pages/Home.jsx
frontend/src/pages/ProductDetail.jsx
frontend/src/services/api.js
frontend/src/styles/app.css
frontend/src/pages/Checkout.jsx
frontend/tests/hero-scroll.spec.js
backend/src/controllers/authController.js
backend/src/controllers/uploadController.js
backend/src/database/mysql.js
backend/src/database/seed.js
backend/src/middleware/adminAuth.js
backend/src/routes/authRoutes.js
backend/src/routes/uploadRoutes.js
backend/public/uploads/.gitkeep
PLANS.MD
```

Comandos executados nesta execução:

```bash
Get-Content -Raw -LiteralPath assets/PLANS.MD
git status --short
rg --files
New-Item -ItemType Directory -Force -Path frontend, backend
npm create vite@latest . -- --template react
npm init -y
npm install react-router-dom framer-motion lucide-react
npm install express cors dotenv mysql2
npm install nodemon -D
Copy-Item -LiteralPath assets/video_hero.mp4 -Destination frontend/assets/video_hero.mp4 -Force
npm run build
npm run start
npm run lint
Remove-Item -LiteralPath frontend/src/assets/hero.png -Force
Invoke-RestMethod -Uri http://localhost:8080/health
Invoke-RestMethod -Uri http://localhost:8080/api/products
docker compose up --build -d
Invoke-WebRequest -Uri http://localhost:5173
Invoke-RestMethod -Uri http://localhost:8080/api/categories
docker compose ps
docker compose down
docker compose up -d
git add .
git commit -m "feat: criar ecommerce premium de tenis"
git commit --amend --no-edit
git log --oneline -1
npm install multer
Get-Content -Raw -LiteralPath PLANS.MD
docker compose down
docker compose up --build -d
Invoke-RestMethod -Uri http://localhost:8080/health
Invoke-RestMethod -Uri "http://localhost:8080/api/products?brand=Vertex%20Lab"
Invoke-RestMethod -Uri http://localhost:8080/api/auth/admin/login -Method Post
Invoke-WebRequest -Uri http://localhost:5173
Invoke-RestMethod -Uri http://localhost:8080/api/orders -Method Post
curl.exe -X POST http://localhost:8080/api/uploads/image -H "Authorization: Bearer vertex-admin-token" -F "image=@frontend/public/favicon.svg"
Get-Item -LiteralPath assets/video_hero.mp4, frontend/assets/video_hero.mp4
Copy-Item -LiteralPath assets/video_hero.mp4 -Destination frontend/assets/video_hero.mp4 -Force
npx playwright install chromium
npm install -D @playwright/test
npm run test:hero
Remove-Item -Recurse -Force -LiteralPath frontend/test-results
```

Validação realizada:

```txt
frontend npm run build: OK
frontend npm run lint: OK
backend /health: OK
backend /api/products: OK
docker compose up --build -d: OK
frontend Docker em http://localhost:5173: HTTP 200
backend Docker em http://localhost:8080/health: OK
backend Docker em http://localhost:8080/api/categories: OK
docker compose down: OK
frontend npm run build apos melhorias: OK
frontend npm run lint apos melhorias: OK
backend local /health: OK com fallback memory
backend local /api/products?brand=Vertex%20Lab: OK
backend Docker /health: OK com database mysql
backend Docker filtro por marca: OK
backend Docker login admin: OK
backend Docker criar pedido: OK
backend Docker upload de imagem: OK
frontend Docker em http://localhost:5173: HTTP 200
video_hero.mp4 sincronizado entre assets/ e frontend/assets/: OK
frontend Docker apos troca do video: HTTP 200
frontend npm run build apos ajuste do hero: OK
frontend npm run lint apos ajuste do hero: OK
frontend npm run test:hero: OK, 2 testes aprovados em desktop e mobile
```

Commit criado:

```txt
feat: criar ecommerce premium de tenis
feat: adicionar admin mysql e checkout
fix: sincronizar hero com scroll sem atraso
```

---

# Interfaces and Dependencies

Frontend:

```txt
React
React Router DOM
Framer Motion
Lucide React
```

Backend:

```txt
Express
Cors
Dotenv
Mysql2
```

Funções principais esperadas:

```js
Hero()
ProductCard()
Navbar()
Cart()
```

Backend:

```js
getProducts()
createProduct()
updateProduct()
deleteProduct()
```
