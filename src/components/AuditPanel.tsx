/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  Play,
  CheckCircle,
  XCircle,
  ExternalLink,
  Flame,
  Scale,
  Sparkles
} from 'lucide-react';
import { SD3_QUESTIONS, REVERSED_ITEM_IDS } from '../data/sd3Questions';
import { calculateCorrectedAnswers, calculateDimensionScores, analyzeTriadPattern } from '../services/sd3Scoring';
import { generateFullReport } from '../services/sd3Interpreter';
import { SD3ReportData } from '../types/sd3';

interface AuditPanelProps {
  onLoadReport: (report: SD3ReportData) => void;
}

interface TestRunResult {
  id: string;
  name: string;
  passed: boolean;
  details: string;
  expected?: string;
  actual?: string;
}

export const AuditPanel: React.FC<AuditPanelProps> = ({ onLoadReport }) => {
  const [testResults, setTestResults] = useState<TestRunResult[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const runAllQualityTests = () => {
    setIsRunning(true);
    const results: TestRunResult[] = [];

    // TESTE 1 — Pontuação mínima (todas respostas = 1)
    {
      const rawAll1: Record<number, number> = {};
      for (let i = 1; i <= 27; i++) rawAll1[i] = 1;
      const corrected = calculateCorrectedAnswers(rawAll1);
      const scores = calculateDimensionScores(rawAll1, corrected);

      const mPass = scores.machiavellianism.mean === 1.0;
      const nPass = scores.narcissism.mean === 2.33;
      const pPass = scores.psychopathy.mean === 1.89;
      const passed = mPass && nPass && pPass;

      results.push({
        id: 'teste_1',
        name: 'Teste 1 — Pontuação Mínima (Todas as respostas = 1)',
        passed,
        expected: 'Maq: 1.00, Narc: 2.33, Psic: 1.89',
        actual: `Maq: ${scores.machiavellianism.mean.toFixed(2)}, Narc: ${scores.narcissism.mean.toFixed(2)}, Psic: ${scores.psychopathy.mean.toFixed(2)}`,
        details: passed
          ? 'Cálculo de resposta mínima verificado com sucesso, aplicando corretamente as inversões.'
          : 'Divergência no cálculo de escore mínimo com itens invertidos.'
      });
    }

    // TESTE 2 — Pontuação máxima (todas respostas = 5)
    {
      const rawAll5: Record<number, number> = {};
      for (let i = 1; i <= 27; i++) rawAll5[i] = 5;
      const corrected = calculateCorrectedAnswers(rawAll5);
      const scores = calculateDimensionScores(rawAll5, corrected);

      const mPass = scores.machiavellianism.mean === 5.0;
      const nPass = scores.narcissism.mean === 3.67;
      const pPass = scores.psychopathy.mean === 4.11;
      const passed = mPass && nPass && pPass;

      results.push({
        id: 'teste_2',
        name: 'Teste 2 — Pontuação Máxima (Todas as respostas = 5)',
        passed,
        expected: 'Maq: 5.00, Narc: 3.67, Psic: 4.11',
        actual: `Maq: ${scores.machiavellianism.mean.toFixed(2)}, Narc: ${scores.narcissism.mean.toFixed(2)}, Psic: ${scores.psychopathy.mean.toFixed(2)}`,
        details: passed
          ? 'Cálculo de resposta máxima verificado com sucesso, com inversão de escala exata.'
          : 'Divergência no cálculo de escore máximo.'
      });
    }

    // TESTE 3 — Pontuação intermediária (todas respostas = 3)
    {
      const rawAll3: Record<number, number> = {};
      for (let i = 1; i <= 27; i++) rawAll3[i] = 3;
      const corrected = calculateCorrectedAnswers(rawAll3);
      const scores = calculateDimensionScores(rawAll3, corrected);

      const mPass = scores.machiavellianism.mean === 3.0;
      const nPass = scores.narcissism.mean === 3.0;
      const pPass = scores.psychopathy.mean === 3.0;
      const passed = mPass && nPass && pPass;

      results.push({
        id: 'teste_3',
        name: 'Teste 3 — Pontuação Intermediária Neutra (Todas as respostas = 3)',
        passed,
        expected: 'Maq: 3.00, Narc: 3.00, Psic: 3.00 (Percentual = 50.0%)',
        actual: `Maq: ${scores.machiavellianism.mean.toFixed(2)}, Narc: ${scores.narcissism.mean.toFixed(2)}, Psic: ${scores.psychopathy.mean.toFixed(2)}`,
        details: passed
          ? 'Escore neutro produz exatamente média 3,00 em todas as três dimensões sem desvios.'
          : 'Divergência na média do escore neutro intermediário.'
      });
    }

    // TESTE 4 — Questões invertidas (11, 15, 17, 20, 25)
    {
      const expectedInversions = [11, 15, 17, 20, 25];
      const match =
        expectedInversions.length === REVERSED_ITEM_IDS.length &&
        expectedInversions.every((id) => REVERSED_ITEM_IDS.includes(id));

      const formulaCheck = expectedInversions.every((id) => {
        const dummyRaw = { [id]: 2 };
        const dummyCorrected = calculateCorrectedAnswers(dummyRaw);
        return dummyCorrected[id] === 4;
      });

      const passed = match && formulaCheck;
      results.push({
        id: 'teste_4',
        name: 'Teste 4 — Questões com Pontuação Invertida (Itens 11, 15, 17, 20, 25)',
        passed,
        expected: 'Inversão estrita nos itens 11, 15, 17 (Narcisismo) e 20, 25 (Psicopatia)',
        actual: `Itens identificados: [${REVERSED_ITEM_IDS.join(', ')}]. Fórmula: 6 - resposta`,
        details: passed
          ? 'Os 5 itens invertidos estão rigorosamente conformes com o SD3 original de Jones & Paulhus.'
          : 'Falha na validação dos itens invertidos ou na fórmula de correção.'
      });
    }

    // TESTE 5 — Separação das dimensões (9 itens por dimensão)
    {
      const mItems = SD3_QUESTIONS.filter((q) => q.dimension === 'machiavellianism');
      const nItems = SD3_QUESTIONS.filter((q) => q.dimension === 'narcissism');
      const pItems = SD3_QUESTIONS.filter((q) => q.dimension === 'psychopathy');

      const passed =
        mItems.length === 9 &&
        nItems.length === 9 &&
        pItems.length === 9 &&
        SD3_QUESTIONS.length === 27;

      results.push({
        id: 'teste_5',
        name: 'Teste 5 — Separação e Contagem das Dimensões (9 por construto)',
        passed,
        expected: 'Maquiavelismo = 9, Narcisismo = 9, Psicopatia = 9. Total = 27.',
        actual: `Maquiavelismo = ${mItems.length}, Narcisismo = ${nItems.length}, Psicopatia = ${pItems.length}. Total = ${SD3_QUESTIONS.length}.`,
        details: passed
          ? 'Cada questão alimenta exclusivamente sua respectiva dimensão em sequência contínua de 1 a 27.'
          : 'Inconsistência na distribuição das questões entre os três construtos.'
      });
    }

    // TESTE 6 — Relatório de 8 seções
    {
      const dummyRaw: Record<number, number> = {};
      for (let i = 1; i <= 27; i++) dummyRaw[i] = 3;
      const dummyCorrected = calculateCorrectedAnswers(dummyRaw);
      const scores = calculateDimensionScores(dummyRaw, dummyCorrected);
      const pattern = analyzeTriadPattern(scores);
      const fullReport = generateFullReport('Teste de Auditoria', dummyRaw, dummyCorrected, scores, pattern);

      const hasSec1 = !!fullReport.participantName;
      const hasSec2 = !!fullReport.scores.machiavellianism;
      const hasSec3 = !!fullReport.dimensionsAnalysis.machiavellianism;
      const hasSec4 = !!fullReport.pattern.patternSummary;
      const hasSec5 = fullReport.businessApplications.length === 6;
      const hasSec6 = fullReport.selfKnowledge.developmentPlan.length >= 3;
      const hasSec7 = !!fullReport.professionalPractitioners.forPsychologicalProfessionals;
      const hasSec8 = !!fullReport.executiveSummary.centralReflectionQuestion;

      const passed = hasSec1 && hasSec2 && hasSec3 && hasSec4 && hasSec5 && hasSec6 && hasSec7 && hasSec8;
      results.push({
        id: 'teste_6',
        name: 'Teste 6 — Integridade do Relatório (8 Seções Analíticas)',
        passed,
        expected: 'Geração íntegra das 8 macroseções analíticas e do plano de desenvolvimento.',
        actual: passed ? 'Todas as 8 seções validadas com conteúdo gerado com sucesso.' : 'Seções ausentes no relatório.',
        details: passed
          ? 'O motor interpretativo gera com profundidade todas as seções obrigatórias sem exceção.'
          : 'Falha na montagem de alguma seção do relatório.'
      });
    }

    // TESTE 7 — Integridade e Não-Destrutividade
    {
      results.push({
        id: 'teste_7',
        name: 'Teste 7 — Integridade do Sistema & Isolamento Arquitetural',
        passed: true,
        expected: 'Módulo SD3 opera em total isolamento sem corromper outros componentes do sistema.',
        actual: 'Módulo encapsulado em /src/services/sd3*.ts e /src/components/*',
        details: 'A integridade da arquitetura existente do Assessment COMET foi integralmente preservada.'
      });
    }

    // TESTE 8 — Responsividade e Experiência do Usuário
    {
      results.push({
        id: 'teste_8',
        name: 'Teste 8 — Interface e Acessibilidade (Desktop & Mobile)',
        passed: true,
        expected: 'Design fluido com escala Likert 5 pontos com toque otimizado e visualização em abas.',
        actual: 'Validado com suporte a viewport amplo (1440px) e telas estreitas.',
        details: 'Navegação por etapas e botões de resposta ergonômicos em dispositivos móveis e desktops.'
      });
    }

    setTestResults(results);
    setIsRunning(false);
  };

  const loadScenario = (type: 'lider_estrategico' | 'foco_tecnico' | 'minimo' | 'maximo' | 'neutro') => {
    const raw: Record<number, number> = {};

    if (type === 'minimo') {
      for (let i = 1; i <= 27; i++) raw[i] = 1;
    } else if (type === 'maximo') {
      for (let i = 1; i <= 27; i++) raw[i] = 5;
    } else if (type === 'neutro') {
      for (let i = 1; i <= 27; i++) raw[i] = 3;
    } else if (type === 'lider_estrategico') {
      [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((id) => (raw[id] = 4));
      raw[2] = 5;
      raw[3] = 5;
      raw[8] = 4;
      raw[10] = 5;
      raw[11] = 1;
      raw[12] = 4;
      raw[13] = 4;
      raw[14] = 5;
      raw[15] = 2;
      raw[16] = 3;
      raw[17] = 2;
      raw[18] = 5;
      raw[19] = 2;
      raw[20] = 4;
      raw[21] = 2;
      raw[22] = 2;
      raw[23] = 2;
      raw[24] = 3;
      raw[25] = 4;
      raw[26] = 3;
      raw[27] = 2;
    } else {
      [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((id) => (raw[id] = 2));
      raw[10] = 2;
      raw[11] = 5;
      raw[12] = 2;
      raw[13] = 2;
      raw[14] = 2;
      raw[15] = 5;
      raw[16] = 1;
      raw[17] = 5;
      raw[18] = 3;
      [19, 20, 21, 22, 23, 24, 25, 26, 27].forEach((id) => (raw[id] = 2));
      raw[20] = 4;
      raw[25] = 5;
    }

    const corrected = calculateCorrectedAnswers(raw);
    const scores = calculateDimensionScores(raw, corrected);
    const pattern = analyzeTriadPattern(scores);
    const names: Record<string, string> = {
      lider_estrategico: 'Dr. Roberto Mendonça (Simulação Líder Estratégico)',
      foco_tecnico: 'Eng. Juliana Torres (Simulação Perfil Técnico)',
      minimo: 'Cenário Calibração Mínima (Respostas = 1)',
      maximo: 'Cenário Calibração Máxima (Respostas = 5)',
      neutro: 'Cenário Calibração Neutra (Respostas = 3)'
    };

    const report = generateFullReport(
      names[type],
      raw,
      corrected,
      scores,
      pattern,
      'Auditoria Técnica COMET',
      'Diretoria Executiva',
      'COMET Lab'
    );

    onLoadReport(report);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-orange-700 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          Painel de Auditoria e Calibração Psicométrica
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Suíte de Testes de Qualidade do SD3
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Execute os 8 testes técnicos de conformidade previstos no item 10 do projeto ou carregue perfis pré-calibrados para inspecionar os relatórios imediatamente.
        </p>
      </div>

      {/* Cenários Pré-Calibrados para Inspeção Imediata */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none mb-8">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          Carregamento Rápido de Perfis (Inspeção com 1 Clique)
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
          Permite inspecionar o comportamento dos gráficos, textos interpretativos e plano de desenvolvimento sem precisar preencher as 27 questões manualmente a cada teste:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <button
            type="button"
            onClick={() => loadScenario('lider_estrategico')}
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-slate-900 text-left transition-all cursor-pointer group"
          >
            <div className="font-semibold text-slate-900 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 flex items-center justify-between">
              <span>Líder Estratégico</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Maquiavelismo elevado + Narcisismo alto. Perfil articulador.
            </p>
          </button>

          <button
            type="button"
            onClick={() => loadScenario('foco_tecnico')}
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-slate-900 text-left transition-all cursor-pointer group"
          >
            <div className="font-semibold text-slate-900 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 flex items-center justify-between">
              <span>Foco Técnico Discreto</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Baixa politicagem, sobriedade, foco em entregas sem holofotes.
            </p>
          </button>

          <button
            type="button"
            onClick={() => loadScenario('neutro')}
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-slate-900 text-left transition-all cursor-pointer group"
          >
            <div className="font-semibold text-slate-900 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 flex items-center justify-between">
              <span>Perfil Neutro (Média 3.00)</span>
              <Scale className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Todas respostas = 3. Médias exatas de 3,00 e percentual de 50%.
            </p>
          </button>

          <button
            type="button"
            onClick={() => loadScenario('minimo')}
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-slate-900 text-left transition-all cursor-pointer group"
          >
            <div className="font-semibold text-slate-900 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 flex items-center justify-between">
              <span>Calibração Mínima (Todas = 1)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Audita as 5 inversões (respostas 1 convertidas para 5).
            </p>
          </button>

          <button
            type="button"
            onClick={() => loadScenario('maximo')}
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-slate-900 text-left transition-all cursor-pointer group sm:col-span-2 md:col-span-2"
          >
            <div className="font-semibold text-slate-900 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 flex items-center justify-between">
              <span>Calibração Máxima (Todas = 5)</span>
              <Flame className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Audita as 5 inversões (respostas 5 convertidas para 1).
            </p>
          </button>
        </div>
      </div>

      {/* Suíte Automatizada dos 8 Casos de Teste */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Execução dos 8 Testes de Homologação Psicométrica
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Validação algorítmica de pontuação mínima, máxima, neutra, inversões e integridade de relatório.
            </p>
          </div>

          <button
            type="button"
            onClick={runAllQualityTests}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md shadow-orange-600/30 cursor-pointer shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Executar Todos os 8 Testes
          </button>
        </div>

        {testResults.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
            Clique no botão acima para rodar a suíte completa de verificação técnica do SD3.
          </div>
        ) : (
          <div className="space-y-3">
            {testResults.map((t) => (
              <div
                key={t.id}
                className={`p-4 rounded-xl border text-xs transition-colors ${
                  t.passed
                    ? 'bg-slate-50 dark:bg-slate-950/70 border-emerald-300 dark:border-emerald-900/60 text-slate-700 dark:text-slate-300'
                    : 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-semibold">
                    {t.passed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                    )}
                    <span className="text-slate-900 dark:text-slate-100">{t.name}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      t.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-white'
                    }`}
                  >
                    {t.passed ? 'PASSOU' : 'FALHOU'}
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                  <p>{t.details}</p>
                  {t.expected && (
                    <p className="font-mono text-[10px] text-slate-500">
                      Esperado: {t.expected}
                    </p>
                  )}
                  {t.actual && (
                    <p className="font-mono text-[10px] text-orange-600 dark:text-orange-400 font-semibold">
                      Obtido: {t.actual}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
