/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SD3Question } from '../types/sd3';

export const SD3_SCALE_OPTIONS = [
  { value: 1, label: 'Discordo totalmente', shortLabel: 'Discordo totalmente' },
  { value: 2, label: 'Discordo parcialmente', shortLabel: 'Discordo parcialmente' },
  { value: 3, label: 'Nem concordo, nem discordo', shortLabel: 'Neutro' },
  { value: 4, label: 'Concordo parcialmente', shortLabel: 'Concordo parcialmente' },
  { value: 5, label: 'Concordo totalmente', shortLabel: 'Concordo totalmente' },
] as const;

export const REVERSED_ITEM_IDS = [11, 15, 17, 20, 25];

export const SD3_QUESTIONS: SD3Question[] = [
  // -------------------------------------------------------------
  // Bloco 1: Maquiavelismo (Itens 1 a 9)
  // -------------------------------------------------------------
  {
    id: 1,
    originalEn: "It's not wise to tell your secrets.",
    textPt: 'Não é prudente revelar seus segredos.',
    dimension: 'machiavellianism',
    isReversed: false,
    notes: 'Preservação de prudência e contenção informativa.'
  },
  {
    id: 2,
    originalEn: 'I like to use clever manipulation to get my way.',
    textPt: 'Gosto de usar de manipulação inteligente para conseguir o que quero.',
    dimension: 'machiavellianism',
    isReversed: false,
    notes: 'Afinidade explícita com influências e estratégias sutis.'
  },
  {
    id: 3,
    originalEn: 'Whatever it takes, you must get the important people on your side.',
    textPt: 'Custe o que custar, você deve ter as pessoas importantes do seu lado.',
    dimension: 'machiavellianism',
    isReversed: false,
    notes: 'Alinhamento tático com figuras de influência e poder.'
  },
  {
    id: 4,
    originalEn: 'Avoid direct conflict with others because they may be useful in the future.',
    textPt: 'Evite conflito direto com as pessoas, pois elas podem ser úteis no futuro.',
    dimension: 'machiavellianism',
    isReversed: false,
    notes: 'Visão utilitária e prospectiva das relações humanas.'
  },
  {
    id: 5,
    originalEn: "It's wise to keep track of information that you can use against people later.",
    textPt: 'É prudente manter registro de informações que você possa usar contra as pessoas mais tarde.',
    dimension: 'machiavellianism',
    isReversed: false,
    notes: 'Acúmulo estratégico de dados para eventual alavancagem de poder.'
  },
  {
    id: 6,
    originalEn: 'You should wait for the right time to get back at people.',
    textPt: 'Deve-se esperar o momento certo para dar o troco nas pessoas.',
    dimension: 'machiavellianism',
    isReversed: false,
    notes: 'Paciência calculada na resposta a confrontos.'
  },
  {
    id: 7,
    originalEn: "There are things you should hide from other people because they don't need to know.",
    textPt: 'Há coisas que você deve ocultar dos outros porque eles não precisam saber.',
    dimension: 'machiavellianism',
    isReversed: false,
    notes: 'Gestão seletiva e compartimentada da transparência.'
  },
  {
    id: 8,
    originalEn: 'Make sure your plans benefit yourself, not others.',
    textPt: 'Certifique-se de que seus planos beneficiem a você, e não aos outros.',
    dimension: 'machiavellianism',
    isReversed: false,
    notes: 'Priorização unilateral do próprio interesse no planejamento.'
  },
  {
    id: 9,
    originalEn: 'Most people can be manipulated.',
    textPt: 'A maioria das pessoas pode ser manipulada.',
    dimension: 'machiavellianism',
    isReversed: false,
    notes: 'Crença central sobre a permeabilidade alheia à persuasão.'
  },

  // -------------------------------------------------------------
  // Bloco 2: Narcisismo (Itens 10 a 18)
  // -------------------------------------------------------------
  {
    id: 10,
    originalEn: 'People see me as a natural leader.',
    textPt: 'As pessoas me veem como um(a) líder nato(a).',
    dimension: 'narcissism',
    isReversed: false,
    notes: 'Percepção de liderança natural e destaque social.'
  },
  {
    id: 11,
    originalEn: 'I hate being the center of attention.',
    textPt: 'Detesto ser o centro das atenções.',
    dimension: 'narcissism',
    isReversed: true,
    notes: 'Item invertido: repulsa à centralidade e visibilidade pública.'
  },
  {
    id: 12,
    originalEn: 'Many group activities tend to be dull without me.',
    textPt: 'Muitas atividades em grupo costumam ficar sem graça sem a minha presença.',
    dimension: 'narcissism',
    isReversed: false,
    notes: 'Sentimento de indispensabilidade e animação social.'
  },
  {
    id: 13,
    originalEn: 'I know that I am special because everyone keeps telling me so.',
    textPt: 'Sei que sou uma pessoa especial porque todos vivem me dizendo isso.',
    dimension: 'narcissism',
    isReversed: false,
    notes: 'Internalização de distinção e validação externa contínua.'
  },
  {
    id: 14,
    originalEn: 'I like to get acquainted with important people.',
    textPt: 'Gosto de me relacionar com pessoas importantes.',
    dimension: 'narcissism',
    isReversed: false,
    notes: 'Busca por status por meio de associação a figuras de prestígio.'
  },
  {
    id: 15,
    originalEn: 'I feel embarrassed if someone compliments me.',
    textPt: 'Sinto-me constrangido(a) quando alguém me elogia.',
    dimension: 'narcissism',
    isReversed: true,
    notes: 'Item invertido: desconforto com reconhecimento e elogios.'
  },
  {
    id: 16,
    originalEn: 'I have been compared to famous people.',
    textPt: 'Já fui comparado(a) a pessoas famosas.',
    dimension: 'narcissism',
    isReversed: false,
    notes: 'Autoimagem associada a figuras proeminentes da sociedade.'
  },
  {
    id: 17,
    originalEn: 'I am an average person.',
    textPt: 'Sou uma pessoa comum.',
    dimension: 'narcissism',
    isReversed: true,
    notes: 'Item invertido: identificação com a mediania humana.'
  },
  {
    id: 18,
    originalEn: 'I insist on getting the respect I deserve.',
    textPt: 'Faço questão de receber o respeito que mereço.',
    dimension: 'narcissism',
    isReversed: false,
    notes: 'Exigência de reverência, deferência e reconhecimento pessoal.'
  },

  // -------------------------------------------------------------
  // Bloco 3: Psicopatia Subclínica (Itens 19 a 27)
  // -------------------------------------------------------------
  {
    id: 19,
    originalEn: 'I like to get revenge on authorities.',
    textPt: 'Gosto de me vingar de figuras de autoridade.',
    dimension: 'psychopathy',
    isReversed: false,
    notes: 'Hostilidade declarada e resistência retaliatória a regras/autoridade.'
  },
  {
    id: 20,
    originalEn: 'I avoid dangerous situations.',
    textPt: 'Evito situações perigosas.',
    dimension: 'psychopathy',
    isReversed: true,
    notes: 'Item invertido: aversão à adrenalina, risco e imprudência.'
  },
  {
    id: 21,
    originalEn: 'Payback needs to be quick and nasty.',
    textPt: 'O troco precisa ser rápido e pesado.',
    dimension: 'psychopathy',
    isReversed: false,
    notes: 'Impulso reativo severo e baixa tolerância a afrontas.'
  },
  {
    id: 22,
    originalEn: "People often say I'm out of control.",
    textPt: 'As pessoas frequentemente dizem que sou descontrolado(a).',
    dimension: 'psychopathy',
    isReversed: false,
    notes: 'Evidência externa de desinibição comportamental e impulsividade.'
  },
  {
    id: 23,
    originalEn: "It's true that I can be mean to others.",
    textPt: 'É verdade que posso ser cruel com os outros.',
    dimension: 'psychopathy',
    isReversed: false,
    notes: 'Reconhecimento aberto de dureza interpessoal e baixa compaixão.'
  },
  {
    id: 24,
    originalEn: 'People who mess with me always regret it.',
    textPt: 'Quem mexe comigo sempre se arrepende.',
    dimension: 'psychopathy',
    isReversed: false,
    notes: 'Cultura pessoal de retaliação e intimidação.'
  },
  {
    id: 25,
    originalEn: 'I have never gotten into trouble with the law.',
    textPt: 'Nunca tive problemas com a lei ou autoridades.',
    dimension: 'psychopathy',
    isReversed: true,
    notes: 'Item invertido: conformidade normativa e respeito aos limites legais.'
  },
  {
    id: 26,
    originalEn: 'I enjoy having sex with people I hardly know.',
    textPt: 'Gosto de ter relacionamentos íntimos e casuais com pessoas que mal conheço.',
    dimension: 'psychopathy',
    isReversed: false,
    notes: 'Comportamento impessoal, busca de sensações e baixo apego afetivo.'
  },
  {
    id: 27,
    originalEn: "I'll say anything to get what I want.",
    textPt: 'Sou capaz de dizer qualquer coisa para conseguir o que quero.',
    dimension: 'psychopathy',
    isReversed: false,
    notes: 'Desinibição moral discursiva e flexibilidade ética circunstancial.'
  }
];

export const DIMENSION_META: Record<
  'machiavellianism' | 'narcissism' | 'psychopathy',
  {
    titlePt: string;
    titleEn: string;
    shortDesc: string;
    itemIndices: number[]; // 1-based question IDs
  }
> = {
  machiavellianism: {
    titlePt: 'Maquiavelismo',
    titleEn: 'Machiavellianism',
    shortDesc: 'Pragmatismo estratégico, cálculo interpessoal e visão instrumental das relações.',
    itemIndices: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  narcissism: {
    titlePt: 'Narcisismo',
    titleEn: 'Narcissism',
    shortDesc: 'Busca por prestígio, necessidade de validação, protagonismo e autoimagem valorizada.',
    itemIndices: [10, 11, 12, 13, 14, 15, 16, 17, 18]
  },
  psychopathy: {
    titlePt: 'Psicopatia Subclínica',
    titleEn: 'Subclinical Psychopathy',
    shortDesc: 'Insensibilidade afetiva, propensão ao risco, impulsividade e frieza sob pressão.',
    itemIndices: [19, 20, 21, 22, 23, 24, 25, 26, 27]
  }
};
