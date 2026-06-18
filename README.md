# LIDEA-w — Web Live Debugging for App Inventor

> **Documento de referência para redesign de interface.**
> Este README descreve o projeto, seu funcionamento, a interface atual e os requisitos para a nova UI.

---

## O que é o LIDEA-w

LIDEA-w é uma aplicação web que permite visualizar e interagir com aplicativos criados no **MIT App Inventor** diretamente no navegador, sem precisar de um dispositivo Android físico.

O App Inventor é uma plataforma visual de programação para criar apps Android. Normalmente, para testar um app em desenvolvimento, o usuário precisa de um smartphone com o **AI2 Companion** instalado, conectado via Wi-Fi ao mesmo servidor. O LIDEA-w substitui esse app Android por uma interface web — o app é renderizado dentro de um mockup de celular no navegador.

Projeto desenvolvido como Trabalho de Conclusão de Curso em Sistemas de Informação — UFSC (2021/2022).

---

## Fluxo de uso

```
Usuário no App Inventor
        │
        │  clica em "Connect to AI2 Companion"
        │  recebe código de 6 caracteres (ex: "xk3p9q")
        ▼
  LIDEA-w no navegador
        │
        │  usuário digita o código de 6 caracteres no modal
        │  front-end envia código ao back-end local (Node.js)
        │  back-end faz handshake com servidor Rendezvous do MIT
        │  a cada 2 segundos, front-end busca novo código YAIL
        │  YAIL é parseado → componentes React são renderizados
        │  interações do usuário (cliques, inputs) disparam blocos lógicos
        ▼
  Mockup de celular no navegador
  exibe a interface do app App Inventor em tempo real
```

**YAIL** (Yet Another Intermediate Language) é a linguagem intermediária gerada pelo App Inventor a partir dos blocos visuais. O LIDEA-w converte esse código em componentes React executados no navegador.

---

## Stack técnica

| Camada | Tecnologia |
|---|---|
| Framework | React 17 (function components + hooks) |
| Estilização | CSS Modules + Material-UI v4 |
| HTTP | Axios |
| Back-end (separado) | Node.js — não está neste repositório |
| Bundler | Create React App (react-scripts 4) |

---

## Estrutura de pastas

```
src/
├── assets/images/          ← logo, imagem do mockup de dispositivo
├── components/
│   ├── Header/             ← barra superior fixa
│   ├── Main/               ← área de conteúdo principal
│   ├── Modal/              ← modal de conexão (chave de 6 caracteres)
│   ├── ElementsContainer/  ← renderiza os componentes AI dinamicamente
│   └── ai_components/      ← um arquivo por componente App Inventor
│       ├── Button.js
│       ├── Label.js
│       ├── TextBox.js
│       └── ... (14 componentes no total)
├── context/
│   └── ContentContext.js   ← polling, parsing e estado global
├── helpers/
│   └── parser/             ← conversão de YAIL → estruturas JS
└── services/
    ├── api.js              ← instância axios (baseURL configurável via .env)
    └── yailCode.js         ← fetch do código YAIL do back-end
```

---

## Como rodar localmente

**Pré-requisito:** o back-end Node.js deve estar rodando em `http://127.0.0.1:8001` (repositório separado).

```bash
# Instalar dependências
npm install

# Criar arquivo de configuração
cp .env.example .env

# Iniciar em modo desenvolvimento
npm start
# Abre em http://localhost:3000
```

Para testar com o App Inventor:
1. Acesse [ai2.appinventor.mit.edu](https://ai2.appinventor.mit.edu)
2. Conecte em **Connect → AI2 Companion**
3. Anote o código de 6 caracteres exibido
4. No LIDEA-w, clique em **Iniciar Sessão** e insira o código

---

## Interface atual

### Visão geral

A interface tem **três estados visuais principais**:

| Estado | Quando ocorre |
|---|---|
| **Tela de boas-vindas** | Antes de conectar — card central com instruções |
| **Modal de conexão** | Ao clicar em "Iniciar Sessão" — overlay com input da chave |
| **Mockup com app** | Após receber YAIL — mockup de celular com o app renderizado |

---

### Header (barra superior fixa)

- Fundo branco, sombra suave na borda inferior, altura 8rem (desktop) / 6rem (≤768px)
- Layout em grid de 3 colunas: `[logo] [título] [botão]`
- **Logo:** `LideaLogo.png` (136×55px), à esquerda
- **Título central:** "Web Live Debugging for App Inventor" — fonte Kanit, peso 300, 2.2rem
- **Botão à direita:** "Iniciar Sessão" — fundo `#00346C`, texto branco, bordas arredondadas

**Problema atual:** o botão não muda de estado após conectar. Continua com "Iniciar Sessão" mesmo com sessão ativa.

---

### Tela de boas-vindas (estado inicial)

Exibida enquanto nenhum YAIL foi recebido.

- Card branco centralizado, mínimo 75×82rem, bordas arredondadas (2rem), sombra leve
- Título "Bem vindo ao LIDEA-w" — fonte Kanit, 3.5rem
- Duas linhas de instrução — fonte Roboto, peso 300, 2.5rem
- Fundo da página: `#F5F5F5`

**Problema atual:** instruções são textuais e estáticas, sem passos visuais nem ícones.

---

### Modal de conexão

Aberto pelo botão "Iniciar Sessão". Overlay semi-transparente (`rgba(0,0,0,0.5)`).

- Card branco, bordas arredondadas (2rem), padding generoso (4rem × 3rem)
- Texto explicativo no topo
- Input de texto (chave de 6 caracteres), centralizado, bordas arredondadas
- **Estados do botão "Conectar":**
  - Normal: fundo `#00346C`, texto branco
  - Loading: texto muda para "Conectando...", botão desabilitado (opacity 0.6)
  - Erro: mensagem em vermelho (`#c0392b`) aparece acima do botão
- Fecha ao conectar com sucesso ou ao clicar fora do card

**Problema atual:** sem botão `×` visível para fechar. Sem validação do formato da chave antes de enviar.

---

### Área principal com mockup (estado conectado)

- Fundo `#F5F5F5`, card branco centralizado
- **Mockup de dispositivo:** imagem `DeviceSmall.png` (476×794px) como background
- **Tela virtual do app:** posicionada dentro do mockup (431×658px, absoluta, com scroll vertical)
  - `left: 24px, top: 73px` em relação ao canto do mockup
  - Scrollbar customizado (fino, cinza escuro)
- Dentro da tela virtual:
  - **ScreenTitle** no topo (barra sticky, fundo índigo MUI, texto branco) — exibe o nome da tela do App Inventor
  - **ElementsContainer** — renderiza os componentes dinamicamente conforme o YAIL

**Problema atual:** nenhum indicador de status de conexão. Entre conectar e o app aparecer, a tela fica em branco sem loading.

---

## Componentes App Inventor suportados

Renderizados dinamicamente dentro da tela virtual do mockup:

| Componente | Categoria | Descrição |
|---|---|---|
| `Button` | Interativo | Botão clicável, dispara eventos |
| `Label` | Display | Texto não editável |
| `TextBox` | Input | Campo de texto editável |
| `PasswordTextBox` | Input | Campo de senha (texto oculto) |
| `CheckBox` | Interativo | Caixa de seleção booleana |
| `Switch` | Interativo | Toggle on/off |
| `Slider` | Interativo | Controle deslizante numérico |
| `Spinner` | Seleção | Dropdown de opções |
| `ListPicker` | Seleção | Seletor de lista em diálogo |
| `DatePicker` | Seleção | Seletor de data |
| `TimePicker` | Seleção | Seletor de hora |
| `Image` | Display | Exibição de imagem |
| `ScreenTitle` | Layout | Barra sticky de título da tela |
| `VerticalArrangement` | Container | Agrupa componentes verticalmente |
| `HorizontalArrangement` | Container | Agrupa componentes horizontalmente |
| `TableArrangement` | Container | Agrupa componentes em grade |

Cada componente aceita as seguintes propriedades visuais vindas do YAIL:

- Visibilidade (mostrar/ocultar)
- Cor de fundo e cor de texto (número decimal → hex)
- Tamanho da fonte (px)
- Estilo da fonte (negrito, itálico)
- Família tipográfica (Default, Monospace, Serif, SansSerif)
- Alinhamento de texto (esquerda, centro, direita)
- Largura e altura (px, percentual ou "fill parent")
- Forma (padrão ou oval, para botões)

> **Importante:** o layout interno da tela virtual é definido pelo App Inventor, não pelo LIDEA-w. O redesign não deve interferir nessa área.

---

## Paleta de cores e tipografia atuais

| Elemento | Valor |
|---|---|
| Azul principal | `#00346C` |
| Fundo da página | `#F5F5F5` |
| Cards / superfícies | `#FFFFFF` |
| Erro | `#c0392b` |
| ScreenTitle (barra do app) | Índigo — Material-UI `primary.main` |
| Fonte principal | Roboto (Google Fonts) |
| Fonte de títulos | Kanit (Google Fonts) |
| Sombra de cards | `box-shadow: 0px 2px 5px rgba(128,128,128,0.5)` |

---

## Assets de imagem

```
src/assets/images/
├── LideaLogo.png     ← logo horizontal (136×55px no header atual)
├── DeviceSmall.png   ← mockup de smartphone (476×794px)

public/
└── LIDEAw.ico        ← favicon
```

Todos podem ser substituídos no redesign. O nome **LIDEA-w** e a sigla devem ser mantidos.

---

## Requisitos para o redesign

### O que deve ser mantido

1. **Fluxo de 3 etapas:** tela inicial → modal de conexão → tela com mockup. Não simplificar nem mesclar.
2. **Mockup de celular:** a área central com aparência de dispositivo móvel é a identidade do produto. Pode ser redesenhada visualmente, mas deve continuar reconhecível como um celular.
3. **Tela virtual interna:** o conteúdo dentro do mockup é dinâmico e controlado pelo App Inventor. O redesign não deve modificar o interior — apenas a moldura ao redor.
4. **Feedback de loading e erro no modal:** funcionalidade necessária.
5. **Foco em desktop:** público-alvo usa a ferramenta enquanto desenvolve no computador. Mobile é secundário.

### Problemas a resolver

| Problema | Severidade |
|---|---|
| Nenhum indicador de status de conexão após conectar | Alta |
| Tela em branco entre conectar e app aparecer (sem loading) | Alta |
| Botão "Iniciar Sessão" não muda após conectar | Média |
| Modal sem botão `×` visível | Média |
| Tela de boas-vindas sem onboarding visual (passos, ícones) | Média |
| Sem validação do formato da chave antes de enviar | Baixa |
| Sem estado de erro persistente se o polling falhar | Baixa |

### Oportunidades de melhoria

- **Painel de status lateral:** ao lado do mockup, um painel discreto com chave de sessão ativa, nome do app App Inventor, e indicador de conexão (●  online / ○  aguardando)
- **Onboarding visual:** substituir o texto de boas-vindas por um fluxo de 3 passos ilustrados
- **Animação de transição:** fade/slide entre estado vazio e estado com mockup
- **Tema:** considerar modo escuro ou pelo menos uma paleta mais moderna mantendo o azul `#00346C` como cor de marca

---

## Tom e público-alvo

**Público:** estudantes, professores e entusiastas usando MIT App Inventor para aprender programação. Faixa etária variada (12–40 anos). Nível técnico baixo a médio.

**Tom visual:** profissional mas acessível. Tecnológico sem ser intimidador. Referências próximas: Replit, Glitch, MIT Scratch (educacional mas funcional).

**Não é:** uma IDE completa, um simulador de Android, nem uma ferramenta apenas para especialistas.
