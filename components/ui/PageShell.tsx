import React from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageType } from '../../types';

interface PageShellProps {
  page: PageType;
  title: string;
  titleEn: string;
  lead: string;
  setCurrentPage: (page: PageType) => void;
  children: React.ReactNode;
}

/**
 * 全下層ページ共通のレイアウト。
 * ・ページヘッダー（パンくず／タイトル／リード文）
 *
 * [重要] 見出しに絵文字・装飾記号は付けません。
 *   階層は文字サイズ・ウェイト・罫線だけで表現します。
 */
const PageShell: React.FC<PageShellProps> = ({
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
      <header className="pt-32 pb-12 bg-sunken/70 border-b border-line">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* パンくず */}
          <nav aria-label="パンくずリスト" className="mb-7">
            <ol className="flex items-center flex-wrap gap-2 text-[12px] text-ink-muted">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="flex items-center gap-1.5 hover:text-ink-strong hover:underline transition-colors"
                >
                  <Home size={12} />
                  ホーム
                </button>
              </li>
              <li aria-hidden="true" className="text-line-strong">
                <ChevronRight size={12} />
              </li>
              <li className="text-ink-body" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-ink-strong tracking-tight leading-[1.4] mb-2.5">
              {title}
            </h1>
            {/* 英語表記は装飾ではなく補助情報として、見出しの下に控えめに置きます */}
            <p className="text-[14px] text-ink-muted mb-6">{titleEn}</p>
            <p className="text-[16px] sm:text-[17px] text-ink-body leading-[1.9] max-w-2xl">
              {lead}
            </p>
          </motion.div>
        </div>
      </header>

      {/* 本文 */}
      <main className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-16">{children}</main>

      {/* 下部ナビ */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pb-20">
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 px-6 py-3 text-ink-strong rounded-md font-semibold text-sm hover:bg-sunken transition-colors border border-line-strong"
        >
          <ArrowLeft size={15} />
          ホームに戻る
        </button>
      </div>
    </div>
  );
};

export default PageShell;
