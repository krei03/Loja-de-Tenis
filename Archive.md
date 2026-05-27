# Archive

Histórico técnico completo do projeto.
Validações antigas, troubleshooting, retrospectivas, logs e execuções anteriores foram movidos para este arquivo para manter o `PLANS.md` limpo e sustentável.

---
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
- [x] Melhorar a experiência visual do hero para parecer uma campanha premium de sneakers.
- [x] Corrigir e refinar a sincronização do vídeo com o scroll.
- [x] Reduzir qualquer atraso entre rolagem e avanço do vídeo.
- [x] Garantir que o vídeo avance ao descer e retorne ao subir sem travar.
- [x] Otimizar performance do hero em desktop e mobile.
- [x] Melhorar transição entre o hero cinematográfico e as seções de produtos.
- [x] Adicionar estética mais premium ao hero com overlay, contraste e sensação de profundidade.
- [x] Evitar que o hero pareça apenas um vídeo comum no fundo da página.
- [x] Corrigir responsividade geral do ecommerce.
- [x] Ajustar hero para funcionar bem em notebook, desktop e mobile.
- [x] Reduzir tamanho dos textos grandes no hero e nas seções.
- [x] Corrigir quebra feia do título “Seleção premium em tempo real”.
- [x] Ajustar grid de produtos para não ficar espremido.
- [x] Melhorar espaçamento entre hero e seção de lançamentos.
- [x] Corrigir navbar em telas menores.
- [x] Garantir que cards de produtos tenham tamanho proporcional.
- [x] Testar layout em 390px, 768px, 1024px, 1366px e 1920px.
- [x] Adicionar botão de editar produto ao lado da lixeira no painel admin.
- [x] Corrigir dropdown/listas brancas no admin onde os itens não aparecem para seleção.
- [x] Corrigir seleção de tamanho do tênis que atualmente está estática e sem interação visual.
- [x] Melhorar comportamento visual do seletor de tamanhos.
- [x] Corrigir imagem dos produtos ficando exageradamente grande após aplicar filtros.
- [x] Ajustar proporção dos cards filtrados para manter visual premium.
- [x] Transformar edição de produto em dropdown/modal premium dentro do admin.
- [x] Permitir upload de até 5 imagens por produto.
- [x] Criar sistema de galeria/carrossel de imagens do produto.
- [x] Melhorar experiência visual do formulário de cadastro de produtos.
- [x] Melhorar preview de imagens antes do upload.
- [x] Permitir remover/reordenar imagens no cadastro.
- [x] Melhorar UX/UI do painel admin.
- [x] Criar animações suaves no admin.
- [x] Melhorar aparência premium das tabelas do admin.
- [x] Melhorar responsividade do painel administrativo.
- [x] Exibir exatamente 4 tênis premium na seção “Lançamentos”.
- [x] Criar carrossel horizontal de categorias abaixo da seção de lançamentos.
- [x] Utilizar referência visual `assets/carrosel_categoria`.
- [x] Melhorar visual premium da seção de lançamentos.
- [x] Melhorar espaçamento e hierarquia visual da homepage.
- [x] Criar transição suave entre hero e seção de produtos.
- [x] Refazer footer baseado na referência `assets/foter`.
- [x] Refinar navbar premium baseada na referência `assets/navbar`.
- [x] Melhorar navegação desktop/mobile.
- [x] Melhorar responsividade da navbar.
- [x] Melhorar menu mobile premium.
- [x] Melhorar animações da navbar durante scroll.
- [x] Melhorar experiência visual geral do ecommerce.
- [x] Corrigir página/perfil do produto para não exibir imagem gigante.
- [x] Exibir todas as fotos enviadas no upload do produto.
- [x] Criar galeria premium no perfil do produto usando todas as imagens cadastradas.
- [x] Criar miniaturas clicáveis abaixo/ao lado da imagem principal do produto.
- [x] Melhorar responsividade da galeria do produto no mobile.
- [x] Adicionar botão “Ler mais” na descrição do produto.
- [x] Limitar descrição grande inicialmente e expandir ao clicar em “Ler mais”.
- [x] Melhorar campo de valor/preço no admin.
- [x] Deixar preço no formato brasileiro `R$ 0,00` durante cadastro e edição.
- [x] Corrigir confusão visual ao digitar preço do produto.
- [x] Fazer cada item do carrossel de categorias ser clicável.
- [x] Ao clicar em uma categoria, levar o usuário para a página/listagem dos produtos cadastrados naquela categoria.
- [x] Garantir que o filtro da categoria funcione com os produtos reais do banco.
- [x] Manter aparência premium do carrossel após adicionar navegação por clique.
- [x] Criar página/perfil individual para cada marca/categoria.
- [x] Utilizar referência visual `assets/perfil_marca` para a página de marca.
- [x] Ao entrar em uma categoria como Nike, exibir uma página premium da marca.
- [x] Mostrar banner/header da marca na página de categoria.
- [x] Mostrar logo, nome, descrição e quantidade de produtos da marca.
- [x] Listar todos os modelos cadastrados daquela marca.
- [x] Manter layout premium semelhante à referência enviada.
- [x] Adicionar opção de modo claro e modo escuro na navbar.
- [x] Salvar preferência de tema do usuário.
- [x] Ajustar tela de acesso/login admin para ficar centralizada.
- [x] Melhorar responsividade da tela de login admin.
- [x] Adicionar simulador de frete em cada perfil de tênis.
- [x] Criar campo de CEP no perfil do produto.
- [x] Exibir retorno visual do frete simulado.
- [x] Preparar estrutura para futura integração real com API de frete.
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

- Observação: O hero precisava de linguagem visual de campanha, não apenas vídeo fullscreen.
  Evidência: Foram adicionados moldura cinematográfica, grade sutil, linha de profundidade, painel de campanha, CTA editorial e transição escura para a vitrine.

- Observação: A variável CSS `--hero-progress` permite que o tratamento visual acompanhe a rolagem sem cálculos pesados adicionais no CSS.
  Evidência: `frontend/src/components/Hero.jsx` atualiza `--hero-progress` junto com `video.currentTime`, e `frontend/src/styles/app.css` usa a variável em brilho e profundidade.

- Observação: O teste responsivo revelou que, antes do ajuste final, os cards ainda ficavam apertados em 1024px e o título de lançamentos ficava alto em 1366px/1920px.
  Evidência: A primeira execução de `npm run test:responsive` falhou em notebook, desktop e wide; depois do ajuste de grid/tipografia, os 5 viewports passaram.

- Observação: O ESLint tentou ler a pasta temporária `frontend/test-results` criada pelo Playwright.
  Evidência: `npm run lint` retornou erro `ENOENT` para `frontend/test-results`; `frontend/eslint.config.js` foi atualizado para ignorar `test-results` e `playwright-report`.

- Observação: A API do backend já possuía rota protegida para edição de produto, mas o frontend ainda não chamava essa interface.
  Evidência: `backend/src/routes/productRoutes.js` possui `productRoutes.put('/:id', requireAdmin, updateProduct)`, enquanto `frontend/src/services/api.js` não tinha `updateProduct`.

- Observação: O seletor de tamanho estava visualmente clicável, mas não guardava estado nem entrava no carrinho.
  Evidência: `frontend/src/pages/ProductDetail.jsx` renderizava botões sem `onClick`, sem estado ativo e chamava `onAdd(product)` sem tamanho selecionado.

- Observação: O crescimento exagerado dos cards filtrados vinha do grid permitindo que uma única coluna ocupasse todo o espaço disponível.
  Evidência: `.product-grid` usava `auto-fit` com máximo `1fr`, fazendo um único card esticar no resultado filtrado.

- Observação: O plano ainda descreve o hero como vídeo sincronizado com scroll, mas a direção mais recente do usuário pediu vídeo em autoplay normal sem interação de scroll.
  Evidência: `frontend/src/components/Hero.jsx` e `frontend/tests/hero-scroll.spec.js` validam autoplay com `playbackRate = 1`.

- Observação: As novas referências visuais estavam na pasta `assets/` como arquivos de imagem soltos.
  Evidência: Foram lidos `assets/navbar.png`, `assets/foter.png` e `assets/carrosel_categoria .png` antes dos refinamentos de UI.

- Observação: O backend já aceitava `gallery` como JSON e normalizava listas de imagens.
  Evidência: `backend/src/controllers/productController.js` persiste `gallery` em create/update, então a implementação de até 5 imagens pôde ficar no frontend/admin sem migração de banco.

- Observação: O build falhou uma vez porque a versão instalada de `lucide-react` não exporta `Instagram`.
  Evidência: `npm run build` retornou `MISSING_EXPORT` em `frontend/src/components/Footer.jsx`; o ícone foi substituído por `Camera` e o build passou em seguida.

- Observação: A home precisava separar lançamentos de vitrine filtrada para cumprir “exatamente 4 tênis” sem quebrar os filtros.
  Evidência: `frontend/src/pages/Home.jsx` agora busca `allProducts` para lançamentos/categorias e `filteredProducts` para a vitrine.

- Observação: O carrossel de marcas precisava funcionar como navegação real, não apenas vitrine visual.
  Evidência: `frontend/src/components/CategoryCarousel.jsx` aceita `onSelect` e `activeItemId`; `frontend/src/pages/Home.jsx` filtra a vitrine com produtos reais já carregados da API e rola até a listagem.

- Observação: A galeria do produto já guardava múltiplas imagens no backend, mas a experiência precisava limitar o tamanho da imagem principal e resumir descrições longas.
  Evidência: `frontend/src/pages/ProductDetail.jsx` usa todas as imagens de `gallery`, miniaturas clicáveis e botão `Ler mais`; `frontend/src/styles/app.css` limita a imagem principal com `max-height` e `object-fit: contain`.

- Observação: O campo de preço do admin gerava confusão por aceitar número cru.
  Evidência: `frontend/src/pages/Admin.jsx` agora formata durante digitação em `R$ 0,00` e converte de volta para número antes de chamar a API.

- Observação: A referência `assets/perfil_marca.png` indica uma página de marca/listagem com filtro lateral e vitrine de produtos.
  Evidência: A nova página `frontend/src/pages/BrandProfile.jsx` usa hero de marca, contagem de produtos, logo circular e layout com painel lateral de filtros.

- Observação: O carrossel de categorias precisava navegar para perfis próprios, não apenas aplicar filtro na home.
  Evidência: `frontend/src/components/CategoryCarousel.jsx` agora usa links para `/brand/:brandId`, e `frontend/src/App.jsx` registra a rota de marca.

- Observação: O tema claro/escuro precisa sobreviver ao recarregamento da página.
  Evidência: `frontend/src/App.jsx` salva `vertex-theme` no `localStorage` e aplica `data-theme` no elemento raiz.

- Observação: O simulador de frete foi preparado como retorno local determinístico enquanto não há API externa de frete.
  Evidência: `frontend/src/pages/ProductDetail.jsx` valida CEP com 8 dígitos e exibe prazo/preço simulados em componente próprio.

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

- Decisão: Transformar o hero em uma composição de campanha usando camadas CSS leves em vez de novos assets pesados.
  Justificativa: Aumenta a sensação premium/cinematográfica sem prejudicar a performance nem depender de imagens extras.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Manter o painel de campanha oculto no breakpoint mobile.
  Justificativa: Preserva impacto visual e evita sobreposição em telas estreitas.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Trocar o grid rígido de produtos por `auto-fit` com largura mínima maior para cards.
  Justificativa: Evita cards esmagados em notebook/tablet e preserva proporção premium em desktop.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Centralizar seções com `--page-max` e reduzir a escala dos títulos principais.
  Justificativa: Impede textos gigantes em notebooks e corrige a quebra visual de “Seleção premium em tempo real”.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Reaproveitar o `PUT /api/products/:id` já existente para implementar edição no painel admin.
  Justificativa: Mantém a interface alinhada ao backend atual sem criar rotas novas ou duplicar lógica.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Tratar itens do carrinho por `cartKey` baseada em produto e tamanho selecionado.
  Justificativa: Permite que o mesmo tênis em tamanhos diferentes seja tratado como escolhas distintas.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Limitar a largura das colunas do grid de produtos em vez de alterar o componente do card.
  Justificativa: Corrige o card gigante após filtros preservando o visual existente dos cards em todas as listas.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Preservar o hero em autoplay normal durante esta execução.
  Justificativa: O pedido mais recente do usuário sobre o hero foi remover o controle por scroll e manter velocidade normal.
  Data/Autor: 2026-05-21 / Codex

- Decisão: Usar modal animado para edição de produto e manter cadastro de novo produto no fluxo principal do admin.
  Justificativa: Evita recarregar a página, preserva contexto da tabela e atende a intenção de edição premium sem misturar criação e edição.
  Data/Autor: 2026-05-22 / Codex

- Decisão: Limitar a galeria no frontend a 5 imagens, usando a primeira imagem como capa e enviando todas em `gallery`.
  Justificativa: Aproveita a API existente e mantém compatibilidade com cards, página de produto e admin.
  Data/Autor: 2026-05-22 / Codex

- Decisão: Separar a homepage em seção de 4 lançamentos, carrossel horizontal de categorias e vitrine filtrada.
  Justificativa: Garante o requisito de lançamentos fixos e mantém filtros por marca, tamanho e preço funcionando em área própria.
  Data/Autor: 2026-05-22 / Codex

- Decisão: Criar footer e navbar próprios inspirados nas referências, sem copiar marcas ou identidade da Droper.
  Justificativa: Mantém a identidade Vertex e usa as referências apenas como direção visual de estrutura, contraste e densidade.
  Data/Autor: 2026-05-22 / Codex

- Decisão: Filtrar o carrossel de categorias pelo nome da marca e, como fallback, pelo id da categoria.
  Justificativa: Os itens do carrossel representam marcas de sneakers/streetwear, mas o catálogo ainda mantém categorias técnicas como `launch`, `running`, `streetwear` e `limited`.
  Data/Autor: 2026-05-22 / Codex

- Decisão: Manter a máscara de preço apenas no frontend/admin e enviar valor numérico para a API.
  Justificativa: Evita migração de banco e mantém compatibilidade com `price DECIMAL(10,2)` no MySQL.
  Data/Autor: 2026-05-22 / Codex

- Decisão: Usar `object-fit: contain` e limite de altura na imagem principal do produto.
  Justificativa: Corrige imagem gigante sem cortar fotos de tênis e preserva a galeria premium em desktop/mobile.
  Data/Autor: 2026-05-22 / Codex

- Decisão: Criar rota `/brand/:brandId` para perfis de marca/categoria consumindo o carrossel de categorias e os produtos já carregados.
  Justificativa: Atende a navegação premium por marca sem criar uma API nova desnecessária nesta etapa.
  Data/Autor: 2026-05-22 / Codex

- Decisão: Aplicar tema claro/escuro via atributo `data-theme` no `documentElement` e persistir em `localStorage`.
  Justificativa: Permite alternância global simples, compatível com CSS existente e sem dependência extra.
  Data/Autor: 2026-05-22 / Codex

- Decisão: Implementar o simulador de frete como camada visual local com validação de CEP.
  Justificativa: Entrega a experiência esperada no perfil do tênis e deixa a estrutura pronta para trocar por API real depois.
  Data/Autor: 2026-05-22 / Codex

---

# Outcomes & Retrospective

Primeira versão funcional concluída em 2026-05-21.

O projeto possui frontend React/Vite, backend Express, Docker Compose, hero cinematográfico com vídeo sincronizado ao scroll, catálogo, categorias, página de produto, carrinho e painel admin simples.

Segunda etapa funcional concluída em 2026-05-21.

O projeto agora possui MySQL no Docker, seed automático, filtros por marca/tamanho/preço, login admin, cadastro real de produtos, upload de imagem, checkout com criação de pedido e hero com sincronização otimizada.

Terceira etapa funcional concluída em 2026-05-21.

O hero foi ajustado para sincronizar com menos atraso usando geometria cacheada e atualização imediata do `currentTime`; a validação automatizada desktop/mobile foi adicionada.

Quarta etapa funcional concluída em 2026-05-21.

O hero recebeu tratamento de campanha premium com moldura cinematográfica, profundidade, overlay reativo ao scroll, CTA editorial e transição visual mais suave para a vitrine de produtos.

Quinta etapa funcional concluída em 2026-05-21.

A responsividade geral foi refinada para 390px, 768px, 1024px, 1366px e 1920px, com grid fluido, títulos menores, seções centralizadas, navbar mais compacta e cards proporcionais.

Sexta etapa funcional concluída em 2026-05-21.

O painel admin agora permite editar produtos existentes ao lado da ação de deletar, os selects do admin/filtros mantêm contraste em dark mode, o seletor de tamanhos da página de produto possui estado ativo e envia o tamanho para o carrinho, e os cards filtrados mantêm proporção premium sem imagem gigante.

Sétima etapa funcional concluída em 2026-05-22.

O admin recebeu modal premium de edição, upload/URL de até 5 imagens por produto, previews com remoção/reordenação, tabela refinada e responsividade melhor. A página do produto passou a ter galeria com miniaturas, os cards usam imagem secundária no hover, a home passou a exibir exatamente 4 lançamentos, carrossel horizontal de categorias, vitrine filtrada separada, navbar inspirada na referência com busca/menu mobile/animação no scroll e footer baseado na referência visual adicionada.

Oitava etapa funcional concluída em 2026-05-22.

O carrossel de categorias agora leva para perfis premium de marca/categoria com header, logo, descrição, contagem e listagem de modelos; a navbar ganhou alternância de tema claro/escuro persistida; o login admin foi centralizado e reforçado no mobile; a página do produto recebeu simulador visual de frete com campo de CEP e estrutura pronta para futura integração real.

Pendência recomendada para evolução: autenticação robusta com hash/JWT, histórico de pedidos no admin, persistência do tamanho selecionado no pedido e integração de pagamento real.

---

---

```md id="m6v1qc"
# Plan of Work

Criar uma página específica para perfil de marca/categoria.

Essa página deverá ser acionada ao clicar em qualquer item do carrossel de categorias.

O fluxo esperado será:

```txt
Carrossel de categorias -> clique na marca -> página da marca -> produtos daquela marca


```md

Refinar a página individual do produto para corrigir o tamanho exagerado da imagem principal.

A galeria do produto deverá passar a usar todas as imagens enviadas no cadastro/upload.

A implementação deverá verificar o campo de imagens/galeria do produto e montar uma interface com:

- imagem principal;
- miniaturas clicáveis;
- troca de imagem sem recarregar;
- proporção visual controlada;
- responsividade mobile;
- aparência premium.

A imagem principal não poderá ultrapassar um tamanho visual confortável.

Ela deverá manter proporção consistente usando `object-fit`, largura máxima e altura controlada.

A descrição do produto deverá receber comportamento de “Ler mais”.

Inicialmente, a descrição deverá aparecer limitada.

Quando o usuário clicar em “Ler mais”, o texto completo deverá abrir com transição suave.

O botão também poderá alternar para:

```txt
Mostrar menos

Inicialmente será criada toda estrutura principal do projeto separando frontend e backend.

O frontend será desenvolvido utilizando React + Vite.

O backend será desenvolvido utilizando Node.js + Express.

Após criação da estrutura inicial será configurado Docker para execução completa do ambiente.

Será criado um `docker-compose.yml` responsável por subir frontend e backend simultaneamente.

Na home page será desenvolvido um hero cinematográfico fullscreen utilizando o vídeo:

```txt
frontend/assets/video_hero.mp4
```
Adicionar ação de editar produto dentro do painel admin, posicionando o botão ao lado do botão de deletar.

O botão deverá abrir modo de edição do produto ou preencher novamente o formulário admin com os dados atuais do item selecionado.

Revisar os componentes de select/dropdown do admin, pois atualmente os textos e fundos estão brancos, dificultando visualizar as opções.

Os selects precisam possuir contraste correto com dark mode premium.

O seletor de tamanhos da página de produto deverá ser transformado em um componente realmente interativo.

Os tamanhos precisam responder ao clique, destacar o tamanho selecionado e atualizar visualmente o estado ativo.

Também deverá existir hover premium nos tamanhos.

Os cards filtrados precisam manter proporção consistente após aplicação de filtros.

Atualmente as imagens estão crescendo excessivamente, quebrando o layout premium.

A grid de produtos deverá manter:

- altura consistente;
- imagens proporcionais;
- cards alinhados;
- tamanho premium;
- comportamento responsivo.

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
- Melhorar o componente do hero para transformar o vídeo principal em uma experiência cinematográfica premium.

- Revisar a lógica atual de sincronização do vídeo com o scroll, pois o vídeo está apresentando sensação de atraso quando o usuário rola a página para baixo.

- A lógica deverá ser ajustada para que o progresso do scroll controle o `video.currentTime` de forma mais precisa e fluida.

- O evento de scroll não deve executar cálculos pesados o tempo inteiro.

- A implementação deverá usar `requestAnimationFrame` para controlar a atualização do vídeo com mais performance.

- Também deverá ser feito cache dos valores de posição e altura do hero, evitando uso excessivo de `getBoundingClientRect()` durante a rolagem.

- A geometria do hero deverá ser recalculada apenas quando necessário, como em:

```txt
resize
orientationchange
loadedmetadata

Refinar completamente o painel admin para melhorar usabilidade e aparência premium.

Transformar a edição de produtos em um dropdown/modal moderno semelhante a plataformas reais de ecommerce.

O modal de edição deverá:

- abrir sem recarregar a página;
- preencher automaticamente os dados do produto;
- permitir editar imagens;
- possuir preview visual;
- possuir animações suaves;
- manter identidade visual premium.

Reestruturar o sistema de upload de imagens do backend/frontend.

O cadastro de produtos deverá aceitar até 5 imagens por produto.

As imagens deverão ser utilizadas em:

- página do produto;
- galeria premium;
- hover dos cards;
- previews no admin;
- carrossel interno do produto.

A homepage deverá ser refinada visualmente.

A seção:

```txt
Lançamentos
Seleção premium em tempo real

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

- O painel admin ainda possui alguns problemas visuais e de usabilidade que precisam ser corrigidos.

- Atualmente existe apenas o botão de excluir produto (lixeira), porém também é necessário um botão de editar produto ao lado da ação de deletar.

- Os selects/dropdowns do admin estão aparecendo totalmente brancos, impossibilitando visualizar os itens da lista ao selecionar opções.

- O seletor de tamanho do tênis na página do produto também não está funcional visualmente e aparenta estar estático.

- Os tamanhos precisam funcionar como seleção interativa premium, semelhante a ecommerce modernos de sneakers.

- Outro problema visual acontece após aplicar filtros de produtos.

- Quando o usuário filtra um tênis, a imagem do produto fica exageradamente grande, quebrando o layout premium dos cards.

- Os ajustes devem manter a identidade visual premium do ecommerce.

- O ecommerce deverá manter aparência extremamente premium inspirada em plataformas modernas de sneakers/streetwear como Droper.

As novas referências visuais adicionadas na pasta `assets/` deverão ser utilizadas como base principal para os próximos refinamentos de UI/UX.

Referências adicionadas:

```txt
assets/carrosel_categoria
assets/foter
assets/navbar


# Concrete Steps

A página/perfil individual do produto precisa ser refinada.

Atualmente a imagem do produto está aparecendo muito grande e apenas uma imagem é exibida, mesmo quando o produto possui várias fotos enviadas pelo upload.

O perfil do produto deverá exibir todas as imagens cadastradas no produto em formato de galeria premium.

A primeira imagem deverá aparecer como imagem principal e as demais deverão aparecer como miniaturas clicáveis.

Ao clicar em uma miniatura, a imagem principal deverá trocar sem recarregar a página.

A descrição do produto também precisa ser melhorada.

Descrições longas não devem ocupar espaço exagerado na tela.

A descrição deverá aparecer resumida inicialmente e possuir um botão:

```txt
Ler mais

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

- Revisar toda a responsividade do frontend, principalmente o hero, navbar e seção de produtos.

- O site atualmente ainda parece quebrado em telas de notebook, com textos muito grandes, cards apertados e seções desalinhadas.

- O componente do hero deverá ser ajustado para usar tamanhos responsivos com `clamp()`, evitando títulos gigantes em telas menores.

- A seção de lançamentos deverá ter largura máxima centralizada, espaçamento melhor e grid responsivo usando `auto-fit` ou breakpoints bem definidos.

- A navbar deverá ser adaptada para telas menores, reduzindo espaçamentos e, se necessário, escondendo links secundários ou criando menu mobile.

- O objetivo é fazer o site parecer premium em qualquer tamanho de tela, sem textos quebrados, sem cards esmagados e sem excesso de altura visual.



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
frontend/src/components/Footer.jsx
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
frontend/tests/responsive-layout.spec.js
frontend/eslint.config.js
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

Arquivos alterados nesta execução:

```txt
PLANS.MD
frontend/src/App.jsx
frontend/src/components/Footer.jsx
frontend/src/components/Navbar.jsx
frontend/src/components/ProductCard.jsx
frontend/src/pages/Admin.jsx
frontend/src/pages/Home.jsx
frontend/src/pages/ProductDetail.jsx
frontend/src/styles/app.css
assets/carrosel_categoria .png
assets/foter.png
assets/navbar.png
backend/src/controllers/categoryCarouselController.js
backend/src/database/categoryCarousel.js
backend/src/database/mysql.js
backend/src/database/seed.js
backend/src/database/store.js
backend/src/routes/categoryCarouselRoutes.js
backend/src/server.js
frontend/src/components/CategoryCarousel.jsx
frontend/src/data/products.js
frontend/src/services/api.js
frontend/src/styles/categoryCarousel.css
assets/perfil_marca.png
frontend/src/pages/BrandProfile.jsx
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
npm run build
npm run lint
Invoke-WebRequest -Uri http://localhost:5173
docker compose restart frontend
npm run test:responsive
npm run test:hero
Remove-Item -Recurse -Force -LiteralPath frontend/test-results
Get-Content -Path PLANS.MD
Get-Content -Path frontend/src/pages/Admin.jsx
Get-Content -Path frontend/src/pages/ProductDetail.jsx
Get-Content -Path frontend/src/App.jsx
Get-Content -Path frontend/src/components/Cart.jsx
Get-Content -Path frontend/src/services/api.js
rg -n "product-grid|size-grid|form-panel select|advanced-filters|admin-table|admin-actions|product-card" frontend/src/styles/app.css
npm run lint
npm run build
npm run test:hero
npm run test:responsive
git status --short
git diff --check -- frontend/src/App.jsx frontend/src/components/Cart.jsx frontend/src/pages/Admin.jsx frontend/src/pages/ProductDetail.jsx frontend/src/services/api.js frontend/src/styles/app.css PLANS.MD
git log --oneline -5
git add PLANS.MD frontend/src/App.jsx frontend/src/components/Cart.jsx frontend/src/pages/Admin.jsx frontend/src/pages/ProductDetail.jsx frontend/src/services/api.js frontend/src/styles/app.css
git commit -m "feat: aprimorar admin e selecao de tamanhos"
git add PLANS.MD
git commit --amend --no-edit
git log --oneline -1
git show --stat --oneline --name-only HEAD
Get-Content -Raw -LiteralPath PLANS.md
git status --short
rg --files
Get-Content -Raw -LiteralPath frontend/src/pages/Admin.jsx
Get-Content -Raw -LiteralPath frontend/src/pages/Home.jsx
Get-Content -Raw -LiteralPath frontend/src/components/ProductCard.jsx
Get-Content -Raw -LiteralPath frontend/src/components/Navbar.jsx
Get-Content -Raw -LiteralPath frontend/src/styles/app.css
Get-Content -Raw -LiteralPath backend/src/controllers/productController.js
Get-Content -Raw -LiteralPath backend/src/database/mysql.js
Get-Content -Raw -LiteralPath backend/src/database/seed.js
Get-Content -Raw -LiteralPath frontend/src/pages/ProductDetail.jsx
Get-Content -Raw -LiteralPath frontend/src/services/api.js
Get-Content -Raw -LiteralPath frontend/src/App.jsx
Get-Content -Raw -LiteralPath frontend/package.json
Get-Content -Raw -LiteralPath frontend/src/main.jsx
Get-Content -Raw -LiteralPath frontend/tests/responsive-layout.spec.js
Get-Content -Raw -LiteralPath frontend/tests/hero-scroll.spec.js
View image: assets/navbar.png
View image: assets/foter.png
View image: assets/carrosel_categoria .png
npm run lint
npm run build
Invoke-WebRequest -Uri http://localhost:5173
npm run test:responsive
npm run test:hero
git diff --check
git diff --stat
rg -n "Transformar edição|Permitir upload|Criar sistema|Melhorar experiência visual do formulário|Melhorar preview|Permitir remover|Melhorar UX/UI|Criar animações suaves no admin|Melhorar aparência premium|Melhorar responsividade do painel|Exibir exatamente|Criar carrossel|Refazer footer|Refinar navbar" PLANS.MD
git diff -- PLANS.MD
npm run build
npm run lint
npm run test:responsive
npm run test:hero
git diff --check
docker compose up --build -d
Invoke-WebRequest -UseBasicParsing http://localhost:5173
Invoke-RestMethod http://localhost:8080/api/category-carousel
git add .
git commit -m "feat: finalizar galeria preco e carrossel clicavel"
Get-Content PLANS.MD
npm run lint
npm run build
npm run test:responsive
npm run test:hero
git diff --check
docker compose up --build -d
Invoke-WebRequest -UseBasicParsing http://localhost:5173
Invoke-RestMethod http://localhost:8080/health
Invoke-RestMethod http://localhost:8080/api/category-carousel
git add .
git commit -m "feat: adicionar perfil de marca tema e frete"
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
frontend npm run build apos camada premium do hero: OK
frontend npm run lint apos camada premium do hero: OK
frontend npm run test:hero apos camada premium do hero: OK, 2 testes aprovados em desktop e mobile
frontend Docker apos camada premium do hero: HTTP 200
frontend npm run build apos ajuste responsivo: OK
frontend npm run lint apos ajuste responsivo: OK
frontend npm run test:hero apos ajuste responsivo: OK, 2 testes aprovados
frontend npm run test:responsive: OK, 5 testes aprovados em 390px, 768px, 1024px, 1366px e 1920px
frontend Docker apos ajuste responsivo: HTTP 200
frontend npm run build apos ajustes de admin/tamanho/cards filtrados: OK
frontend npm run lint apos ajustes de admin/tamanho/cards filtrados: OK
frontend npm run test:hero apos ajustes de admin/tamanho/cards filtrados: OK, 2 testes aprovados em desktop e mobile
frontend npm run test:responsive apos ajustes de admin/tamanho/cards filtrados: OK, 5 testes aprovados em 390px, 768px, 1024px, 1366px e 1920px
frontend npm run lint apos refinamentos admin/home/navbar/footer: OK
frontend npm run build apos refinamentos admin/home/navbar/footer: OK
frontend local em http://localhost:5173: HTTP 200
frontend npm run test:responsive apos refinamentos admin/home/navbar/footer: OK, 5 testes aprovados em 390px, 768px, 1024px, 1366px e 1920px
frontend npm run test:hero apos refinamentos admin/home/navbar/footer: OK, 2 testes aprovados em desktop e mobile
git diff --check apos refinamentos admin/home/navbar/footer: OK, apenas avisos de CRLF do Git no Windows
frontend npm run build apos galeria/preco/carrossel clicavel: OK
frontend npm run lint apos galeria/preco/carrossel clicavel: OK
frontend npm run test:responsive apos galeria/preco/carrossel clicavel: OK, 5 testes aprovados em 390px, 768px, 1024px, 1366px e 1920px
frontend npm run test:hero apos galeria/preco/carrossel clicavel: OK, 2 testes aprovados em desktop e mobile
git diff --check apos galeria/preco/carrossel clicavel: OK, apenas avisos de CRLF do Git no Windows
frontend npm run lint apos perfil de marca/tema/frete: OK
frontend npm run build apos perfil de marca/tema/frete: OK
frontend npm run test:responsive apos perfil de marca/tema/frete: OK, 5 testes aprovados em 390px, 768px, 1024px, 1366px e 1920px
frontend npm run test:hero apos perfil de marca/tema/frete: OK, 2 testes aprovados em desktop e mobile
git diff --check apos perfil de marca/tema/frete: OK, apenas avisos de CRLF do Git no Windows
docker compose up --build -d apos perfil de marca/tema/frete: OK
frontend Docker em http://localhost:5173 apos perfil de marca/tema/frete: HTTP 200
backend Docker em http://localhost:8080/health apos perfil de marca/tema/frete: OK com database mysql
backend Docker em http://localhost:8080/api/category-carousel apos perfil de marca/tema/frete: OK
```

Commit criado:

```txt
feat: criar ecommerce premium de tenis
feat: adicionar admin mysql e checkout
fix: sincronizar hero com scroll sem atraso
feat: aprimorar hero premium
fix: ajustar responsividade geral
fix: remover overlay do hero
fix: remover tom verde do hero
fix: deixar hero em autoplay lento
fix: restaurar velocidade normal do hero
feat: aprimorar admin e selecao de tamanhos
feat: refinar admin galeria homepage navbar e footer
feat: finalizar galeria preco e carrossel clicavel
feat: adicionar perfil de marca tema e frete
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

---

# 2026-05-26 - Correção dos botões de endereços do cliente

Foi corrigida a área `Meus endereços` do portal do cliente.

O botão `Cadastrar endereco` agora abre um formulário local para inclusão de novo endereço.

Os botões `Editar` e `Remover` dos cards de endereço agora funcionam:

- `Editar` carrega os dados do endereço no formulário e permite salvar alterações;
- `Remover` exclui o endereço da lista local;
- `Cancelar` fecha o formulário sem alterar os dados.

Arquivos alterados:

```txt
frontend/src/pages/CustomerPortal.jsx
frontend/src/styles/app.css
```

Validação executada:

```txt
frontend npm run lint: OK
frontend npm run build: OK
teste Playwright em /account/addresses: OK, cadastrar, editar e remover abriram/executaram como esperado
```

---

# 2026-05-27 - Botao para cadastrar cartao do cliente

Foi adicionada uma area funcional em `Meus cartoes` no portal do cliente.

O estado vazio foi substituido por um gerenciador local de cartoes com o botao `Cadastrar cartao`.

Ao clicar no botao, a tela abre um formulario para incluir:

- nome impresso;
- numero do cartao;
- validade;
- bandeira.

Depois de salvar, o cartao aparece na lista com bandeira, final do numero, titular, validade e acao para remover.

Arquivos alterados:

```txt
frontend/src/pages/CustomerPortal.jsx
frontend/src/styles/app.css
```

Validacao executada:

```txt
frontend npm run lint apos botao de cadastrar cartao: OK
frontend npm run build apos botao de cadastrar cartao: OK
docker compose up --build -d apos botao de cadastrar cartao: OK
frontend Docker em http://localhost:5173 apos botao de cadastrar cartao: HTTP 200
backend Docker em http://localhost:8080/health apos botao de cadastrar cartao: OK com database mysql
```

---

# 2026-05-27 - Ajuste de chamada dos drops premium

Foi atualizado o titulo da secao de drops na home.

Texto anterior:

```txt
Melhores drops premium para entrar no radar
```

Texto novo:

```txt
Drops exclusivos para elevar seu estilo
```

Arquivo alterado:

```txt
frontend/src/pages/Home.jsx
```

Validacao executada:

```txt
frontend npm run lint apos ajuste de chamada dos drops: OK
frontend npm run build apos ajuste de chamada dos drops: OK
docker compose up --build -d apos ajuste de chamada dos drops: OK
frontend Docker em http://localhost:5173 apos ajuste de chamada dos drops: HTTP 200
backend Docker em http://localhost:8080/health apos ajuste de chamada dos drops: OK com database mysql
```

---

# 2026-05-27 - Ajuste de chamada streetwear da vitrine

Foi atualizado o titulo da secao de selecao premium na home.

Texto anterior:

```txt
Selecao premium em tempo real
```

Texto novo:

```txt
Mais moderno/streetwear:
```

Arquivo alterado:

```txt
frontend/src/pages/Home.jsx
```

Validacao executada:

```txt
frontend npm run lint apos ajuste de chamada streetwear: OK
frontend npm run build apos ajuste de chamada streetwear: OK
docker compose up --build -d apos ajuste de chamada streetwear: OK
frontend Docker em http://localhost:5173 apos ajuste de chamada streetwear: HTTP 200
backend Docker em http://localhost:8080/health apos ajuste de chamada streetwear: OK com database mysql
```

---

# 2026-05-27 - Remocao dos dois pontos da chamada streetwear

Foi ajustado o titulo da secao na home para ficar exatamente como solicitado.

Texto final:

```txt
Mais moderno/streetwear
```

Arquivo alterado:

```txt
frontend/src/pages/Home.jsx
```

Validacao executada:

```txt
frontend npm run lint apos remocao dos dois pontos da chamada streetwear: OK
frontend npm run build apos remocao dos dois pontos da chamada streetwear: OK
docker compose up --build -d apos remocao dos dois pontos da chamada streetwear: OK
frontend Docker em http://localhost:5173 apos remocao dos dois pontos da chamada streetwear: HTTP 200
backend Docker em http://localhost:8080/health apos remocao dos dois pontos da chamada streetwear: OK com database mysql
```

