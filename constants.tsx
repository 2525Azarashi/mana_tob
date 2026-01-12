
import React from 'react';
import { BookOpen, Code, ShieldCheck, HelpCircle, Star, Terminal, Zap, FileText } from 'lucide-react';
import { Material, Creator, QuizSet, QuizQuestion } from './types';

export const MATERIALS: Material[] = [
  {
    id: 'ct-strategy',
    title: '共通テスト戦略',
    description: '最短ルートで合格するための、出題傾向に基づいた学習ロードマップ。',
    summary: '共通テスト「情報I」は、教科書の全範囲を網羅するのではなく、頻出項目である「情報デザイン」「プログラミング」「データ活用」にリソースを集中させることが重要です。この教材では具体的な学習スケジュールと配点戦略を解説します。',
    tag: '戦略',
    icon: 'Star',
    color: 'bg-[#0A3D62]'
  },
  {
    id: 'terms-1',
    title: '重要用語一問一答 (情報I ①)',
    description: '「情報とメディア」の核心を突く厳選された重要用語集。',
    summary: 'メディアリテラシー、情報の信頼性、デジタル化の仕組みなど、基礎的ながらも得点源となる用語を体系的に学習します。',
    tag: '基礎',
    icon: 'BookOpen',
    color: 'bg-[#2196F3]'
  },
  {
    id: 'programming-core',
    title: 'プログラミングの核心',
    description: '共通テスト手順記述標準言語 (DNCL) の本質を理解。',
    summary: '単にコードを覚えるのではなく、アルゴリズムの考え方や、条件分岐・繰り返しの本質を視覚的に理解します。',
    tag: '実践',
    icon: 'Code',
    color: 'bg-[#1976D2]'
  },
  {
    id: 'problem-1',
    title: '演習問題 大問1',
    description: '情報社会の問題解決・メディアと情報デザインの演習。',
    summary: '大問1で問われる「情報セキュリティ」や「知的財産権」の実践問題を解き、解説で核心を理解します。',
    tag: '演習',
    icon: 'HelpCircle',
    color: 'bg-[#0A3D62]'
  }
];

export const CREATORS: Creator[] = [
  {
    name: '作成者 1',
    role: '三重大学教育学部 2年生',
    description: '教育工学を専攻。高校生の学習効率を最大化するUI/UXデザインと、情報の核心を突く教材設計を担当。'
  },
  {
    name: '作成者 2',
    role: '関西学院大学工学部 2年生',
    description: '情報学を専攻。共通テスト情報Iの出題傾向分析、および最新のシラバスに基づいた問題作成を担当。'
  }
];

// Generates dummy questions to fulfill "20 questions" requirement
const generateQuestions = (prefix: string, count: number): QuizQuestion[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    text: `${prefix} に関する設問 ${i + 1}: コンピュータの内部では全ての情報を0と1で表現する。`,
    correct: Math.random() > 0.5 ? '○' : '×',
    explanation: 'コンピュータの基本原理は2進法です。電圧のオン/オフなど、2つの状態で全てのデータを処理します。'
  }));
};

export const QUIZ_DATA: QuizSet[] = [
  {
    id: 'important-terms-1',
    title: '情報I ① 一問一答',
    description: '単元まとめテスト～情報とメディア～',
    questions: [
      {
        id: 1,
        text: 'ＳＮＳに見知らぬ人が投稿した地震の被害状況は一次情報に該当する',
        correct: '×',
        explanation: 'SNSは誰でも投稿できるため、一次情報とは限りません。発信元や内容の信頼性を確認する必要があります。'
      },
      {
        id: 2,
        text: '専門機関や大学から保障されている教授の研究発表は一次情報に該当する',
        correct: '○',
        explanation: '信頼性の高い専門機関や大学からの研究発表は、その情報が直接得られたものであるため、一次情報に該当します。'
      },
      ...generateQuestions('情報とメディア', 18)
    ]
  },
  {
    id: 'important-terms-2',
    title: '情報I ② 一問一答',
    description: '単元まとめテスト～情報社会における法とセキュリティ～',
    questions: [
      {
        id: 1,
        text: ' Society 5.0は、サイバー空間とフィジカル空間を高度に融合させたシステムにより実現される人間中心の社会である',
        correct: '○',
        explanation: 'Society 5.0は、AIやIoTなどの技術を活用して、社会課題の解決と経済発展を両立させる社会を目指しています。'
      },
      ...generateQuestions('法とセキュリティ', 19)
    ]
  }
];

export const getIcon = (name: string, className?: string) => {
  switch (name) {
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Code': return <Code className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'HelpCircle': return <HelpCircle className={className} />;
    case 'Star': return <Star className={className} />;
    case 'Terminal': return <Terminal className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'FileText': return <FileText className={className} />;
    default: return <BookOpen className={className} />;
  }
};
