/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DimensionKey = 'machiavellianism' | 'narcissism' | 'psychopathy';

export type LikertScore = 1 | 2 | 3 | 4 | 5;

export interface SD3Question {
  id: number;
  textPt: string;
  originalEn: string;
  dimension: DimensionKey;
  isReversed: boolean;
  notes?: string;
}

export interface DimensionScore {
  key: DimensionKey;
  titlePt: string;
  titleEn: string;
  mean: number; // 1.00 - 5.00
  normalizedPercent: number; // ((mean - 1) / 4) * 100
  rawSum: number;
  correctedSum: number;
  itemCount: number;
  reversedItemsCount: number;
  intensityLevel: 'baixo' | 'moderado' | 'elevado';
  relativeRank: number; // 1 (mais alto), 2, 3 (mais baixo)
}

export interface TriadPatternAnalysis {
  dominantKey: DimensionKey;
  lowestKey: DimensionKey;
  scoreSpread: number; // diferença entre a maior e a menor média
  patternLabel: string;
  patternSummary: string;
  detailedInteractionText: string;
  riskHypotheses: string[];
  constructiveAvenues: string[];
}

export interface DimensionAnalysis {
  dimension: DimensionKey;
  whatItMeasures: string;
  individualResultExplanation: string;
  everydayManifestations: string[];
  constructivePotentials: string[];
  pointsOfAttention: string[];
  interpersonalDynamics: string;
  decisionMakingImpact: string;
  developmentGuidance: string[];
}

export interface BusinessApplicationArea {
  id: string;
  title: string;
  description: string;
  favorableTendencies: string[];
  behavioralRisks: string[];
  contextScenarios: string[];
  reflectionQuestions: string[];
  developmentRecommendations: string[];
}

export interface DevelopmentRecommendation {
  priority: number;
  behaviorToDevelop: string;
  whyItMatters: string;
  actionableStep: string;
  applicationContext: string;
  growthIndicator: string;
}

export interface ProfessionalPractitionerBlock {
  forCoachesAndMentors: {
    investigationHypotheses: string[];
    deepeningQuestions: string[];
    sessionWorkThemes: string[];
    followUpGuidance: string[];
  };
  forBusinessConsultants: {
    managementImpacts: string[];
    leadershipDynamics: string[];
    cultureRisks: string[];
    organizationalObservationPoints: string[];
  };
  forPsychologicalProfessionals: {
    constructDefinitions: string[];
    quantitativeSynthesis: string;
    interpretativeLimits: string[];
    complementaryInterviewHypotheses: string[];
    ethicalDisclaimer: string;
  };
}

export interface ExecutiveSummary {
  predominantDimension: string;
  leastExpressiveDimension: string;
  coreCharacteristic: string;
  keyPotentialToHarness: string;
  primaryAttentionPoint: string;
  priorityDevelopmentAction: string;
  centralReflectionQuestion: string;
  concludingSynthesisText: string;
}

export interface SD3ReportData {
  id: string;
  timestamp: string;
  formattedDate: string;
  participantName: string;
  evaluatorName?: string;
  participantRole?: string;
  organization?: string;
  instrumentName: string;
  instrumentSource: string;
  translationVersion: string;
  answersRaw: Record<number, number>;
  answersCorrected: Record<number, number>;
  scores: Record<DimensionKey, DimensionScore>;
  pattern: TriadPatternAnalysis;
  dimensionsAnalysis: Record<DimensionKey, DimensionAnalysis>;
  businessApplications: BusinessApplicationArea[];
  selfKnowledge: {
    observablePatterns: string[];
    strengthsToDirect: string[];
    blindSpots: string[];
    reflectionQuestionsByDimension: Record<DimensionKey, string[]>;
    developmentPlan: DevelopmentRecommendation[];
  };
  professionalPractitioners: ProfessionalPractitionerBlock;
  executiveSummary: ExecutiveSummary;
}

export interface AuditTestCase {
  id: string;
  name: string;
  description: string;
  presetAnswers?: Record<number, number>;
  expectedResultCheck?: (report: SD3ReportData) => { passed: boolean; message: string };
}
