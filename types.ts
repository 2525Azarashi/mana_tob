export type PageType =
  // 旧来のページ
  | 'home'
  | 'quiz-select'
  | 'quiz'
  | 'result'
  | 'pdf-viewer'
  // 公式サイトのページ
  | 'about'        // 🏠 マナトビとは
  | 'activities'   // 📚 活動内容
  // 3つの活動（資金・運営が独立しているため個別ページに分離）
  | 'app'          // 💻 マナトビアプリ
  | 'community'    // 🎓 学生学修コミュニティ「まなとび」
  | 'music'        // 🎵 音楽活動「まなとび」
  | 'philosophy'   // 💡 教育への考え方
  | 'materials'    // 🧑‍🏫 学習支援・教材
  | 'chem-basis'   // 💻 Chem-Basisの紹介
  | 'members'      // 👥 運営体制
  | 'reports'      // 📰 活動報告
  | 'achievements' // 📸 活動実績
  | 'contact'      // 📩 お問い合わせ
  | 'privacy'      // 🔒 プライバシーポリシー
  | 'terms'        // 📜 利用規約
  | 'sitemap';

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
  pdfUrl?: string;
}

export interface Creator {
  name: string;
  role: string;
  description: string;
}

/** ナビゲーション項目 */
export interface NavItem {
  page: PageType;
  emoji: string;
  label: string;
  labelEn: string;
  /** ヘッダーのメインナビに出すか */
  primary?: boolean;
}
