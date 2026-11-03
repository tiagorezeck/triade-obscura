/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SD3ReportData } from '../types/sd3';
import { calculateCorrectedAnswers, calculateDimensionScores, analyzeTriadPattern } from './sd3Scoring';
import { generateFullReport } from './sd3Interpreter';

const STORAGE_KEY_HISTORY = 'comet_sd3_assessments_history';
const STORAGE_KEY_DRAFT = 'comet_sd3_assessment_draft';

export interface DraftState {
  participantName: string;
  participantRole: string;
  organization: string;
  evaluatorName: string;
  answers: Record<number, number>;
  step: number;
}

/**
 * Cria uma avaliação simulada (fake test) completa e realista para demonstração.
 */
export function createFakeAssessment(variant: 'lider_estrategico' | 'gestora_projetos' = 'lider_estrategico'): SD3ReportData {
  const raw: Record<number, number> = {};

  if (variant === 'lider_estrategico') {
    // Perfil Executivo: Alto Maquiavelismo, Alto Narcisismo, Baixa Psicopatia
    // Maquiavelismo (1-9)
    raw[1] = 4;
    raw[2] = 4;
    raw[3] = 5;
    raw[4] = 4;
    raw[5] = 4;
    raw[6] = 3;
    raw[7] = 4;
    raw[8] = 4;
    raw[9] = 4;
    // Narcisismo (10-18) [11, 15, 17 são invertidas]
    raw[10] = 5;
    raw[11] = 1; // Invertida -> 5
    raw[12] = 4;
    raw[13] = 4;
    raw[14] = 5;
    raw[15] = 2; // Invertida -> 4
    raw[16] = 3;
    raw[17] = 2; // Invertida -> 4
    raw[18] = 5;
    // Psicopatia (19-27) [20, 25 são invertidas]
    raw[19] = 2;
    raw[20] = 4; // Invertida -> 2
    raw[21] = 2;
    raw[22] = 2;
    raw[23] = 2;
    raw[24] = 3;
    raw[25] = 4; // Invertida -> 2
    raw[26] = 3;
    raw[27] = 2;

    const corrected = calculateCorrectedAnswers(raw);
    const scores = calculateDimensionScores(raw, corrected);
    const pattern = analyzeTriadPattern(scores);

    return generateFullReport(
      'Dr. Roberto Mendonça',
      raw,
      corrected,
      scores,
      pattern,
      'Instituto COMET — Avaliação Executiva',
      'Diretor de Estratégia e M&A',
      'Grupo Alfa S/A'
    );
  } else {
    // Perfil Gestora: Equilíbrio funcional com foco em colaboração
    raw[1] = 3;
    raw[2] = 2;
    raw[3] = 3;
    raw[4] = 3;
    raw[5] = 2;
    raw[6] = 2;
    raw[7] = 3;
    raw[8] = 2;
    raw[9] = 3;

    raw[10] = 4;
    raw[11] = 3; // Invertida -> 3
    raw[12] = 3;
    raw[13] = 3;
    raw[14] = 4;
    raw[15] = 4; // Invertida -> 2
    raw[16] = 2;
    raw[17] = 4; // Invertida -> 2
    raw[18] = 4;

    raw[19] = 1;
    raw[20] = 5; // Invertida -> 1
    raw[21] = 2;
    raw[22] = 2;
    raw[23] = 1;
    raw[24] = 2;
    raw[25] = 5; // Invertida -> 1
    raw[26] = 2;
    raw[27] = 2;

    const corrected = calculateCorrectedAnswers(raw);
    const scores = calculateDimensionScores(raw, corrected);
    const pattern = analyzeTriadPattern(scores);

    return generateFullReport(
      'Dra. Carolina Alencar',
      raw,
      corrected,
      scores,
      pattern,
      'Consultoria de Desenvolvimento COMET',
      'Head de Pessoas e Cultura',
      'Inovação & Tech Brasil'
    );
  }
}

export function saveReportToHistory(report: SD3ReportData): void {
  try {
    const existing = loadHistory();
    const filtered = existing.filter((item) => item.id !== report.id);
    filtered.unshift(report);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Falha ao salvar relatório no histórico:', err);
  }
}

export function loadHistory(): SD3ReportData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!raw) {
      // Se não houver histórico, cria um teste fake automaticamente para o usuário já ver os relatórios
      const defaultDemo = createFakeAssessment('lider_estrategico');
      const defaultDemo2 = createFakeAssessment('gestora_projetos');
      const initial = [defaultDemo, defaultDemo2];
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const defaultDemo = createFakeAssessment('lider_estrategico');
      const initial = [defaultDemo];
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(initial));
      return initial;
    }
    return parsed;
  } catch (err) {
    console.error('Falha ao carregar histórico:', err);
    return [];
  }
}

export function deleteReportFromHistory(id: string): SD3ReportData[] {
  try {
    const existing = loadHistory();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Falha ao remover item do histórico:', err);
    return loadHistory();
  }
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  } catch (err) {
    console.error('Falha ao limpar histórico:', err);
  }
}

export function saveDraft(draft: DraftState): void {
  try {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(draft));
  } catch (err) {
    console.error('Falha ao salvar rascunho:', err);
  }
}

export function loadDraft(): DraftState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DRAFT);
    if (!raw) return null;
    return JSON.parse(raw) as DraftState;
  } catch (err) {
    console.error('Falha ao carregar rascunho:', err);
    return null;
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_DRAFT);
  } catch (err) {
    console.error('Falha ao limpar rascunho:', err);
  }
}

export function exportHistoryAsJson(): void {
  const history = loadHistory();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `comet_sd3_historico_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importHistoryFromJson(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) return false;
    const existing = loadHistory();
    const combinedMap = new Map<string, SD3ReportData>();
    for (const item of [...parsed, ...existing]) {
      if (item && item.id) {
        combinedMap.set(item.id, item);
      }
    }
    const combined = Array.from(combinedMap.values());
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(combined));
    return true;
  } catch (err) {
    console.error('Erro na importação do histórico JSON:', err);
    return false;
  }
}
