import { NavItem } from '../types';

/**
 * サイト全体のナビゲーション定義。
 * ここに追記すれば、ヘッダー・フッター・サイトマップに自動反映されます。
 */
export const MAIN_NAV: NavItem[] = [
  { page: 'about', emoji: '🏠', label: 'マナトビとは', labelEn: 'About', primary: true },
  { page: 'activities', emoji: '📚', label: '活動内容', labelEn: 'Activities', primary: true },
  { page: 'philosophy', emoji: '💡', label: '教育への考え方', labelEn: 'Philosophy', primary: true },
  { page: 'materials', emoji: '🧑‍🏫', label: '学習支援・教材', labelEn: 'Materials', primary: true },
  { page: 'chem-basis', emoji: '💻', label: 'Chem-Basis', labelEn: 'Chem-Basis', primary: true },
  { page: 'members', emoji: '👥', label: '運営体制', labelEn: 'Organization', primary: true },
  { page: 'reports', emoji: '📰', label: '活動報告', labelEn: 'Reports', primary: true },
  { page: 'achievements', emoji: '📸', label: '活動実績', labelEn: 'Achievements', primary: true },
  { page: 'contact', emoji: '📩', label: 'お問い合わせ', labelEn: 'Contact', primary: true },
];

/**
 * 3つの活動（部門）のナビゲーション。
 * ⚠ それぞれ資金・運営が独立しているため、必ず別ページとして扱います。
 */
export const DIVISION_NAV: NavItem[] = [
  { page: 'app', emoji: '💻', label: 'マナトビアプリ', labelEn: 'Manatobi App' },
  { page: 'community', emoji: '🎓', label: '学生学修コミュニティ「まなとび」', labelEn: 'Student Community' },
  { page: 'music', emoji: '🎵', label: '音楽活動「まなとび」', labelEn: 'Music' },
];

export const LEGAL_NAV: NavItem[] = [
  { page: 'privacy', emoji: '🔒', label: 'プライバシーポリシー', labelEn: 'Privacy Policy' },
  { page: 'terms', emoji: '📜', label: '利用規約', labelEn: 'Terms of Use' },
  { page: 'sitemap', emoji: '🗺️', label: 'サイトマップ', labelEn: 'Sitemap' },
];

export const TOOL_NAV: NavItem[] = [
  { page: 'quiz-select', emoji: '✍️', label: '重要用語 一問一答', labelEn: 'Quiz' },
];

/** ページごとの meta 情報（title / description） */
export const PAGE_META: Record<string, { title: string; description: string }> = {
  home: {
    title: 'マナトビ｜学びの扉 ～私たちにできることを～',
    description:
      'マナトビは、学習サービスを開発・運営する「マナトビアプリ」、三重大学で探究に取り組む学生学修コミュニティ「まなとび」、楽曲を制作する音楽活動「まなとび」という、それぞれ独立した3つの活動の総称です。',
  },
  about: {
    title: 'マナトビとは｜3つの活動と組織構成',
    description:
      'マナトビは総称であり、マナトビアプリ（学習サービスの開発・運営）、学生学修コミュニティ「まなとび」（三重大学での探究活動）、音楽活動「まなとび」という、資金・運営が独立した3つの活動から成り立っています。',
  },
  activities: {
    title: '活動内容｜マナトビ公式サイト',
    description:
      'マナトビの3つの活動（マナトビアプリ／学生学修コミュニティ「まなとび」／音楽活動「まなとび」）が、それぞれ何を行っているかをご紹介します。',
  },
  app: {
    title: 'マナトビアプリ｜学習サービスの開発・運営',
    description:
      'マナトビアプリは、高校生・受験生向けの学習サービスを開発・運営する活動です。無料の化学学習サービス「Chem-Basis」や学習教材を提供しています。',
  },
  community: {
    title: '学生学修コミュニティ「まなとび」｜三重大学での探究活動',
    description:
      '学生学修コミュニティ「まなとび」は、三重大学を拠点に学生が主体となって探究に取り組む活動です。教職を志す高校生との対話プログラムを運営しています。',
  },
  music: {
    title: '音楽活動「まなとび」｜楽曲制作',
    description:
      '音楽活動「まなとび」は、「まなとび」名義で楽曲を制作している活動です。楽曲「誕生」をリリースしています。',
  },
  philosophy: {
    title: '教育への考え方｜マナトビ公式サイト',
    description:
      '「学びの入口は誰にでも開かれているべき」「暗記の前になぜそうなるかを」。マナトビが教材制作と活動運営で大切にしている4つの考え方をお伝えします。',
  },
  materials: {
    title: '学習支援・教材｜マナトビ公式サイト',
    description:
      '化学基礎・化学、共通テスト情報I、英語リスニング。マナトビが制作・公開している無料学習教材のラインナップと利用方法をご案内します。',
  },
  'chem-basis': {
    title: 'Chem-Basis の紹介｜マナトビアプリが開発・運営する無料の化学学習サービス',
    description:
      'Chem-Basis は、マナトビアプリが開発・運営する無料の化学学習サービスです。化学基礎・化学の単元別演習を、登録不要・スマートフォンだけで進められます。',
  },
  members: {
    title: '運営体制｜マナトビ公式サイト',
    description:
      'マナトビの3つの活動それぞれの運営体制と担当領域をご紹介します。資金・会計は活動ごとに独立して管理しています。',
  },
  reports: {
    title: '活動報告｜マナトビ公式サイト',
    description:
      '教師塾の開催報告、教材の公開、サービス改善など、マナトビの活動を時系列で記録・公開しています。',
  },
  achievements: {
    title: '活動実績｜マナトビ公式サイト',
    description:
      'マナトビのこれまでの活動実績を、数値とあゆみでご紹介します。制作教材数、プログラム実施実績などを掲載しています。',
  },
  contact: {
    title: 'お問い合わせ｜マナトビ公式サイト',
    description:
      '教材に関するご質問、連携・取材のご相談、誤りのご指摘など、マナトビへのお問い合わせはこちらから承ります。',
  },
  privacy: {
    title: 'プライバシーポリシー｜マナトビ公式サイト',
    description:
      'マナトビ公式サイトおよび Chem-Basis における個人情報の取り扱い、Cookie・広告配信（Google AdSense）・アクセス解析についてご説明します。',
  },
  terms: {
    title: '利用規約｜マナトビ公式サイト',
    description:
      'マナトビ公式サイトおよび提供する教材・サービスをご利用いただく際の条件、禁止事項、免責事項を定めた利用規約です。',
  },
  sitemap: {
    title: 'サイトマップ｜マナトビ公式サイト',
    description: 'マナトビ公式サイトの全ページ一覧です。',
  },
  'quiz-select': {
    title: '重要用語 一問一答｜マナトビ公式サイト',
    description: '共通テスト「情報I」の重要用語を、一問一答形式で確認できる無料の演習です。',
  },
};
