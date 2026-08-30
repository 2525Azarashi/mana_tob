import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X, ExternalLink } from 'lucide-react';
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
    'chem-basis',
    'reports',
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled || open
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm'
            : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4">
            {/* ロゴ */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              className="flex items-center cursor-pointer gap-4 sm:gap-5 group shrink-0"
              onClick={() => go('home')}
              aria-label="マナトビ ホームへ"
            >
              <div className="h-11 sm:h-12 flex items-center relative shrink-0">
                <Logo className="h-10 sm:h-11 w-auto" />
              </div>
              <div className="flex flex-col border-l-2 border-orange-400 pl-4 sm:pl-5 py-0.5 shrink-0 text-left">
                <span
                  className="text-lg sm:text-xl font-black tracking-tight leading-tight transition-colors text-orange-600 group-hover:text-orange-500"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  マナトビ
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-orange-400 tracking-[0.25em] uppercase mt-0.5">
                  Manatobi Official
                </span>
              </div>
            </motion.button>

            {/* デスクトップナビ */}
            <div className="hidden lg:flex items-center gap-1">
              {MAIN_NAV.filter((n) => desktopNav.includes(n.page)).map((n) => (
                <button
                  key={n.page}
                  onClick={() => go(n.page)}
                  className={`px-3.5 py-2.5 rounded-xl text-[13px] font-black transition-all whitespace-nowrap ${
                    currentPage === n.page
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {n.label}
                </button>
              ))}
              <button
                onClick={() => go('contact')}
                className="ml-2 px-5 py-2.5 rounded-xl text-[13px] font-black bg-[#0A3D62] text-white hover:bg-blue-800 transition-colors whitespace-nowrap"
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
                className="hidden sm:flex text-slate-400 hover:text-pink-600 transition-all p-2.5 bg-slate-50 rounded-xl"
              >
                <Instagram size={18} />
              </a>
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
                aria-expanded={open}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-[#0A3D62] transition-colors"
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
              className="fixed top-[76px] left-0 right-0 z-[99] max-h-[calc(100vh-90px)] overflow-y-auto bg-white border-b border-slate-200 shadow-2xl"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
                {/* 3つの活動（資金・運営が独立しているため別ページ） */}
                <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase mb-2">
                  Activities
                </p>
                <p className="text-[11px] text-slate-500 font-light mb-5 leading-relaxed">
                  「マナトビ」は3つの活動の総称です。資金・会計・運営はそれぞれ独立しています。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-9">
                  {DIVISION_NAV.map((n) => (
                    <button
                      key={n.page}
                      onClick={() => go(n.page)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl text-left transition-all border ${
                        currentPage === n.page
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                      }`}
                    >
                      <span className="text-lg shrink-0" aria-hidden="true">
                        {n.emoji}
                      </span>
                      <span>
                        <span className="block text-[13px] font-black text-[#0A3D62] leading-snug">
                          {n.label}
                        </span>
                        <span className="block text-[9px] font-bold text-slate-400 tracking-[0.15em] uppercase mt-1">
                          {n.labelEn}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase mb-5">
                  Menu
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-9">
                  {MAIN_NAV.map((n) => (
                    <button
                      key={n.page}
                      onClick={() => go(n.page)}
                      className={`flex items-center gap-3.5 p-4 rounded-2xl text-left transition-all border ${
                        currentPage === n.page
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-slate-50/70 border-transparent hover:bg-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <span className="text-lg shrink-0" aria-hidden="true">
                        {n.emoji}
                      </span>
                      <span>
                        <span className="block text-sm font-black text-[#0A3D62]">
                          {n.label}
                        </span>
                        <span className="block text-[9px] font-bold text-slate-400 tracking-[0.15em] uppercase mt-0.5">
                          {n.labelEn}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 pt-8 border-t border-slate-100">
                  {/* サービス */}
                  <div>
                    <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase mb-5">
                      Service
                    </p>
                    <a
                      href={ORG.chemBasisUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-br from-[#0A3D62] to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 transition-all"
                    >
                      <span>
                        <span className="block text-sm font-black mb-1">
                          💻 Chem-Basis
                        </span>
                        <span className="block text-[11px] text-blue-200 font-light">
「マナトビアプリ」が開発・運営する無料の化学学習サービス
                        </span>
                      </span>
                      <ExternalLink size={16} className="shrink-0" />
                    </a>
                    <button
                      onClick={() => go('quiz-select')}
                      className="mt-2.5 w-full flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100 text-left transition-colors"
                    >
                      <span className="text-lg" aria-hidden="true">
                        ✍️
                      </span>
                      <span className="text-sm font-black text-[#0A3D62]">
                        重要用語 一問一答（情報I）
                      </span>
                    </button>
                  </div>

                  {/* 規約 */}
                  <div>
                    <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase mb-5">
                      Legal
                    </p>
                    <div className="space-y-2.5">
                      {LEGAL_NAV.map((n) => (
                        <button
                          key={n.page}
                          onClick={() => go(n.page)}
                          className="w-full flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100 text-left transition-colors"
                        >
                          <span className="text-base" aria-hidden="true">
                            {n.emoji}
                          </span>
                          <span className="text-sm font-black text-[#0A3D62]">
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
