# Tasks

## 1. Esqueleto e Visão Geral

- [x] 1.1 Criar `SPECIFICATION.md` na raiz do repositório com as 25 seções do template numeradas como títulos (`## 1.` a `## 25.`, mais "REGRA FINAL"), e verificar com `grep -nE "^## " SPECIFICATION.md` que as 25 seções estão presentes antes de preencher conteúdo.
- [x] 1.2 Preencher a seção "1. Visão Geral do Sistema" (objetivo, problema de negócio, público-alvo, benefícios, escopo incluído/não incluído, fluxo geral, contexto corporativo e sistemas integrados) com um diagrama Mermaid `flowchart` do fluxo Usuário → SPA → Backend (REST/GraphQL), e verificar que o bloco ```mermaid``` é sintaticamente válido (sem caracteres não fechados).

## 2. Arquitetura e Modelo de Domínio (lado cliente)

- [x] 2.1 Preencher a seção "2. Arquitetura" com a stack real (`package.json`: Vue 3, Vuex 4, Vue Router 4, Bootstrap 5, Chart.js, @vueup/vue-quill, vue-toastification, axios, graphql-request), um diagrama Mermaid da arquitetura (View → Vuex/axios/graphql-request → Backend REST+GraphQL) e a estrutura de módulos (`router/`, `store/`, `views/`, `components/`), e verificar que cada diretório citado existe em `src/`.
- [x] 2.2 Preencher a seção "5. Modelo de Domínio" descrevendo as formas de dados consumidas pelo cliente (objeto `game`, `dlc`, `category`, `code`, `ChartData`, estatísticas) a partir do que é efetivamente lido nos templates/computed das views e componentes, deixando explícito que o modelo canônico (tabelas/colunas) está documentado em `game-resume-backend/SPECIFICATION.md` seção 5/6, e verificar que nenhum campo usado em `v-for`/interpolação `{{ }}` relevante ficou de fora da descrição dos tipos usados nas telas de plataforma.

## 3. Regras de Negócio e Casos de Uso client-side

- [x] 3.1 Preencher a seção "3. Regras de Negócio" com toda regra implementada no cliente (ex.: deduplicação via `hashMap`/`SAVE_GAMES`, alternância de `finished` em `finishGame`, montagem de payload por tabela em `updateGame`/`saveGame`/`markAsPlaying`, validação de extensão `.xlsx` no input de `Import.vue`), cada uma com ID `BR-F-001`, `BR-F-002`, ... e referência `arquivo:linha`, e verificar que cada BR-F citada aponta para uma linha real do arquivo referenciado.
- [x] 3.2 Preencher a seção "4. Casos de Uso" com UC-F-001 em diante cobrindo pelo menos: listar jogos por plataforma, marcar jogo como concluído, marcar jogo como jogando, criar/editar/excluir jogo via modal, importar planilha XLSX, buscar por título, buscar por gênero, gerenciar códigos/dicas de um jogo, consultar estatísticas/gráficos, restaurar item da lixeira — cada um com atores, pré/pós-condições, fluxo principal e alternativo/exceção, e verificar que todo caso de uso referencia a view e a ação Vuex (ou chamada direta) correspondente.

## 4. Telas (views)

- [x] 4.1 Documentar na seção "8. Telas" o padrão comum de tela de listagem+CRUD (tabela de jogos + botões concluir/editar/excluir + `Modal.vue` de edição/criação), descrevendo campos, botões e comportamento do modal uma única vez como referência reutilizável.
- [x] 4.2 Documentar, na mesma seção, uma ficha por rota das 25 declaradas em `src/router/index.js`, com objetivo, URL, componente de tela, componente(s) de tabela/gráfico usados e variações específicas (endpoint consumido, `system_id`/tabela filtrada, campos extras como `magnetic_link` em `ToBuyGames` ou `collection` em `DLCGames`), e verificar com `grep -c "path:" src/router/index.js` que o número de fichas de tela bate com o número de rotas.
- [x] 4.3 Incluir diagrama Mermaid `flowchart` do fluxo de navegação a partir do menu principal (`Nav.vue`: Home, Stats [Resume/Charts/Genres/Finished Stats], To Buy, DLCs, PC Games [Origin/Steam/Ubisoft], Console Games [GameCube/Wii/WiiU/Virtual Console], Games By Genre, Search), e verificar que todo item de menu em `Nav.vue` aparece como nó no diagrama.

## 5. Integrações (contrato consumido do backend)

- [x] 5.1 Mapear na seção "10. Integrações" toda chamada REST (`axios.get/post/put/delete`) encontrada em `src/store/index.js` e nas views/componentes que chamam a API diretamente (`Import.vue`, `Codes.vue`, `Search.vue`, `GamesByGenreSearch.vue`, `FinishedOverSystem.vue`, `TrashTable.vue`), com método, URL, payload enviado e forma da resposta usada pelo código chamador.
- [x] 5.2 Mapear na mesma seção toda operação GraphQL (`graphql-request`/`gql`) encontrada nas views e tabelas que a utilizam (`GamesResume.vue`, `MyCharts.vue`, `GenresResume.vue`, `GamesByGenres.vue`, `FinishedGames.vue`, `UnfinishedGames.vue`, `SteamGamesTable.vue`, `WiiGamesTable.vue`, `WiiUGamesTable.vue`, `GameCubeGamesTable.vue`), incluindo o texto da query usada e os campos solicitados.
- [x] 5.3 Verificar cobertura completa executando `grep -rnE "axios\.(get|post|put|delete)|request\(|gql" src/` e conferindo que cada ocorrência retornada corresponde a uma entrada documentada nas tarefas 5.1/5.2, sem chamada pendente.

## 6. Segurança, Configuração e Dívida Técnica

- [x] 6.1 Preencher a seção "9. Segurança" registrando o item `AMB-F-001`: ausência de autenticação no frontend (confirmada pela busca `grep -rniE "login|token|authorization|jwt|auth" src/` sem ocorrências) versus a exigência de JWT do backend nas rotas de escrita consumidas (`/create`, `/update`, `/finished`, `/remove`, `/restore`, `/load_games`, `/import_data`, `DELETE /trash`), com link cruzado para a seção 9 de `game-resume-backend/SPECIFICATION.md`.
- [x] 6.2 Preencher a seção "12. Configurações" com as variáveis de ambiente (`.env`: `VUE_APP_BACKEND_SERVER`) e os scripts do `package.json` (`serve`, `build`, `lint`), e verificar que todo valor documentado corresponde ao conteúdo atual de `.env` e `package.json`.
- [x] 6.3 Preencher as seções "17. Testes" e "19. Dívida Técnica" registrando explicitamente a ausência de testes automatizados (nenhum script `test` em `package.json`, nenhum arquivo `*.spec.js`/`*.test.js` em `src/`) e outros débitos observados (ex.: chamadas HTTP duplicadas fora da store, ~10 componentes de tabela quase idênticos sem abstração comum), cada item com severidade e sugestão.

## 7. Seções de Referência Cruzada e Fechamento

- [x] 7.1 Preencher as seções sem aplicabilidade direta ao frontend (no mínimo "6. Banco de Dados" e "11. Processos Assíncronos") com a marcação padronizada "Não Aplicável ao frontend — ver SPECIFICATION.md do backend, seção N" apontando para a seção correspondente real do `game-resume-backend/SPECIFICATION.md`, e verificar que cada link de seção citado existe de fato no documento do backend.
- [x] 7.2 Preencher as seções finais restantes (14 Requisitos Funcionais, 15 Requisitos Não Funcionais, 16 Critérios de Aceitação em Gherkin, 18 Observabilidade, 20 Roadmap de Modernização, 21 Matriz de Rastreabilidade, 22 Glossário, 23 Anexos, 24 Histórico de Versões, 25 Aprovações) com conteúdo real derivado do código e das seções já escritas (não placeholders do template).
- [x] 7.3 Revisão final: confirmar com `grep -nE "^## " SPECIFICATION.md` que as 25 seções numeradas (mais "REGRA FINAL") estão presentes e preenchidas, e validar manualmente que o documento atende aos 10 itens da "REGRA FINAL" do template (recriação do frontend, uso por agentes de IA, fonte única da verdade) dentro do escopo frontend acordado.
