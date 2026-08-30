import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X, ExternalLink } from 'lucide-react';
import { resolveIcon } from './ui/Blocks';
import { PageType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { MAIN_NAV, LEGAL_NAV, DIVISION_NAV } from '../content/navigation';
import { ORG } from '../content/site';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setOpen(false);
  }, [currentPage]);

  // メニュー開放中はスクロールを止める
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (page: PageType) => {
    setCurrentPage(page);
    setOpen(false);
  };

  // デスクトップに常時出す主要リンク
  const desktopNav: PageType[] = [
    'about',
    'activities',
    'materials',
    'learning-app',
    'reports',
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled || open
            ? 'bg-white/90 backdrop-blur-xl border-b border-line py-2.5 shadow-md'
            : 'bg-white/70 backdrop-blur-md py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4">
            {/* ロゴ */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              className="flex items-center cursor-pointer gap-4 sm:gap-5 group shrink-0"
              onClick={() => go('home')}
              aria-label="学びの扉 ホームへ"
            >
              <div className="h-11 sm:h-12 flex items-center relative shrink-0">
                <Logo className="h-10 sm:h-11 w-auto" />
              </div>
              <div className="flex flex-col border-l border-line pl-4 sm:pl-5 py-0.5 shrink-0 text-left">
                <span className="text-lg sm:text-xl font-bold tracking-tight leading-tight text-ink-strong">
                  学びの扉
                </span>
                <span className="text-[12px] text-ink-muted mt-0.5">
                  Manabi-no-Tobira
                </span>
              </div>
            </motion.button>

            {/* デスクトップナビ */}
            <div className="hidden lg:flex items-center gap-1">
              {MAIN_NAV.filter((n) => desktopNav.includes(n.page)).map((n) => {
                const active = currentPage === n.page;
                return (
                  <button
                    key={n.page}
                    onClick={() => go(n.page)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative px-3.5 py-2.5 rounded-lg text-[14.5px] font-bold transition-colors whitespace-nowrap ${
                      active
                        ? 'text-brand'
                        : 'text-ink-body hover:text-brand hover:bg-sunken'
                    }`}
                  >
                    {n.label}
                    {/*
                      現在地は色だけでなく下線でも示します
                      （色覚特性のある方にも伝わるようにするため）。
                    */}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute left-3 right-3 -bottom-0.5 h-[3px] rounded-full bg-brand-accent"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => go('contact')}
                className="ml-2.5 px-5 py-2.5 rounded-lg text-[14.5px] font-bold bg-brand text-white shadow-sm hover:bg-brand-hover hover:shadow-md transition-all duration-200 active:translate-y-px whitespace-nowrap"
              >
                お問い合わせ
              </button>
            </div>

            {/* 右端：SNS + メニュー */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href={ORG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hidden sm:flex text-ink-muted hover:text-pink-600 transition-all p-2.5 bg-sunken rounded-md"
              >
                <Instagram size={18} />
              </a>
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
                aria-expanded={open}
                className="p-2.5 bg-sunken hover:bg-slate-100 rounded-md text-ink-strong transition-colors"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* オーバーレイメニュー（全ページへの導線） */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-slate-950/30 backdrop-blur-sm z-[98]"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[76px] left-0 right-0 z-[99] max-h-[calc(100vh-90px)] overflow-y-auto bg-white border-b border-line shadow-lg"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
                {/* 3つの活動（資金・運営が独立しているため別ページ） */}
                <p className="text-[12.5px] font-semibold text-ink-muted mb-2">
                  3つの活動
                </p>
                <p className="text-[12px] text-ink-muted mb-5 leading-relaxed">
                  「学びの扉」は3つの活動の総称です。資金・会計・運営はそれぞれ独立しています。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-9">
                  {DIVISION_NAV.map((n) => (
                    <button
                      key={n.page}
                      onClick={() => go(n.page)}
                      className={`flex items-start gap-3.5 p-4 rounded-md text-left transition-all border ${
                        currentPage === n.page
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-white border-line hover:border-blue-300 hover:bg-blue-50/40'
                      }`}
                    >
                      <span className="text-ink-muted shrink-0 mt-0.5" aria-hidden="true">
                        {resolveIcon(n.icon, 'w-4 h-4')}
                      </span>
                      <span>
                        <span className="block text-[14px] font-semibold text-ink-strong leading-snug">
                          {n.label}
                        </span>
                        <span className="block text-[12px] text-ink-muted mt-1">
                          {n.labelEn}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <p className="text-[12.5px] font-semibold text-ink-muted mb-5">
                  サイト内のページ
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-9">
                  {MAIN_NAV.map((n) => (
                    <button
                      key={n.page}
                      onClick={() => go(n.page)}
                      className={`flex items-center gap-3.5 p-4 rounded-md text-left transition-all border ${
                        currentPage === n.page
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-sunken/70 border-transparent hover:bg-slate-100 hover:border-line'
                      }`}
                    >
                      <span className="text-ink-muted shrink-0 mt-0.5" aria-hidden="true">
                        {resolveIcon(n.icon, 'w-4 h-4')}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink-strong">
                          {n.label}
                        </span>
                        <span className="block text-[12px] text-ink-muted mt-0.5">
                          {n.labelEn}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 pt-8 border-t border-line">
                  {/* サービス */}
                  <div>
                    <p className="text-[12.5px] font-semibold text-ink-muted mb-5">
                      学習サービス
                    </p>
                    <a
                      href={ORG.learningAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 p-5 rounded-md bg-brand text-white hover:bg-brand-hover transition-colors"
                    >
                      <span>
                        <span className="block text-sm font-semibold mb-1">
                          学習アプリ
                        </span>
                        <span className="block text-[12.5px] text-blue-100">
「学びの扉アプリ」が開発・運営する無料の化学学習サービス
                        </span>
                      </span>
                      <ExternalLink size={16} className="shrink-0" />
                    </a>
                  </div>

                  {/* 規約 */}
                  <div>
                    <p className="text-[12.5px] font-semibold text-ink-muted mb-5">
                      規約・ポリシー
                    </p>
                    <div className="space-y-2.5">
                      {LEGAL_NAV.map((n) => (
                        <button
                          key={n.page}
                          onClick={() => go(n.page)}
                          className="w-full flex items-center gap-3.5 p-4 rounded-lg bg-sunken/70 hover:bg-slate-100 text-left transition-colors"
                        >
                          <span className="text-ink-muted" aria-hidden="true">
                            {resolveIcon(n.icon, 'w-4 h-4')}
                          </span>
                          <span className="text-sm font-semibold text-ink-strong">
                            {n.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
