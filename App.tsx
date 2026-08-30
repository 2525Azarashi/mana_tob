import React, { useState, useEffect, useCallback } from 'react';
import { PageType } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SakuraEffect from './components/SakuraEffect';
import {
  AboutSection,
  ActivitiesSection,
  LearningAppSection,
  PhilosophySection,
  AchievementsSection,
  ReportsSection,
  MembersSection,
  ContactSection,
} from './components/HomeSections';

// 下層ページ
import AboutPage from './pages/AboutPage';
import ActivitiesPage from './pages/ActivitiesPage';
import DivisionPage from './pages/DivisionPage';
import PhilosophyPage from './pages/PhilosophyPage';
import MaterialsPage from './pages/MaterialsPage';
import LearningAppPage from './pages/LearningAppPage';
import MembersPage from './pages/MembersPage';
import ReportsPage from './pages/ReportsPage';
import AchievementsPage from './pages/AchievementsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SitemapPage from './pages/SitemapPage';

import { usePageSeo } from './hooks/usePageSeo';

/** ページと URL パスの対応（ブラウザの戻る/進むとURL共有に対応） */
const PATHS: Record<string, PageType> = {
  '/': 'home',
  '/about': 'about',
  '/activities': 'activities',
  // 3つの活動（資金・運営が独立しているため個別ページ）
  '/app': 'app',
  '/community': 'community',
  '/music': 'music',
  '/philosophy': 'philosophy',
  '/materials': 'materials',
  '/learning-app': 'learning-app',
  '/members': 'members',
  '/reports': 'reports',
  '/achievements': 'achievements',
  '/contact': 'contact',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/sitemap': 'sitemap',
};

/**
 * 旧URLから現行URLへの読み替え表。
 * 過去に共有されたリンクを 404 にしないためのエイリアスです。
 * （pageToPath が生成する正規URLは PATHS 側のみ）
 */
const LEGACY_PATHS: Record<string, PageType> = {
  // 旧「Chem-Basis 紹介」ページのURL。現在は「学習アプリ」ページに統合。
  '/chem-basis': 'learning-app',
};

const pageToPath = (page: PageType): string => {
  const found = Object.entries(PATHS).find(([, p]) => p === page);
  return found ? found[0] : '/';
};

/**
 * URL のパスから表示すべきページを決めます。
 *
 * [重要] 未知のパスは 'notFound' を返します。'home' にしてはいけません。
 *   以前は `?? 'home'` としていたため、/no-such-page のような
 *   存在しないURLでもトップページの内容がそのまま表示されていました。
 *   これは「ソフト404」と呼ばれる状態で、
 *     ・検索エンジンに重複コンテンツと判断される
 *     ・AdSense の審査で「価値の低いコンテンツ」とみなされる恐れがある
 *     ・利用者が誤字に気づけない
 *   という問題があります。
 *
 *   末尾スラッシュ（/about/）は同じページとして扱います。
 *   別URLとして扱うと、同じ内容が2つのURLで見えてしまうためです。
 */
const pathToPage = (path: string): PageType => {
  // '/' 以外の末尾スラッシュを取り除いて正規化する
  const normalized =
    path.length > 1 && path.endsWith('/') ? path.replace(/\/+$/, '') : path;
  return PATHS[normalized] ?? LEGACY_PATHS[normalized] ?? 'notFound';
};

/**
 * 静的ホスティング（404.html フォールバック）経由でアクセスされた場合、
 * 元のパスを sessionStorage から復元します。
 */
const resolveInitialPath = (): string => {
  if (typeof window === 'undefined') return '/';
  const stashed = sessionStorage.getItem('redirectPath');
  if (stashed) {
    sessionStorage.removeItem('redirectPath');
    const path = stashed.split('?')[0];
    /*
      [重要] 有効なパスかどうかに関わらず、URL を元のパスに戻します。
        以前は有効なパスのときだけ戻していたため、
        存在しないURLでアクセスすると 404.html が '/' に転送したまま
        トップページが表示されていました（ソフト404）。
        無効なパスでも元のURLを保ったうえで
        「見つかりません」画面を出すのが正しい挙動です。
    */
    window.history.replaceState({}, '', stashed);
    return path;
  }
  return window.location.pathname;
};

/**
 * 「ページが見つかりません」画面に並べる主要ページの導線。
 * 利用者が目的のページを探し直せるようにするためのものです。
 */
const NOT_FOUND_LINKS: Array<{ page: PageType; label: string; note: string }> = [
  { page: 'about', label: '学びの扉とは', note: '3つの活動と組織構成' },
  { page: 'materials', label: '学習支援・教材', note: '化学基礎・化学／英語リスニング' },
  { page: 'learning-app', label: '学習アプリ', note: '登録不要・無料の化学学習サービス' },
  { page: 'reports', label: '活動報告', note: 'これまでの活動の記録' },
  { page: 'contact', label: 'お問い合わせ', note: 'ご質問・ご相談はこちら' },
  { page: 'sitemap', label: 'サイトマップ', note: '全ページの一覧' },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(() =>
    pathToPage(resolveInitialPath())
  );

  /** ページ遷移（履歴を積む） */
  const navigate = useCallback((page: PageType) => {
    setCurrentPage(page);
    const path = pageToPath(page);
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
  }, []);

  /** ブラウザの戻る/進む */
  useEffect(() => {
    const onPop = () => setCurrentPage(pathToPage(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  /** ページ遷移時のスクロールリセット */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  /** ページ別の title / description / canonical / OGP を更新（全ページ共通） */
  usePageSeo(currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={navigate} />
            <AboutSection setCurrentPage={navigate} />
            <ActivitiesSection setCurrentPage={navigate} />
            <LearningAppSection setCurrentPage={navigate} />
            <PhilosophySection setCurrentPage={navigate} />
            <AchievementsSection setCurrentPage={navigate} />
            <ReportsSection setCurrentPage={navigate} />
            <MembersSection setCurrentPage={navigate} />
            <ContactSection setCurrentPage={navigate} />
          </>
        );

      /* --- 公式サイト下層ページ --- */
      case 'about':
        return <AboutPage setCurrentPage={navigate} />;
      case 'activities':
        return <ActivitiesPage setCurrentPage={navigate} />;

      /* --- 3つの活動（それぞれ独立した活動） --- */
      case 'app':
      case 'community':
      case 'music':
        return <DivisionPage division={currentPage} setCurrentPage={navigate} />;
      case 'philosophy':
        return <PhilosophyPage setCurrentPage={navigate} />;
      case 'materials':
        return <MaterialsPage setCurrentPage={navigate} />;
      case 'learning-app':
        return <LearningAppPage setCurrentPage={navigate} />;
      case 'members':
        return <MembersPage setCurrentPage={navigate} />;
      case 'reports':
        return <ReportsPage setCurrentPage={navigate} />;
      case 'achievements':
        return <AchievementsPage setCurrentPage={navigate} />;
      case 'contact':
        return <ContactPage setCurrentPage={navigate} />;
      case 'privacy':
        return <PrivacyPage setCurrentPage={navigate} />;
      case 'terms':
        return <TermsPage setCurrentPage={navigate} />;
      case 'sitemap':
        return <SitemapPage setCurrentPage={navigate} />;

      /*
        存在しないURLの場合。
        [重要] ここでトップページの内容を返してはいけません（ソフト404になります）。
          また、行き止まりにしないため主要ページへの導線を必ず置きます。
          「ホームに戻る」ボタンだけだと、利用者が目的のページを
          探し直す手掛かりがなく離脱してしまいます。
      */
      case 'notFound':
      default:
        return (
          <div className="pt-40 pb-28 px-4 max-w-3xl mx-auto">
            <p className="text-sm font-bold tracking-[0.2em] text-ink-muted mb-4">
              404 NOT FOUND
            </p>
            <h1 className="text-[30px] md:text-[34px] font-bold text-ink-strong mb-5">
              ページが見つかりません
            </h1>
            <p className="text-[17px] text-ink-body leading-[1.9] mb-10">
              お探しのページは、URLが変更されたか削除された可能性があります。
              アドレスの入力に誤りがないかご確認ください。
              下記のページから、目的の内容をお探しいただけます。
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {NOT_FOUND_LINKS.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className="text-left px-5 py-4 border border-line rounded-lg hover:border-line-strong hover:bg-sunken transition-colors"
                >
                  <span className="block text-[15px] font-bold text-ink-strong">
                    {item.label}
                  </span>
                  <span className="block text-[13px] text-ink-muted mt-1">
                    {item.note}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate('home')}
              className="px-7 py-3.5 bg-brand text-white rounded-md font-semibold text-sm hover:bg-brand-hover transition-colors"
            >
              トップページに戻る
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/*
        桜の花びらエフェクト。
        [重要] サイトの季節感を担う装飾です。削除しないでください。
          操作の妨げにならないよう pointer-events: none を指定しており、
          動きを減らす設定（prefers-reduced-motion）の環境では
          index.html 側の CSS で非表示になります。
      */}
      <SakuraEffect />
      <Navbar currentPage={currentPage} setCurrentPage={navigate} />
      <main>{renderContent()}</main>
      <Footer setCurrentPage={navigate} />

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-in-right { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.4s ease-out forwards; }

        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default App;
