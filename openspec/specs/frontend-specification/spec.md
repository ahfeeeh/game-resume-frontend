# frontend-specification Specification

## Purpose

Garante que o repositório `game-resume-frontend` possua uma especificação funcional, técnica e arquitetural completa e auditável (`SPECIFICATION.md`), reverso-engenheirada a partir do código-fonte da SPA, servindo como fonte única da verdade para o frontend conforme exigido pelo `CLAUDE.md` do projeto.

## Requirements

### Requirement: Estrutura completa conforme template SDD
O repositório SHALL conter um arquivo `SPECIFICATION.md` na raiz, endereçando as 25 seções do template oficial de Specification-Driven Development definido em "Você é um Arquiteto de Software.md" / "Specification-Driven Development.pdf". Toda seção não aplicável ao escopo de frontend (ex.: banco de dados, procedures, jobs assíncronos server-side) MUST ser explicitamente marcada como "Não Aplicável ao frontend" com referência cruzada para a seção correspondente de `game-resume-backend/SPECIFICATION.md`, em vez de omitida ou deixada em branco.

#### Scenario: Revisão do documento contra o template
- **WHEN** um revisor confere `SPECIFICATION.md` seção a seção contra as 25 seções do template (Visão Geral, Arquitetura, Regras de Negócio, Casos de Uso, Modelo de Domínio, Banco de Dados, APIs, Telas, Segurança, Integrações, Processos Assíncronos, Configurações, Logs e Auditoria, Requisitos Funcionais, Requisitos Não Funcionais, Critérios de Aceitação, Testes, Observabilidade, Dívida Técnica, Roadmap, Matriz de Rastreabilidade, Glossário, Anexos, Histórico de Versões, Aprovações)
- **THEN** cada uma das 25 seções está presente e preenchida com conteúdo específico do frontend, ou contém a marcação explícita "Não Aplicável ao frontend" com link para a seção equivalente do `SPECIFICATION.md` do backend

### Requirement: Cobertura de todas as telas e do fluxo de navegação
`SPECIFICATION.md` SHALL documentar, na seção "8. Telas", cada uma das rotas declaradas em `src/router/index.js` (todas as entradas de `routes`) como uma ficha de tela, contendo objetivo, URL, componentes/tabelas utilizados e dados exibidos, além de um diagrama Mermaid (`flowchart`) do fluxo de navegação entre telas a partir do menu principal (`Nav.vue`).

#### Scenario: Checagem de cobertura de rotas
- **WHEN** um revisor lista as rotas em `src/router/index.js` e as compara com as fichas de tela da seção 8 de `SPECIFICATION.md`
- **THEN** toda rota nomeada em `routes` possui uma ficha de tela correspondente, sem rota órfã sem documentação

### Requirement: Contrato de integração com o backend documentado
`SPECIFICATION.md` SHALL documentar, na seção "10. Integrações" (ou seção de APIs equivalente ao contexto de um consumidor), cada chamada ao backend identificada no código-fonte (via `axios` em `src/store/index.js` e nas views/componentes, e via `graphql-request`/`gql` nas views que o utilizam), incluindo método HTTP ou operação GraphQL, URL/endpoint, forma do payload enviado e forma da resposta esperada tal como o código a consome (não a implementação do backend).

#### Scenario: Checagem de cobertura de chamadas de API
- **WHEN** um revisor busca por `axios.`, `request(` e `gql` em todo o diretório `src/`
- **THEN** toda chamada encontrada corresponde a uma entrada documentada na seção de integrações de `SPECIFICATION.md`, com método/operação, payload e resposta descritos

### Requirement: Regras de negócio client-side documentadas
`SPECIFICATION.md` SHALL registrar, na seção "3. Regras de Negócio", toda regra de negócio implementada no lado do cliente, incluindo no mínimo: deduplicação de jogos por `app_id`/`id` via `Map` em `SAVE_GAMES` (`src/store/index.js`), a lógica de alternância do campo `finished` em `finishGame`, e a montagem de payload específica por tabela (`tobuy`, `virtualconsole`, `dlcs`, padrão) em `updateGame`.

#### Scenario: Regra de deduplicação documentada com origem rastreável
- **WHEN** um revisor consulta a seção "3. Regras de Negócio" de `SPECIFICATION.md` em busca da regra de deduplicação de jogos
- **THEN** encontra uma entrada que referencia `SAVE_GAMES`/`hashMap` em `src/store/index.js`, descreve a condição (`app_id` quando presente, senão `id`, exceto para a tabela `dlcs`) e o efeito observável (jogos duplicados são sobrescritos no `Map`, mantendo apenas a última ocorrência)

### Requirement: Ambiguidades e comportamento implícito documentados
`SPECIFICATION.md` SHALL registrar explicitamente, na seção de Segurança (e em qualquer outra seção pertinente), toda ambiguidade ou comportamento implícito identificado durante a análise do código-fonte do frontend, incluindo no mínimo a ausência total de fluxo de autenticação (sem tela de login, sem armazenamento de token, sem header `Authorization` em qualquer chamada) em contraste com o `SPECIFICATION.md` do backend, que exige JWT (`verifyJWT`/`authGuard`) na maioria das rotas de escrita consumidas pelo frontend (`/create`, `/update`, `/remove`, `/finished`, `/restore`, `/load_games`, `/import_data`, `DELETE /trash`).

#### Scenario: Lacuna de autenticação registrada como ambiguidade
- **WHEN** um revisor consulta a seção "9. Segurança" de `SPECIFICATION.md`
- **THEN** encontra um item de ambiguidade/comportamento implícito descrevendo que o frontend não implementa nenhuma autenticação (login, token, header `Authorization`) apesar de o backend exigir JWT nas rotas de escrita que o frontend consome, com referência cruzada à seção 9 de `SPECIFICATION.md` do backend
