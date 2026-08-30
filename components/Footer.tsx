import React from 'react';
import { Instagram, Mail, ExternalLink } from 'lucide-react';
import { resolveIcon } from './ui/Blocks';
import { PageType } from '../types';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { MAIN_NAV, LEGAL_NAV, DIVISION_NAV } from '../content/navigation';
import { ORG } from '../content/site';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const half = Math.ceil(MAIN_NAV.length / 2);

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-16 mb-16">
          {/* 団体紹介 */}
          <div>
            <div className="flex items-center gap-5 mb-8">
              <div className="h-11 flex items-center bg-white/95 rounded-md px-2.5 py-1.5">
                <Logo className="h-8" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-[17px] tracking-tight leading-snug">
                  {ORG.name}
                </span>
                <span className="text-[12.5px] text-slate-400 mt-1">
                  Manabi-no-Tobira
                </span>
              </div>
            </div>

            <p className="text-[14px] leading-[1.9] text-slate-400 mb-6 max-w-md">
              「{ORG.name}」は、ひとつの団体名ではなく
              <strong className="font-bold text-slate-300">3つの活動の総称</strong>
              です。学習サービスを開発・運営する「学びの扉アプリ」、三重大学で探究に取り組む
              学生学修コミュニティ「まなとび」、楽曲を制作する音楽活動「まなとび。」が
              それぞれ活動しています。
            </p>

            {/* 3活動が資金・運営を分けていることの明示 */}
            <p className="text-[12px] leading-[1.85] text-slate-400 mb-8 max-w-md p-4 rounded-md bg-white/[0.03] border border-white/10">
              ※ 上記3つの活動は、資金・会計・運営をそれぞれ独立して行っています。
              一方の活動が他方の債務や責任を負うものではありません。
              また、所属大学への確認および本人の同意が必要なため、
              個人を特定できる情報は掲載しておりません。
            </p>

            {/* 学習アプリ導線 */}
            <a
              href={ORG.learningAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/25 transition-colors group mb-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12.5px] text-slate-400 mb-2.5">
                    開発・運営：学びの扉アプリ
                  </p>
                  <p className="text-white font-semibold text-[17px] mb-2 group-hover:text-blue-300 transition-colors">
                    学習アプリ
                  </p>
                  <p className="text-[14px] text-slate-300 leading-[1.85]">
                    「学びの扉アプリ」が開発・運営する、無料の化学学習サービス。
                    <br />
                    登録不要・スマホだけで化学基礎の演習ができます。
                  </p>
                  <p className="mt-3 text-[12.5px] text-slate-400">
                    {ORG.learningAppUrl.replace('https://', '')}
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="text-blue-300 shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>
            </a>

            {/* SNS */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                whileHover={{ y: -3, backgroundColor: '#E1306C' }}
                href={ORG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-3 bg-white/5 rounded-md text-white transition-all border border-white/5"
              >
                <Instagram size={19} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3, backgroundColor: '#1d4ed8' }}
                href={`mailto:${ORG.email}`}
                aria-label="メールで問い合わせ"
                className="p-3 bg-white/5 rounded-md text-white transition-all border border-white/5"
              >
                <Mail size={19} />
              </motion.a>
            </div>
          </div>

          {/* リンク */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <h3 className="text-white font-bold mb-7 text-[13px] tracking-[0.04em]">
                3つの活動
              </h3>
              <ul className="space-y-3.5 text-[14px] font-medium mb-10">
                {DIVISION_NAV.map((n) => (
                  <li key={n.page}>
                    <button
                      onClick={() => setCurrentPage(n.page)}
                      className="hover:text-blue-300 transition-colors text-left flex items-start gap-2 leading-snug"
                    >
                      <span aria-hidden="true" className="text-slate-400 mt-0.5 shrink-0">
                        {resolveIcon(n.icon, 'w-3.5 h-3.5')}
                      </span>
                      <span>{n.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="text-white font-bold mb-7 text-[13px] tracking-[0.04em]">
                学びの扉について
              </h3>
              <ul className="space-y-3.5 text-[14px] font-medium">
                {MAIN_NAV.slice(0, half).map((n) => (
                  <li key={n.page}>
                    <button
                      onClick={() => setCurrentPage(n.page)}
                      className="hover:text-blue-300 transition-colors text-left"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-7 text-[13px] tracking-[0.04em]">
                活動
              </h3>
              <ul className="space-y-3.5 text-[14px] font-medium">
                {MAIN_NAV.slice(half).map((n) => (
                  <li key={n.page}>
                    <button
                      onClick={() => setCurrentPage(n.page)}
                      className="hover:text-blue-300 transition-colors text-left"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-white font-bold mb-7 text-[13px] tracking-[0.04em]">
                規約・ポリシー
              </h3>
              <ul className="space-y-3.5 text-[14px] font-medium">
                {LEGAL_NAV.map((n) => (
                  <li key={n.page}>
                    <button
                      onClick={() => setCurrentPage(n.page)}
                      className="hover:text-blue-300 transition-colors text-left"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="text-white font-bold mt-10 mb-5 text-[13px] tracking-[0.04em]">
                お問い合わせ
              </h3>
              <a
                href={`mailto:${ORG.email}`}
                className="text-[12px] font-medium hover:text-blue-300 transition-colors break-all"
              >
                {ORG.email}
              </a>
            </div>
          </div>
        </div>

        {/* フッターボトム */}
        <div className="pt-9 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div className="flex flex-col gap-1.5">
            <p className="text-[12px] text-slate-400">
              © {new Date().getFullYear()} {ORG.name}. All Rights Reserved.
            </p>
            <p className="text-[12px] text-slate-400">
              活動拠点：{ORG.base} ／ お問い合わせ：{ORG.email}
            </p>
          </div>
          <p className="text-[12px] text-slate-400">
            ～私たちにできることを～
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
