/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AssessmentForm } from './components/AssessmentForm';
import { ReportView } from './components/ReportView';
import { AuditPanel } from './components/AuditPanel';
import { HistoryModal } from './components/HistoryModal';
import { SD3ReportData } from './types/sd3';
import {
  calculateCorrectedAnswers,
  calculateDimensionScores,
  analyzeTriadPattern
} from './services/sd3Scoring';
import { generateFullReport } from './services/sd3Interpreter';
import { loadHistory, saveReportToHistory } from './services/sd3Storage';

export default function App() {
  const [currentView, setCurrentView] = useState<'form' | 'report' | 'audit' | 'history'>('form');
  const [currentReport, setCurrentReport] = useState<SD3ReportData | null>(null);
  const [history, setHistory] = useState<SD3ReportData[]>([]);

  // Gerenciamento de tema (Light / Dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('comet_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('comet_theme', theme);
    } catch (e) {
      console.error('Falha ao sincronizar tema:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    refreshHistory();
  }, []);

  const refreshHistory = () => {
    const list = loadHistory();
    setHistory(list);
    if (!currentReport && list.length > 0) {
      setCurrentReport(list[0]);
    }
  };

  const handleCompleteAssessment = (data: {
    participantName: string;
    participantRole?: string;
    organization?: string;
    evaluatorName?: string;
    rawAnswers: Record<number, number>;
  }) => {
    const correctedAnswers = calculateCorrectedAnswers(data.rawAnswers);
    const scores = calculateDimensionScores(data.rawAnswers, correctedAnswers);
    const pattern = analyzeTriadPattern(scores);

    const fullReport = generateFullReport(
      data.participantName,
      data.rawAnswers,
      correctedAnswers,
      scores,
      pattern,
      data.evaluatorName,
      data.participantRole,
      data.organization
    );

    saveReportToHistory(fullReport);
    setCurrentReport(fullReport);
    refreshHistory();
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectReport = (report: SD3ReportData) => {
    setCurrentReport(report);
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-orange-600 selection:text-white transition-colors duration-200">
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasCurrentReport={!!currentReport}
        historyCount={history.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 pb-16">
        {currentView === 'form' && (
          <AssessmentForm
            onComplete={handleCompleteAssessment}
            onCancel={() => {
              if (currentReport) setCurrentView('report');
            }}
          />
        )}

        {currentView === 'report' && currentReport && (
          <ReportView
            report={currentReport}
            onNewAssessment={() => {
              setCurrentView('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            theme={theme}
          />
        )}

        {currentView === 'audit' && (
          <AuditPanel
            onLoadReport={(report) => {
              saveReportToHistory(report);
              setCurrentReport(report);
              refreshHistory();
              setCurrentView('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'history' && (
          <HistoryModal
            history={history}
            onSelectReport={handleSelectReport}
            onRefreshHistory={refreshHistory}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 py-8 px-4 text-xs text-slate-500 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-400">
              Assessment COMET — Área ORIGEM · SD3 Short Dark Triad
            </p>
            <p className="mt-1 text-[11px] text-slate-500 max-w-xl">
              Referência científica primária: Jones, D. N., & Paulhus, D. L. (2014). Introducing the Short Dark Triad (SD3): A Brief Measure of Dark Personality Traits. <em>Assessment</em>, 21(1), 28–41.
            </p>
          </div>
          <div className="text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Instituto COMET. Todos os direitos reservados.</p>
            <p className="mt-0.5 text-slate-500 dark:text-slate-600">Instrumento de desenvolvimento pessoal e executivo · Natureza não clínica</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
