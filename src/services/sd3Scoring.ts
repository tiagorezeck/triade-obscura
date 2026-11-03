/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIMENSION_META, REVERSED_ITEM_IDS, SD3_QUESTIONS } from '../data/sd3Questions';
import { DimensionKey, DimensionScore, TriadPatternAnalysis } from '../types/sd3';

/**
 * Corrige uma resposta individual com base no algoritmo do SD3.
 * Questões 11, 15, 17, 20, 25 são invertidas pela fórmula: 6 - resposta original.
 */
export function correctSingleAnswer(questionId: number, rawAnswer: number): number {
  if (REVERSED_ITEM_IDS.includes(questionId)) {
    return 6 - rawAnswer;
  }
  return rawAnswer;
}

/**
 * Retorna o mapa completo de respostas brutas corrigidas.
 */
export function calculateCorrectedAnswers(rawAnswers: Record<number, number>): Record<number, number> {
  const corrected: Record<number, number> = {};
  for (const q of SD3_QUESTIONS) {
    const raw = rawAnswers[q.id] ?? 3; // fallback neutro caso ausente
    corrected[q.id] = correctSingleAnswer(q.id, raw);
  }
  return corrected;
}

/**
 * Calcula os escores psicométricos das três dimensões do SD3.
 */
export function calculateDimensionScores(
  rawAnswers: Record<number, number>,
  correctedAnswers: Record<number, number>
): Record<DimensionKey, DimensionScore> {
  const keys: DimensionKey[] = ['machiavellianism', 'narcissism', 'psychopathy'];
  const partialScores: Record<DimensionKey, { rawSum: number; correctedSum: number; mean: number; normPct: number }> = {
    machiavellianism: { rawSum: 0, correctedSum: 0, mean: 0, normPct: 0 },
    narcissism: { rawSum: 0, correctedSum: 0, mean: 0, normPct: 0 },
    psychopathy: { rawSum: 0, correctedSum: 0, mean: 0, normPct: 0 }
  };

  for (const key of keys) {
    const meta = DIMENSION_META[key];
    let rSum = 0;
    let cSum = 0;
    for (const qId of meta.itemIndices) {
      rSum += rawAnswers[qId] ?? 3;
      cSum += correctedAnswers[qId] ?? 3;
    }
    const mean = Number((cSum / 9).toFixed(2));
    const normPct = Number((((mean - 1) / 4) * 100).toFixed(1));
    partialScores[key] = {
      rawSum: rSum,
      correctedSum: cSum,
      mean,
      normPct: Math.max(0, Math.min(100, normPct))
    };
  }

  // Ordenar para determinar o ranking interno relativo (1º, 2º, 3º lugar do próprio participante)
  const sorted = keys.slice().sort((a, b) => partialScores[b].mean - partialScores[a].mean);

  const finalScores = {} as Record<DimensionKey, DimensionScore>;
  for (const key of keys) {
    const p = partialScores[key];
    const rank = sorted.indexOf(key) + 1;
    let intensity: 'baixo' | 'moderado' | 'elevado' = 'moderado';
    if (p.mean < 2.5) {
      intensity = 'baixo';
    } else if (p.mean > 3.5) {
      intensity = 'elevado';
    }

    const reversedInDim = SD3_QUESTIONS.filter(
      (q) => q.dimension === key && q.isReversed
    ).length;

    finalScores[key] = {
      key,
      titlePt: DIMENSION_META[key].titlePt,
      titleEn: DIMENSION_META[key].titleEn,
      mean: p.mean,
      normalizedPercent: p.normPct,
      rawSum: p.rawSum,
      correctedSum: p.correctedSum,
      itemCount: 9,
      reversedItemsCount: reversedInDim,
      intensityLevel: intensity,
      relativeRank: rank
    };
  }

  return finalScores;
}

/**
 * Analisa o padrão de integração e distâncias da Tríade.
 */
export function analyzeTriadPattern(scores: Record<DimensionKey, DimensionScore>): TriadPatternAnalysis {
  const m = scores.machiavellianism.mean;
  const n = scores.narcissism.mean;
  const p = scores.psychopathy.mean;

  const entries: { key: DimensionKey; mean: number }[] = [
    { key: 'machiavellianism', mean: m },
    { key: 'narcissism', mean: n },
    { key: 'psychopathy', mean: p }
  ];
  entries.sort((a, b) => b.mean - a.mean);

  const dominantKey = entries[0].key;
  const lowestKey = entries[2].key;
  const scoreSpread = Number((entries[0].mean - entries[2].mean).toFixed(2));

  const isAllElevated = m > 3.5 && n > 3.5 && p > 3.5;
  const isAllLow = m < 2.5 && n < 2.5 && p < 2.5;
  const isAllModerate = m >= 2.5 && m <= 3.5 && n >= 2.5 && n <= 3.5 && p >= 2.5 && p <= 3.5;

  let patternLabel = '';
  let patternSummary = '';
  let detailedInteractionText = '';
  const riskHypotheses: string[] = [];
  const constructiveAvenues: string[] = [];

  if (isAllElevated) {
    patternLabel = 'Tríade Concomitantemente Expressiva';
    patternSummary = 'Manifestação conjunta e intensa de pensamento estratégico, busca por protagonismo e baixa inibição emocional.';
    detailedInteractionText =
      'O perfil indica a coexistência de acentuada capacidade de leitura de cenários (Maquiavelismo), forte impulso por validação e destaque (Narcisismo) e desprendimento de convenções ou menor suscetibilidade a culpas (Psicopatia Subclínica). Em ambientes de alta pressão, essa configuração confere velocidade de deliberação incomparável, mas exige constante vigilância ética para não comprometer a sustentabilidade dos vínculos humanos e a segurança psicológica do entorno.';
    riskHypotheses.push('Risco de instrumentalização severa de colaboradores sob pretexto de urgência de resultados.');
    riskHypotheses.push('Dificuldade de reconhecer vulnerabilidades e limitações pessoais decorrente da autopercepção hipertrofiada.');
    riskHypotheses.push('Possível desgaste relacional precoce em parcerias de longo prazo por aparente frieza ou personalismo.');
    constructiveAvenues.push('Canalizar o apetite por liderança para metas institucionais complexas com conselho consultivo forte.');
    constructiveAvenues.push('Adotar mecanismos transparentes de prestação de contas que restrinjam impulsos unilaterais.');
  } else if (isAllLow) {
    patternLabel = 'Perfil de Moderação Universal da Tríade';
    patternSummary = 'Baixa identificação com estratégias instrumentais, necessidade comedida de holofotes e expressiva sensibilidade interpessoal.';
    detailedInteractionText =
      'O participante apresenta escores moderadamente reduzidos ou baixos em todas as três vertentes. Isto não autoriza classificar a pessoa automaticamente como altruísta perfeita ou desprovida de ambição, mas sugere uma postura espontaneamente orientada à cooperação sincera, franqueza nas relações e desconforto com manobras políticas de bastidores ou teatralização da autoimagem.';
    riskHypotheses.push('Vulnerabilidade tática diante de interlocutores altamente manipuladores ou ambientes corporativos predatórios.');
    riskHypotheses.push('Tendência a postergar confrontos necessários ou hesitar em assumir o protagonismo por aversão à autopromoção.');
    constructiveAvenues.push('Fortalecer habilidades assertivas de negociação sem comprometer os valores éticos essenciais.');
    constructiveAvenues.push('Desenvolver presença executiva consciente para dar visibilidade justa às próprias entregas.');
  } else if (m > 3.4 && n > 3.4 && p <= 3.0) {
    patternLabel = 'Convergência Estratégico-Projetiva (Maquiavelismo + Narcisismo)';
    patternSummary = 'Aliança entre raciocínio calculista/político e forte aspiração por reconhecimento e status.';
    detailedInteractionText =
      'Combinação típica de personalidades que constroem cuidadosamente sua ascensão profissional. O narcisismo fornece a energia, a autoconfiança e a necessidade de aplauso, enquanto o maquiavelismo oferece a prudência, o controle da fala e a leitura de jogo necessária para não queimar pontes desnecessariamente. A psicopatia moderada ou baixa atua como elemento moderador, impedindo impulsividades destrutivas e preservando o senso de preservação reputacional.';
    riskHypotheses.push('Centralização da tomada de decisões e do reconhecimento dos méritos de projetos coletivos.');
    riskHypotheses.push('Construção de relacionamentos baseados na utilidade futura que o interlocutor pode prover.');
    constructiveAvenues.push('Direcionar a visão política para articulação institucional e expansão de mercado.');
    constructiveAvenues.push('Praticar ativamente o reconhecimento público e honesto da equipe.');
  } else if (n > 3.4 && p > 3.4 && m <= 3.0) {
    patternLabel = 'Padrão Audaz-Inibido de Fricção (Narcisismo + Psicopatia)';
    patternSummary = 'Forte impulso de autorrealização aliado a desinibição comportamental e audácia operacional.';
    detailedInteractionText =
      'Indica propensão a perseguir metas ambiciosas com pouca hesitação ou medo do ridículo/reprimenda. A combinação de autoimagem valorizada com menor preocupação pelas convenções externas propicia movimentos arrojados, porém expõe o profissional a erros por subestimar riscos operacionais ou atropelar sensibilidades do time.';
    riskHypotheses.push('Reações explosivas ou desdenhosas diante de críticas à sua performance.');
    riskHypotheses.push('Assunção de riscos financeiros ou operacionais desproporcionais para provar superioridade.');
    constructiveAvenues.push('Implantar rotinas de duplo-cheque antes de assinar compromissos de alta exposição.');
    constructiveAvenues.push('Contratar ou nomear conselheiros seniores que tenham autonomia irrestrita para contraditá-lo.');
  } else if (m > 3.4 && p > 3.4 && n <= 3.0) {
    patternLabel = 'Pragmatismo Incisivo e Frio (Maquiavelismo + Psicopatia)';
    patternSummary = 'Inteligência tática focada estritamente em metas e resultados, com escassa necessidade de bajulação.';
    detailedInteractionText =
      'Perfil caracterizado por pragmatismo implacável. Ao contrário do perfil narcisista, este participante não necessita ser o centro das atenções nem busca louros públicos vazios; interessa-lhe o controle dos recursos e a efetividade crua dos desfechos. Opera com frieza, compartimentação de informações e reduzida hesitação ética.';
    riskHypotheses.push('Criação involuntária de clima de desconfiança e tensão silenciosa na equipe.');
    riskHypotheses.push('Subestimação do fator humano e do bem-estar psicológico como motores de retenção de talentos.');
    constructiveAvenues.push('Utilizar essa clareza mental em diagnósticos de reestruturação de crise severa (turnaround).');
    constructiveAvenues.push('Exercitar a escuta ativa de impactos humanos antes da execução de cortes ou mudanças duras.');
  } else if (isAllModerate) {
    patternLabel = 'Equilíbrio Dinâmico Funcional';
    patternSummary = 'Traços distribuídos na faixa média, permitindo flexibilidade adaptativa dependendo das demandas do ambiente.';
    detailedInteractionText =
      'Os três fatores encontram-se em patamares medianos. Isso sugere que o profissional não adota uma postura rígida nem ingênua. Possui discernimento político para se proteger sem se tornar tóxico, possui ambição e amor-próprio sem descambar para o egocentrismo alienante, e consegue manter a cabeça fria sob tensão sem perder o respeito genuíno pelas pessoas.';
    riskHypotheses.push('Oscilação comportamental caso submetido a pressões extremas sem governança clara.');
    constructiveAvenues.push('Manter essa maturidade relacional como ancoradouro para mediar disputas na organização.');
  } else {
    patternLabel = `Diferenciação com Predomínio de ${DIMENSION_META[dominantKey].titlePt}`;
    patternSummary = `Apresenta o ${DIMENSION_META[dominantKey].titlePt} como vetor mais marcante, distanciando-se do ${DIMENSION_META[lowestKey].titlePt}.`;
    detailedInteractionText = `A configuração evidencia que a dimensão de ${DIMENSION_META[dominantKey].titlePt} é a lente primária pela qual o participante pondera prioridades e interações, enquanto o menor índice em ${DIMENSION_META[lowestKey].titlePt} modera eventuais excessos característicos desta última.`;
    riskHypotheses.push(`Tendência a superestimar abordagens ligadas a ${DIMENSION_META[dominantKey].titlePt} mesmo quando o contexto exigiria flexibilidade.`);
    constructiveAvenues.push(`Alavancar a competência de ${DIMENSION_META[dominantKey].titlePt} garantindo que ela sirva a objetivos comuns e perenes.`);
  }

  return {
    dominantKey,
    lowestKey,
    scoreSpread,
    patternLabel,
    patternSummary,
    detailedInteractionText,
    riskHypotheses,
    constructiveAvenues
  };
}
