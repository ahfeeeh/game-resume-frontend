# Proposal

## Why

O `CLAUDE.md` deste repositório estabelece `SPECIFICATION.md` como a fonte única da verdade (Single Source of Truth) para toda a documentação funcional, técnica e de regras de negócio do sistema, mas esse arquivo ainda não existe no `game-resume-frontend`. O repositório irmão `game-resume-backend` já possui seu próprio `SPECIFICATION.md` completo, gerado a partir do mesmo template (`Você é um Arquiteto de Software.md` + `Specification-Driven Development.pdf`). Sem o equivalente no frontend, não há hoje nenhuma documentação formal das telas, fluxos de navegação, regras de negócio client-side e do contrato de integração (REST + GraphQL) que a SPA Vue 3 consome do backend — o que impede recriação, manutenção seguro e uso por agentes de IA conforme a Regra Final do template.

## What Changes

- Criar `SPECIFICATION.md` na raiz do `game-resume-frontend`, seguindo as 25 seções do template oficial (`Você é um Arquiteto de Software.md` / PDF), com escopo **focado no frontend**: visão geral do produto do ponto de vista do cliente, arquitetura SPA (Vue 3 + Vuex + Vue Router), telas (25 views) e componentes (30 componentes, incluindo tabelas de CRUD, modais, gráficos), fluxo de navegação, regras de negócio implementadas no cliente, modelo de dados tal como consumido (shapes de request/response), contrato de integração consumido do backend (REST + GraphQL via `graphql-request`), configuração/variáveis de ambiente, testes (ou ausência deles) e dívida técnica.
- Seções de responsabilidade exclusiva do backend (banco de dados, procedures, jobs assíncronos server-side, regras de negócio server-side) são marcadas como **Não Aplicável ao frontend**, com referência cruzada explícita para as seções correspondentes de `D:\Packsys\NetBeansProjects\game-resume-backend\SPECIFICATION.md`, evitando duplicação de conteúdo.
- Documentar explicitamente, na seção de Segurança, a ambiguidade identificada durante a análise: o backend exige JWT (`verifyJWT`/`authGuard`) na maioria das rotas de escrita (`/create`, `/update`, `/remove`, `/finished`, `/restore`, `/load_games`, `/import_data`, DELETE `/trash`), mas o código-fonte do frontend não possui nenhuma tela de login, nenhum armazenamento de token e nenhum envio de header `Authorization` em nenhuma chamada `axios`/`graphql-request` — nenhuma ocorrência de "login", "token", "jwt" ou "authorization" em `src/`.
- Nenhuma alteração de código de aplicação, nenhuma modificação de banco de dados e nenhuma operação Git é realizada nesta mudança — é uma mudança exclusivamente documental.

## Capabilities

### New Capabilities
- `frontend-specification`: estabelece o requisito de que o projeto `game-resume-frontend` mantenha um `SPECIFICATION.md` completo e atualizado, cobrindo arquitetura, telas, regras de negócio client-side e contrato de integração com o backend, como fonte única da verdade para o frontend, em conformidade com o `CLAUDE.md` e com o template de Specification-Driven Development do projeto.

### Modified Capabilities
_Nenhuma — este é o primeiro conjunto de specs formais do repositório `game-resume-frontend`._

## Impact

- **Arquivos afetados**: adição de `D:\Packsys\NetBeansProjects\game-resume-frontend\SPECIFICATION.md` (novo arquivo, raiz do repositório). Nenhum arquivo de código-fonte (`src/`) é alterado.
- **Sistemas/dependências**: nenhuma. Não há migração de banco de dados, não há alteração de API, não há commit/push (`git`) — todas essas ações são explicitamente proibidas ou condicionadas a aprovação pelo `CLAUDE.md` e não são necessárias para esta mudança.
- **Repositório relacionado**: `D:\Packsys\NetBeansProjects\game-resume-backend\SPECIFICATION.md` passa a ser referenciado (link cruzado), mas não é alterado por esta mudança.
- **Processo**: após aprovação e aplicação, este `SPECIFICATION.md` passa a ser a referência obrigatória para qualquer evolução futura do frontend, conforme `CLAUDE.md`.
