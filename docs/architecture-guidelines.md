# 🧱 Architecture Guidelines — Sala Funcionando

> Documento oficial de arquitetura do projeto  
> Stack: **Next.js 16 App Router + Server Components + Server Actions + Supabase + Prisma**  
> Monorepo: **npm workspaces** (`apps/` + `packages/`)  
> Este documento é a **fonte da verdade** arquitetural.

---

## 0. Diretiva Suprema (NÃO NEGOCIÁVEL)

> **A arquitetura existe para proteger o domínio.**

Qualquer código que:
- vaze detalhes de infraestrutura para regras de negócio
- acople o sistema a serviços externos (Supabase, OpenAI, Stripe)
- esconda complexidade atrás de "mágica"

❌ viola esta arquitetura.

---

## 1. Estilo Arquitetural

- Arquitetura em camadas
- Domínio como núcleo
- DDD tático (foco em casos de uso)

```
UI → Application → Domain → Infrastructure
```

### Regra de dependência
> **Dependências sempre apontam para dentro (em direção ao domínio)**

---

## 2. Estrutura do Projeto (Monorepo)

```txt
tea-helper/
├── package.json              # Raiz (npm workspaces)
├── tsconfig.base.json        # Config TS compartilhada
│
├── apps/
│   └── web/                  # Next.js 16 App Router
│       ├── app/              # Rotas (pages, layouts)
│       │   ├── (auth)/       # Login, cadastro
│       │   ├── (app)/        # Rotas protegidas (dashboard, protocolos, turmas)
│       │   └── layout.tsx    # Layout raiz
│       ├── lib/
│       │   ├── server-actions/   # Server Actions (mutações)
│       │   ├── factories/        # Factories para injeção de dependência
│       │   └── auth/             # Config Supabase Auth
│       └── components/       # Componentes específicos do web
│
├── packages/
│   ├── ui/                   # Design System compartilhado (web + futuro mobile)
│   │   └── src/
│   │       ├── components/   # Button, ProtocolCard, ConditionSelector, etc.
│   │       ├── tokens/       # Cores, tipografia, espaçamento
│   │       └── index.ts
│   │
│   ├── domain/               # Regras de negócio puras
│   │   └── src/
│   │       ├── entities/     # Protocolo, Turma, Aluno, HistoricoAtendimento
│   │       ├── value-objects/ # TipoCondicao, SubSituacao, NivelUrgencia
│   │       ├── ports/        # IProtocoloRepository, ITurmaRepository, IAIAdapter
│   │       ├── errors/       # ProtocoloNotFoundError, TurmaNotFoundError
│   │       └── services/     # Regras de domínio puras
│   │
│   ├── application/          # Use cases
│   │   └── src/
│   │       ├── use-cases/    # GetProtocolo, RegisterTurma, SaveHistorico, AdaptProtocolo
│   │       └── dtos/         # DTOs de entrada/saída
│   │
│   └── shared/               # Utils e tipos compartilhados
│       └── src/
│           ├── utils/
│           └── types/
│
├── prisma/
│   └── schema.prisma         # Schema do banco (Supabase/PostgreSQL)
│
├── docs/                     # PRD, briefings, documentação
└── .antigravity/             # Rules e docs para o agente
```

### Regras de dependência entre packages

| Package | Pode depender de |
|---------|------------------|
| `domain` | **Ninguém** (zona protegida) |
| `application` | `domain` |
| `shared` | **Ninguém** |
| `ui` | `shared` (apenas tipos/tokens) |
| `apps/web` | Todos os packages |

---

## 3. Domain Layer (Zona Protegida)

### Responsabilidades
- Regras de negócio (ex: validação de protocolo, lógica de memória de sala)
- Invariantes (ex: protocolo deve ter ao menos 1 etapa)
- Entidades e Value Objects
- Ports (interfaces para repositórios e serviços externos)
- Erros de domínio

### Entidades principais

| Entidade | Responsabilidade |
|----------|-----------------|
| `Protocolo` | Protocolo de orientação com etapas progressivas |
| `EtapaProtocolo` | Etapa individual: instrução, o que evitar, frases prontas |
| `Turma` | Turma do professor com características e memória |
| `Aluno` | Dados opcionais do aluno (LGPD) |
| `HistoricoAtendimento` | Registro de uso do protocolo |
| `ContatoEmergencia` | Contatos para botão HELP |

### Regras rígidas
- ❌ Sem imports de React, Next.js, Prisma, Supabase, OpenAI
- ❌ Sem IO, env, datas globais
- ❌ Sem efeitos colaterais
- ✅ Tipos puros, lógica pura, testável isoladamente

### ✅ Bom

```ts
// packages/domain/src/entities/Protocolo.ts
export class Protocolo {
  constructor(
    public readonly id: string,
    public readonly condicao: TipoCondicao,
    public readonly situacao: string,
    public readonly etapas: EtapaProtocolo[]
  ) {
    if (etapas.length === 0) {
      throw new ProtocoloSemEtapasError()
    }
  }

  getEtapa(ordem: number): EtapaProtocolo | undefined {
    return this.etapas.find(e => e.ordem === ordem)
  }

  get ultimaEtapa(): EtapaProtocolo {
    return this.etapas[this.etapas.length - 1]
  }
}
```

### ❌ Ruim

```ts
import { db } from '@/lib/db'

export async function getProtocolo(id: string) {
  return await db.protocolo.findUnique({ where: { id } })
}
```

---

## 4. Application Layer

Responsável por:
- Orquestrar casos de uso
- Resolver dependências via ports (inversão de dependência)
- Converter DTOs ↔ Entidades de domínio

**Sem regras de negócio.** Apenas coordena.

### Exemplo

```ts
// packages/application/src/use-cases/GetProtocoloUseCase.ts
export class GetProtocoloUseCase {
  constructor(private readonly protocoloRepo: IProtocoloRepository) {}

  async execute(condicao: string, situacao: string): Promise<ProtocoloDTO> {
    const protocolo = await this.protocoloRepo.findByCondicaoESituacao(condicao, situacao)
    if (!protocolo) throw new ProtocoloNotFoundError(condicao, situacao)
    return ProtocoloMapper.toDTO(protocolo)
  }
}
```

---

## 5. Next.js — Regras Oficiais

### Server Components (padrão)
- Toda page é Server Component por padrão
- Client Component (`"use client"`) apenas para interatividade (botões, formulários, estado local)

### Server Actions
> Toda mutação passa por Server Actions em `apps/web/lib/server-actions/`

Fluxo:
```
UI (client) → Server Action → Use Case (Application) → Domain → Infrastructure
```

### Exemplo

```ts
// apps/web/lib/server-actions/historico.actions.ts
"use server"

import { saveHistoricoUseCase } from "@/lib/factories/historico-factory"

export async function saveHistoricoAction(data: SaveHistoricoInput) {
  return saveHistoricoUseCase().execute(data)
}
```

### Rotas

```
apps/web/app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (app)/
│   ├── layout.tsx          # Layout protegido (auth check)
│   ├── dashboard/page.tsx  # Tela inicial: "O que está acontecendo agora?"
│   ├── protocolo/
│   │   └── [condicao]/
│   │       ├── page.tsx    # Sub-situações
│   │       └── [situacao]/
│   │           └── page.tsx # Protocolo step-by-step
│   ├── turmas/page.tsx
│   └── historico/page.tsx
└── layout.tsx              # Layout raiz (fontes, metadata)
```

---

## 6. Integrações Externas — Anti-Corruption Layer (OBRIGATÓRIO)

> **Tudo que é externo deve passar por uma ACL (adapter em infrastructure)**

| Serviço | Adapter |
|---------|---------|
| Supabase/Prisma | `PrismaProtocoloRepository`, `PrismaTurmaRepository` |
| OpenAI/LLM | `OpenAIAdapter` (implementa `IAIAdapter`) |
| Supabase Auth | `SupabaseAuthAdapter` |
| Push/SMS/WhatsApp | `NotificationAdapter` (implementa `INotificationService`) |
| Stripe | `StripeAdapter` (implementa `IPaymentGateway`) |

### Bom

```ts
export class OpenAIAdapter implements IAIAdapter {
  async adaptarProtocolo(protocolo: Protocolo, contexto: ContextoTurma): Promise<ProtocoloAdaptado> {
    const prompt = AIPromptBuilder.buildAdaptacao(protocolo, contexto)
    const response = await this.client.chat.completions.create({ ... })
    return AIMapper.toProtocoloAdaptado(response)
  }
}
```

### Ruim

```ts
// Direto no componente React - NUNCA faça isso
const response = await openai.chat.completions.create({ ... })
```

---

## 7. UI Layer

- Renderiza
- Dispara eventos
- **Não contém regra de negócio**
- Design System em `packages/ui/` para reutilização entre web e mobile

### Princípios de UI para Sala Funcionando
- **Simplicidade extrema**: professor está estressado, telas limpas
- **1 ação por vez**: protocolo step-by-step, não informativos densos
- **Legibilidade em estresse**: fontes grandes, contraste alto, frases curtas
- **Botões grandes**: tappable em celular durante situação de crise
- **Cores calmas**: azuis e verdes suaves. Vermelho APENAS para HELP

---

## 8. Fluxo de Dados

```
Professor abre o app
  ↓
Tela Inicial: "O que está acontecendo agora?"
  ↓
Seleciona condição (TEA, Down, etc.)
  ↓
Seleciona sub-situação (Crise, Fuga, etc.)
  ↓
Server Component carrega Protocolo via Use Case
  ↓
Client Component exibe etapa step-by-step
  ↓
"Mais ajuda" → próxima etapa | "Sob controle" → encerramento
  ↓
Salva Histórico via Server Action → Use Case → Repository
```

---

## 9. Anti-padrões

- ❌ Lógica de negócio em `page.tsx` ou componentes
- ❌ Acesso direto a Prisma/Supabase na UI
- ❌ Tipos do Prisma atravessando camadas (usar DTOs)
- ❌ Chamadas à OpenAI/LLM direto da UI
- ❌ Componentes sem separar Client/Server adequadamente
- ❌ Utils genéricos sem tipagem forte
- ❌ Protocolos hardcodados em componentes (devem vir do banco)
