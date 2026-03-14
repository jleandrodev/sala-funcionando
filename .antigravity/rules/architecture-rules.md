# Architecture Rules — Sala Funcionando

Este projeto segue uma arquitetura rígida de DDD + Clean Architecture em monorepo.

## Fonte da Verdade

O documento oficial de arquitetura é:

`/docs/architecture-guidelines.md`

O PRD do produto é:

`/docs/prd-sala-funcionando.md`

Todo código gerado DEVE estar em conformidade com esses documentos.

---

## Regras Obrigatórias

Ao gerar ou modificar código, o agente DEVE:

1. Identificar a camada arquitetural antes de escrever código:
   - `packages/domain/` — regras de negócio puras
   - `packages/application/` — use cases, orquestração
   - `packages/ui/` — componentes visuais compartilhados
   - `packages/shared/` — utils e tipos
   - `apps/web/app/` — rotas Next.js
   - `apps/web/lib/` — server actions, factories, infra local
   - `apps/web/components/` — componentes específicos do web
2. Respeitar a direção de dependência (sempre para dentro, em direção ao domínio)
3. Nunca colocar regras de negócio fora de `packages/domain/`
4. Criar Anti-Corruption Layer (adapter) para:
   - Banco de dados (Supabase/Prisma)
   - IA (OpenAI, Anthropic, ou similar)
   - Notificações (push, SMS, WhatsApp para botão HELP)
   - Auth providers (Supabase Auth)
   - Pagamentos (Stripe ou similar)
5. Usar Server Actions (`apps/web/lib/server-actions/`) para todas as mutações
6. Preferir código explícito sobre abstrações mágicas
7. Usar DTOs para transferir dados entre camadas (nunca passar tipos Prisma para UI)
8. Parar e deixar um comentário se uma regra for violada

---

## Hard Stops

O agente NÃO DEVE:

- Acessar banco de dados (Prisma/Supabase) a partir de React components
- Chamar APIs externas (OpenAI, Stripe, etc.) diretamente da UI ou do domínio
- Importar Next.js, React, Prisma ou Supabase dentro de `packages/domain/`
- Ignorar a camada Application para chamar domain diretamente de pages
- Reutilizar tipos externos (Prisma types, Supabase types) internamente — usar DTOs
- Hardcodar conteúdo de protocolos em componentes (devem vir do banco)
- Fazer chamadas à IA diretamente do client — deve passar por Server Action → Use Case → IAAdapter

---

## Regras de Protocolo (Fluxo Step-by-Step)

- O protocolo é carregado via Server Component (dados do banco)
- A navegação entre etapas é Client Component (estado local: etapa atual)
- Cada etapa exibe: instrução, o que evitar, frases prontas
- Botões "Situação sob controle" e "Mais ajuda" controlam a navegação
- O botão HELP só aparece na última etapa
- Histórico é salvo via Server Action ao encerrar

---

## Regras de Design System

- Componentes compartilhados ficam em `packages/ui/`
- Devem ser framework-agnostic quando possível (pensando no futuro React Native)
- Usar design tokens de `packages/ui/src/tokens/` para cores, tipografia, espaçamentos
- Componentes específicos do web ficam em `apps/web/components/`

---

## Regras de Dados e LGPD

- Dados de aluno são opcionais e requerem consentimento
- Histórico anônimo é o padrão (identifica turma, não aluno)
- Dados sensíveis (nome do aluno, condição) devem ser tratados com cuidado
- Nunca expor dados de alunos em logs ou URLs

---

## Enforcement

Se uma requisição viola a arquitetura:
- NÃO gere o código
- Explique o motivo da violação
- Sugira uma alternativa que respeite a arquitetura
