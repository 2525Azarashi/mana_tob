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
  /** 見出しの上に出す小見出し（不要なら省略。タイトルと同義の語は置きません） */
  label?: string;
  title: string;
  lead?: string;
  center?: boolean;
}> = ({ label, title, lead, center }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    {label && (
      <p className="text-[12px] font-semibold text-blue-700 mb-3">{label}</p>
    )}
    <h2 className="text-[26px] sm:text-[32px] font-bold text-ink-strong tracking-tight leading-[1.45]">
      {title}
    </h2>
    <div
      className={`mt-5 h-px w-14 bg-slate-300 ${center ? 'mx-auto' : ''}`}
    />
    {lead && (
      <p
        className={`mt-7 text-[16px] text-ink-body leading-[1.95] ${
          center ? 'max-w-2xl mx-auto' : 'max-w-3xl'
        }`}
      >
        {lead}
      </p>
    )}
  </div>
);

/* =========================================================
 * 1. 学びの扉とは（概要）
 * ========================================================= */
export const AboutSection: React.FC<Props> = ({ setCurrentPage }) => (
  <section id="about-section" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <HomeHeading
        title="学びの扉とは"
        lead={ORG.summary}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
        <div className="space-y-6 text-[16px] text-ink-body leading-[1.95]">
          <p>
            私たちの多くは、地方の高校で受験期を過ごしました。通える塾が限られていたり、
            どんな参考書を選べばよいのかがわからなかったり、
            「情報を持っている人が有利になる」構造を、当事者として経験してきました。
          </p>
          <p>
            だから学びの扉が公開する教材とWebサービスは、すべて無料です。
            インターネットにつながる環境さえあれば、住んでいる場所や家庭の状況に関係なく、
            同じ入口に立てる状態をつくりたいと考えています。
          </p>
          <button
            onClick={() => setCurrentPage('about')}
            className="inline-flex items-center gap-2.5 mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            学びの扉について詳しく
            <ArrowRight size={15} />
          </button>
        </div>

        {/* 概要カード */}
        <Card className="p-8">
          <p className="text-[12px] font-semibold text-ink-muted mb-5">
            団体概要
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
                <dt className="text-[12.5px] text-ink-muted mb-1.5">
                  {x.l}
                </dt>
                <dd className="text-sm font-bold text-ink-strong leading-relaxed">
                  {x.v}
                </dd>
              </div>
            ))}
          </dl>
          <button
            onClick={() => setCurrentPage('members')}
            className="mt-8 w-full py-3.5 bg-sunken hover:bg-blue-50 text-ink-strong hover:text-blue-700 rounded-md text-xs font-semibold transition-all border border-line"
          >
            運営体制を見る
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
  <section id="activities-section" className="py-24 bg-sunken/60">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <HomeHeading
        title="活動内容"
        lead="学びの扉の3つの活動が、それぞれ何を行っているかをご紹介します。各カードにはどの活動によるものかを表示しています。"
        center
      />

      {/*
        活動は4件あるため、3列にすると最後の1件が孤立します。
        2列にして4件が均等に収まるようにしています。
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ACTIVITIES.map((a, i) => (
          <Card
            key={a.id}
            delay={i * 0.08}
            interactive
            className="p-8 flex flex-col h-full"
          >
            <div className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center mb-6 shadow-sm">
              {resolveIcon(a.icon, 'w-7 h-7')}
            </div>
            <div className="mb-3">
              <DivisionTag division={a.division} />
            </div>
            <h3 className="text-lg font-semibold text-ink-strong leading-snug mb-4">
              {a.title}
            </h3>
            <p className="text-sm text-ink-muted leading-[1.85] flex-grow mb-6">
              {a.summary}
            </p>
            <ul className="space-y-2.5 mb-7">
              {a.details.slice(0, 3).map((d, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={9} strokeWidth={3.5} />
                  </span>
                  <span className="text-[12px] text-ink-muted leading-[1.85]">
                    {d}
                  </span>
                </li>
              ))}
            </ul>
            {a.linkTo && (
              <button
                onClick={() => setCurrentPage(a.linkTo as PageType)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors self-start mt-auto"
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
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-ink-strong rounded-md font-semibold text-sm border border-line-strong hover:border-brand transition-colors"
        >
          活動内容をすべて見る
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  </section>
);

/* =========================================================
 * 3. 学習アプリの紹介
 * ========================================================= */
export const LearningAppSection: React.FC<Props> = ({ setCurrentPage }) => (
  <section id="learning-app-section" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl overflow-hidden bg-brand relative shadow-lg"
      >

        <div className="relative z-10 p-10 sm:p-14 lg:p-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <div className="w-12 h-12 rounded-md bg-white/10 border border-white/20 flex items-center justify-center mb-7">
                <Beaker className="w-5 h-5" />
              </div>

              <p className="text-[13px] font-bold text-blue-200 mb-4">
                学習サービス
              </p>
              <h2 className="text-[28px] sm:text-[34px] font-bold tracking-tight mb-5 text-white">
                学習アプリ
              </h2>
              <p className="text-[17px] font-semibold text-blue-100 mb-5 leading-relaxed">
                「学びの扉アプリ」が開発・運営する、無料の化学学習サービス
              </p>
              <p className="text-blue-50/90 leading-[1.95] text-[15.5px] mb-8 max-w-xl">
                化学基礎・化学の単元別演習を、登録不要・スマートフォンだけで進められます。
                間違えた直後にその場で解説を読める設計にしているため、
                「なぜ間違えたのか」を保ったまま次に進めます。
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={ORG.learningAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-ink-strong rounded-md font-semibold text-sm hover:bg-blue-50 transition-colors"
                >
                  学習アプリを開く
                  <ExternalLink size={15} />
                </a>
                <button
                  onClick={() => setCurrentPage('learning-app')}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent text-white rounded-md font-semibold text-sm border border-white/40 hover:bg-white/10 transition-colors"
                >
                  サービスについて詳しく
                  <ArrowRight size={15} />
                </button>
              </div>

              <p className="mt-6 text-[12.5px] text-blue-100">
                {ORG.learningAppUrl.replace('https://', '')}
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
                  className="p-5 rounded-xl bg-white/[0.07] border border-white/15 transition-colors hover:bg-white/[0.11]"
                >
                  <p className="text-sm font-semibold text-white mb-1">{f.t}</p>
                  <p className="text-[12.5px] text-blue-100 leading-relaxed">{f.b}</p>
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
  <section id="philosophy-section" className="py-24 bg-sunken/60">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <HomeHeading
        title="教育への考え方"
        lead="どんな教材をつくるかは、結局「教育をどう捉えているか」に規定されます。私たちが活動の判断基準にしている考え方です。"
        center
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VALUES.map((v, i) => (
          <Card key={v.no} delay={i * 0.07} className="p-8">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-line bg-sunken text-[14px] font-semibold text-ink-muted tabular-nums">
              {v.no}
            </span>
            <h3 className="text-lg font-semibold text-ink-strong leading-snug mt-5 mb-4">
              {v.title}
            </h3>
            <p className="text-[14px] font-bold text-blue-600 leading-relaxed mb-5">
              {v.lead}
            </p>
            <p className="text-sm text-ink-muted leading-[1.9] line-clamp-4">
              {v.body}
            </p>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => setCurrentPage('philosophy')}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-ink-strong rounded-md font-semibold text-sm border border-line-strong hover:border-brand transition-colors"
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
        title="活動実績"
        lead="掲載しているのは、私たちが実際に確認できている事実のみです。"
        center
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {ACHIEVEMENTS.map((a, i) => (
          <Card key={i} delay={i * 0.07} className="p-7 text-center">
            <div className="flex items-baseline justify-center gap-1.5 mb-4">
              <span className="text-[34px] sm:text-[40px] font-bold text-ink-strong tabular-nums tracking-tight">
                {a.value}
              </span>
              <span className="text-xs font-semibold text-ink-muted">{a.unit}</span>
            </div>
            <p className="text-[12px] font-semibold text-ink-strong mb-2 leading-snug">
              {a.label}
            </p>
            <p className="text-[12px] text-ink-muted font-medium leading-relaxed">
              {a.note}
            </p>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => setCurrentPage('achievements')}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-ink-strong rounded-md font-semibold text-sm border border-line-strong hover:border-brand transition-colors"
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
    <section id="reports-section" className="py-24 bg-sunken/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeHeading
          title="活動報告"
          lead="実際に行った活動を記録として残しています。何を実施し、そこから何がわかったのかまで書き残すことを方針としています。"
        />

        <div className="space-y-5">
          {REPORTS.slice(0, 3).map((r, i) => (
            <Card key={r.id} delay={i * 0.07} className="overflow-hidden">
              <button
                onClick={() => setCurrentPage('reports')}
                className="w-full text-left p-7 sm:p-8 hover:bg-sunken/70 transition-colors group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:w-32 shrink-0">
                    <time
                      dateTime={r.date}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-muted tracking-wider"
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
                    <h3 className="text-base sm:text-lg font-semibold text-ink-strong group-hover:text-blue-600 transition-colors leading-snug mb-3">
                      {r.title}
                    </h3>
                    <p className="text-sm text-ink-muted leading-[1.85]">
                      {r.lead}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-line-strong shrink-0 mt-1.5 group-hover:text-blue-700 group-hover:translate-x-1 transition-all hidden sm:block"
                  />
                </div>
              </button>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <button
            onClick={() => setCurrentPage('reports')}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-ink-strong rounded-md font-semibold text-sm border border-line-strong hover:border-brand transition-colors"
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
        title="運営体制"
        lead="「学びの扉」は、資金・会計・運営をそれぞれ独立して行っている3つの活動の総称です。どの活動が何を担っているのかを明示しておくことは、責任の所在を示すことでもあると考えています。"
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
                <span className="w-10 h-10 rounded-lg bg-sunken border border-line text-ink-strong flex items-center justify-center">
                  <span aria-hidden="true">{resolveIcon(d?.icon ?? 'Layers', 'w-[18px] h-[18px]')}</span>
                </span>
                <DivisionTag division={t.division} onClick={() => setCurrentPage(t.division)} />
              </div>

              <p className="text-[12.5px] text-ink-muted mb-2">
                {t.roleEn}
              </p>
              <h3 className="text-base font-semibold text-ink-strong mb-1.5">{t.role}</h3>
              <p className="text-[12.5px] font-bold text-ink-muted mb-4">{t.scale}</p>
              <p className="text-[14px] text-ink-muted leading-[1.85]">
                {t.description}
              </p>
            </Card>
          );
        })}
      </div>

      {/* 個人情報の掲載方針 */}
      <p className="mt-8 text-[12px] text-ink-muted leading-[1.85] text-center max-w-2xl mx-auto">
        ※ 学生が主体の活動であり、所属大学への確認および本人の同意が必要なため、
        個人を特定できる情報（氏名・所属学部・写真など）は掲載しておりません。
      </p>

      <div className="text-center mt-12">
        <button
          onClick={() => setCurrentPage('members')}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-ink-strong rounded-md font-semibold text-sm border border-line-strong hover:border-brand transition-colors"
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
  <section id="contact-section" className="py-24 bg-brand text-white relative overflow-hidden">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-7 leading-snug text-white">
        お問い合わせ
      </h2>
      <p className="text-blue-50/90 leading-[1.95] text-[16px] mb-9">
        教材に関するご質問、誤りのご指摘、学校・団体との連携のご相談、
        取材のご依頼、メンバー参加のご希望などを承っています。
        いただいたご連絡は運営メンバーで確認のうえ返信します。
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setCurrentPage('contact')}
          className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-white text-ink-strong rounded-md font-semibold text-sm hover:bg-blue-50 transition-colors"
        >
          お問い合わせページへ
          <ArrowRight size={15} />
        </button>
        <a
          href={`mailto:${ORG.email}`}
          className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-transparent text-white rounded-md font-semibold text-sm border border-white/40 hover:bg-white/10 transition-colors break-all"
        >
          {ORG.email}
        </a>
      </div>
    </div>
  </section>
);
