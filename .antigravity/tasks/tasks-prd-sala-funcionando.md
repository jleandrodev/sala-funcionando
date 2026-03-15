# Tasks — PRD Sala Funcionando (MVP)

> Baseado em: `docs/prd-sala-funcionando.md`  
> Formato: Tarefas pai + sub-tarefas acionáveis

---

## Arquivos Relevantes

- `apps/web/app/page.tsx` — Tela inicial ("O que está acontecendo agora?")
- `apps/web/app/layout.tsx` — Layout raiz do app web
- `apps/web/app/(auth)/login/page.tsx` — Tela de login
- `apps/web/app/(auth)/register/page.tsx` — Tela de cadastro
- `apps/web/app/(app)/dashboard/page.tsx` — Dashboard do professor
- `apps/web/app/(app)/protocolo/[condicao]/[situacao]/page.tsx` — Protocolo step-by-step
- `apps/web/app/(app)/turmas/page.tsx` — Gerenciamento de turmas
- `apps/web/app/(app)/historico/page.tsx` — Histórico de atendimentos
- `apps/web/lib/server-actions/protocolo.actions.ts` — Server Actions de protocolos
- `apps/web/lib/server-actions/turma.actions.ts` — Server Actions de turmas
- `apps/web/lib/server-actions/historico.actions.ts` — Server Actions de histórico
- `packages/ui/src/components/Button.tsx` — Componente Button (primário, secundário, HELP)
- `packages/ui/src/components/ProtocolCard.tsx` — Card de etapa do protocolo
- `packages/ui/src/components/ConditionSelector.tsx` — Seletor de condição
- `packages/ui/src/components/SituationSelector.tsx` — Seletor de sub-situação
- `packages/ui/src/tokens/colors.ts` — Design tokens de cores
- `packages/ui/src/tokens/typography.ts` — Design tokens de tipografia
- `packages/domain/src/entities/Protocolo.ts` — Entidade Protocolo
- `packages/domain/src/entities/Turma.ts` — Entidade Turma
- `packages/domain/src/entities/Aluno.ts` — Entidade Aluno
- `packages/domain/src/entities/HistoricoAtendimento.ts` — Entidade Histórico
- `packages/domain/src/value-objects/TipoCondicao.ts` — Value Object condição (TEA, Down, etc.)
- `packages/domain/src/value-objects/NivelUrgencia.ts` — Value Object nível de urgência
- `packages/domain/src/ports/IProtocoloRepository.ts` — Port repositório de protocolos
- `packages/domain/src/ports/ITurmaRepository.ts` — Port repositório de turmas
- `packages/domain/src/ports/IHistoricoRepository.ts` — Port repositório de histórico
- `packages/application/src/use-cases/GetProtocoloUseCase.ts` — Buscar protocolo por condição + situação
- `packages/application/src/use-cases/RegisterTurmaUseCase.ts` — Cadastrar turma
- `packages/application/src/use-cases/SaveHistoricoUseCase.ts` — Salvar histórico de atendimento
- `packages/application/src/use-cases/AdaptProtocoloUseCase.ts` — Adaptar protocolo com IA
- `packages/application/src/use-cases/SendHelpAlertUseCase.ts` — Enviar alerta HELP
- `packages/database/prisma/schema.prisma` — Schema Prisma (Supabase)

---

## Tarefa 1: Setup de Infraestrutura e Banco de Dados

- [x] 1.1 Instalar e configurar Prisma no monorepo
- [x] 1.2 Configurar conexão com Supabase (variáveis de ambiente)
- [x] 1.3 Criar schema Prisma com tabelas: `Professor`, `Turma`, `Aluno`, `Protocolo`, `EtapaProtocolo`, `HistoricoAtendimento`, `ContatoEmergencia`
- [x] 1.4 Rodar migration inicial
- [x] 1.5 Criar adapter Prisma em infrastructure (implementa ports do domínio)
- [x] 1.6 Configurar Supabase Auth (email/senha + login social)
- [x] 1.7 Seedar banco com protocolos de TEA (Script executado: `npm run db:seed`)

---

## Tarefa 2: Design System (`packages/ui`)

- [x] 2.1 Definir design tokens: paleta de cores (calmas + HELP vermelho), tipografia (Inter), espaçamentos, border-radius
- [x] 2.2 Criar componente `Button` (variantes: primary, secondary, danger/HELP, ghost)
- [x] 2.3 Criar componente `ProtocolCard` (card de etapa com instrução, avisos, frases)
- [x] 2.4 Criar componente `ConditionSelector` (grid de botões para condições)
- [x] 2.5 Criar componente `SituationSelector` (lista de sub-situações)
- [x] 2.6 Criar componente `ProgressIndicator` (indicador de progresso no protocolo)
- [x] 2.7 Criar componente `FormField` (input simples para formulários)
- [x] 2.8 Criar componente `AlertBanner` (banners de confirmação, erro, sucesso)
- [x] 2.9 Exportar tudo via `src/index.ts`

---

## Tarefa 3: Domain & Application Layer

- [x] 3.1 Criar entidade `Protocolo` com métodos de domínio
- [x] 3.2 Criar entidade `Turma` com memória de sala
- [x] 3.3 Criar entidade `Aluno` (dados opcionais, LGPD)
- [x] 3.4 Criar entidade `HistoricoAtendimento`
- [x] 3.5 Criar value objects: `TipoCondicao`, `SubSituacao`, `NivelUrgencia`
- [x] 3.6 Criar ports: `IProtocoloRepository`, `ITurmaRepository`, `IHistoricoRepository`, `IAIAdapter`, `INotificationService`, `IProfessorRepository`
- [x] 3.7 Criar erros de domínio: `ProtocoloNotFoundError`, `TurmaNotFoundError`
- [x] 3.8 Criar use case `GetProtocoloUseCase` (buscar protocolo por condição + situação)
- [x] 3.9 Criar use case `RegisterTurmaUseCase`
- [x] 3.10 Criar use case `SaveHistoricoUseCase`
- [ ] 3.11 [Post-MVP] Criar use case `AdaptProtocoloUseCase` (chama IAAdapter)
- [x] 3.12 Criar use case `SendHelpAlertUseCase` (chama NotificationService)

---

## Tarefa 4: Fluxo Principal Web (Next.js)

- [x] 4.1 Configurar layout raiz com fontes, metadata, tema (cores calmas)
- [x] 4.2 Criar tela inicial: "O que está acontecendo agora?" com grid de condições
- [x] 4.3 Criar página de sub-situações para cada condição (ex: TEA → lista de 7 situações)
- [x] 4.4 Criar página de protocolo step-by-step com navegação progressiva
- [x] 4.5 Implementar lógica "Situação sob controle" → encerramento
- [x] 4.6 Implementar lógica "Mais ajuda" → próxima etapa
- [x] 4.7 Implementar última etapa com botão HELP
- [x] 4.8 Criar tela de encerramento (dica pós-crise + opção de histórico)
- [x] 4.9 Criar formulário de histórico (simples, identificação opcional do aluno)
- [x] 4.10 Criar Server Actions para protocolo, histórico, e HELP
- [ ] 4.11 [Post-MVP] Implementar botão "Adaptar para minha turma" com chamada à IA

---

## Tarefa 5: Memória de Sala e Turmas

- [x] 5.1 Criar tela de gerenciamento de turmas (CRUD)
- [x] 5.2 Implementar cadastro de turma (nome, faixa etária, tamanho, alunos NEE)
- [x] 5.3 Implementar associação de históricos à turma
- [x] 5.4 Implementar lógica de "memória" — quais protocolos funcionaram por turma
- [x] 5.5 Ajustar sugestões de protocolo baseado no histórico da turma

---

## Tarefa 6: Autenticação

- [x] 6.1 Configurar Supabase Auth no Next.js (middleware de proteção de rotas)
- [x] 6.2 Criar tela de login (email/senha)
- [x] 6.3 Criar tela de cadastro
- [x] 6.4 Implementar proteção de rotas (rotas (app) protegidas, landing page pública)
- [ ] 6.5 [Post-MVP] Configurar integração com Stripe (ou similar) para assinatura (ACL)
- [ ] 6.6 [Post-MVP] Criar tela de planos e checkout

---

## Tarefa 7: Polish e Validação

- [x] 7.1 Responsividade completa (mobile-first, o app será usado no celular em sala)
- [x] 7.2 Modo escuro
- [x] 7.3 Loading states e skeleton screens
- [x] 7.4 Error boundaries e tratamento de erros amigáveis
- [x] 7.5 SEO e meta tags
- [ ] 7.6 Testes unitários para use cases do domínio
- [ ] 7.7 Testes de integração para Server Actions
- [ ] 7.8 Lighthouse audit (performance, accessibility)
- [x] 7.9 Revisão de LGPD (consentimento, política de privacidade)

---

## Notas

- **Prioridade MVP**: Tarefas 1-4 são essenciais para o MVP. Tarefas 5 e 7 podem ser feitas iterativamente. IA e Pagamentos foram removidos do MVP.
- **Conteúdo dos Protocolos**: O conteúdo de cada etapa dos protocolos de TEA precisa ser curado por especialistas. O app fornece a estrutura; o conteúdo pode ser seedado inicialmente e refinado.
- **Node.js**: O projeto requer Node.js ≥20.9.0 para Next.js 16. Atualizar o ambiente de desenvolvimento.
- **Design System**: Os componentes em `packages/ui/` devem ser construídos pensando em compartilhamento futuro com React Native (evitar APIs web-only quando possível).
- **Ajuste MVP**: IA e Métodos de Pagamento foram removidos para agilizar o lançamento inicial.
