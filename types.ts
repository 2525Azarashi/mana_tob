export type PageType =
  // 公式サイトのページ
  | 'home'
  | 'about'        // 🏠 学びの扉とは
  | 'activities'   // 📚 活動内容
  // 3つの活動（資金・運営が独立しているため個別ページに分離）
  | 'app'          // 💻 学びの扉アプリ
  | 'community'    // 🎓 学生学修コミュニティ「まなとび」
  | 'music'        // 🎵 音楽活動「まなとび。」
  | 'philosophy'   // 💡 教育への考え方
  | 'materials'    // 🧑‍🏫 学習支援・教材
  | 'learning-app' // 💻 学習アプリの紹介
  | 'members'      // 👥 運営体制
  | 'reports'      // 📰 活動報告
  | 'achievements' // 📸 活動実績
  | 'contact'      // 📩 お問い合わせ
  | 'privacy'      // 🔒 プライバシーポリシー
  | 'terms'        // 📜 利用規約
  | 'sitemap';

/** ナビゲーション項目 */
export interface NavItem {
  page: PageType;
  emoji: string;
  label: string;
  labelEn: string;
  /** ヘッダーのメインナビに出すか */
  primary?: boolean;
}
