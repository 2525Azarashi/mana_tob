import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageType } from '../../types';

interface PageShellProps {
  page: PageType;
  emoji: string;
  title: string;
  titleEn: string;
  lead: string;
  setCurrentPage: (page: PageType) => void;
  children: React.ReactNode;
}

/**
 * 全下層ページ共通のレイアウト。
 * ・ページヘッダー（パンくず／タイトル／リード文）
 * ・document.title と meta description の更新（SEO）
 */
const PageShell: React.FC<PageShellProps> = ({
  page,
  emoji,
  title,
  titleEn,
  lead,
  setCurrentPage,
  children,
}) => {
  // SEO タグ（title / description / canonical / OGP）は App.tsx の
  // usePageSeo(currentPage) が全ページまとめて更新します。

  return (
    <div className="min-h-screen bg-white">
      {/* ページヘッダー */}
      <header className="relative pt-36 pb-16 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-40%] left-[-10%] w-[420px] h-[420px] bg-cyan-100/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* パンくず */}
          <nav aria-label="パンくずリスト" className="mb-8">
            <ol className="flex items-center flex-wrap gap-2 text-xs font-bold text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <Home size={13} />
                  ホーム
                </button>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} />
              </li>
              <li className="text-slate-600" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase mb-5">
              {titleEn}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A3D62] tracking-tight leading-[1.25] mb-7">
              <span className="mr-3" aria-hidden="true">
                {emoji}
              </span>
              {title}
            </h1>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full mb-8" />
            <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed max-w-3xl">
              {lead}
            </p>
          </motion.div>
        </div>
      </header>

      {/* 本文 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">{children}</main>

      {/* 下部ナビ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-50 text-[#0A3D62] rounded-2xl font-black text-sm hover:bg-slate-100 transition-all border border-slate-200"
        >
          ← ホームに戻る
        </button>
      </div>
    </div>
  );
};

export default PageShell;
