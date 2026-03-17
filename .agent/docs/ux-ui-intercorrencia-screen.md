# Documentação UX/UI — Tela de Seleção de Intercorrência com Aluno

> Gerado via workflow `ux-ui-analyst.md` com base na imagem de referência.

---

## 1. Esquema de Cores

| Elemento                           | Cor (aproximada)  | Uso                                      |
|------------------------------------|-------------------|------------------------------------------|
| Header / Navbar                    | `#3A3A3A` (cinza escuro) | Fundo do cabeçalho                 |
| Texto do header                    | `#FFFFFF`         | Nome do professor                        |
| Fundo da tela                      | `#FFFFFF`         | Área de conteúdo principal               |
| Card — TEA                         | `#2196F3` (azul)  | Destaque principal / condição TEA        |
| Card — Dislexia                    | `#F2C9B0` (salmão claro) | Condição Dislexia                  |
| Card — Altas Habilidades           | `#9C27B0` (roxo/magenta) | Condição Altas Habilidades         |
| Card — TDAH                        | `#CDDC39` (verde-amarelado) | Condição TDAH                    |
| Card — Deficiência Intelectual Leve| `#26C6DA` (ciano/teal) | Condição DI Leve                    |
| Ícone de aviso                     | `#FFC107` (amarelo âmbar) | Indicador de alerta/intercorrência  |
| Bottom navbar                      | `#1A1A1A` (preto) | Barra de navegação inferior              |
| Ícones do bottom navbar            | `#FFFFFF`         | Setas e ícones de navegação              |

---

## 2. Tipografia e Estilos

| Elemento               | Estilo estimado                                         |
|------------------------|---------------------------------------------------------|
| Nome do professor (header) | `font-size: ~16px`, `font-weight: bold`, maiúsculas, branco |
| Label de aviso         | `font-size: ~13px`, `font-weight: bold`, uppercase, cor escura |
| Título dos cards       | `font-size: ~14–16px`, `font-weight: bold`, uppercase, branco ou escuro conforme o fundo |
| Fonte geral            | Sans-serif (provavelmente Roboto ou similar do sistema Android) |

**Observações:**
- Cards com fundo escuro (TEA, Altas Habilidades, DI Leve) usam texto branco.
- Cards com fundo claro (Dislexia, TDAH) usam texto escuro (`#333333` ou similar).

---

## 3. Componentes Mapeados

### Componentes Atômicos
- **Avatar circular** — foto do professor no canto superior direito do header (`~40px`, borda arredondada completa).
- **Ícone hamburger (☰)** — menu lateral à esquerda no header.
- **Ícone de aviso (⚠️)** — triângulo amarelo com ponto de exclamação, indicando seção de alerta.
- **Emoji ilustrativo** — cada card possui um emoji/ilustração temático no canto direito (puzzle, cérebro, estrela, foguete, cérebro colorido).
- **Ícones de navegação inferior** — seta `<` (voltar), círculo `○` (home), barras `|||` (recentes/menu).

### Componentes Moleculares
- **Header/Navbar**
  - Fundo: `#3A3A3A`
  - Altura: ~56–60px
  - Conteúdo: `[ícone menu] [nome do professor] [avatar]` — layout flexbox, `justify-content: space-between`

- **Seção de aviso ("INTERCORRÊNCIA COM ALUNO:")**
  - Row com ícone + label
  - Padding horizontal: ~16px
  - Separação visual entre header e lista de cards

- **Card de condição**
  - Largura: ~100% da tela com margin horizontal (~16px de cada lado)
  - Altura: ~90–100px
  - Border-radius: ~12px
  - Conteúdo: label de texto à esquerda + emoji/ilustração à direita
  - Layout interno: `flexbox`, `justify-content: space-between`, `align-items: center`
  - `padding: ~16–20px`
  - `margin-bottom: ~12px`

- **Bottom Navigation Bar**
  - Fundo: `#1A1A1A`
  - Altura: ~56px
  - 3 ícones centralizados e espaçados uniformemente

---

## 4. Layout Geral

```
┌─────────────────────────────────────┐
│  ☰   Prof. Julia            [foto]  │  ← Header (dark)
├─────────────────────────────────────┤
│  ⚠️  INTERCORRÊNCIA COM ALUNO:      │  ← Seção de aviso
├─────────────────────────────────────┤
│  [ TRANSTORNO DO ESPECTRO AUTISTA 🧩] │  ← Card azul
│  [ DISLEXIA                      🧠] │  ← Card salmão
│  [ ALTAS HABILIDADES             ⭐] │  ← Card roxo
│  [ TDAH                          🚀] │  ← Card verde-amarelo
│  [ DEFICIÊNCIA INTELECTUAL LEVE  🧠] │  ← Card ciano
├─────────────────────────────────────┤
│       <          ○          |||      │  ← Bottom Nav
└─────────────────────────────────────┘
```

- **Estrutura**: `ScrollView` vertical com lista de cards.
- **Espaçamento externo dos cards**: `margin: 8px 16px`.
- **Espaçamento interno dos cards**: `padding: 16px 20px`.

---

## 5. Funcionalidades Deduzidas

| Ação                                  | Componente disparador         | Comportamento esperado                            |
|---------------------------------------|-------------------------------|---------------------------------------------------|
| Abrir menu lateral                    | Ícone hamburger (☰)           | Abre drawer/sidebar de navegação                  |
| Visualizar perfil do professor        | Avatar circular               | Navega para perfil ou abre modal                  |
| Selecionar tipo de intercorrência     | Qualquer card de condição     | Navega para tela de registro de intercorrência para aquela condição |
| Voltar para tela anterior             | Ícone `<` (bottom nav)        | `navigation.goBack()`                             |
| Ir para tela inicial                  | Ícone `○` (bottom nav)        | Navega para home/dashboard                        |
| Ver apps/tarefas recentes             | Ícone `|||` (bottom nav)      | Abre visão de apps recentes do sistema (Android)  |

---

## 6. Notas e Recomendações de Implementação

- **Cores dos cards por condição** devem ser definidas como constantes ou tokens no design system, facilitando manutenção.
- Os **emojis/ilustrações** podem ser substituídos por assets `.png` ou `.svg` para melhor controle de tamanho e qualidade.
- O card do **TEA** (azul, com texto em caixa alta e peso bold) parece ter destaque visual diferenciado — pode representar a condição mais relevante para o app.
- A **seção de aviso** sugere que esta tela é acessada a partir de um contexto de "aluno selecionado" — provavelmente vem após selecionar um aluno específico.
- Considerar **acessibilidade**: garantir contraste suficiente especialmente no card TDAH (texto escuro sobre fundo verde-amarelado claro).
