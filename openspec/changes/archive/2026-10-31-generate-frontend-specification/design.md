# Design

## Context

O frontend é uma SPA Vue 3 (`vue@^3.2.21`, `vue-router@4`, `vuex@4`, `vue-cli@~4.5`), sem backend próprio: toda persistência é delegada a `game-resume-backend` via HTTP, consumido de duas formas distintas no mesmo código-base:
- **REST** via `axios`, majoritariamente centralizado em `src/store/index.js` (ações Vuex `getGames`, `finishGame`, `deleteGame`, `updateGame`, `saveGame`, `markAsPlaying`), mas também chamado diretamente de várias views/componentes (`Import.vue`, `Codes.vue`, `Search.vue`, `GamesByGenreSearch.vue`, `FinishedOverSystem.vue`, `TrashTable.vue`) sem passar pela store.
- **GraphQL** via `graphql-request`, chamado diretamente de views de estatísticas/gráficos (`GamesResume.vue`, `MyCharts.vue`, `GenresResume.vue`, `GamesByGenres.vue`, `FinishedGames.vue`, `UnfinishedGames.vue`, e tabelas específicas como `SteamGamesTable.vue`, `WiiGamesTable.vue`, `WiiUGamesTable.vue`, `GameCubeGamesTable.vue`), sem passar pela store.

A estrutura é: 25 rotas (`src/router/index.js`) → 25 views (`src/views/`) → 30 componentes reutilizáveis (`src/components/`, majoritariamente tabelas por plataforma + gráficos + modal genérico). Não há testes automatizados no projeto (`package.json` não declara `test:unit`/jest/vitest), nem lint de CI configurado além de `vue-cli-service lint`.

O repositório irmão `game-resume-backend` já documentou, em seu próprio `SPECIFICATION.md`, o contrato completo das 52 rotas REST e das operações GraphQL que este frontend consome, incluindo uma seção "8. Telas → Contrato consumido pelo frontend" escrita do ponto de vista do backend. Ver `proposal.md` para a motivação e para a decisão de escopo (frontend-focused, confirmada com o usuário) de não duplicar o que já está documentado do lado do backend.

## Goals / Non-Goals

**Goals:**
- Definir a convenção de numeração e de referência cruzada para que o novo `SPECIFICATION.md` do frontend se mantenha consistente com o do backend, sem colidir ou duplicar identificadores (BR-xxx, UC-xxx, AMB-xxx, IMP-xxx, DT-xxx).
- Definir como tratar, de forma explícita e não ambígua, as seções do template de 25 seções que não se aplicam a uma SPA client-only (ex.: Banco de Dados, Processos Assíncronos server-side, Procedures).
- Definir o nível de granularidade de documentação para telas e componentes dado o volume (25 views + 30 componentes), evitando tanto a omissão de comportamento relevante quanto a repetição mecânica de padrões idênticos (ex.: as ~10 tabelas de jogos por plataforma seguem o mesmo padrão de CRUD).

**Non-Goals:**
- Não é objetivo desta mudança alterar o código-fonte do frontend, corrigir a lacuna de autenticação identificada, ou implementar qualquer funcionalidade nova — apenas documentar o comportamento observado.
- Não é objetivo reanalisar ou reescrever o `SPECIFICATION.md` do backend; ele é tratado como insumo somente leitura.
- Não é objetivo atingir 100% de paridade de formatação com o documento do backend (170KB, gerado em contexto próprio); a meta é consistência de convenções, não um clone estrutural seção por seção.

## Decisions

### D1 — Namespace próprio de identificadores
Os identificadores de regras de negócio, casos de uso, ambiguidades e dívida técnica deste documento usarão prefixo distinto do backend para evitar colisão: `BR-F-xxx` (Business Rule, Frontend), `UC-F-xxx`, `AMB-F-xxx`, `IMP-F-xxx`, `DT-F-xxx`. Alternativa considerada: continuar a numeração sequencial do backend (ex.: `BR-016` em diante) — rejeitada porque acopla os dois documentos a uma ordem de leitura/escrita sequencial entre repositórios distintos, dificultando manutenção independente.

### D2 — Tratamento de seções não aplicáveis
Toda seção do template (2.3 parcialmente, 6, 11, partes de 12/13 relativas a infraestrutura server-side) sem equivalente no frontend recebe um parágrafo padronizado: `**Não Aplicável ao frontend.** Ver [SPECIFICATION.md do backend, seção N](caminho-relativo-ou-absoluto).` seguindo o mesmo padrão já usado pelo backend na sua seção "8. Telas" (que documenta ser "N/A — backend-only" com justificativa). Isso mantém as 25 seções numeradas presentes em ambos os documentos, permitindo navegação cruzada previsível.

### D3 — Agrupamento de telas e componentes repetitivos
As ~10 views de "jogos por plataforma" (Origin, Ubisoft, Steam, Wii, WiiU, GameCube, PC, Console, VirtualConsole, ToBuy, DLC, Playing, Finished, Unfinished, All) e suas tabelas correspondentes compartilham o mesmo padrão estrutural (listar → exibir em tabela → editar via `Modal.vue` → marcar como concluído/jogando → excluir). A seção "8. Telas" documentará esse padrão comum uma única vez de forma detalhada (campos, botões, fluxo) e, para cada tela individual, apenas as variações específicas (endpoint consumido, `system_id` filtrado, campos extras como `magnetic_link` em ToBuy ou `collection` em DLC). Alternativa considerada: ficha completa e independente para cada uma das 25 telas — rejeitada por gerar repetição massiva de texto idêntico sem ganho de clareza, violando a diretriz de "sem gorduras" para manutenção futura, mas sem omitir nenhum campo ou comportamento divergente.

### D4 — Diagramas Mermaid obrigatórios
Conforme o template, serão incluídos no mínimo: (a) um `flowchart` do fluxo de navegação geral a partir de `Nav.vue`; (b) um `flowchart` ou `sequenceDiagram` do ciclo de vida de uma ação de escrita típica (ex.: editar jogo via `Modal.vue` → `updateGame` → `axios.put` → `getGames` para recarregar); (c) reaproveitamento por referência do diagrama de autenticação já presente na seção 9 do `SPECIFICATION.md` do backend, com anotação de que o frontend não implementa o lado cliente desse fluxo (ver D5).

### D5 — Documentação da lacuna de autenticação como achado central de Segurança
A ausência de qualquer lógica de autenticação no frontend (confirmada por busca exaustiva por `login`, `token`, `auth`, `jwt`, `authorization` em `src/`, sem nenhuma ocorrência) será documentada como o item `AMB-F-001` na seção 9 (Segurança), com efeito prático explícito: toda chamada de escrita do frontend (`/create`, `/update`, `/finished`, `/remove`, `/restore`, `/load_games`, `/import_data`, `DELETE /trash`) está sujeita a retornar `401` do backend em um ambiente onde `verifyJWT` de fato bloqueia requisições sem token — o comportamento atual só "funciona" hoje se o backend estiver com a proteção efetivamente contornável/ausente em runtime, o que é responsabilidade do backend documentar, não deste documento assumir. Esta mudança não propõe corrigir a lacuna (ver Non-Goals); o registro no `KNOW_ISSUES.md` de uma eventual correção fica a critério do usuário, fora do escopo desta proposta de documentação.

## Risks / Trade-offs

- **[Risco]** Volume de código a inspecionar (25 views + 30 componentes + store) pode levar a omissão de alguma regra de negócio pontual em um componente menos óbvio → **[Mitigação]** `tasks.md` decompõe a inspeção por agrupamento funcional (telas de plataforma, telas de estatística/gráfico, telas de utilidade — Import/Codes/Trash/Search) com checklist explícito de arquivos por grupo, e uma tarefa final de varredura (`grep` por `axios.`/`request(`/`gql`) para conferir cobertura total antes de finalizar.
- **[Risco]** Documento de 25 seções pode ficar com seções N/A em excesso, parecendo incompleto para quem não conhece o contexto de dois repositórios → **[Mitigação]** D2 padroniza a frase de N/A com link direto para a seção equivalente do backend, deixando claro que a informação existe, apenas em outro documento.
- **[Trade-off]** Agrupar telas repetitivas (D3) reduz redundância mas exige disciplina para não esconder uma divergência real entre duas telas aparentemente idênticas (ex.: `ToBuyGames` tem campo `magnetic_link` que as demais não têm) → mitigado exigindo que toda tabela de campos por tela liste explicitamente as colunas reais lidas do componente correspondente, não uma lista genérica copiada.

## Migration Plan

Não aplicável no sentido de deploy/rollback — é a criação de um único arquivo de documentação, sem efeito em runtime. O "rollback" é trivial (remover/reverter o arquivo). A sequência de execução (ordem de leitura de código, ordem de escrita das seções) está detalhada em `tasks.md`.
