/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DimensionKey, DimensionScore } from '../types/sd3';

interface RadarChartProps {
  scores: Record<DimensionKey, DimensionScore>;
  size?: number;
  isDark?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores, size = 340, isDark = true }) => {
  const center = size / 2;
  const maxRadius = size * 0.36;

  // 3 eixos a 120 graus de separação
  // Eixo 1: Topo (-90°) -> Maquiavelismo
  // Eixo 2: Inferior Direito (30°) -> Narcisismo
  // Eixo 3: Inferior Esquerdo (150°) -> Psicopatia Subclínica
  const axes = [
    { key: 'machiavellianism' as DimensionKey, label: 'Maquiavelismo', angle: -Math.PI / 2 },
    { key: 'narcissism' as DimensionKey, label: 'Narcisismo', angle: Math.PI / 6 },
    { key: 'psychopathy' as DimensionKey, label: 'Psicopatia Subclínica', angle: (5 * Math.PI) / 6 }
  ];

  // Converte valor de 1.00 a 5.00 para raio (escala normalizada de 0 a 1)
  const getRadiusForScore = (mean: number) => {
    const normalized = Math.max(0, Math.min(1, (mean - 1) / 4));
    return normalized * maxRadius;
  };

  // Coordenadas cartesianas
  const getCoordinates = (angle: number, radius: number) => {
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  // Polígonos de grade de fundo (níveis 1, 2, 3, 4, 5)
  const gridLevels = [1, 2, 3, 4, 5];

  // Pontos do polígono de dados real
  const dataPoints = axes.map((axis) => {
    const score = scores[axis.key]?.mean ?? 3;
    const r = getRadiusForScore(score);
    return getCoordinates(axis.angle, r);
  });
  const dataPolygonPoints = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const strokeGridColor = isDark ? '#334155' : '#cbd5e1';
  const strokeOuterColor = isDark ? '#475569' : '#94a3b8';
  const scaleTextColor = isDark ? '#94a3b8' : '#64748b';
  const axisLineColor = isDark ? '#64748b' : '#94a3b8';
  const labelTextColor = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible select-none"
        aria-label="Gráfico Radar Triaxial do SD3"
      >
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity={isDark ? '0.35' : '0.28'} />
            <stop offset="100%" stopColor="#F97316" stopOpacity={isDark ? '0.15' : '0.10'} />
          </radialGradient>
          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Polígonos de referência da grade */}
        {gridLevels.map((level) => {
          const r = getRadiusForScore(level);
          const pts = axes
            .map((ax) => {
              const { x, y } = getCoordinates(ax.angle, r);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ');

          return (
            <g key={level}>
              <polygon
                points={pts}
                fill="none"
                stroke={level === 5 ? strokeOuterColor : strokeGridColor}
                strokeWidth={level === 5 ? '1.5' : '1'}
                strokeDasharray={level === 3 ? '4 3' : undefined}
                opacity={level === 5 ? 0.9 : 0.6}
              />
              {/* Rótulo de escala no eixo vertical superior */}
              <text
                x={center + 6}
                y={center - r + 3}
                fill={scaleTextColor}
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
                className="tabular-nums"
              >
                {level.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Linhas radiais dos 3 eixos */}
        {axes.map((axis) => {
          const edge = getCoordinates(axis.angle, maxRadius);
          return (
            <line
              key={axis.key}
              x1={center}
              y1={center}
              x2={edge.x}
              y2={edge.y}
              stroke={axisLineColor}
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
          );
        })}

        {/* Polígono de dados preenchido */}
        <polygon
          points={dataPolygonPoints}
          fill="url(#radarFill)"
          stroke="#EA580C"
          strokeWidth="2.5"
          filter="url(#radarGlow)"
          className="transition-all duration-500 ease-out"
        />

        {/* Vértices e marcadores numéricos */}
        {axes.map((axis, i) => {
          const pt = dataPoints[i];
          const score = scores[axis.key];
          const isTop = axis.angle === -Math.PI / 2;
          const isRight = axis.angle === Math.PI / 6;

          // Posição de texto do rótulo externo
          const labelDist = maxRadius + 32;
          const labelCoord = getCoordinates(axis.angle, labelDist);

          return (
            <g key={axis.key}>
              {/* Ponto marcado na coordenada */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill="#EA580C"
                stroke={isDark ? '#0f172a' : '#ffffff'}
                strokeWidth="2"
                className="transition-all duration-500"
              />

              {/* Rótulo do eixo */}
              <text
                x={labelCoord.x}
                y={labelCoord.y - 10}
                textAnchor={isTop ? 'middle' : isRight ? 'start' : 'end'}
                fill={labelTextColor}
                fontSize="12"
                fontWeight="600"
              >
                {axis.label}
              </text>

              {/* Valor numérico do score */}
              <text
                x={labelCoord.x}
                y={labelCoord.y + 6}
                textAnchor={isTop ? 'middle' : isRight ? 'start' : 'end'}
                fill={isDark ? '#fb923c' : '#c2410c'}
                fontSize="13"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
                className="tabular-nums"
              >
                {score.mean.toFixed(2)} pts ({score.normalizedPercent.toFixed(0)}%)
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex items-center gap-6 mt-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
          Perfil do Participante
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t border-dashed border-slate-400 dark:border-slate-500 inline-block"></span>
          Escala de 1,00 a 5,00
        </span>
      </div>
    </div>
  );
};
