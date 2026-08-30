export type PageType =
  // 公式サイトのページ
  | 'home'
  | 'about'        // 学びの扉とは
  | 'activities'   // 活動内容
  // 3つの活動（資金・運営が独立しているため個別ページに分離）
  | 'app'          // 学びの扉アプリ
  | 'community'    // 学生学修コミュニティ「まなとび」
  | 'music'        // 音楽活動「まなとび。」
  | 'philosophy'   // 教育への考え方
  | 'materials'    // 学習支援・教材
  | 'learning-app' // 学習アプリの紹介
  | 'members'      // 運営体制
  | 'reports'      // 活動報告
  | 'achievements' // 活動実績
  | 'contact'      // お問い合わせ
  | 'privacy'      // プライバシーポリシー
  | 'terms'        // 利用規約
  | 'sitemap'
  /**
   * 存在しないURLにアクセスされたときの「見つかりません」画面。
   *
   * [重要] これを 'home' で代用してはいけません。
   *   以前は未知のパスをすべて 'home' に読み替えていたため、
   *   /no-such-page のような無効なURLでもトップページの内容が
   *   ステータス 200 で表示されていました（ソフト404）。
   *   検索エンジンからは「同じ内容のページが無限に存在するサイト」と見え、
   *   重複コンテンツとして評価を落とす原因になります。
   *   無効なURLは必ずこの notFound を返してください。
   */
  | 'notFound';

/**
 * ナビゲーション項目。
 *
 * [重要] 絵文字は使用しません。
 *   視覚的な目印が必要な箇所では icon（lucide-react のアイコン名）を用います。
 *   アイコン名は components/ui/Blocks.tsx の resolveIcon() に登録されているものを指定してください。
 *   見出し（h1 / h2）には装飾記号・アイコンを付けず、文字組みだけで階層を表します。
 */
export interface NavItem {
  page: PageType;
  /** lucide-react のアイコン名（例: 'BookOpen'）。絵文字は使用しません。 */
  icon: string;
  label: string;
  labelEn: string;
  /** ヘッダーのメインナビに出すか */
  primary?: boolean;
}
