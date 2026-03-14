---
alwaysApply: true
---

# Guideline de boas práticas — Sala Funcionando

> O projeto utiliza DDD + Clean Architecture em um **monorepo npm workspaces**.  
> Apps em `apps/`, packages em `packages/`.  
> Manter organização de camadas e separação de responsabilidades.  
> **Consulte sempre:** `docs/architecture-guidelines.md` (fonte da verdade arquitetural).

## Componentes (Design System)

- Componentes reutilizáveis ficam em `packages/ui/src/components/` (shared entre web e mobile).
- Componentes específicos do web ficam em `apps/web/components/`.
- Componentes devem ser **presentacionais** (stateless, recebem props).
- Lógica de negócio reside nos use cases (`packages/application/`), nunca nos componentes.

### Exemplo

```tsx
// packages/ui/src/components/ProtocolCard.tsx
interface ProtocolCardProps {
  instrucao: string
  oQueEvitar?: string
  frasesProntas?: string[]
  etapaAtual: number
  totalEtapas: number
}

export function ProtocolCard({ instrucao, oQueEvitar, frasesProntas, etapaAtual, totalEtapas }: ProtocolCardProps) {
  return (
    <div className="protocol-card">
      <span className="protocol-progress">{etapaAtual}/{totalEtapas}</span>
      <p className="protocol-instruction">{instrucao}</p>
      {oQueEvitar && <p className="protocol-avoid">⚠️ {oQueEvitar}</p>}
      {frasesProntas?.map((frase, i) => (
        <p key={i} className="protocol-phrase">💬 "{frase}"</p>
      ))}
    </div>
  )
}
```

## Server Components (padrão)

- Priorize busca de dados no servidor sempre que possível.
- A page deve coordenar use cases (via factories) e repassar dados para componentes.
- Client Components (`"use client"`) apenas para interatividade (botões de navegação do protocolo, formulários, estado de etapa atual).

### Exemplo de Page

```tsx
// apps/web/app/(app)/protocolo/[condicao]/[situacao]/page.tsx
import { getProtocoloUseCase } from "@/lib/factories/protocolo-factory"
import { ProtocoloStepper } from "@/components/ProtocoloStepper"

interface Props {
  params: Promise<{ condicao: string; situacao: string }>
}

export default async function ProtocoloPage({ params }: Props) {
  const { condicao, situacao } = await params
  const protocolo = await getProtocoloUseCase().execute(condicao, situacao)
  return <ProtocoloStepper protocolo={protocolo} />
}
```

## Server Actions (mutações)

> Toda mutação passa por Server Actions em `apps/web/lib/server-actions/`.

```tsx
// apps/web/lib/server-actions/historico.actions.ts
"use server"

import { saveHistoricoUseCase } from "@/lib/factories/historico-factory"

export async function saveHistoricoAction(turmaId: string, protocoloId: string, etapaAlcancada: number) {
  return saveHistoricoUseCase().execute({ turmaId, protocoloId, etapaAlcancada })
}
```

## Protocolo Step-by-Step — Guidelines específicas

### Navegação Progressiva
- Cada etapa é exibida individualmente (1 instrução por vez).
- Dois botões sempre visíveis: "Situação sob controle" e "Mais ajuda".
- O estado da etapa atual é gerenciado no Client Component (useState).
- Dados do protocolo carregados via Server Component (props).

### Modo HELP
- O botão HELP só aparece na última etapa de "Mais ajuda".
- HELP aciona Server Action → Use Case → NotificationService (ACL).
- Vermelho intenso, fonte grande, sem confirmação dupla (emergency UX).

### Encerramento
- "Situação sob controle" → dica pós-crise → opção de histórico.
- Histórico salvo via Server Action.
- Anônimo por padrão. Identificação do aluno é opcional (LGPD).

## Design Tokens

### Cores
- **Primário**: Azul suave (calma, confiança) `#4A90D9`
- **Secundário**: Verde suave (segurança) `#4CAF50`
- **HELP/Danger**: Vermelho `#E53935`
- **Background**: Branco/Cinza claro `#F8F9FA` (light), `#1A1A2E` (dark)
- **Texto**: Alto contraste `#1A1A1A` (light), `#F0F0F0` (dark)

### Tipografia
- Font family: Inter (Google Fonts) — máxima legibilidade em estresse
- Instrução de protocolo: `1.25rem` / `font-weight: 600`
- Frases prontas: `1rem` / `font-style: italic`
- Botões: `1.125rem` / `font-weight: 700`

## Padrões de Implementação

### O que fazer

- Interfaces e tipos: defina contratos claros para os ports (domínio).
- Named exports: prefira `export function Nome()` para facilitar refactoring e busca.
- Data fetching: centralize chamadas ao banco em adapters dentro de infrastructure.
- Defina classes para temas `light` e `dark`, mantendo consistência.
- Use DTOs entre camadas — nunca passe tipos do Prisma para a UI.
- Protocolos vêm do banco, nunca hardcodados em componentes.

### O que evitar

- Acoplamento de UI com Infra: nunca use Prisma, Supabase, OpenAI diretamente dentro de componentes.
- Complexidade em refs: evite `forwardRef` a menos que estritamente necessário.
- Mocking espalhado: mocks de teste dentro de `__tests__/mocks/` ou junto aos contratos de domínio.
- Textos longos nos protocolos — cada etapa deve ser legível em ≤30 segundos.
- Múltiplas ações por tela — o professor está em estresse, 1 decisão por vez.
