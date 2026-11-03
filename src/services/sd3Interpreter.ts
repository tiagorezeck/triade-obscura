/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIMENSION_META } from '../data/sd3Questions';
import {
  BusinessApplicationArea,
  DevelopmentRecommendation,
  DimensionAnalysis,
  DimensionKey,
  DimensionScore,
  ExecutiveSummary,
  ProfessionalPractitionerBlock,
  SD3ReportData,
  TriadPatternAnalysis
} from '../types/sd3';

/**
 * Constrói a análise individualizada de uma dimensão específica
 */
function buildDimensionAnalysis(
  key: DimensionKey,
  score: DimensionScore,
  pattern: TriadPatternAnalysis
): DimensionAnalysis {
  const isDominant = pattern.dominantKey === key;
  const isLowest = pattern.lowestKey === key;
  const level = score.intensityLevel;

  let whatItMeasures = '';
  let individualResultExplanation = '';
  const everydayManifestations: string[] = [];
  const constructivePotentials: string[] = [];
  const pointsOfAttention: string[] = [];
  let interpersonalDynamics = '';
  let decisionMakingImpact = '';
  const developmentGuidance: string[] = [];

  if (key === 'machiavellianism') {
    whatItMeasures =
      'O Maquiavelismo avalia a inclinação para o pensamento estratégico, a leitura realista de jogos de poder, o pragmatismo deliberado e a tendência a utilizar relacionamentos interpessoais de forma instrumental e calculada. Não se confunde com maldade inata; refere-se à propensão a priorizar fins pretendidos e antecipar dinâmicas políticas.';

    individualResultExplanation = `Com pontuação média de ${score.mean.toFixed(2)} (${score.normalizedPercent.toFixed(1)}% normalizado), o participante situa-se no nível ${level.toUpperCase()}${
      isDominant ? ' e esta é sua dimensão de maior expressão relativa na Tríade' : isLowest ? ' e esta é sua dimensão de menor expressão relativa' : ''
    }. Este índice reflete ${
      level === 'elevado'
        ? 'uma atitude de cautela política proeminente, apurada percepção de interesses velados e preferência por articular movimentos com discrição e planejamento detalhado.'
        : level === 'baixo'
        ? 'uma postura substancialmente aberta, pautada na transparência espontânea, franqueza relacional e baixa inclinação para manobras de bastidores ou retenção de segredos.'
        : 'um equilíbrio funcional entre discernimento tático e relacionamento autêntico, sabendo se resguardar quando o cenário exige prudência sem transformar as interações cotidianas em jogos de tabuleiro.'
    }`;

    if (level === 'elevado') {
      everydayManifestations.push('Seleção criteriosa do que compartilha em reuniões, guardando informações para o momento de maior impacto.');
      everydayManifestations.push('Mapeamento constante de quem são as figuras-chave de influência antes de propor qualquer mudança.');
      everydayManifestations.push('Evitação de conflitos diretos infrutíferos, preferindo alianças temporárias ou soluções indiretas.');
      constructivePotentials.push('Alta capacidade de negociação em mesas complexas com interesses conflitantes.');
      constructivePotentials.push('Excelente leitura de cenários corporativos, antecipando movimentos de concorrentes ou grupos de pressão.');
      constructivePotentials.push('Autocontrole emocional rigoroso, não reagindo impulsivamente a provocações.');
      pointsOfAttention.push('Risco de gerar sensação de impenetrabilidade ou desconfiança em subordinados e pares.');
      pointsOfAttention.push('Tendência a tratar relacionamentos como pontes provisórias, minando parcerias de longo prazo.');
      pointsOfAttention.push('Sobrecarga cognitiva pela constante necessidade de calcular variáveis e proteger posições.');
      interpersonalDynamics =
        'Tende a calibrar o grau de proximidade interpessoal a partir da utilidade mútua. A confiança não é concedida a priori, mas construída sob testes de fidelidade e previsibilidade.';
      decisionMakingImpact =
        'As decisões são balizadas pelo cálculo rigoroso de perdas e ganhos de poder. O pragmatismo sobrepõe-se com frequência a simpatias pessoais ou sentimentos momentâneos.';
      developmentGuidance.push('Experimentar a prática de vulnerabilidade calibrada com parceiros de confiança comprovada para consolidar vínculos autênticos.');
      developmentGuidance.push('Substituir a perspectiva de "jogo de soma zero" pela construção de valor compartilhado sistêmico.');
    } else if (level === 'baixo') {
      everydayManifestations.push('Comunicação direta, transparente e desprovida de segundas intenções deliberadas.');
      everydayManifestations.push('Suposição inicial de que as pessoas ao redor estão agindo com a mesma boa-fé que expressam.');
      everydayManifestations.push('Desconforto perceptível com articulações políticas de bastidores ou barganhas de influência.');
      constructivePotentials.push('Capacidade espontânea de construir segurança psicológica e transparência na equipe.');
      constructivePotentials.push('Credibilidade interpessoal sólida, reconhecida por franqueza e ausência de cinismo.');
      constructivePotentials.push('Facilidade para criar vínculos colaborativos profundos e duradouros.');
      pointsOfAttention.push('Possível ingenuidade política em cenários competitivos agressivos ou disputas corporativas severas.');
      pointsOfAttention.push('Dificuldade em gerenciar estrategicamente a divulgação de dados sensíveis ou informações confidenciais.');
      pointsOfAttention.push('Frustração intensa ao constatar deslealdades ou manobras dissimuladas por parte de terceiros.');
      interpersonalDynamics =
        'Valoriza relações desarmadas, espontâneas e baseadas na lealdade explícita. Evita a instrumentalização do outro e busca conexões autênticas.';
      decisionMakingImpact =
        'Decide com base em convicções, mérito técnico e senso de justiça direta, por vezes subestimando o impacto político da decisão sobre stakeholders ocultos.';
      developmentGuidance.push('Desenvolver leitura política preventiva sem abandonar os próprios valores de integridade e transparência.');
      developmentGuidance.push('Aprender a reservar planos e decisões estratégicas até que estejam suficientemente amadurecidos.');
    } else {
      everydayManifestations.push('Postura prudente diante de novos ambientes, sem cair no cinismo ou na paranoia relacional.');
      everydayManifestations.push('Capacidade de articular acordos razoáveis sem necessariamente forçar manipulações sutis.');
      everydayManifestations.push('Defesa dos próprios interesses de forma assertiva, respeitando limites éticos evidentes.');
      constructivePotentials.push('Versatilidade para transitar entre a diplomacia corporativa e o diálogo aberto com a equipe.');
      constructivePotentials.push('Equilíbrio entre a preservação de dados confidenciais e a comunicação clara dos objetivos.');
      pointsOfAttention.push('Observar se em momentos de crise prolongada a tendência à desconfiança não se acentua.');
      interpersonalDynamics =
        'Constrói relações funcionais com boa dose de empatia, mantendo um filtro saudável de autopreservação profissional.';
      decisionMakingImpact =
        'Combina análise pragmática de objetivos com atenção razoável aos impactos humanos imediatos.';
      developmentGuidance.push('Refinar a capacidade de negociação estratégica de alto nível, mantendo a reputação de confiabilidade.');
    }
  } else if (key === 'narcissism') {
    whatItMeasures =
      'O Narcisismo afere a grandiosidade pessoal, a busca por admiração e protagonismo, a sensibilidade ao prestígio, a autoconfiança expressiva e a centralidade da autoimagem nas decisões e relações. Não representa diagnóstico clínico; mede traços de autoafirmação e valorização de status.';

    individualResultExplanation = `Com pontuação média de ${score.mean.toFixed(2)} (${score.normalizedPercent.toFixed(1)}% normalizado), o participante apresenta intensidade ${level.toUpperCase()}${
      isDominant ? ' e ocupa o ponto mais alto em seu mapa de traços' : isLowest ? ' sendo o traço de menor expressão em seu perfil' : ''
    }. Isto aponta para ${
      level === 'elevado'
        ? 'um perfil fortemente orientado a deixar sua marca pessoal, confortável em posições de visibilidade e que busca ativamente o reconhecimento e o respeito à sua competência.'
        : level === 'baixo'
        ? 'uma atitude sóbria e discreta, com baixa necessidade de reverência externa, preferência pelo trabalho nos bastidores e foco exclusivo no resultado em si, e não no aplauso.'
        : 'uma autoconfiança saudável e estruturada, que aprecia o reconhecimento meritório sem depender dele como motor exclusivo de autoestima ou motivação.'
    }`;

    if (level === 'elevado') {
      everydayManifestations.push('Iniciativa espontânea para liderar discussões e apresentar soluções inovadoras em público.');
      everydayManifestations.push('Apreço por projetos de grande envergadura que conferem projeção e destaque institucional.');
      everydayManifestations.push('Reação interna desconfortável diante de críticas que questionem sua capacidade ou mérito.');
      constructivePotentials.push('Magnetismo e oratória persuasiva capazes de engajar equipes em torno de visões ousadas.');
      constructivePotentials.push('Ambição sadia e coragem para assumir o protagonismo diante de desafios que intimidam outros.');
      constructivePotentials.push('Alto padrão de exigência com sua própria imagem, buscando excelência estética e técnica.');
      pointsOfAttention.push('Dificuldade de abrir espaço para que liderados brilhem de maneira independente.');
      pointsOfAttention.push('Sensibilidade aumentada a feedbacks corretivos, correndo o risco de reações defensivas.');
      pointsOfAttention.push('Tendência a personalizar conquistas coletivas ou minimizar a contribuição alheia.');
      interpersonalDynamics =
        'Relaciona-se com entusiasmo quando há admiração mútua e respeito formal. Pode apresentar frieza ou distanciamento caso sinta que seu valor não é plenamente reverenciado.';
      decisionMakingImpact =
        'Prioriza opções que elevam o prestígio da marca pessoal ou corporativa. O impacto reputacional é ponderado com intensidade em cada escolha.';
      developmentGuidance.push('Cultivar a prática da "liderança que serve", encontrando realização no desenvolvimento e no triunfo dos liderados.');
      developmentGuidance.push('Adotar o hábito de despersonalizar críticas, encarando-as como dados de melhoria contínua de processos.');
    } else if (level === 'baixo') {
      everydayManifestations.push('Atuação discreta, delegando holofotes e comemorações públicas para o time sem qualquer vaidade.');
      everydayManifestations.push('Aceitação tranquila da condição de pessoa comum, focada na funcionalidade prática do dever cumprido.');
      everydayManifestations.push('Desconforto ou hesitação sincera em momentos de bajulação, autopromoção ou vaidade corporativa.');
      constructivePotentials.push('Humildade genuína que inspira respeito silencioso e desfaz disputas de ego no time.');
      constructivePotentials.push('Alta resiliência a críticas, sem defensividades baseadas em orgulho ferido.');
      constructivePotentials.push('Foco integral no conteúdo e na entrega, sem desperdício de energia com embalagens superficiais.');
      pointsOfAttention.push('Risco de invisibilidade estratégica de suas realizações perante a alta liderança e o mercado.');
      pointsOfAttention.push('Hesitação em assumir o protagonismo quando a organização carece de uma figura de liderança visível.');
      pointsOfAttention.push('Dificuldade em cobrar respeito formal e autoridade em situações que exigem postura firme.');
      interpersonalDynamics =
        'Estabelece relações igualitárias e despretensiosas. Não exige deferência e trata todos os níveis hierárquicos com a mesma simplicidade.';
      decisionMakingImpact =
        'Decide desprovido de considerações de vaidade pessoal, guiando-se pela eficácia objetiva e pelo bem-estar da coletividade.';
      developmentGuidance.push('Apropriar-se conscientemente do seu valor, comunicando resultados com assertividade sem temer parecer vaidoso.');
      developmentGuidance.push('Assumir a frente em momentos em que a equipe necessita de liderança inspiradora e presença executiva.');
    } else {
      everydayManifestations.push('Equilíbrio entre valorizar as próprias conquistas e reconhecer o esforço do grupo.');
      everydayManifestations.push('Capacidade de falar em público com segurança sem a necessidade compulsiva de ser o centro das atenções.');
      everydayManifestations.push('Recepção madura de elogios e críticas construtivas.');
      constructivePotentials.push('Autoconfiança suficiente para liderar sem gerar competição de ego com os liderados.');
      constructivePotentials.push('Postura corporativa equilibrada, aliando boa presença executiva à acessibilidade interpessoal.');
      pointsOfAttention.push('Cuidar para não recuar excessivamente diante de personalidades com narcisismo dominante.');
      interpersonalDynamics =
        'Mantém pontes de respeito mútuo, sem submissão nem prepotência nas interações.';
      decisionMakingImpact =
        'Pondera a relevância do resultado e o alinhamento com os objetivos estratégicos da organização.';
      developmentGuidance.push('Continuar exercitando o protagonismo colaborativo como marca de liderança madura.');
    }
  } else {
    // psychopathy
    whatItMeasures =
      'A Psicopatia Subclínica avalia traços não clínicos relacionados à reduzida reatividade afetiva ao sofrimento alheio, tolerância singular ao risco e à pressão, impulsividade comportamental e menor apego a convenções sociais inibitórias. Reafirma-se categoricamente: este escore NÃO constitui diagnóstico de transtorno de personalidade antissocial.';

    individualResultExplanation = `Com pontuação média de ${score.mean.toFixed(2)} (${score.normalizedPercent.toFixed(1)}% normalizado), o participante enquadra-se no nível ${level.toUpperCase()}${
      isDominant ? ' (sua dimensão mais destacada)' : isLowest ? ' (sua dimensão mais baixa entre as três)' : ''
    }. Este resultado indica ${
      level === 'elevado'
        ? 'uma marcante frieza emocional sob estresse agudo, audácia para tomar decisões difíceis sem hesitação paralisante e disposição para desafiar normas estabelecidas, demandando autodisciplina no trato humano.'
        : level === 'baixo'
        ? 'uma sensibilidade empática evidente, respeito escrupuloso a regras e fronteiras institucionais, aversão a conflitos desnecessários e grande consideração pelas consequências de seus atos sobre terceiros.'
        : 'uma dosagem equilibrada entre sensibilidade empática e firmeza de comando, permitindo aplicar medidas duras quando imperativo sem desumanizar o interlocutor.'
    }`;

    if (level === 'elevado') {
      everydayManifestations.push('Capacidade incomum de manter a pulsação serena e o foco em meio a crises agudas ou confrontos acalorados.');
      everydayManifestations.push('Prontidão para cortar custos, encerrar contratos ou desligar pessoas sem sofrimento paralisante.');
      everydayManifestations.push('Tolerância acentuada a riscos e pouca preocupação com a desaprovação de figuras de autoridade.');
      constructivePotentials.push('Imunidade à paralisia por análise diante de situações emergenciais e hostis.');
      constructivePotentials.push('Coragem para romper paradigmas arcaicos e implementar mudanças que outros evitam por receio de desgaste.');
      constructivePotentials.push('Resiliência estoica diante de fracassos ou perdas, recuperando a iniciativa com rapidez.');
      pointsOfAttention.push('Risco de insensibilidade ao impacto psicológico de suas decisões sobre a vida de terceiros.');
      pointsOfAttention.push('Impaciência com processos formais, governança ou limites éticos vistos como "entraves burocráticos".');
      pointsOfAttention.push('Possível reação desproporcional ou implacável diante de afrontas e quebras de acordo.');
      interpersonalDynamics =
        'As relações são vividas com baixa carga emocional e dependência afetiva. Pode ser percebido como frio, inacessível ou desconectado das dores da equipe.';
      decisionMakingImpact =
        'Decisões rápidas, desprovidas de sentimentalismo e com alto apetite para o risco calculado (ou mesmo ousado), necessitando de freios colegiados de conformidade.';
      developmentGuidance.push('Integrar consultas formais de "impacto humano" antes de deliberar cortes ou reestruturações radicais.');
      developmentGuidance.push('Praticar ativamente o controle inibitório e a escuta empática para prevenir litígios e rupturas abruptas.');
    } else if (level === 'baixo') {
      everydayManifestations.push('Preocupação imediata e espontânea com o impacto de suas palavras e decisões no bem-estar alheio.');
      everydayManifestations.push('Respeito natural às normas, compliance, limites legais e integridade das regras do jogo.');
      everydayManifestations.push('Cautela diante de cenários perigosos ou incertezas operacionais graves.');
      constructivePotentials.push('Cuidado ético intransigente, tornando-se um fiador da integridade corporativa.');
      constructivePotentials.push('Empatia genuína que cria lealdade profunda e fidelidade nos times de trabalho.');
      constructivePotentials.push('Gestão de riscos prudente, protegendo o patrimônio e a estabilidade da instituição.');
      pointsOfAttention.push('Risco de sofrimento emocional excessivo ao ter de tomar decisões inevitavelmente duras (como demissões).');
      pointsOfAttention.push('Hesitação em assumir riscos estratégicos audaciosos exigidos em momentos de disrupção de mercado.');
      pointsOfAttention.push('Vulnerabilidade ao estresse vicário ao absorver as angústias dos liderados ou clientes.');
      interpersonalDynamics =
        'Vínculos profundos, fundamentados na lealdade recíproca, empatia afetiva e proteção mútua.';
      decisionMakingImpact =
        'As decisões priorizam a estabilidade, a segurança jurídica e a minimização de traumas humanos na organização.';
      developmentGuidance.push('Trabalhar a capacidade de distanciamento operacional para deliberar medidas difíceis com serenidade, sem se culpar.');
      developmentGuidance.push('Calibrar a ousadia comercial, permitindo-se aceitar riscos controlados com plano de contingência.');
    } else {
      everydayManifestations.push('Comportamento equilibrado sob pressão, sem desespero nem frieza desmedida.');
      everydayManifestations.push('Respeito às regras sem apego cego a burocracias que asfixiem a inovação.');
      everydayManifestations.push('Atenção ao fator humano sem perder a clareza dos objetivos de negócio.');
      constructivePotentials.push('Equilíbrio entre firmeza disciplinar e respeito acolhedor às pessoas.');
      constructivePotentials.push('Tomada de risco calibrada e sustentável no médio e longo prazo.');
      pointsOfAttention.push('Manter a vigília constante entre a razão instrumental e a consideração humana.');
      interpersonalDynamics =
        'Acessível e confiável, estabelecendo limites profissionais claros sem frieza desnecessária.';
      decisionMakingImpact =
        'Decide considerando a viabilidade técnica e os reflexos nas pessoas envolvidas.';
      developmentGuidance.push('Continuar refinando a inteligência emocional em negociações sob estresse.');
    }
  }

  return {
    dimension: key,
    whatItMeasures,
    individualResultExplanation,
    everydayManifestations,
    constructivePotentials,
    pointsOfAttention,
    interpersonalDynamics,
    decisionMakingImpact,
    developmentGuidance
  };
}

/**
 * Constrói as 6 macroáreas de Aplicação Empresarial
 */
function buildBusinessApplications(scores: Record<DimensionKey, DimensionScore>): BusinessApplicationArea[] {
  const m = scores.machiavellianism;
  const n = scores.narcissism;
  const p = scores.psychopathy;

  return [
    {
      id: 'lideranca',
      title: '1. Liderança e Exercício da Autoridade',
      description: 'Como os traços do participante moldam a influência, a delegação, a relação com o poder e a atenção às necessidades do time.',
      favorableTendencies: [
        m.mean > 3.0 ? 'Capacidade apurada de articulação política com instâncias superiores e conselhos.' : 'Liderança transparente, que constrói credibilidade por coerência direta.',
        n.mean > 3.0 ? 'Habilidade para inspirar pelo exemplo, carisma e presença marcante em palcos e negociações.' : 'Liderança servidora, que capacita o time e não rouba o mérito alheio.',
        p.mean > 3.0 ? 'Firmeza para sustentar rumos estratégicos mesmo em tempestades institucionais severas.' : 'Cuidado constante com o clima emocional e a saúde mental da equipe.'
      ],
      behavioralRisks: [
        m.mean > 3.5 ? 'Centralização de dados estratégicos, criando silos de dependência no líder.' : 'Subestimação de dinâmicas de poder concorrentes no ambiente corporativo.',
        n.mean > 3.5 ? 'Dificuldade em aceitar ideias divergentes que ofusquem o protagonismo pessoal.' : 'Pouca visibilidade dada aos projetos da equipe perante a alta gestão.',
        p.mean > 3.5 ? 'Comunicação ríspida ou excessivamente impositiva em momentos de cobrança de metas.' : 'Hesitação em substituir profissionais que não entregam o combinado por apego afetivo.'
      ],
      contextScenarios: [
        'Transições de estrutura organizacional ou definição de novas lideranças setoriais.',
        'Reuniões de alinhamento com conselheiros, acionistas e comitês executivos.'
      ],
      reflectionQuestions: [
        'Sua autoridade decorre do medo de suas retaliações, do brilho da sua figura ou da solidez técnica do seu propósito?',
        'O quanto seu time se sente livre para dizer que você está equivocado sem temer consequências veladas?'
      ],
      developmentRecommendations: [
        'Estabelecer rituais sistemáticos de cocriação onde outros membros assumam a condução formal das pautas.',
        'Auditar periodicamente o nível de segurança psicológica que o seu estilo de liderança imprime na rotina.'
      ]
    },
    {
      id: 'gestao_pessoas',
      title: '2. Gestão de Pessoas e Clima Organizacional',
      description: 'Impactos potenciais na confiança mútua, cooperação voluntária, resolução de atritos e retenção de talentos.',
      favorableTendencies: [
        'Capacidade de alocar talentos em posições onde suas competências táticas gerem máximo rendimento.',
        'Foco na entrega técnica e na responsabilização objetiva por resultados contratuais.',
        'Clareza quanto ao que a organização espera de cada colaborador.'
      ],
      behavioralRisks: [
        m.mean > 3.2 ? 'Percepção de relações utilitárias, onde colaboradores sentem que seu valor dura apenas enquanto são úteis.' : 'Excesso de complacência com atrasos reiterados.',
        n.mean > 3.2 ? 'Sensação de competição entre o líder e os liderados mais brilhantes do setor.' : 'Não celebrar vitórias do time por considerar que o dever cumprido não exige festa.',
        p.mean > 3.2 ? 'Desgaste relacional crônico, gerando absenteísmo e rotatividade (turnover) silenciosa.' : 'Exaustão pessoal por absorver conflitos alheios como se fossem próprios.'
      ],
      contextScenarios: [
        'Ciclos de avaliação de desempenho e planos de sucessão de carreira.',
        'Mediação de impasses interpessoais ou disputas por recursos orçamentários escassos.'
      ],
      reflectionQuestions: [
        'Você valoriza as pessoas pelo que elas são ou estritamente pelo que elas podem produzir para os seus objetivos?',
        'Quando um liderado seu se destaca nacionalmente, sua primeira reação espontânea é orgulho ou desconforto?'
      ],
      developmentRecommendations: [
        'Desenvolver uma política formal de reconhecimento de contribuições individuais ancorada em critérios transparentes.',
        'Instituir canais confidenciais de escuta para monitorar o desgaste e o estresse dos times.'
      ]
    },
    {
      id: 'tomada_decisao',
      title: '3. Tomada de Decisão e Gestão de Riscos',
      description: 'Pragmatismo, velocidade de resposta, apetite ao risco e equilíbrio entre metas numéricas e impactos sistêmicos.',
      favorableTendencies: [
        'Desprendimento para deliberar sob incerteza sem se deixar contaminar pelo ruído emocional.',
        'Foco no retorno sobre investimento (ROI) e na eficiência alocativa dos recursos.',
        'Agilidade de execução que impede a perda de oportunidades estratégicas de mercado.'
      ],
      behavioralRisks: [
        'Decisões puramente transacionais que ignoram o passivo trabalhista ou reputacional no longo prazo.',
        'Tendência a cortar investimentos em cultura ou desenvolvimento sob pretexto de contingenciamento emergencial.',
        'Desprezo por pareceres jurídicos ou de conformidade que apontem riscos de conduta.'
      ],
      contextScenarios: [
        'Momentos de crise de caixa ou renegociação de passivos corporativos com credores.',
        'Lançamento de produtos disruptivos ou entrada agressiva em novos territórios comerciais.'
      ],
      reflectionQuestions: [
        'Quais variáveis humanas silenciosas você costuma descartar das suas planilhas de tomada de decisão?',
        'Sua velocidade de decisão representa agilidade estratégica ou impaciência com o contraditório técnico?'
      ],
      developmentRecommendations: [
        'Implementar comitês de "Advogado do Diabo" com poder de veto preventivo em investimentos arriscados.',
        'Adotar matrizes de impacto multidimensional (financeiro, relacional, legal e ético).'
      ]
    },
    {
      id: 'negociacao',
      title: '4. Negociação Estratégica e Influência Interpessoal',
      description: 'Capacidade de persuasão, leitura do outro na mesa de acordos, gestão de informações e sustentabilidade de parcerias.',
      favorableTendencies: [
        'Habilidade de manter o controle emocional estrito mesmo em mesas tensas e agressivas.',
        'Antecipação inteligente dos interesses e das fraquezas da outra parte negociadora.',
        'Firmeza na defesa das margens e dos interesses da própria organização.'
      ],
      behavioralRisks: [
        m.mean > 3.5 ? 'Uso de artifícios excessivamente ardilosos que podem quebrar a confiança se descobertos.' : 'Ceder margens estratégicas para agradar o interlocutor.',
        n.mean > 3.5 ? 'Transformar a negociação em um embate de ego pessoal, perdendo o foco na rentabilidade do acordo.' : 'Não valorizar a força e o tamanho da sua própria empresa na mesa.',
        p.mean > 3.5 ? 'Postura de intimidação que impede a celebração de novos contratos no futuro.' : 'Aceitar cláusulas desfavoráveis por desconforto em dizer "não" de forma enfática.'
      ],
      contextScenarios: [
        'Fusões, aquisições e parcerias internacionais de longo prazo.',
        'Fechamento de grandes contratos comerciais com fornecedores estratégicos.'
      ],
      reflectionQuestions: [
        'Depois de fechar um acordo, a outra parte sai da mesa respeitando sua seriedade ou se sentindo ludibriada?',
        'O quanto você é capaz de recuar em pontos secundários para viabilizar um ganho sistêmico maior?'
      ],
      developmentRecommendations: [
        'Focar na negociação por princípios (metodologia de Harvard), buscando acordos ganha-ganha sustentáveis.',
        'Documentar detalhadamente todas as premissas acordadas para evitar ambiguidades interpretativas futuras.'
      ]
    },
    {
      id: 'cultura_organizacional',
      title: '5. Cultura e Segurança Psicológica',
      description: 'Influência dos traços sobre os valores vividos, o grau de competição interna e a responsabilidade coletiva.',
      favorableTendencies: [
        'Estímulo ao alto rendimento, superação de metas e valorização de profissionais excepcionais.',
        'Quebra de comodismo e dinamismo na busca por inovação constante.',
        'Clareza quanto ao compromisso com a viabilidade econômica do negócio.'
      ],
      behavioralRisks: [
        'Estímulo inadvertido a uma atmosfera de competição canibalística entre departamentos.',
        'Cultura de desconfiança mútua, onde funcionários gastam mais tempo se blindando por e-mail do que cooperando.',
        'Normalização do silêncio sobre erros por receio de punições desmedidas.'
      ],
      contextScenarios: [
        'Integração de novas equipes após processos de fusão e aquisição.',
        'Revisão do código de ética e governança institucional da empresa.'
      ],
      reflectionQuestions: [
        'A cultura que você fomenta incentiva a excelência colaborativa ou a sobrevivência do mais astuto?',
        'As pessoas trabalham com você por admiração autêntica ou por cálculo de autopreservação?'
      ],
      developmentRecommendations: [
        'Celebrar explicitamente atos de cooperação desinteressada e compartilhamento de conhecimento entre equipes.',
        'Instituir políticas formais de aprendizado com o erro, dissociando falhas experimentais de punição sumária.'
      ]
    },
    {
      id: 'empreendedorismo',
      title: '6. Sociedade e Empreendedorismo',
      description: 'Ambição, resiliência perante o fracasso, postura em contratos societários e harmonia entre crescimento e responsabilidade.',
      favorableTendencies: [
        'Audácia para desbravar mercados inexplorados e desafiar incumbentes consolidados.',
        'Resiliência singular perante reveses econômicos, sem desespero emocional paralisante.',
        'Capacidade de atrair investidores por meio de uma visão de futuro ousada e instigante.'
      ],
      behavioralRisks: [
        'Conflitos societários graves decorrentes de divergências de valores éticos ou repartição de méritos.',
        'Crescimento a qualquer custo, atropelando conformidade ambiental, fiscal ou regulatória.',
        'Dificuldade de transitar da fase empreendedora fundadora para a governança corporativa profissional.'
      ],
      contextScenarios: [
        'Entrada de novos sócios investidores (Venture Capital / Private Equity).',
        'Acordos de sócios com cláusulas de saída (Tag along / Drag along) e governança de dividendos.'
      ],
      reflectionQuestions: [
        'Seus sócios confiam em você na mesma proporção em que admiram sua competência comercial?',
        'O que sustentará o seu legado empresarial quando a urgência do retorno financeiro imediato arrefecer?'
      ],
      developmentRecommendations: [
        'Firmar acordos de sócios blindados com regras claras de arbitragem e deliberação colegiada.',
        'Investir na estruturação de um conselho de administração independente com conselheiros com valores complementares.'
      ]
    }
  ];
}

/**
 * Constrói as recomendações de autoconhecimento e o plano prático de desenvolvimento
 */
function buildSelfKnowledge(
  scores: Record<DimensionKey, DimensionScore>,
  pattern: TriadPatternAnalysis
) {
  const m = scores.machiavellianism;
  const n = scores.narcissism;
  const p = scores.psychopathy;

  const observablePatterns: string[] = [];
  const strengthsToDirect: string[] = [];
  const blindSpots: string[] = [];

  if (m.intensityLevel === 'elevado') {
    observablePatterns.push('Você tende a processar interações sociais sob o prisma da utilidade futura e da salvaguarda de posições.');
    strengthsToDirect.push('Sua capacidade de leitura tática de cenários pode ser um ativo monumental se empregada em defesa da instituição e não apenas em benefício individual.');
    blindSpots.push('Você pode não notar que outras pessoas sentem a frieza de suas sondagens e passam a agir de forma defensiva com você.');
  } else if (m.intensityLevel === 'baixo') {
    observablePatterns.push('Você tende a esperar que os outros se comuniquem com a mesma sinceridade límpida com que você se expressa.');
    strengthsToDirect.push('Sua transparência natural cria laços de fidelidade duradouros e desfaz conspirações no ambiente.');
    blindSpots.push('Pode ignorar jogos de bastidores evidentes, sendo pego de surpresa por manobras de atores mais maquiavélicos.');
  } else {
    observablePatterns.push('Você consegue alternar entre a reserva profissional e a abertura sincera com razoável naturalidade.');
    strengthsToDirect.push('Sua diplomacia equilibrada permite mediar conflitos sem parecer cínico nem ingênuo.');
  }

  if (n.intensityLevel === 'elevado') {
    observablePatterns.push('O reconhecimento do seu valor é um combustível vital; a indiferença alheia o afeta mais do que a oposição direta.');
    strengthsToDirect.push('Sua energia de protagonismo tem poder inspirador para liderar transformações que exigem coragem e visibilidade.');
    blindSpots.push('Dificuldade em aceitar que uma ideia brilhante venha de um liderado e prospere sem o seu selo pessoal.');
  } else if (n.intensityLevel === 'baixo') {
    observablePatterns.push('Você sente desconforto com a autopromoção e prefere que o trabalho fale inteiramente por si mesmo.');
    strengthsToDirect.push('Sua humildade genuína neutraliza disputas de ego e atrai a simpatia e a lealdade da equipe.');
    blindSpots.push('Risco de ser preterido em promoções e visibilidade de carreira por excesso de discrição.');
  } else {
    observablePatterns.push('Você se sente bem quando reconhecido, mas não depende do aplauso para manter sua motivação de entrega.');
    strengthsToDirect.push('Autoconfiança serena que não necessita rebaixar ninguém para se afirmar.');
  }

  if (p.intensityLevel === 'elevado') {
    observablePatterns.push('Em situações extremas de estresse ou perigo, sua mente silencia e o foco na ação substitui o abalo emocional.');
    strengthsToDirect.push('Resiliência extraordinária para conduzir reorganizações difíceis e assumir responsabilidade por cortes que outros evitam.');
    blindSpots.push('Pode subestimar profundamente o trauma emocional e a dor que decisões duras geram nas pessoas ao redor.');
  } else if (p.intensityLevel === 'baixo') {
    observablePatterns.push('A empatia e o senso de dever moral guiam suas atitudes com rigor.');
    strengthsToDirect.push('Garantia de conduta ética inabalável e respeito irrestrito à dignidade das pessoas.');
    blindSpots.push('Pode sofrer demasiadamente por problemas alheios sobre os quais não possui controle direto.');
  } else {
    observablePatterns.push('Você mantém a sensibilidade humana sem perder a capacidade de cobrar resultados e aplicar limites.');
    strengthsToDirect.push('Firmeza equilibrada com respeito humano nas decisões de alta pressão.');
  }

  const reflectionQuestionsByDimension: Record<DimensionKey, string[]> = {
    machiavellianism: [
      'Em que momentos sua cautela estratégica se converte em desconfiança injustificada que afasta pessoas leais?',
      'Quando você decide reter uma informação relevante, seu objetivo é o bem da missão ou a preservação do seu poder pessoal?',
      'Se todas as suas conversas e acordos de bastidores fossem tornados públicos amanhã, sua autoridade moral permaneceria intacta?'
    ],
    narcissism: [
      'Quando você busca reconhecimento, você está celebrando o trabalho bem feito ou precisa que confirmem constantemente o seu valor?',
      'Como você lida com o sucesso estrondoso de um colega ou subordinado quando todos os elogios são direcionados a ele?',
      'O quanto de sua energia diária é gasto na gestão da sua própria imagem em vez da construção de resultados concretos?'
    ],
    psychopathy: [
      'Quando você toma uma decisão dura e necessária, você se assegura de tratar a dignidade dos impactados com humanidade?',
      'Sua coragem diante de riscos operacionais protege a organização ou expressa impaciência com regras de compliance?',
      'Você consegue ouvir a dor de um colaborador sem rotulá-lo sumariamente como fraco ou sentimentalista?'
    ]
  };

  const developmentPlan: DevelopmentRecommendation[] = [
    {
      priority: 1,
      behaviorToDevelop:
        pattern.dominantKey === 'machiavellianism'
          ? 'Prática de Transparência e Alianças Autênticas'
          : pattern.dominantKey === 'narcissism'
          ? 'Liderança Descentralizada e Reconhecimento do Time'
          : 'Compaixão Deliberada e Consulta de Impacto Humano',
      whyItMatters:
        'A dimensão predominante tende a orientar seus automatismos mentais. Harmonizá-la previne o isolamento e amplia a sustentabilidade da liderança.',
      actionableStep:
        pattern.dominantKey === 'machiavellianism'
          ? 'Compartilhar objetivos estratégicos de forma aberta com a equipe pelo menos uma vez por quinzena, sem reter detalhes essenciais.'
          : pattern.dominantKey === 'narcissism'
          ? 'Em reuniões públicas com superiores, citar nominalmente os membros da equipe que criaram as soluções apresentadas.'
          : 'Criar um checklist formal de impacto humano antes de assinar demissões ou reestruturações, ouvindo o RH com atenção.',
      applicationContext: 'Reuniões de gestão e definição de planos de ação departamentais.',
      growthIndicator: 'Aumento na pontuação de segurança psicológica e feedback positivo de abertura por parte do time.'
    },
    {
      priority: 2,
      behaviorToDevelop:
        pattern.lowestKey === 'machiavellianism'
          ? 'Fortalecimento da Leitura Política e Inteligência Tática'
          : pattern.lowestKey === 'narcissism'
          ? 'Posicionamento e Visibilidade Executiva Assertiva'
          : 'Distanciamento Emocional Saudável sob Pressão Operacional',
      whyItMatters:
        'A dimensão menos expressiva pode apontar um ponto de vulnerabilidade que outros atores podem explorar involuntariamente.',
      actionableStep:
        pattern.lowestKey === 'machiavellianism'
          ? 'Mapear os stakeholders críticos de projetos importantes antes de apresentá-los em comitês abertos.'
          : pattern.lowestKey === 'narcissism'
          ? 'Apresentar relatórios trimestrais com suas principais conquistas de liderança para a diretoria sem falsa modéstia.'
          : 'Praticar técnicas de regulação cognitiva e respiração para manter a serenidade ao comunicar demissões ou decisões impopulares.',
      applicationContext: 'Apresentações formais de resultados e momentos de negociação de recursos com a alta gestão.',
      growthIndicator: 'Menor incidência de surpresas táticas ou ganhos de autonomia na defesa de projetos.'
    },
    {
      priority: 3,
      behaviorToDevelop: 'Equilíbrio e Integração Sistêmica da Tríade',
      whyItMatters:
        'O verdadeiro amadurecimento reside na capacidade de mobilizar pragmatismo, ambição e firmeza a serviço de um propósito ético e perene.',
      actionableStep:
        'Adotar uma sessão mensal de autoavaliação com um mentor ou coach para rever decisões críticas do período.',
      applicationContext: 'Rotina mensal de governança pessoal e executiva.',
      growthIndicator: 'Estabilidade nos índices de clima e consistência de entregas no longo prazo.'
    }
  ];

  return {
    observablePatterns,
    strengthsToDirect,
    blindSpots,
    reflectionQuestionsByDimension,
    developmentPlan
  };
}

/**
 * Constrói o bloco técnico para Coaches, Consultores e Psicólogos
 */
function buildProfessionalPractitionersBlock(
  scores: Record<DimensionKey, DimensionScore>,
  pattern: TriadPatternAnalysis
): ProfessionalPractitionerBlock {
  const m = scores.machiavellianism;
  const n = scores.narcissism;
  const p = scores.psychopathy;

  return {
    forCoachesAndMentors: {
      investigationHypotheses: [
        `Explorar como o predomínio de ${DIMENSION_META[pattern.dominantKey].titlePt} se relaciona com o histórico de carreira e marcos de sobrevivência profissional do coachee.`,
        'Investigar eventuais episódios em que estratégias de influência ou necessidade de afirmação geraram rupturas ou descontentamentos velados.',
        'Checar a congruência entre o discurso de liderança colaborativa e a prática real de delegação e prestação de contas.'
      ],
      deepeningQuestions: [
        'Qual custo invisível você tem pago para sustentar o nível atual de controle e protagonismo que exerce?',
        'O que você teme que aconteça se decidir ser totalmente vulnerável e aberto com seus pares mais próximos?',
        'Qual legado você gostaria que sua equipe lembrasse após a sua saída da posição atual?'
      ],
      sessionWorkThemes: [
        'Transição do controle instrumental para a influência por autoridade moral e competência.',
        'Gestão e ressignificação de críticas e feedbacks desconfortáveis.',
        'Construção de planos de desenvolvimento de sucessores sem competição inconsciente.'
      ],
      followUpGuidance: [
        'Utilizar avaliações 360º complementares para confrontar a autopercepção com a percepção dos liderados.',
        'Acompanhar a evolução dos indicadores do Plano de Desenvolvimento ao longo de 6 meses.'
      ]
    },
    forBusinessConsultants: {
      managementImpacts: [
        `No modelo de governança, o perfil com dominância em ${DIMENSION_META[pattern.dominantKey].titlePt} tende a imprimir agilidade de resposta, porém requer salvaguardas de conformidade para evitar concentração excessiva de poder.`,
        'Em processos de fusão e aquisição, este perfil atua com competência técnica para defender a tese do negócio, mas pode gerar resistências na aculturação da equipe absorvida.',
        'Recomenda-se balancear a diretoria executiva com perfis complementares que assegurem estabilidade e foco nas relações humanas.'
      ],
      leadershipDynamics: [
        'Risco de formação de "panelas" ou grupos de confiança fechados baseados em alinhamento político em detrimento de competência técnica.',
        'Necessidade de clareza nas metas para que a ambição individual canalize energia exclusivamente para os KPIs institucionais.'
      ],
      cultureRisks: [
        'Erosão da segurança psicológica caso a equipe sinta que qualquer erro é punido sumariamente.',
        'Tendência a uma cultura transacional em que a lealdade dos colaboradores é frágil e volátil.'
      ],
      organizationalObservationPoints: [
        'Monitorar taxas de turnover em departamentos sob a liderança direta do participante.',
        'Verificar se os comitês de compliance possuem independência para revisar projetos liderados por ele.'
      ]
    },
    forPsychologicalProfessionals: {
      constructDefinitions: [
        'Maquiavelismo: Construto psicométrico de orientação cognitiva-estratégica, caracterizado por pragmatismo interpessoal, cinismo adaptativo e instrumentalização de vínculos (Paulhus & Williams, 2002; Jones & Paulhus, 2014).',
        'Narcisismo: Medida subclínica de grandiosidade, autorreforço, necessidade de admiração e sensibilidade a ameaças ao ego (Raskin & Terry, 1988; Jones & Paulhus, 2014).',
        'Psicopatia Subclínica: Faceta comportamental não psiquiátrica de desinibição, baixa reatividade empática e busca de sensações em populações funcionais normativas (Hare, 1991; Jones & Paulhus, 2014).'
      ],
      quantitativeSynthesis: `Escores brutos e médias obtidas: Maquiavelismo = ${m.mean.toFixed(2)} (Percentual Normalizado = ${m.normalizedPercent.toFixed(1)}%); Narcisismo = ${n.mean.toFixed(2)} (Percentual Normalizado = ${n.normalizedPercent.toFixed(1)}%); Psicopatia Subclínica = ${p.mean.toFixed(2)} (Percentual Normalizado = ${p.normalizedPercent.toFixed(1)}%). Dispersão máxima interna (spread) = ${pattern.scoreSpread.toFixed(2)} pontos na escala Likert 1-5.`,
      interpretativeLimits: [
        'O SD3 é uma medida breve de autorrelato (self-report) e não constitui, isoladamente, diagnóstico de qualquer patologia mental ou transtorno de personalidade constante na CID-11 ou DSM-5.',
        'As pontuações devem ser lidas exclusivamente como indicadores de tendências e preferências disposicionais no contexto do desenvolvimento de competências humanas e profissionais.',
        'Fatores como desejabilidade social, viés de resposta e contexto situacional de pressão avaliativa devem ser sopesados na entrevista devolutiva.'
      ],
      complementaryInterviewHypotheses: [
        'Verificar a consistência dos relatos de autoeficácia com evidências comportamentais históricas comprovadas.',
        'Investigar a presença de sofrimento psíquico subjetivo ou ansiedade gerada pela sustentação de padrões de alta demanda ou isolamento relacional.',
        'Avaliar o grau de flexibilidade e repertório adaptativo diante de ambientes que demandam altruísmo recíproco e vulnerabilidade.'
      ],
      ethicalDisclaimer:
        'Aviso de Ética e Responsabilidade Técnica: Este instrumento do Assessment COMET (Área ORIGEM) destina-se a fins de desenvolvimento pessoal, autoconhecimento, orientação executiva e consultoria organizacional. É vedada sua utilização como único critério para demissão, exclusão de processos seletivos ou diagnósticos clínicos.'
    }
  };
}

/**
 * Constrói a Síntese Executiva final
 */
function buildExecutiveSummary(
  scores: Record<DimensionKey, DimensionScore>,
  pattern: TriadPatternAnalysis
): ExecutiveSummary {
  const domMeta = DIMENSION_META[pattern.dominantKey];
  const lowMeta = DIMENSION_META[pattern.lowestKey];

  const coreCharacteristic =
    pattern.dominantKey === 'machiavellianism'
      ? 'Pragmatismo tático e capacidade de orquestrar movimentos com cálculo e cautela política apurada.'
      : pattern.dominantKey === 'narcissism'
      ? 'Expressiva energia de protagonismo, ambição declarada e busca contínua por prestígio e excelência de impacto.'
      : 'Notável serenidade sob pressão extrema, firmeza de deliberação e tolerância diferenciada a riscos operacionais.';

  const keyPotentialToHarness =
    pattern.dominantKey === 'machiavellianism'
      ? 'Liderar negociações complexas e proteger a organização em ambientes concorrenciais hostis com discernimento estratégico.'
      : pattern.dominantKey === 'narcissism'
      ? 'Inspirar equipes rumo a visões grandiosas de crescimento e personificar com vigor o valor da marca no mercado.'
      : 'Comandar reestruturações emergenciais e tomar medidas difíceis com rapidez e sem paralisia decisória.';

  const primaryAttentionPoint =
    pattern.dominantKey === 'machiavellianism'
      ? 'Evitar que a prudência tática se transforme em cinismo relacional ou cause sensação de desconfiança nos liderados.'
      : pattern.dominantKey === 'narcissism'
      ? 'Assegurar que a busca por destaque não ofusque as contribuições da equipe nem gere defensividade a feedbacks corretivos.'
      : 'Garantir que a frieza sob pressão não seja percebida como insensibilidade e que a audácia respeite as diretrizes de governança.';

  const priorityDevelopmentAction =
    pattern.dominantKey === 'machiavellianism'
      ? 'Praticar abertura e transparência ativa nas decisões de rotina com o time direto.'
      : pattern.dominantKey === 'narcissism'
      ? 'Treinar a descentralização de holofotes, promovendo o protagonismo autônomo dos liderados.'
      : 'Instituir consultas sistemáticas de impacto humano antes da implementação de mudanças operacionais duras.';

  const centralReflectionQuestion =
    pattern.dominantKey === 'machiavellianism'
      ? 'Como você pode colocar sua extraordinária capacidade estratégica integralmente a serviço da longevidade e da verdade da organização?'
      : pattern.dominantKey === 'narcissism'
      ? 'O que verdadeiramente sustenta seu valor quando o palco e os aplausos imediatos não estão disponíveis?'
      : 'Como você pode aliar sua coragem nas decisões difíceis a uma profunda reverência pela dignidade humana daqueles que caminham com você?';

  const concludingSynthesisText = `O perfil do participante no SD3 expressa uma arquitetura psicológica marcada pelo predomínio de ${domMeta.titlePt} (${scores[pattern.dominantKey].mean.toFixed(2)}) e pela menor ênfase em ${lowMeta.titlePt} (${scores[pattern.lowestKey].mean.toFixed(2)}). Quando bem direcionada com maturidade e princípios éticos claros, essa composição constitui um diferencial competitivo expressivo para a alta performance executiva, gerando resultados substanciais sem comprometer o tecido relacional da organização.`;

  return {
    predominantDimension: domMeta.titlePt,
    leastExpressiveDimension: lowMeta.titlePt,
    coreCharacteristic,
    keyPotentialToHarness,
    primaryAttentionPoint,
    priorityDevelopmentAction,
    centralReflectionQuestion,
    concludingSynthesisText
  };
}

/**
 * Função principal que gera o relatório completo de 8 seções a partir das respostas do teste
 */
export function generateFullReport(
  participantName: string,
  rawAnswers: Record<number, number>,
  correctedAnswers: Record<number, number>,
  scores: Record<DimensionKey, DimensionScore>,
  pattern: TriadPatternAnalysis,
  evaluatorName?: string,
  participantRole?: string,
  organization?: string
): SD3ReportData {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(now);

  const dimensionsAnalysis: Record<DimensionKey, DimensionAnalysis> = {
    machiavellianism: buildDimensionAnalysis('machiavellianism', scores.machiavellianism, pattern),
    narcissism: buildDimensionAnalysis('narcissism', scores.narcissism, pattern),
    psychopathy: buildDimensionAnalysis('psychopathy', scores.psychopathy, pattern)
  };

  const businessApplications = buildBusinessApplications(scores);
  const selfKnowledge = buildSelfKnowledge(scores, pattern);
  const professionalPractitioners = buildProfessionalPractitionersBlock(scores, pattern);
  const executiveSummary = buildExecutiveSummary(scores, pattern);

  return {
    id: `sd3-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: now.toISOString(),
    formattedDate,
    participantName: participantName.trim() || 'Participante Avaliado(a)',
    evaluatorName: evaluatorName?.trim(),
    participantRole: participantRole?.trim(),
    organization: organization?.trim(),
    instrumentName: 'SD3 — Short Dark Triad',
    instrumentSource: 'Jones, D. N., & Paulhus, D. L. (2014)',
    translationVersion: 'COMET-PTBR-v1.0 (Fidelidade Semântica Integral)',
    answersRaw: rawAnswers,
    answersCorrected: correctedAnswers,
    scores,
    pattern,
    dimensionsAnalysis,
    businessApplications,
    selfKnowledge,
    professionalPractitioners,
    executiveSummary
  };
}
