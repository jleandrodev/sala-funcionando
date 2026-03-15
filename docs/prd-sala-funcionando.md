# PRD — Sala Funcionando (MVP)

> **Versão:** 1.0  
> **Data:** 2026-03-14  
> **Status:** Draft

---

## 1. Introdução / Visão Geral

O **Sala Funcionando** é um aplicativo de apoio prático ao professor, criado para ajudá-lo a manter a rotina da sala de aula funcionando em situações difíceis do dia a dia. Não é curso, não é PDF, não é teoria — é uma **ferramenta de ação imediata**, pensada para ser usada durante a aula, inclusive em momentos de estresse.

### Problema Central

> *"O que eu faço agora para não perder a sala?"*

Professores enfrentam situações diárias como crises de alunos com TEA, salas agitadas, transições caóticas, e se sentem inseguros e sozinhos. Não existe ferramenta prática que os ajude **no momento real da sala**.

### Frase-Síntese

> *"Não estamos criando conteúdo. Estamos criando uma ferramenta de apoio real para o professor no meio da aula."*

---

## 2. Objetivos

| # | Objetivo | Métrica |
|---|----------|---------|
| O1 | Oferecer protocolos práticos de ação em ≤30 segundos de leitura | Tempo médio de leitura do protocolo < 30s |
| O2 | Reduzir a insegurança do professor em situações de crise | NPS do professor > 8 |
| O3 | Criar retenção através de uso frequente e percepção de valor | Retenção D7 > 40% |
| O4 | [Post-MVP] Validar o modelo de assinatura com professores individuais | ≥100 assinantes pagantes em 3 meses |
| O5 | Memorizar contexto de turma para personalizar sugestões | ≥60% dos usuários ativos cadastram ao menos 1 turma |

---

## 3. Histórias do Usuário

### H1 — Protocolo de Emergência
> Como professor, quando um aluno com TEA entra em crise durante a aula, quero abrir o app e receber orientações passo a passo claras e imediatas, para que eu saiba exatamente o que fazer sem perder o controle da sala.

### H2 — Escolha da Situação
> Como professor, ao abrir o app, quero ver a pergunta "O que está acontecendo agora?" com opções claras de situações (crise, sala agitada, transição, etc.), para encontrar ajuda relevante em menos de 2 toques.

### H3 — Fluxo Step-by-Step
> Como professor em uma situação de crise, quero receber orientações uma por vez com botões "Situação sob controle" e "Mais ajuda", para que eu possa agir progressivamente sem me sentir sobrecarregado.

### H4 — Memória de Sala
> Como professor com múltiplas turmas, quero cadastrar minhas turmas (Sala A, Sala B) e que o app lembre quais protocolos funcionaram melhor para cada uma, para receber sugestões adaptadas.

### H5 — [Post-MVP] Adaptação com IA
> Como professor, quero poder pedir "Adaptar para minha turma" e receber o protocolo ajustado à faixa etária, tamanho da turma e presença de alunos com necessidades especiais.

### H6 — Modo Segurança (HELP)
> Como professor em uma situação crítica que não consigo controlar, quero acionar um botão HELP que envie uma mensagem pré-definida para a direção, pedagoga e pais, para que eu receba ajuda presencial rapidamente.

### H7 — Histórico
> Como professor, após gerenciar uma situação, quero poder registrar um histórico (anônimo ou identificado por aluno) para acompanhar padrões ao longo do tempo.

### H8 — Múltiplas Condições
> Como professor, quero acessar protocolos não apenas para TEA, mas também para Down, Altas Habilidades, Hiperatividade, seguindo o mesmo padrão de navegação.

---

## 4. Requisitos Funcionais

### 4.1 Tela Inicial — "O que está acontecendo agora?"
- **RF01**: O app deve exibir na tela inicial a pergunta "O que está acontecendo agora?" com botões de categorias de condições (TEA, Down, Altas Habilidades, Hiperativo, etc.)
- **RF02**: Cada categoria deve exibir sub-situações relevantes (ex: TEA → Crise, Dificuldade de Compreensão, Rotina Previsível, Interação Social, Sensibilidade Sensorial, Transição entre Atividades, Fuga da Sala)
- **RF03**: A navegação deve permitir chegar ao protocolo em no máximo 2 toques

### 4.2 Protocolos Step-by-Step
- **RF04**: Cada situação deve apresentar um protocolo com orientações progressivas (uma por vez)
- **RF05**: Cada etapa do protocolo deve conter: instrução principal (ação prática), o que evitar (quando aplicável), frases prontas para usar (quando aplicável)
- **RF06**: Cada etapa deve exibir dois botões: "Situação sob controle" e "Mais ajuda"
- **RF07**: "Mais ajuda" avança para a próxima etapa do protocolo
- **RF08**: "Situação sob controle" pula para a etapa de encerramento (feedback + histórico)
- **RF09**: Todo texto de protocolo deve ser legível em ≤30 segundos

### 4.3 Modo Segurança (HELP)
- **RF10**: Na última etapa de "Mais ajuda", o app deve exibir um botão "HELP"
- **RF11**: O botão HELP deve enviar uma mensagem pré-definida para contatos configurados (direção, pedagoga, pais)
- **RF12**: A mensagem NÃO chama polícia, NÃO grava áudio, NÃO gera pânico
- **RF13**: Após resolução, o app pode enviar mensagem de "situação gerenciada com sucesso" (opcional, configurável)

### 4.4 Encerramento e Histórico
- **RF14**: Após "Situação sob controle", exibir dica pós-crise (ex: "Evite o reforço da crise")
- **RF15**: Perguntar: "Gostaria de criar um histórico personalizado para este aluno?"
- **RF16**: Se SIM: abrir formulário simples para identificar o aluno e registrar o histórico (considerar LGPD)
- **RF17**: Se NÃO: registrar histórico anônimo com: sala, tipo de situação, data, até qual etapa o app foi usado
- **RF18**: Históricos devem ser armazenados de forma segura e acessíveis pelo professor

### 4.5 Memória de Sala / Turmas
- **RF19**: O professor pode cadastrar múltiplas turmas (ex: "1º Ano A", "1º Ano B")
- **RF20**: O app memoriza características de cada turma
- **RF21**: O app lembra quais protocolos foram mais utilizados/efetivos por turma
- **RF22**: As sugestões são ajustadas automaticamente com base no histórico da turma

### 4.6 [Post-MVP] Adaptação com IA
- **RF23**: Em qualquer etapa do protocolo, o professor pode tocar "Adaptar para minha turma"
- **RF24**: A IA ajusta o protocolo considerando: faixa etária, tamanho da turma, presença de aluno com TEA/NEE, histórico da sala
- **RF25**: A IA não gera textos longos — apenas adapta ações práticas e frases prontas
- **RF26**: A adaptação deve retornar em ≤3 segundos

### 4.7 [Post-MVP] Autenticação e Assinatura
- **RF27**: O professor deve poder criar uma conta (email/senha ou login social)
- **RF28**: Modelo de assinatura acessível (plano mensal e anual)
- **RF29**: Período de teste gratuito para validação

### 4.8 Conteúdo para MVP
- **RF30**: Protocolos completos para TEA: Crise (Meltdown), Dificuldade de Compreensão, Rotina Previsível, Interação Social, Sensibilidade Sensorial, Transição entre Atividades, Fuga da Sala
- **RF31**: Estrutura preparada para adicionar outras condições (Down, Altas Habilidades, Hiperativo) no mesmo padrão

---

## 5. Não-Objetivos (Fora do Escopo do MVP)

- ❌ Plataforma de cursos ou conteúdos educacionais longos
- ❌ Material acadêmico ou teórico
- ❌ Sistema de planejamento de aula
- ❌ Certificações
- ❌ Marketplace
- ❌ Personalizações complexas de protocolos
- ❌ Licenças institucionais para escolas/redes de ensino (futuro)
- ❌ App mobile nativo (futuro — será PWA ou React Native)
- ❌ Protocolos completos para Down, Altas Habilidades, Hiperativo (estrutura pronta, conteúdo pós-MVP)
- ❌ Integração com sistemas escolares (diário de classe, etc.)
- ❌ **Integração com IA (removido do MVP)**
- ❌ **Meios de Pagamento e Assinaturas (removido do MVP)**

---

## 6. Considerações de Design

### 6.1 Princípios de UX

- **Simplicidade extrema**: O professor está estressado. Telas limpas, 1 ação por vez
- **Legibilidade em estresse**: Fontes grandes, contraste alto, frases curtas
- **Acessibilidade**: Botões grandes, tappable em celular, sem gestos complexos
- **Velocidade**: Carregar protocolo em <1s, IA em <3s

### 6.2 Paleta Visual Sugerida

- Cores calmas (azuis suaves, verdes) para transmitir calma
- Vermelho/laranja APENAS para o botão HELP
- Modo escuro disponível
- Tipografia: Inter ou similar (legibilidade máxima)

### 6.3 Design System

O Design System será mantido em `packages/ui/` e compartilhado entre web e futuro mobile:
- **Tokens**: cores, tipografia, espaçamento, radianos
- **Componentes**: Button (primário, secundário, HELP), Card (protocolo step), StatusBadge, ProgressIndicator

### 6.4 Fluxo Principal (Wireframe Conceitual)

```
[Tela Inicial]
"O que está acontecendo agora?"
  ├── [TEA] → Sub-situações → Protocolo Step 1
  ├── [Down] → (futuro)
  ├── [Altas Habilidades] → (futuro)
  └── [Hiperativo] → (futuro)

[Protocolo Step N]
 ┌─────────────────────────────────┐
 │  Instrução prática clara        │
 │  (legível em <30s)              │
 │                                 │
 │  [Situação sob controle]        │
 │  [Mais ajuda]                   │
 └─────────────────────────────────┘

[Última Etapa]
 ┌─────────────────────────────────┐
 │  Acione ajuda presencial        │
 │                                 │
 │  [🚨 HELP]                      │
 └─────────────────────────────────┘

[Encerramento]
 ┌─────────────────────────────────┐
 │  Dica pós-crise                 │
 │  "Criar histórico?"             │
 │                                 │
 │  [SIM]  [NÃO]                   │
 └─────────────────────────────────┘
```

---

## 7. Considerações Técnicas

### 7.1 Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend Web | Next.js 16 (App Router, RSC) |
| Mobile (futuro) | React Native / Expo |
| Design System | `packages/ui/` (monorepo) |
| Banco de Dados | Supabase (PostgreSQL) |
| ORM | Prisma |
| Auth | Supabase Auth |
| IA | OpenAI API (ou similar) via ACL |
| Pagamentos | Stripe (ou similar) via ACL |
| Monorepo | npm workspaces |

### 7.2 Arquitetura

- **DDD + Clean Architecture** em monorepo
- Domain: regras de negócio puras (sem dependência de framework)
- Application: use cases orquestram lógica
- Infrastructure: adapters para Supabase/Prisma, IA, notificações
- UI: componentes presentacionais, Server Components por padrão

### 7.3 Dados Principais

```
Turma { id, professorId, nome, faixaEtaria, tamanho, alunosNEE, createdAt }
Protocolo { id, condicao, subSituacao, etapas[], versao }
EtapaProtocolo { id, protocoloId, ordem, instrucao, oQueEvitar, frasesProntas }
HistoricoAtendimento { id, turmaId, protocoloId, etapaAlcancada, helpAcionado, alunoId?, data }
Aluno { id, turmaId, nome?, condicao?, observacoes?, createdAt } // LGPD
ContatoEmergencia { id, professorId, tipo, nome, telefone, email }
```

### 7.4 Integrações Externas (via ACL)

- **Supabase**: DB + Auth + Realtime (para notificações HELP)
- **OpenAI/LLM**: Adaptação de protocolos com IA
- **Push Notifications**: Para botão HELP
- **Stripe**: Pagamentos de assinatura

### 7.5 LGPD

- Dados de aluno são opcionais e requerem consentimento
- Histórico anônimo é o padrão
- Dados sensíveis (nome do aluno, condição) criptografados
- Política de privacidade obrigatória no onboarding

---

## 8. Métricas de Sucesso

| Métrica | Meta (3 meses) |
|---------|-----------------|
| Usuários cadastrados | ≥500 |
| Assinantes pagantes | ≥100 |
| Retenção D7 | >40% |
| Protocolos acessados/dia | >3 por usuário ativo |
| NPS | >8 |
| Botão HELP acionado com sucesso | 100% de entrega |
| Tempo de carregamento do protocolo | <1s |

---

## 9. Questões Abertas

| # | Questão | Impacto |
|---|---------|---------|
| Q1 | Qual será o modelo exato de preços (mensal/anual)? Valores? | Monetização |
| Q2 | Quem produzirá o conteúdo dos protocolos? Especialistas em educação especial? | Conteúdo |
| Q3 | O botão HELP usará qual canal de notificação? SMS, WhatsApp, Push, Email? | Infraestrutura |
| Q4 | Como tratar LGPD para menores de idade (dados de alunos)? Consentimento dos pais? | Legal |
| Q5 | A IA de adaptação será síncrona (espera resposta) ou assíncrona (pré-processa)? | UX + Custo |
| Q6 | Haverá curadoria editorial dos protocolos ou serão gerados por IA? | Conteúdo + Confiança |
| Q7 | Os protocolos terão versionamento (atualização ao longo do tempo)? | Dados |
| Q8 | PWA no MVP ou apenas web responsivo? | Mobile experience |
