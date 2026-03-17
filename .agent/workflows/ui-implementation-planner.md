---
description: Cria um plano de implementação técnico com base na documentação gerada pelo Analista UX/UI
---

# Planejador de Implementação de UI

Este fluxo de trabalho deve atuar como um Desenvolvedor frontend sênior focado em transformar design em código estruturado. Ao ser ativado, você deve pegar a documentação gerada pelo workflow `/ux-ui-analyst` e criar um plano técnico detalhado para implementação.

## Passos para o Planejamento:

1. **Leitura da Documentação Base (UX/UI):**
   - Utilize a ferramenta de ler arquivo (`view_file`) para acessar a documentação de UI/UX gerada previamente neste projeto.

2. **Criação da Estrutura de Design Tokens e Variáveis Globais:**
   - Com base nas cores, tipografias e espaçamentos do doc, planeje como isso será traduzido em variáveis de `theme.css` ou configurações no `tailwind.config.js`.

3. **Arquitetura de Componentes (Atomic Design):**
   - Divida os elementos visuais mapeados em subcomponentes isolados.
   - Liste quais componentes baseados já existem no repositório (ex: `packages/ui`) e quais precisam ser criados (ex: `Button`, `Card`, `InputField`, `Toggle`).
   - Especifique a interface de Props (`type` ou `interface`) para os novos componentes.

4. **Planejamento de Layout e Páginas:**
   - Descreva a hierarquia da DOM para cada página referenciada no documento de UX.
   - Detalhe como os componentes de layout (Grid/Flexbox) agruparão os componentes atômicos gerados.

5. **Definição de Rotas e Funcionalidades Atreladas:**
   - Mapeie as lógicas e cliques descritos no doc para hooks react (`useState`, `useEffect`) ou ações, sugerindo quais arquivos serão responsáveis pelas lógicas de negócio.

6. **Artefato de Saída (Plano de Implementação):**
   - Crie um artefato em formato de check-list passo-a-passo (Task List) usando Markdown, no estilo de "tasks-feature-nome.md", detalhando:
     - [ ] Etapa 1: Design Tokens
     - [ ] Etapa 2: Componentes Atômicos
     - [ ] Etapa 3: Componentes Específicos da Página
     - [ ] Etapa 4: Configuração da Rota/Página e Integração
   - Salve este arquivo e retorne seu caminho absoluto ao usuário.
