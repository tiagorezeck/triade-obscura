/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import {
  Download,
  Upload,
  Trash2,
  Eye,
  Calendar,
  History,
  AlertCircle
} from 'lucide-react';
import { SD3ReportData } from '../types/sd3';
import {
  exportHistoryAsJson,
  importHistoryFromJson,
  deleteReportFromHistory,
  clearAllHistory
} from '../services/sd3Storage';

interface HistoryModalProps {
  history: SD3ReportData[];
  onSelectReport: (report: SD3ReportData) => void;
  onRefreshHistory: () => void;
  onClose?: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  history,
  onSelectReport,
  onRefreshHistory
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Tem certeza de que deseja remover esta avaliação do histórico?')) {
      deleteReportFromHistory(id);
      onRefreshHistory();
    }
  };

  const handleClearAll = () => {
    if (confirm('Atenção: isto removerá permanentemente todas as avaliações salvas no dispositivo. Confirmar?')) {
      clearAllHistory();
      onRefreshHistory();
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importHistoryFromJson(content);
      if (success) {
        alert('Histórico importado com sucesso!');
        onRefreshHistory();
      } else {
        alert('Falha ao importar o arquivo. Verifique se o formato JSON é compatível.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reseta input
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-orange-700 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <History className="w-3.5 h-3.5" />
            Registro Seguro de Avaliações
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Histórico de Avaliações do SD3
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Armazenamento local confidencial com dados completos de respostas originais, corrigidas e relatórios analíticos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json,application/json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => {
              import('../services/sd3Storage').then(({ createFakeAssessment, saveReportToHistory }) => {
                const fake = createFakeAssessment('lider_estrategico');
                saveReportToHistory(fake);
                onRefreshHistory();
                onSelectReport(fake);
              });
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition-all shadow-md shadow-orange-600/20 cursor-pointer"
          >
            <History className="w-3.5 h-3.5" />
            + Gerar Teste Fake (Demo)
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            Importar JSON
          </button>
          <button
            type="button"
            onClick={exportHistoryAsJson}
            disabled={history.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar Backup
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 space-y-3 shadow-sm dark:shadow-none">
          <AlertCircle className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">Nenhuma avaliação encontrada no histórico</h3>
          <p className="text-xs max-w-md mx-auto">
            Quando você concluir o questionário ou carregar um cenário no painel de auditoria, o relatório ficará salvo aqui para consulta a qualquer momento.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Total de {history.length} avaliação(ões) arquivada(s)</span>
            <button
              onClick={handleClearAll}
              className="text-red-600 dark:text-red-400 hover:underline transition-colors cursor-pointer"
            >
              Limpar todo o histórico
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {history.map((item) => {
              const m = item.scores.machiavellianism;
              const n = item.scores.narcissism;
              const p = item.scores.psychopathy;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectReport(item)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:shadow-md dark:hover:border-orange-500/70 dark:hover:bg-slate-900 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm dark:shadow-none"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {item.participantName}
                      </span>
                      {item.participantRole && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">· {item.participantRole}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        {item.formattedDate}
                      </span>
                      {item.organization && <span>Empresa: {item.organization}</span>}
                    </div>

                    {/* Resumo visual rápido dos escores */}
                    <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                      <span className="text-slate-700 dark:text-slate-300">
                        Maq: <strong className="text-orange-600 dark:text-orange-400">{m.mean.toFixed(2)}</strong>
                      </span>
                      <span className="text-slate-300 dark:text-slate-500">|</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        Narc: <strong className="text-orange-600 dark:text-orange-400">{n.mean.toFixed(2)}</strong>
                      </span>
                      <span className="text-slate-300 dark:text-slate-500">|</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        Psic: <strong className="text-orange-600 dark:text-orange-400">{p.mean.toFixed(2)}</strong>
                      </span>
                      <span className="hidden sm:inline-block text-[11px] font-sans px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 ml-2">
                        {item.pattern.patternLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onSelectReport(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Visualizar
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(item.id, e)}
                      title="Excluir do histórico"
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
