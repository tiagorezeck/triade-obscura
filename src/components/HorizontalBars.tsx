/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DimensionKey, DimensionScore } from '../types/sd3';

interface HorizontalBarsProps {
  scores: Record<DimensionKey, DimensionScore>;
}

export const HorizontalBars: React.FC<HorizontalBarsProps> = ({ scores }) => {
  const dimensions: { key: DimensionKey; label: string; desc: string }[] = [
    {
      key: 'machiavellianism',
      label: 'Maquiavelismo',
      desc: 'Pragmatismo estratégico, cálculo interpessoal e visão instrumental'
    },
    {
      key: 'narcissism',
      label: 'Narcisismo',
      desc: 'Protagonismo, autoimagem valorizada e busca por prestígio'
    },
    {
      key: 'psychopathy',
      label: 'Psicopatia Subclínica',
      desc: 'Frieza sob pressão, baixa sensibilidade afetiva e ousadia perante o risco'
    }
  ];

  return (
    <div className="space-y-6">
      {dimensions.map((dim) => {
        const item = scores[dim.key];
        const pct = item.normalizedPercent;
        const mean = item.mean;

        let badgeBg = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
        if (item.intensityLevel === 'elevado') {
          badgeBg = 'bg-orange-50 dark:bg-orange-950/70 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800/80';
        } else if (item.intensityLevel === 'baixo') {
          badgeBg = 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/80';
        }

        return (
          <div
            key={dim.key}
            className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none transition-all hover:border-slate-300 dark:hover:border-slate-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 text-base">{dim.label}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md border font-medium uppercase tracking-wider ${badgeBg}`}
                  >
                    Nível {item.intensityLevel}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    ({item.relativeRank}º em seu perfil)
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{dim.desc}</p>
              </div>

              <div className="text-right flex items-baseline sm:flex-col sm:items-end gap-2 sm:gap-0">
                <span className="text-lg font-bold text-orange-600 dark:text-orange-400 font-mono tabular-nums">
                  {mean.toFixed(2)}{' '}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ 5,00</span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                  {pct.toFixed(1)}% normalizado
                </span>
              </div>
            </div>

            {/* Barra de progresso com marcadores */}
            <div className="relative mt-3">
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-transparent">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700 ease-out"
                  style={{ width: `${Math.max(4, pct)}%` }}
                />
              </div>

              {/* Linhas indicadoras de faixa (1.00 = 0%, 2.50 = 37.5%, 3.50 = 62.5%, 5.00 = 100%) */}
              <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1.5 px-0.5">
                <span>1,00 (Mín)</span>
                <span>2,50 (Baixo/Mod)</span>
                <span>3,50 (Mod/Elev)</span>
                <span>5,00 (Máx)</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
