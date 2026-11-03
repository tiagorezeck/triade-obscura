/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, AlertCircle, User, Briefcase, Building, ShieldCheck } from 'lucide-react';
import { SD3_QUESTIONS, SD3_SCALE_OPTIONS } from '../data/sd3Questions';
import { saveDraft, loadDraft, clearDraft } from '../services/sd3Storage';

interface AssessmentFormProps {
  onComplete: (data: {
    participantName: string;
    participantRole?: string;
    organization?: string;
    evaluatorName?: string;
    rawAnswers: Record<number, number>;
  }) => void;
  onCancel?: () => void;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = Identificação, 1 = Itens 1-9, 2 = Itens 10-18, 3 = Itens 19-27
  const [participantName, setParticipantName] = useState<string>('');
  const [participantRole, setParticipantRole] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [evaluatorName, setEvaluatorName] = useState<string>('');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [validationError, setValidationError] = useState<string | null>(null);

  // Carrega rascunho salvo ao inicializar
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setParticipantName(draft.participantName || '');
      setParticipantRole(draft.participantRole || '');
      setOrganization(draft.organization || '');
      setEvaluatorName(draft.evaluatorName || '');
      setAnswers(draft.answers || {});
      if (draft.step && draft.step >= 0 && draft.step <= 3) {
        setCurrentStep(draft.step);
      }
    }
  }, []);

  // Salva rascunho sempre que mudar
  useEffect(() => {
    saveDraft({
      participantName,
      participantRole,
      organization,
      evaluatorName,
      answers,
      step: currentStep
    });
  }, [participantName, participantRole, organization, evaluatorName, answers, currentStep]);

  // Grupos de itens por etapa
  const getStepQuestions = (stepIndex: number) => {
    if (stepIndex === 1) return SD3_QUESTIONS.slice(0, 9); // 1 a 9
    if (stepIndex === 2) return SD3_QUESTIONS.slice(9, 18); // 10 a 18
    if (stepIndex === 3) return SD3_QUESTIONS.slice(18, 27); // 19 a 27
    return [];
  };

  const handleSelectAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
    if (validationError) setValidationError(null);
  };

  // Validação ao avançar
  const handleNextStep = () => {
    if (currentStep === 0) {
      if (!participantName.trim()) {
        setValidationError('Por favor, informe o nome do participante para prosseguir.');
        return;
      }
      setValidationError(null);
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const currentQuestions = getStepQuestions(currentStep);
    const unanswered = currentQuestions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setValidationError(
        `Existem ${unanswered.length} afirmações obrigatórias ainda sem resposta nesta etapa. Por favor, responda a todas para continuar.`
      );
      // Rola para a primeira questão não respondida
      const firstUnansweredEl = document.getElementById(`question-card-${unanswered[0].id}`);
      if (firstUnansweredEl) {
        firstUnansweredEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setValidationError(null);
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Concluir avaliação
      clearDraft();
      onComplete({
        participantName,
        participantRole,
        organization,
        evaluatorName,
        rawAnswers: answers
      });
    }
  };

  const handlePrevStep = () => {
    setValidationError(null);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Progresso total de respostas (0 a 27)
  const totalAnswered = Object.keys(answers).length;
  const progressPercent = Math.round((totalAnswered / 27) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Cabeçalho do Assessment */}
      <div className="mb-8 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-orange-700 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Área ORIGEM · Instrumento SD3
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Avaliação de Traços de Personalidade
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Instrumento padronizado composto por 27 afirmações. Responda com sinceridade e espontaneidade de acordo com seu funcionamento cotidiano habitual. Não existem respostas certas ou erradas.
        </p>

        {/* Barra de Progresso Global */}
        {currentStep > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Progresso: {totalAnswered} de 27 questões respondidas
              </span>
              <span className="font-mono text-orange-600 dark:text-orange-400 font-semibold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Stepper Visual */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-medium">
              {[1, 2, 3].map((stepNum) => {
                const isActive = currentStep === stepNum;
                const isPassed = currentStep > stepNum;
                return (
                  <div
                    key={stepNum}
                    className={`py-2 px-3 rounded-lg border text-center transition-all ${
                      isActive
                        ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-500 text-orange-700 dark:text-orange-300 font-semibold'
                        : isPassed
                        ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/60 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <span>Etapa {stepNum} de 3</span>
                    <span className="block text-[11px] opacity-75">
                      Itens {(stepNum - 1) * 9 + 1} a {stepNum * 9}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Alerta de Validação */}
      {validationError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/80 text-red-800 dark:text-red-200 text-sm flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 dark:text-red-300">Atenção necessária</p>
            <p className="mt-0.5 text-xs sm:text-sm">{validationError}</p>
          </div>
        </div>
      )}

      {/* ETAPA 0: IDENTIFICAÇÃO E TERMO */}
      {currentStep === 0 && (
        <div className="space-y-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Identificação do Participante</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Os dados a seguir serão associados ao relatório individual e preservados com segurança.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                Nome Completo do Participante <span className="text-orange-600 dark:text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Ex: Carlos Eduardo Silveira"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                Cargo / Função Atual (Opcional)
              </label>
              <input
                type="text"
                value={participantRole}
                onChange={(e) => setParticipantRole(e.target.value)}
                placeholder="Ex: Diretor de Operações"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                Organização / Empresa (Opcional)
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Ex: Instituto COMET"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                Nome do Avaliador / Consultor Responsável (Opcional)
              </label>
              <input
                type="text"
                value={evaluatorName}
                onChange={(e) => setEvaluatorName(e.target.value)}
                placeholder="Ex: Dra. Mariana Vasconcellos (CRP 06/12345)"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm transition-colors"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <p className="font-semibold text-slate-800 dark:text-slate-300">Orientações de Preenchimento:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>O questionário contém 27 afirmações breves apresentadas em 3 etapas de 9 itens cada.</li>
              <li>Utilize a escala Likert de 1 (Discordo totalmente) a 5 (Concordo totalmente).</li>
              <li>Responda com base em como você realmente age e pensa, e não como gostaria de agir.</li>
              <li>O teste é estritamente confidencial e voltado ao desenvolvimento de competências.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ETAPAS 1 A 3: LISTAGEM DAS AFIRMAÇÕES */}
      {currentStep > 0 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between shadow-sm dark:shadow-none">
            <span className="font-semibold text-orange-600 dark:text-orange-400">
              Etapa {currentStep} de 3 · Afirmações {(currentStep - 1) * 9 + 1} a {currentStep * 9}
            </span>
            <span className="text-slate-500 dark:text-slate-400">Escala: 1 (Discordo totalmente) a 5 (Concordo totalmente)</span>
          </div>

          {getStepQuestions(currentStep).map((question) => {
            const currentAnswer = answers[question.id];
            const isAnswered = currentAnswer !== undefined;
            const globalIndex = question.id;

            return (
              <div
                key={question.id}
                id={`question-card-${question.id}`}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                  isAnswered
                    ? 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none'
                    : 'bg-white dark:bg-slate-900/80 border-slate-300 dark:border-slate-700 shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                      isAnswered
                        ? 'bg-orange-100 dark:bg-orange-600/20 text-orange-700 dark:text-orange-400 border border-orange-300 dark:border-orange-500/40'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {globalIndex}
                  </div>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-snug">
                      "{question.textPt}"
                    </p>

                    {/* Escala de Respostas Likert 5 Pontos */}
                    <div className="mt-5 grid grid-cols-5 gap-1.5 sm:gap-2.5">
                      {SD3_SCALE_OPTIONS.map((opt) => {
                        const isSelected = currentAnswer === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSelectAnswer(question.id, opt.value)}
                            className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer select-none ${
                              isSelected
                                ? 'bg-orange-600 border-orange-500 text-white font-semibold shadow-lg shadow-orange-600/20 scale-[1.02]'
                                : 'bg-slate-50 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900'
                            }`}
                          >
                            <span className="text-base sm:text-lg font-bold font-mono">
                              {opt.value}
                            </span>
                            <span className="hidden sm:block text-[10px] mt-1 line-clamp-2 leading-tight">
                              {opt.shortLabel}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Legenda textual mobile */}
                    <div className="flex sm:hidden justify-between text-[10px] text-slate-400 font-medium mt-2 px-1">
                      <span>Discordo totalmente</span>
                      <span>Concordo totalmente</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Controles de Navegação */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={handlePrevStep}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>
        ) : (
          <div></div>
        )}

        <button
          type="button"
          onClick={handleNextStep}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold shadow-lg shadow-orange-600/30 transition-all text-sm cursor-pointer ml-auto"
        >
          {currentStep === 0 ? (
            <>
              Iniciar Questionário
              <ChevronRight className="w-4 h-4" />
            </>
          ) : currentStep < 3 ? (
            <>
              Próxima Etapa ({currentStep + 1} de 3)
              <ChevronRight className="w-4 h-4" />
            </>
          ) : (
            <>
              Concluir e Gerar Relatório
              <CheckCircle2 className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
