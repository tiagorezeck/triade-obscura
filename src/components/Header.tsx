/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, FileText, History, ShieldCheck, PlusCircle, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentView: 'form' | 'report' | 'audit' | 'history';
  onNavigate: (view: 'form' | 'report' | 'audit' | 'history') => void;
  hasCurrentReport: boolean;
  historyCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  hasCurrentReport,
  historyCount,
  theme,
  onToggleTheme
}) => {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand Zone (Single element text wordmark) */}
        <div
          onClick={() => onNavigate('form')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-bold text-white shadow-md shadow-orange-600/20 group-hover:scale-105 transition-transform">
            C
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">COMET</span>
              <span className="text-orange-600 dark:text-orange-500 font-bold text-base">Assessment</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase block mt-0.5">
              Área ORIGEM · SD3
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onNavigate('form')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              currentView === 'form'
                ? 'bg-slate-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Questionário</span>
            <span className="sm:hidden">Teste</span>
          </button>

          {hasCurrentReport && (
            <button
              type="button"
              onClick={() => onNavigate('report')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                currentView === 'report'
                  ? 'bg-slate-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Relatório</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate('audit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              currentView === 'audit'
                ? 'bg-slate-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Auditoria & Calibração</span>
            <span className="sm:hidden">Auditoria</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              currentView === 'history'
                ? 'bg-slate-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Histórico</span>
            {historyCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] text-orange-600 dark:text-orange-400 font-mono font-bold flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Action: Theme Switcher & New Assessment */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Alternador de Modo Claro / Escuro */}
          <button
            type="button"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('form')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-md shadow-orange-600/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Nova Avaliação</span>
            <span className="md:hidden">Novo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
