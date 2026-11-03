/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Printer,
  Compass,
  BarChart3,
  Layers,
  Sparkles,
  Briefcase,
  UserCheck,
  Stethoscope,
  FileText,
  TableProperties,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Calendar,
  User,
  ShieldAlert
} from 'lucide-react';
import { SD3ReportData, DimensionKey } from '../types/sd3';
import { RadarChart } from './RadarChart';
import { HorizontalBars } from './HorizontalBars';
import { SD3_QUESTIONS } from '../data/sd3Questions';

interface ReportViewProps {
  report: SD3ReportData;
  onNewAssessment: () => void;
  theme?: 'light' | 'dark';
}

export const ReportView: React.FC<ReportViewProps> = ({ report, onNewAssessment, theme = 'dark' }) => {
  const [activeTab, setActiveTab] = useState<string>('todos'); // 'todos' | 'painel' | 'dimensoes' | 'integrada' | 'empresarial' | 'desenvolvimento' | 'especialistas' | 'sintese' | 'auditoria'
  const [viewProfile, setViewProfile] = useState<'individual' | 'consultor' | 'completo'>('completo');
  const [activeDimensionDetail, setActiveDimensionDetail] = useState<DimensionKey>('machiavellianism');

  const handlePrint = () => {
    window.print();
  };

  const scores = report.scores;
  const pattern = report.pattern;
  const isDark = theme === 'dark';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Barra de Ações Superior (Oculta na Impressão) */}
      <div className="no-print mb-8 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Modo de Exibição:</span>
          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setViewProfile('completo')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                viewProfile === 'completo' ? 'bg-orange-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Relatório Completo
            </button>
            <button
              onClick={() => setViewProfile('individual')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                viewProfile === 'individual' ? 'bg-orange-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Foco Autoconhecimento
            </button>
            <button
              onClick={() => setViewProfile('consultor')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                viewProfile === 'consultor' ? 'bg-orange-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Foco Consultoria & Gestão
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNewAssessment}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            Nova Avaliação
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Navegação Rápida entre Seções (Oculta na Impressão) */}
      <div className="no-print mb-8 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max text-xs">
          {[
            { id: 'todos', label: 'Visão Geral (Todas as Seções)', icon: Layers },
            { id: 'painel', label: '1 & 2. Painel & Gráficos', icon: BarChart3 },
            { id: 'dimensoes', label: '3. Dimensões Detalhadas', icon: Compass },
            { id: 'integrada', label: '4. Análise Integrada', icon: Sparkles },
            { id: 'empresarial', label: '5. Contexto Empresarial', icon: Briefcase },
            { id: 'desenvolvimento', label: '6. Autoconhecimento', icon: UserCheck },
            { id: 'especialistas', label: '7. Caderno Técnico', icon: Stethoscope },
            { id: 'sintese', label: '8. Síntese Executiva', icon: FileText },
            { id: 'auditoria', label: 'Auditoria de Respostas', icon: TableProperties },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-200 dark:bg-slate-800 text-orange-600 dark:text-orange-400 border border-slate-300 dark:border-slate-700 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* DOCUMENTO PRINCIPAL DO RELATÓRIO */}
      <div className="space-y-12 bg-slate-50/50 dark:bg-slate-950/40 p-2 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80">
        
        {/* ========================================================================= */}
        {/* SEÇÃO 1 — IDENTIFICAÇÃO E VISÃO GERAL */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'painel') && (
          <section className="print-card rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  Assessment COMET · Área ORIGEM
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                  MAPA DOS TRAÇOS DA PERSONALIDADE — TRÍADE OBSCURA
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Compreendendo tendências de influência, reconhecimento, relações interpessoais e tomada de decisão.
                </p>
              </div>

              <div className="flex flex-col sm:items-end text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-300">
                  <User className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  <span>{report.participantName}</span>
                </div>
                {report.participantRole && <div>Cargo: {report.participantRole}</div>}
                {report.organization && <div>Organização: {report.organization}</div>}
                <div className="flex items-center gap-1 text-slate-500 font-mono">
                  <Calendar className="w-3 h-3" />
                  <span>{report.formattedDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 space-y-2">
                <p className="font-semibold text-slate-900 dark:text-slate-200">1. Maquiavelismo (Machiavellianism)</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Avalia tendências ao pragmatismo estratégico, cálculo em relações interpessoais, utilização instrumental de vínculos e foco em fins pretendidos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 space-y-2">
                <p className="font-semibold text-slate-900 dark:text-slate-200">2. Narcisismo (Narcissism)</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Avalia a busca por prestígio e admiração, necessidade de validação externa, autoconfiança expressiva e centralidade da autoimagem no protagonismo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 space-y-2">
                <p className="font-semibold text-slate-900 dark:text-slate-200">3. Psicopatia Subclínica (Psychopathy)</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Avalia a serenidade sob pressão extrema, baixa reatividade empática afetiva, impulsividade e disposição para assumir riscos operacionais ou de confronto.
                </p>
              </div>
            </div>

            {/* Aviso sobre a natureza não diagnóstica */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50/70 dark:bg-slate-950 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-300/90 text-xs flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="font-semibold">Nota Metodológica e Ética:</strong> O SD3 (Jones & Paulhus, 2014) é uma medida breve de autorrelato orientada exclusivamente ao autoconhecimento, desenvolvimento de liderança e consultoria organizacional. 
                Os resultados expressam tendências comportamentais e preferências cognitivas. <span className="underline decoration-amber-500/50">Não constituem diagnóstico clínico, psiquiátrico ou indicativo de transtorno mental</span>.
              </p>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SEÇÃO 2 — PAINEL GERAL DOS RESULTADOS */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'painel') && (
          <section className="print-card rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Seção 2</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Painel Geral dos Resultados</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Representação gráfica integrada das três dimensões avaliadas (escala de 1,00 a 5,00 e percentual normalizado).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Gráfico Radar Triaxial */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Radar Triaxial da Tríade</span>
                <RadarChart scores={scores} size={320} isDark={isDark} />
              </div>

              {/* Gráfico de Barras Horizontais */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <HorizontalBars scores={scores} />
              </div>
            </div>

            {/* Tabela Sintética Comparativa */}
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <th className="py-2.5 px-3 font-semibold">Dimensão</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Média (1-5)</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Normalizado</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Nível Relativo</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Posição no Perfil</th>
                    <th className="py-2.5 px-3 font-semibold">Tendência Predominante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-mono">
                  {(['machiavellianism', 'narcissism', 'psychopathy'] as DimensionKey[]).map((key) => {
                    const item = scores[key];
                    return (
                      <tr key={key} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                        <td className="py-3 px-3 font-sans font-medium text-slate-900 dark:text-slate-200">
                          {item.titlePt}
                        </td>
                        <td className="py-3 px-3 text-center text-orange-600 dark:text-orange-400 font-bold tabular-nums">
                          {item.mean.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-center text-slate-700 dark:text-slate-300 tabular-nums">
                          {item.normalizedPercent.toFixed(1)}%
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-sans font-medium uppercase ${
                            item.intensityLevel === 'elevado' ? 'bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-400' : item.intensityLevel === 'baixo' ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                            {item.intensityLevel}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-sans text-slate-500 dark:text-slate-400">
                          {item.relativeRank}º lugar
                        </td>
                        <td className="py-3 px-3 font-sans text-slate-500 dark:text-slate-400 text-[11px]">
                          {key === 'machiavellianism'
                            ? 'Pragmatismo tático & cálculo de alianças'
                            : key === 'narcissism'
                            ? 'Protagonismo, visibilidade & status'
                            : 'Frieza operacional & tomada de riscos'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SEÇÃO 3 — ANÁLISE INDIVIDUAL DAS DIMENSÕES */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'dimensoes') && (
          <section className="print-card rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Seção 3</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Análise Individualizada das Três Dimensões</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Exame aprofundado de cada construto com base na pontuação real obtida pelo participante.
              </p>
            </div>

            {/* Seletor de Dimensão em Tela */}
            <div className="no-print flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800/80 pb-3">
              {(['machiavellianism', 'narcissism', 'psychopathy'] as DimensionKey[]).map((key) => {
                const isActive = activeDimensionDetail === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveDimensionDetail(key)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {scores[key].titlePt} ({scores[key].mean.toFixed(2)})
                  </button>
                );
              })}
            </div>

            {/* Bloco Detalhado da Dimensão Selecionada (ou todas se imprimindo) */}
            {(['machiavellianism', 'narcissism', 'psychopathy'] as DimensionKey[])
              .filter((key) => activeTab === 'todos' ? true : activeDimensionDetail === key)
              .map((key) => {
                const analysis = report.dimensionsAnalysis[key];
                const item = scores[key];

                return (
                  <div key={key} className="mb-10 last:mb-0 border-b last:border-0 border-slate-200 dark:border-slate-800 pb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
                          {item.titlePt} ({item.titleEn})
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Pontuação Média: <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{item.mean.toFixed(2)}</span> / 5,00 · 
                          Percentual Normalizado: <span className="font-mono font-bold text-slate-800 dark:text-slate-300">{item.normalizedPercent.toFixed(1)}%</span> · 
                          Intensidade: <span className="uppercase font-semibold text-slate-800 dark:text-slate-300">{item.intensityLevel}</span>
                        </p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">
                        Rank: {item.relativeRank}º lugar
                      </span>
                    </div>

                    <div className="space-y-4 text-xs leading-relaxed">
                      {/* O que avalia */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
                        <span className="font-semibold text-slate-800 dark:text-slate-300 block mb-1">A. O que essa dimensão avalia:</span>
                        <p className="text-slate-600 dark:text-slate-400">{analysis.whatItMeasures}</p>
                      </div>

                      {/* Resultado individual */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
                        <span className="font-semibold text-slate-800 dark:text-slate-300 block mb-1">B. Interpretação do Resultado do Participante:</span>
                        <p className="text-slate-800 dark:text-slate-300">{analysis.individualResultExplanation}</p>
                      </div>

                      {/* Manifestações cotidianas */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
                        <span className="font-semibold text-slate-800 dark:text-slate-300 block mb-1">C. Como pode aparecer no cotidiano profissional:</span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                          {analysis.everydayManifestations.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Grid: Potencialidades vs Pontos de Atenção */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
                          <span className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            D. Potencialidades e Forças Construtivas
                          </span>
                          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                            {analysis.constructivePotentials.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 space-y-2">
                          <span className="font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            E. Pontos de Atenção e Riscos Comportamentais
                          </span>
                          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                            {analysis.pointsOfAttention.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Relações Interpessoais & Tomada de Decisão */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
                          <span className="font-semibold text-slate-800 dark:text-slate-300 block mb-1">F. Relações Interpessoais & Vínculos:</span>
                          <p className="text-slate-600 dark:text-slate-400">{analysis.interpersonalDynamics}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
                          <span className="font-semibold text-slate-800 dark:text-slate-300 block mb-1">G. Estilo de Tomada de Decisão:</span>
                          <p className="text-slate-600 dark:text-slate-400">{analysis.decisionMakingImpact}</p>
                        </div>
                      </div>

                      {/* Desenvolvimento pessoal */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
                        <span className="font-semibold text-slate-800 dark:text-slate-300 block mb-1">H. Diretrizes para Desenvolvimento Pessoal:</span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                          {analysis.developmentGuidance.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </section>
        )}

        {/* ========================================================================= */}
        {/* SEÇÃO 4 — ANÁLISE INTEGRADA DA TRÍADE */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'integrada') && (
          <section className="print-card rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Seção 4</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Análise Integrada da Tríade Obscura</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Interpretação sistêmica da combinação entre os três construtos, distâncias métricas e dinâmicas de equilíbrio.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-orange-200 dark:border-orange-900/50 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
                <div>
                  <span className="text-[11px] font-mono text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                    Padrão Sistêmico Identificado
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{pattern.patternLabel}</h3>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                  Dispersão Interna (Spread): <span className="text-orange-600 dark:text-orange-400 font-bold">{pattern.scoreSpread.toFixed(2)}</span> pts
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{pattern.patternSummary}</p>
            </div>

            <div className="space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 space-y-2">
                <span className="font-semibold text-slate-900 dark:text-slate-200 block text-sm">Interação Dinâmica entre os Traços:</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">{pattern.detailedInteractionText}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-2">
                  <span className="font-semibold text-red-800 dark:text-red-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    Hipóteses de Risco da Configuração Atual
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-700 dark:text-slate-300 text-xs">
                    {pattern.riskHypotheses.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 space-y-2">
                  <span className="font-semibold text-orange-800 dark:text-orange-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                    Vias de Canalização Construtiva do Perfil
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-700 dark:text-slate-300 text-xs">
                    {pattern.constructiveAvenues.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SEÇÃO 5 — APLICAÇÕES NO CONTEXTO EMPRESARIAL */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'empresarial') && (
          <section className="print-card rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Seção 5</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Aplicações no Contexto Empresarial e Executivo</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Impactos operacionais dos traços sobre liderança, governança de pessoas, risco corporativo e cultura.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {report.businessApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{app.title}</h3>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{app.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">Tendências Favoráveis:</span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                        {app.favorableTendencies.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-1">Riscos Comportamentais:</span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                        {app.behavioralRisks.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                        Pergunta para Reflexão Estratégica:
                      </span>
                      <p className="italic text-slate-700 dark:text-slate-300">"{app.reflectionQuestions[0]}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SEÇÃO 6 — AUTOCONHECIMENTO E DESENVOLVIMENTO */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'desenvolvimento') && (
          <section className="print-card rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Seção 6</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Autoconhecimento e Plano Prático de Desenvolvimento</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Mapeamento de padrões reflexivos, pontos cegos e roteiro estruturado com ações concretas de evolução.
              </p>
            </div>

            {/* Padrões, Forças e Pontos Cegos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-semibold text-orange-700 dark:text-orange-400 block">1. Padrões que Merecem Observação</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                  {report.selfKnowledge.observablePatterns.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 block">2. Pontos Fortes Bem Direcionados</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                  {report.selfKnowledge.strengthsToDirect.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-semibold text-red-700 dark:text-red-400 block">3. Possíveis Pontos Cegos</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                  {report.selfKnowledge.blindSpots.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Perguntas de Autoconhecimento por Dimensão */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 mb-8">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                4. Perguntas Estratégicas de Autoconhecimento
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700 dark:text-slate-300">
                {(['machiavellianism', 'narcissism', 'psychopathy'] as DimensionKey[]).map((key) => (
                  <div key={key} className="space-y-2">
                    <span className="font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider text-[11px]">
                      {scores[key].titlePt}
                    </span>
                    <ul className="space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                      {report.selfKnowledge.reflectionQuestionsByDimension[key].map((q, idx) => (
                        <li key={idx} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic">
                          "{q}"
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Plano de Desenvolvimento Priorizado */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                5. Plano de Ação e Desenvolvimento Comportamental
              </h3>
              <div className="space-y-4">
                {report.selfKnowledge.developmentPlan.map((rec) => (
                  <div
                    key={rec.priority}
                    className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-600/30 text-orange-700 dark:text-orange-400 border border-orange-300 dark:border-orange-500/40 flex items-center justify-center font-bold font-mono text-xs">
                          {rec.priority}
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{rec.behaviorToDevelop}</h4>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-slate-500">
                        Prioridade {rec.priority}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      <strong className="text-slate-800 dark:text-slate-300">Por que merece atenção:</strong> {rec.whyItMatters}
                    </p>

                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
                      <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                        <strong>Ação Prática Imediata:</strong> {rec.actionableStep}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        <strong>Contexto de Aplicação:</strong> {rec.applicationContext}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        <strong>Indicador de Evolução:</strong> {rec.growthIndicator}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SEÇÃO 7 — APLICAÇÃO PARA COACHING, CONSULTORIA E PSICOLOGIA */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'especialistas') && (
          <section className="print-card rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Seção 7</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Caderno Técnico para Coaches, Consultores e Psicólogos</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Diretrizes metodológicas para profissionais que utilizam o instrumento como apoio em intervenções humanas e organizacionais.
              </p>
            </div>

            <div className="space-y-6 text-xs">
              {/* Para Coaches e Mentores */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  1. Diretrizes para Coaches e Mentores Executivos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300 text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-200 block mb-1">Hipóteses para Investigação em Sessão:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                      {report.professionalPractitioners.forCoachesAndMentors.investigationHypotheses.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-200 block mb-1">Perguntas de Aprofundamento:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                      {report.professionalPractitioners.forCoachesAndMentors.deepeningQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Para Consultores Empresariais */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  2. Diretrizes para Consultores Organizacionais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300 text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-200 block mb-1">Impactos na Estrutura de Gestão:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                      {report.professionalPractitioners.forBusinessConsultants.managementImpacts.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-200 block mb-1">Pontos de Atenção na Cultura:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                      {report.professionalPractitioners.forBusinessConsultants.cultureRisks.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Para Profissionais da Área Psicológica */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  3. Parâmetros Psicométricos para Profissionais de Psicologia
                </h3>
                <div className="space-y-3 text-[11px] text-slate-700 dark:text-slate-300">
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-semibold text-slate-900 dark:text-slate-200 block mb-1">Síntese Quantitativa:</span>
                    <p className="font-mono text-slate-600 dark:text-slate-400">{report.professionalPractitioners.forPsychologicalProfessionals.quantitativeSynthesis}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-200 block mb-1">Limites Interpretativos e Metodológicos:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                      {report.professionalPractitioners.forPsychologicalProfessionals.interpretativeLimits.map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-300/90 text-[11px]">
                    <strong>Aviso Ético:</strong> {report.professionalPractitioners.forPsychologicalProfessionals.ethicalDisclaimer}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SEÇÃO 8 — SÍNTESE EXECUTIVA */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'sintese') && (
          <section className="print-card rounded-2xl bg-white dark:bg-slate-900/80 border-2 border-orange-500/50 dark:border-orange-600/40 p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Seção 8</span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Síntese Executiva</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Consolidação objetiva e personalizada dos achados essenciais do perfil do participante.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs mb-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-mono text-[10px]">Dimensão Predominante:</span>
                <p className="text-base font-bold text-orange-600 dark:text-orange-400">{report.executiveSummary.predominantDimension}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-mono text-[10px]">Dimensão Menos Expressiva:</span>
                <p className="text-base font-bold text-slate-700 dark:text-slate-300">{report.executiveSummary.leastExpressiveDimension}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-mono text-[10px]">Principal Competência Potencial:</span>
                <p className="text-slate-800 dark:text-slate-200">{report.executiveSummary.keyPotentialToHarness}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-mono text-[10px]">Ponto de Atenção Crítico:</span>
                <p className="text-slate-800 dark:text-slate-200">{report.executiveSummary.primaryAttentionPoint}</p>
              </div>

              <div className="md:col-span-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-mono text-[10px]">Recomendação Prioritária de Ação:</span>
                <p className="text-emerald-700 dark:text-emerald-300 font-medium">{report.executiveSummary.priorityDevelopmentAction}</p>
              </div>

              <div className="md:col-span-2 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/40 space-y-1">
                <span className="text-orange-600 dark:text-orange-400 uppercase font-mono text-[10px]">Pergunta Central para Reflexão:</span>
                <p className="text-sm font-semibold italic text-slate-900 dark:text-slate-100">"{report.executiveSummary.centralReflectionQuestion}"</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>{report.executiveSummary.concludingSynthesisText}</p>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* AUDITORIA DE RESPOSTAS BRUTAS E CORRIGIDAS */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'auditoria') && (
          <section className="print-card rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Auditoria Técnica</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Auditoria das 27 Afirmações do SD3</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Transparência completa dos dados: respostas originais informadas e valores corrigidos com itens invertidos destacados.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <th className="py-2.5 px-3 font-semibold text-center">#</th>
                    <th className="py-2.5 px-3 font-semibold">Afirmação (Tradução Oficial)</th>
                    <th className="py-2.5 px-3 font-semibold">Dimensão</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Original</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Invertido?</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Corrigido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-mono">
                  {SD3_QUESTIONS.map((q) => {
                    const raw = report.answersRaw[q.id] ?? 3;
                    const corrected = report.answersCorrected[q.id] ?? 3;

                    return (
                      <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                        <td className="py-2 px-3 text-center text-slate-400 dark:text-slate-500">{q.id}</td>
                        <td className="py-2 px-3 font-sans text-slate-800 dark:text-slate-200 max-w-md">{q.textPt}</td>
                        <td className="py-2 px-3 font-sans text-slate-600 dark:text-slate-400 capitalize">
                          {q.dimension === 'machiavellianism'
                            ? 'Maquiavelismo'
                            : q.dimension === 'narcissism'
                            ? 'Narcisismo'
                            : 'Psicopatia'}
                        </td>
                        <td className="py-2 px-3 text-center font-bold text-slate-900 dark:text-slate-200">{raw}</td>
                        <td className="py-2 px-3 text-center">
                          {q.isReversed ? (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800 font-sans">
                              Sim (6 - {raw})
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-600 font-sans">Não</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center font-bold text-orange-600 dark:text-orange-400">{corrected}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
