import React from 'react';
import {
  ArrowRight,
  ExternalLink,
  Calendar,
  Check,
  Beaker,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PageType } from '../types';
import { resolveIcon, Card, Badge } from './ui/Blocks';
import { DivisionTag, StructureNote } from './ui/DivisionNotice';
import {
  ORG,
  ACTIVITIES,
  VALUES,
  REPORTS,
  ACHIEVEMENTS,
  DIVISIONS,
  TEAMS,
} from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

/* =========================================================
 * 見出し（ホーム用）
 * ========================================================= */
const HomeHeading: React.FC<{
  label: string;
  emoji: string;
  title: string;
  lead?: string;
  center?: boolean;
}> = ({ label, emoji, title, lead, center }) => (
  <div className={`mb-14 ${center ? 'text-center' : ''}`}>
    <p className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase mb-5">
      {label}
    </p>
    <h2 className="text-3xl sm:text-4xl font-black text-[#0A3D62] tracking-tight leading-snug mb-6">
      <span className="mr-3" aria-hidden="true">
        {emoji}
      </span>
      {title}
    </h2>
    <div
      className={`h-1.5 w-20 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full ${
        center ? 'mx-auto' : ''
      }`}
    />
    {lead && (
      <p
        className={`mt-8 text-[17px] text-slate-600 font-light leading-[1.95] ${
          center ? 'max-w-2xl mx-auto' : 'max-w-3xl'
        }`}
      >
        {lead}
      </p>
    )}
  </div>
);

/* =========================================================
 * 1. マナトビとは（概要）
 * ========================================================= */
export const AboutSection: React.FC<Props> = ({ setCurrentPage }) => (
  <section id="about-section" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <HomeHeading
        label="About Us"
        emoji="🏠"
        title="マナトビとは"
        lead={ORG.summary}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
        <div className="space-y-6 text-[16px] text-slate-600 font-light leading-[1.95]">
          <p>
            私たちの多くは、地方の高校で受験期を過ごしました。通える塾が限られていたり、
            どんな参考書を選べばよいのかがわからなかったり、
            「情報を持っている人が有利になる」構造を、当事者として経験してきました。
          </p>
          <p>
            だからマナトビが公開する教材とWebサービスは、すべて無料です。
            インターネットにつながる環境さえあれば、住んでいる場所や家庭の状況に関係なく、
            同じ入口に立てる状態をつくりたいと考えています。
          </p>
          <button
            onClick={() => setCurrentPage('about')}
            className="inline-flex items-center gap-2.5 mt-2 text-sm font-black text-blue-600 hover:text-blue-800 transition-colors"
          >
            マナトビについて詳しく
            <ArrowRight size={15} />
          </button>
        </div>

        {/* 概要カード */}
        <Card className="p-8">
          <p className="text-[10px] font-black tracking-[0.28em] text-slate-400 uppercase mb-6">
            Organization
          </p>
          <dl className="space-y-5">
            {[
              { l: '名称', v: `${ORG.name}（3つの活動の総称）` },
              { l: '活動開始', v: ORG.founded },
              { l: '活動拠点', v: ORG.base },
              { l: '会計', v: '活動ごとに独立して管理' },
              { l: '対象', v: ORG.audience },
            ].map((x, i) => (
              <div key={i}>
                <dt className="text-[10px] font-black text-slate-400 tracking-wider uppercase mb-1.5">
                  {x.l}
                </dt>
                <dd className="text-sm font-bold text-[#0A3D62] leading-relaxed">
                  {x.v}
                </dd>
              </div>
            ))}
          </dl>
          <button
            onClick={() => setCurrentPage('members')}
            className="mt-8 w-full py-3.5 bg-slate-50 hover:bg-blue-50 text-[#0A3D62] hover:text-blue-700 rounded-xl text-xs font-black transition-all border border-slate-200"
          >
            👥 運営体制を見る
          </button>
        </Card>
      </div>
    </div>
  </section>
);

/* =========================================================
 * 2. 活動内容
 * ========================================================= */
export const ActivitiesSection: React.FC<Props> = ({ setCurrentPage }) => (
  <section id="activities-section" className="py-24 bg-slate-50/60">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <HomeHeading
        label="Activities"
        emoji="📚"
        title="活動内容"
        lead="マナトビの3つの活動が、それぞれ何を行っているかをご紹介します。各カードにはどの活動によるものかを表示しています。"
        center
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ACTIVITIES.map((a, i) => (
          <Card
            key={a.id}
            delay={i * 0.08}
            className="p-8 flex flex-col h-full hover:-translate-y-1.5 transition-transform duration-500"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#0A3D62] text-white flex items-center justify-center mb-7 shadow-lg">
              {resolveIcon(a.icon, 'w-7 h-7')}
            </div>
            <div className="mb-3">
              <DivisionTag division={a.division} />
            </div>
            <h3 className="text-lg font-black text-[#0A3D62] leading-snug mb-4">
              {a.title}
            </h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed flex-grow mb-6">
              {a.summary}
            </p>
            <ul className="space-y-2.5 mb-7">
              {a.details.slice(0, 3).map((d, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={9} strokeWidth={3.5} />
                  </span>
                  <span className="text-[12px] text-slate-500 font-light leading-relaxed">
                    {d}
                  </span>
                </li>
              ))}
            </ul>
            {a.linkTo && (
              <button
                onClick={() => setCurrentPage(a.linkTo as PageType)}
                className="inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors self-start mt-auto"
              >
                {a.linkLabel}
                <ArrowRight size={13} />
              </button>
            )}
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => setCurrentPage('activities')}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#0A3D62] rounded-2xl font-black text-sm border-2 border-slate-200 hover:border-blue-400 transition-all"
        >
          活動内容をすべて見る
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  </section>
);

/* =========================================================
 * 3. Chem-Basis の紹介
 * ========================================================= */
export const ChemBasisSection: React.FC<Props> = ({ setCurrentPage }) => (
  <section id="chembasis-section" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0A3D62] via-blue-800 to-blue-700 relative"
      >
        <div className="absolute top-[-25%] right-[-8%] w-[420px] h-[420px] bg-cyan-400/20 rounded-full blur-[110px]" />
        <div className="absolute bottom-[-30%] left-[-8%] w-[340px] h-[340px] bg-blue-400/15 rounded-full blur-[90px]" />

        <div className="relative z-10 p-10 sm:p-14 lg:p-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-8">
                <Beaker className="w-8 h-8" />
              </div>

              <p className="text-[10px] font-black tracking-[0.35em] text-cyan-300 uppercase mb-5">
                💻 Our Service
              </p>
              <h2
                className="text-4xl sm:text-5xl font-black tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Chem-Basis
              </h2>
              <p className="text-lg font-bold text-cyan-200 mb-6 leading-snug">
                「マナトビアプリ」が開発・運営する、無料の化学学習サービス
              </p>
              <p className="text-blue-100 font-light leading-[1.9] text-[15px] mb-9 max-w-xl">
                化学基礎・化学の単元別演習を、登録不要・スマートフォンだけで進められます。
                間違えた直後にその場で解説を読める設計にしているため、
                「なぜ間違えたのか」を保ったまま次に進めます。
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={ORG.chemBasisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#0A3D62] rounded-2xl font-black text-sm hover:bg-blue-50 transition-colors shadow-xl"
                >
                  Chem-Basis を開く
                  <ExternalLink size={15} />
                </a>
                <button
                  onClick={() => setCurrentPage('chem-basis')}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-black text-sm border border-white/25 hover:bg-white/15 transition-colors"
                >
                  サービスについて詳しく
                  <ArrowRight size={15} />
                </button>
              </div>

              <p className="mt-6 text-[11px] font-bold text-blue-200 tracking-wider">
                {ORG.chemBasisUrl.replace('https://', '')}
              </p>
            </div>

            {/* 特徴リスト */}
            <div className="space-y-3">
              {[
                { t: '完全無料', b: '課金要素はありません' },
                { t: '登録不要', b: 'アカウント作成もインストールも不要' },
                { t: 'スマホ完結', b: 'ブラウザだけで演習できます' },
                { t: '解説付き', b: '誤りの理由まで記述しています' },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15"
                >
                  <p className="text-sm font-black text-white mb-1">{f.t}</p>
                  <p className="text-[12px] text-blue-200 font-light">{f.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* =========================================================
 * 4. 教育への考え方
 * ========================================================= */
export const PhilosophySection: React.FC<Props> = ({ setCurrentPage }) => (
  <section id="philosophy-section" className="py-24 bg-slate-50/60">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <HomeHeading
        label="Philosophy"
        emoji="💡"
        title="教育への考え方"
        lead="どんな教材をつくるかは、結局「教育をどう捉えているか」に規定されます。私たちが活動の判断基準にしている考え方です。"
        center
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VALUES.map((v, i) => (
          <Card key={v.no} delay={i * 0.07} className="p-8">
            <span
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-cyan-400 italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {v.no}
            </span>
            <h3 className="text-lg font-black text-[#0A3D62] leading-snug mt-5 mb-4">
              {v.title}
            </h3>
            <p className="text-[13px] font-bold text-blue-600 leading-relaxed mb-5">
              {v.lead}
            </p>
            <p className="text-sm text-slate-500 font-light leading-[1.9] line-clamp-4">
              {v.body}
            </p>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => setCurrentPage('philosophy')}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#0A3D62] rounded-2xl font-black text-sm border-2 border-slate-200 hover:border-blue-400 transition-all"
        >
          教育への考え方をすべて読む
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  </section>
);

/* =========================================================
 * 5. 活動実績（数値）
 * ========================================================= */
export const AchievementsSection: React.FC<Props> = ({ setCurrentPage }) => (
  <section id="achievements-section" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <HomeHeading
        label="Achievements"
        emoji="📸"
        title="活動実績"
        lead="掲載しているのは、私たちが実際に確認できている事実のみです。"
        center
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {ACHIEVEMENTS.map((a, i) => (
          <Card key={i} delay={i * 0.07} className="p-7 text-center">
            <div className="flex items-baseline justify-center gap-1.5 mb-4">
              <span
                className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-400"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {a.value}
              </span>
              <span className="text-xs font-black text-slate-400">{a.unit}</span>
            </div>
            <p className="text-[12px] font-black text-[#0A3D62] mb-2 leading-snug">
              {a.label}
            </p>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              {a.note}
            </p>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => setCurrentPage('achievements')}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#0A3D62] rounded-2xl font-black text-sm border-2 border-slate-200 hover:border-blue-400 transition-all"
        >
          活動のあゆみを見る
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  </section>
);

/* =========================================================
 * 6. 活動報告（最新）
 * ========================================================= */
export const ReportsSection: React.FC<Props> = ({ setCurrentPage }) => {
  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split('-');
    return `${y}.${m}.${d}`;
  };

  return (
    <section id="reports-section" className="py-24 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeHeading
          label="Reports"
          emoji="📰"
          title="活動報告"
          lead="実際に行った活動を記録として残しています。何を実施し、そこから何がわかったのかまで書き残すことを方針としています。"
        />

        <div className="space-y-5">
          {REPORTS.slice(0, 3).map((r, i) => (
            <Card key={r.id} delay={i * 0.07} className="overflow-hidden">
              <button
                onClick={() => setCurrentPage('reports')}
                className="w-full text-left p-7 sm:p-8 hover:bg-slate-50/70 transition-colors group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:w-32 shrink-0">
                    <time
                      dateTime={r.date}
                      className="inline-flex items-center gap-1.5 text-[11px] font-black text-slate-400 tracking-wider"
                    >
                      <Calendar size={12} />
                      {formatDate(r.date)}
                    </time>
                    <Badge
                      tone={
                        r.category === '教師塾'
                          ? 'blue'
                          : r.category === '教材開発'
                          ? 'green'
                          : 'amber'
                      }
                    >
                      {r.category}
                    </Badge>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-base sm:text-lg font-black text-[#0A3D62] group-hover:text-blue-600 transition-colors leading-snug mb-3">
                      {r.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      {r.lead}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-slate-300 shrink-0 mt-1.5 group-hover:text-blue-500 group-hover:translate-x-1 transition-all hidden sm:block"
                  />
                </div>
              </button>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <button
            onClick={() => setCurrentPage('reports')}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#0A3D62] rounded-2xl font-black text-sm border-2 border-slate-200 hover:border-blue-400 transition-all"
          >
            活動報告をすべて読む
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
 * 7. メンバー（抜粋）
 * ========================================================= */
export const MembersSection: React.FC<Props> = ({ setCurrentPage }) => (
  <section id="members-section" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <HomeHeading
        label="Organization"
        emoji="👥"
        title="運営体制"
        lead="「マナトビ」は、資金・会計・運営をそれぞれ独立して行っている3つの活動の総称です。どの活動が何を担っているのかを明示しておくことは、責任の所在を示すことでもあると考えています。"
        center
      />

      {/* 3つの活動が別であることの説明（総称であることの明示） */}
      <div className="mb-12">
        <StructureNote setCurrentPage={setCurrentPage} />
      </div>

      {/* 役割のみを掲載（個人名・所属は掲載しない方針） */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAMS.map((t, i) => {
          const d = DIVISIONS.find((x) => x.id === t.division);
          return (
            <Card key={`${t.division}-${t.role}`} delay={i * 0.05} className="p-7">
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50 border border-slate-200 flex items-center justify-center text-lg">
                  <span aria-hidden="true">{d?.emoji ?? '📌'}</span>
                </span>
                <DivisionTag division={t.division} onClick={() => setCurrentPage(t.division)} />
              </div>

              <p className="text-[9px] font-black tracking-[0.28em] text-blue-500 uppercase mb-2">
                {t.roleEn}
              </p>
              <h3 className="text-base font-black text-[#0A3D62] mb-1.5">{t.role}</h3>
              <p className="text-[11px] font-bold text-slate-400 mb-4">{t.scale}</p>
              <p className="text-[13px] text-slate-500 font-light leading-relaxed">
                {t.description}
              </p>
            </Card>
          );
        })}
      </div>

      {/* 個人情報の掲載方針 */}
      <p className="mt-8 text-[12px] text-slate-400 font-light leading-relaxed text-center max-w-2xl mx-auto">
        ※ 学生が主体の活動であり、所属大学への確認および本人の同意が必要なため、
        個人を特定できる情報（氏名・所属学部・写真など）は掲載しておりません。
      </p>

      <div className="text-center mt-12">
        <button
          onClick={() => setCurrentPage('members')}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#0A3D62] rounded-2xl font-black text-sm border-2 border-slate-200 hover:border-blue-400 transition-all"
        >
          運営体制をすべて見る
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  </section>
);

/* =========================================================
 * 8. お問い合わせ CTA
 * ========================================================= */
export const ContactSection: React.FC<Props> = ({ setCurrentPage }) => (
  <section id="contact-section" className="py-24 bg-[#0A3D62] text-white relative overflow-hidden">
    <div className="absolute top-[-30%] right-[-5%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[130px]" />

    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <p className="text-[10px] font-black tracking-[0.4em] text-cyan-300 uppercase mb-6">
        📩 Contact
      </p>
      <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-7 leading-snug">
        お問い合わせ
      </h2>
      <p className="text-blue-100 font-light leading-[1.95] text-[16px] mb-10">
        教材に関するご質問、誤りのご指摘、学校・団体との連携のご相談、
        取材のご依頼、メンバー参加のご希望などを承っています。
        いただいたご連絡は運営メンバーで確認のうえ返信します。
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setCurrentPage('contact')}
          className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-white text-[#0A3D62] rounded-2xl font-black text-sm hover:bg-blue-50 transition-colors shadow-xl"
        >
          お問い合わせページへ
          <ArrowRight size={15} />
        </button>
        <a
          href={`mailto:${ORG.email}`}
          className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-black text-sm border border-white/25 hover:bg-white/15 transition-colors break-all"
        >
          {ORG.email}
        </a>
      </div>
    </div>
  </section>
);
