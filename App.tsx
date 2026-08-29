import React, { useState, useEffect, useCallback } from 'react';
import { PageType, Material } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import QuizSystem from './components/QuizSystem';
import PDFViewer from './components/PDFViewer';
import MaterialsSection from './components/MaterialsSection';
import {
  AboutSection,
  ActivitiesSection,
  ChemBasisSection,
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
import ChemBasisPage from './pages/ChemBasisPage';
import MembersPage from './pages/MembersPage';
import ReportsPage from './pages/ReportsPage';
import AchievementsPage from './pages/AchievementsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SitemapPage from './pages/SitemapPage';

import { usePageSeo } from './hooks/usePageSeo';

/** ページ ⇄ URLパス の対応（ブラウザの戻る/進むとURL共有に対応） */
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
  '/chem-basis': 'chem-basis',
  '/members': 'members',
  '/reports': 'reports',
  '/achievements': 'achievements',
  '/contact': 'contact',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/sitemap': 'sitemap',
  '/quiz': 'quiz-select',
};

const pageToPath = (page: PageType): string => {
  const found = Object.entries(PATHS).find(([, p]) => p === page);
  return found ? found[0] : '/';
};

const pathToPage = (path: string): PageType => PATHS[path] ?? 'home';

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
    if (PATHS[path]) {
      window.history.replaceState({}, '', stashed);
      return path;
    }
  }
  return window.location.pathname;
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(() =>
    pathToPage(resolveInitialPath())
  );
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);

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

  const handleViewPdf = (material: Material) => {
    const pdfUrl =
      material.id === 'ct-strategy'
        ? 'https://drive.google.com/file/d/1fb9rGxaR5k_MMksbavBBtoFp9KMlmsyj/view?usp=sharing'
        : '';
    if (pdfUrl) {
      setActivePdf({ url: pdfUrl, title: material.title });
      setCurrentPage('pdf-viewer');
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={navigate} />
            <AboutSection setCurrentPage={navigate} />
            <ActivitiesSection setCurrentPage={navigate} />
            <ChemBasisSection setCurrentPage={navigate} />
            <MaterialsSection
              onStartQuiz={() => navigate('quiz-select')}
              onViewPdf={handleViewPdf}
            />
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
      case 'chem-basis':
        return <ChemBasisPage setCurrentPage={navigate} />;
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

      /* --- 学習ツール --- */
      case 'quiz-select':
      case 'quiz':
      case 'result':
        return (
          <QuizSystem onBack={() => navigate('home')} onHome={() => navigate('home')} />
        );
      case 'pdf-viewer':
        return activePdf ? (
          <PDFViewer
            pdfUrl={activePdf.url}
            title={activePdf.title}
            onBack={() => navigate('home')}
          />
        ) : null;

      default:
        return (
          <div className="pt-40 pb-24 px-4 max-w-3xl mx-auto min-h-screen text-center">
            <h1 className="text-4xl font-black text-[#0A3D62] mb-6">
              ページが見つかりません
            </h1>
            <p className="text-slate-500 font-light mb-10">
              お探しのページは移動または削除された可能性があります。
            </p>
            <button
              onClick={() => navigate('home')}
              className="px-8 py-4 bg-[#0A3D62] text-white rounded-2xl font-black text-sm"
            >
              ホームに戻る
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
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
