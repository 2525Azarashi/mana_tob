
export type PageType = 'home' | 'quiz-select' | 'quiz' | 'result' | 'privacy' | 'terms' | 'sitemap' | 'pdf-viewer';

export interface QuizQuestion {
  id: number;
  text: string;
  options?: string[];
  correct: string | number; // "○", "×" or index 0-3
  explanation: string;
}

export interface QuizSet {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface Material {
  id: string;
  title: string;
  description: string;
  summary: string;
  tag: string;
  icon: string;
  color: string;
  pdfUrl?: string; // PDF表示用のURLオプションを追加
}

export interface Creator {
  name: string;
  role: string;
  description: string;
}
