# Assessment COMET — Área ORIGEM | Instrumento SD3 (Short Dark Triad)

Implementação do instrumento psicométrico **SD3 (Short Dark Triad)** no Assessment COMET — Área ORIGEM, integrando o questionário rigoroso de 27 afirmações (Jones & Paulhus, 2014), algoritmo de correção com inversão de itens, motor interpretativo inteligente das 3 dimensões (Maquiavelismo, Narcisismo e Psicopatia Subclínica) e emissão de relatórios profissionais em 8 seções analíticas para desenvolvimento e consultoria.

## User Review & Critical Decisions

> [!IMPORTANT]
> O instrumento adota rigor metodológico e psicométrico integral conforme Jones & Paulhus (2014), com diretrizes éticas explícitas de não rotulação e natureza estritamente não diagnóstica/não clínica.

- **Navegação do Questionário**: Estrutura paginada em 3 blocos equilibrados de 9 itens cada, mantendo a sequência original de 1 a 27 sem identificação de dimensões ou viés de desejabilidade social.
- **Estrutura do Relatório**: Abas temáticas modulares com alternância rápida entre Visão Individual (Autoconhecimento) e Visão Especialista (Gestão, Coaching, Consultoria e Psicologia), além de exportação para impressão/PDF estruturado.
- **Painel de Auditoria e Calibração**: Ferramenta técnica integrada para testes imediatos com 1 clique (perfil mínimo, máximo, neutro e customizado), permitindo verificar e auditar os 5 itens invertidos (11, 15, 17, 20, 25) e a separação das dimensões em tempo real.
- **Armazenamento Seguro**: Persistência local (`localStorage` tipado e criptografável em chave local) com exportação/importação em JSON para total respeito à privacidade de dados sensíveis e auditoria retroativa.

---

## 1. Overview & Core Concept

- **O que o sistema realiza**: Aplica o questionário SD3 de 27 itens em escala Likert de 5 pontos, executa a inversão matemática de 5 itens específicos, calcula as médias por dimensão (1,00 a 5,00) e percentuais normalizados (0% a 100%), e gera um relatório aprofundado em 8 macroseções integradas.
- **Público-Alvo**:
  - *Participantes*: Profissionais, líderes e indivíduos em busca de autoconhecimento genuíno sobre padrões de influência, protagonismo e regulação emocional.
  - *Profissionais & Especialistas*: Gestores, consultores organizacionais, mentores, coaches e psicólogos utilizando o assessment como subsídio para desenvolvimento humano.
- **Valor Central**: Tradução de traços da personalidade em competências direcionadas, pontos de atenção objetivos e estratégias de desenvolvimento, sem viés punitivo ou estigmatização.

---

## 2. User Experience & Visual Design

### Fluxos Principais do Usuário

1. **Boas-vindas & Contexto (Área ORIGEM)**: Apresentação dos objetivos do instrumento, orientações sobre respostas espontâneas e esclarecimento sobre a natureza não diagnóstica.
2. **Aplicação do Questionário (3 Etapas x 9 Itens)**:
   - Apresentação limpa de afirmações neutras em blocos de 9 itens.
   - Escala Likert de 5 pontos clara e responsiva em desktop e mobile.
   - Validação estrita de preenchimento (bloqueio de avanço sem responder todas as questões da etapa).
3. **Painel Geral e Relatório de 8 Seções**:
   - *Seção 1*: Identificação, contextualização científica e nota ética.
   - *Seção 2*: Painel Geral com Radar Triaxial e Barras Horizontais com escalas percentuais normalizadas e médias brutas.
   - *Seção 3*: Análise Individual Aprofundada (Maquiavelismo, Narcisismo e Psicopatia Subclínica) detalhando potencialidades, pontos de atenção, relações interpessoais e tomada de decisão.
   - *Seção 4*: Análise Integrada da Tríade (cruzamento dinâmico das dominâncias relativas, como Maquiavelismo + Narcisismo, Narcisismo + Psicopatia, perfis harmônicos ou discrepantes).
   - *Seção 5*: Aplicações no Contexto Empresarial (Liderança, Gestão de Pessoas, Tomada de Decisão, Negociação/Influência, Cultura e Empreendedorismo).
   - *Seção 6*: Autoconhecimento e Plano Prático de Desenvolvimento (comportamentos, ações práticas e indicadores de evolução).
   - *Seção 7*: Caderno Técnico para Coaching, Consultoria e Psicologia (hipóteses, roteiro de entrevistas, limites éticos do instrumento).
   - *Seção 8*: Síntese Executiva personalizada com dimensão predominante, potencialidade-chave, ponto cego e pergunta central para reflexão.
4. **Painel de Auditoria & Histórico**:
   - Histórico de avaliações passadas com comparativo não rotulador.
   - Módulo de calibração para testes automatizados com 1 clique (Testes de Validação 1 a 8).

### Identidade Visual & Design System COMET

- **Paleta de Cores**:
  - *Fundo Dominante*: Grafite escuro e ardósia neutra (`#0B0F17`, `#111827`, `#1F2937`) ou versão contrastada limpa com transição suave.
  - *Destaque COMET*: Laranja vibrante (`#EA580C` / `#F97316`) nos pontos focais, CTAs e eixos de destaque.
  - *Superfícies*: Cinza grafite com bordas sutis de 1px (`border-neutral-800`), sem cartões flutuantes desnecessários ou sombras excessivas.
- **Tipografia**:
  - *Títulos e Cabeçalhos*: `Plus Jakarta Sans` / `Manrope`, com hierarquia equilibrada e balanceamento de títulos.
  - *Corpo e Prosa Analítica*: `Plus Jakarta Sans` / `DM Sans` (15px-16px, espaçamento generoso para leitura confortável de relatórios extensos).
  - *Dados Numéricos e Escalas*: Numerais tabulares (`tabular-nums font-mono`) para pontuações, percentuais e eixos de radar.
- **Visualização de Dados**:
  - Gráfico Radar Triaxial SVG nativo (vetorial, fluido, sem dependências externas pesadas e com rendering crisp).
  - Barras horizontais de intensidade com marcadores de referência de 1 a 5 e percentual 0%–100%.

---

## 3. Key Product Decisions & Trade-Offs

- **Tradução Fiel e Inalterada dos 27 Itens de Jones & Paulhus (2014)**:
  - *Decisão*: Manter fielmente a literalidade e o sentido psicológico dos 27 itens originais em português do Brasil, sem adoçar termos para jargões corporativos nem inventar itens.
  - *Por quê*: Garantir a fidelidade científica e a comparabilidade metodológica estabelecida pelos autores originais.
- **Inversão Matemática Rigorosa (Itens 11, 15, 17, 20, 25)**:
  - *Decisão*: Aplicação exata da fórmula `Pontuação Corrigida = 6 - Resposta Original` antes de computar as médias por dimensão.
  - *Por quê*: Preserva a validade métrica interna e documenta claramente o valor bruto vs. corrigido para auditoria.
- **Motor Heurístico de Interpretação Baseado em Regras e Cruzamentos**:
  - *Decisão*: Sistema determinístico de geração interpretativa combinando níveis (baixo, moderado, elevado), distâncias entre traços e pares dominantes.
  - *Por quê*: Entrega relatórios consistentes, aprofundados e tecnicamente responsáveis, evitando variações imprevisíveis de modelos generativos enquanto preserva rigor conceitual.
- **Painel de Auditoria & Calibração Integrado**:
  - *Decisão*: Permitir que avaliadores e auditores testem os cenários descritos na Seção 10 (mínimo, máximo, neutro, inversão de chaves) com um único clique.
  - *Por quê*: Facilita a homologação imediata e garante total transparência do cálculo psicométrico.

---

## 4. Technical Architecture & Data Strategy

### Component Hierarchy & Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Assessment COMET — ORIGEM                         │
│                           Header & Navigation Bar                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│   Questionário   │          │  Relatório SD3   │          │  Auditoria &     │
│   (3 Etapas x 9) │          │  (8 Seções)      │          │  Histórico       │
└──────────────────┘          └──────────────────┘          └──────────────────┘
         │                             │                             │
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│ Escala Likert    │          │ Radar Triaxial & │          │ Validação dos 8  │
│ 5 Pontos com     │          │ Barras Normaliz. │          │ Casos de Teste   │
│ Validação        │          │ SVG Interativo   │          │ e Carga Rápida   │
└──────────────────┘          └──────────────────┘          └──────────────────┘
         │                             │                             │
         └─────────────────────────────┼─────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SD3 Psychometric Core Engine                         │
│  - 27 Itens Originais Traduzidos                                            │
│  - Inversão de Itens (11, 15, 17, 20, 25)                                   │
│  - Médias (1.00 - 5.00) & Percentuais Normalizados (((M-1)/4)*100)          │
│  - Motor de Cruzamento e Análise da Tríade                                  │
│  - Repositório de Persistência Local & Auditoria JSON                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Estrutura de Dados & Interfaces

- `SD3Item`: `{ id: number; text: string; dimension: 'machiavellianism' | 'narcissism' | 'psychopathy'; isReversed: boolean; }`
- `SD3Answers`: Record com os 27 itens (`Record<number, number>`).
- `SD3Scores`:
  - `rawScores`: valores brutos (1 a 5).
  - `correctedScores`: valores com inversão nos itens 11, 15, 17, 20, 25.
  - `dimensions`:
    - `machiavellianism`: `{ mean: number; normalizedPercent: number; level: 'low' | 'moderate' | 'elevated'; rank: number }`
    - `narcissism`: `{ mean: number; normalizedPercent: number; level: 'low' | 'moderate' | 'elevated'; rank: number }`
    - `psychopathy`: `{ mean: number; normalizedPercent: number; level: 'low' | 'moderate' | 'elevated'; rank: number }`
- `SD3AssessmentReport`: Relatório estruturado contendo dados do participante, data, pontuações, análises das 8 seções e síntese executiva.
- `SD3HistoryItem`: Registro auditável armazenado em `localStorage`.

---

## 5. Plano de Entrega e Validação

1. **Base Psicométrica e Tradução (`src/data/sd3Questions.ts`)**: Mapeamento dos 27 itens originais com traduções fidedignas para o português brasileiro e anotação estrita das inversões.
2. **Motor de Pontuação & Lógica Interpretativa (`src/services/sd3Scoring.ts` e `src/services/sd3Interpreter.ts`)**:
   - Funções de cálculo de médias e percentuais normalizados.
   - Implementação das regras dos 8 cenários de teste técnico (mínimo 1, máximo 5, neutro 3, inversões).
   - Geração de conteúdo dinâmico para as 8 seções analíticas.
3. **Componentes da Interface**:
   - `Header`: Marca COMET, navegação clara entre Teste, Relatório, Auditoria e Histórico.
   - `AssessmentView`: Questionário em 3 blocos de 9 itens com barra de progresso, validação e botões de avanço.
   - `ReportView`: Renderização das 8 seções estruturadas, Radar Triaxial interativo e visualização de barras.
   - `AuditView`: Painel para execução dos testes técnicos com 1 clique e verificação dos cálculos.
   - `HistoryView`: Lista de avaliações salvas com possibilidade de recarregar ou exportar.
4. **Verificação & Testes**: Execução dos 8 testes de conformidade psicométrica e verificação de build com TypeScript.
