import React from 'react';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import {
  SectionTitle,
  Card,
  CTAButton,
  DefinitionList,
} from '../components/ui/Blocks';
import { IndependenceNote, DivisionTag } from '../components/ui/DivisionNotice';
import {
  DIVISIONS,
  Division,
  TEAMS,
  REPORTS,
  MUSIC_RELEASES,
  MUSIC_PLATFORMS,
  MUSIC_OTHER_SERVICES,
  ORG,
} from '../content/site';

interface Props {
  division: Division['id'];
  setCurrentPage: (page: PageType) => void;
}

/** 'YYYY-MM-DD' → 'YYYY年M月D日' */
const formatJaDate = (iso: string): string => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${m[1]}年${Number(m[2])}月${Number(m[3])}日`;
};

/** リリース情報の1項目（見出し + 値） */
const ReleaseFact: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <dt className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-1">
      {label}
    </dt>
    <dd className="text-[13px] text-slate-600 font-light leading-relaxed">
      {value}
    </dd>
  </div>
);

/**
 * 3つの活動（学びの扉アプリ／学生学修コミュニティ／音楽活動）の共通ページ。
 *
 * ⚠ 資金・運営が独立しているため、活動ごとに必ず別ページとして表示します。
 * ⚠ 個人が特定できる情報（氏名・学部など）は掲載しません（大学の許可が必要）。
 */
const DivisionPage: React.FC<Props> = ({ division, setCurrentPage }) => {
  const d = DIVISIONS.find((x) => x.id === division);
  if (!d) return null;

  const teams = TEAMS.filter((t) => t.division === division);
  const reports = REPORTS.filter((r) => r.division === division);
  const others = DIVISIONS.filter((x) => x.id !== division);

  return (
    <PageShell
      page={division as PageType}
      emoji={d.emoji}
      title={d.name}
      titleEn={d.nameEn}
      lead={d.summary}
      setCurrentPage={setCurrentPage}
    >
      {/* 概要 */}
      <section className="mb-16">
        <DefinitionList
          items={[
            { label: '活動名', value: d.name },
            ...(division === 'music'
              ? [
                  { label: 'アーティスト名義', value: 'まなとび。（Manatobi.）' },
                  { label: '配信', value: 'TuneCore Japan' },
                ]
              : []),
            { label: '区分', value: d.kind },
            { label: '拠点', value: ORG.base },
            { label: '会計', value: '他の活動とは独立して管理' },
          ]}
        />
      </section>

      {/* 何をしているか */}
      <section className="mb-16">
        <SectionTitle label="What We Do">この活動で行っていること</SectionTitle>
        <Card className="p-8 sm:p-10">
          <ul className="space-y-4">
            {d.doing.map((item, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-[15px] text-slate-600 font-light leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {d.externalUrl && (
            <div className="mt-8">
              <CTAButton href={d.externalUrl} external>
                {d.externalLabel}
                <ExternalLink size={15} />
              </CTAButton>
            </div>
          )}
        </Card>
      </section>

      {/* 音楽活動のみ: リリース情報 */}
      {division === 'music' && MUSIC_RELEASES.length > 0 && (
        <section className="mb-16">
          <SectionTitle label="Releases">リリース（新しい順）</SectionTitle>
          <div className="space-y-6">
            {MUSIC_RELEASES.map((r, i) => (
              <Card key={r.title} delay={i * 0.06} className="p-7 sm:p-9">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-[10px] font-black tracking-[0.3em] text-purple-500 uppercase">
                    {r.type}
                  </span>
                  <time
                    dateTime={r.releaseDate}
                    className="text-[11px] font-black text-slate-400"
                  >
                    配信開始 {formatJaDate(r.releaseDate)}
                  </time>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#0A3D62] mb-1 leading-snug">
                  {r.title}
                </h3>
                {r.titleEn && (
                  <p className="text-[11px] font-bold text-slate-400 mb-4">
                    {r.titleEn}
                  </p>
                )}

                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  {r.description}
                </p>

                {/* 収録情報 */}
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-6 pt-6 border-t border-slate-100">
                  {r.trackCount !== undefined && (
                    <ReleaseFact label="収録曲数" value={`全${r.trackCount}曲`} />
                  )}
                  {r.duration && <ReleaseFact label="収録時間" value={r.duration} />}
                  {r.genres && r.genres.length > 0 && (
                    <ReleaseFact label="ジャンル" value={r.genres.join('／')} />
                  )}
                  {r.formats && r.formats.length > 0 && (
                    <ReleaseFact label="フォーマット" value={r.formats.join('／')} />
                  )}
                </dl>

                {/* クレジット */}
                {r.credits && r.credits.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[10px] font-black tracking-[0.25em] text-slate-400 uppercase mb-3">
                      Credits
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {r.credits.map((c) => (
                        <li
                          key={`${r.title}-${c.role}`}
                          className="text-[12px] font-light text-slate-600 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5"
                        >
                          <span className="font-bold text-slate-500">{c.role}</span>
                          <span className="mx-1.5 text-slate-300">/</span>
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {r.href && (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-700"
                    >
                      配信ページで聴く・購入する
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {r.lyricsHref && (
                    <a
                      href={r.lyricsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-700"
                    >
                      公式歌詞ページ
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-[13px] text-slate-400 font-light leading-relaxed">
            ※ 歌詞は著作権上、当サイトには掲載しておりません。公式の歌詞ページをご参照ください。<br />
            ※ 配信開始日・価格・フォーマットは配信サービス側の都合により変更される場合があります。
          </p>
        </section>
      )}

      {/* 音楽活動のみ: 配信サービス */}
      {division === 'music' && (
        <section className="mb-16">
          <SectionTitle label="Listen">配信サービス</SectionTitle>
          <Card className="p-8 sm:p-10">
            <p className="text-[15px] text-slate-600 font-light leading-relaxed mb-7">
              楽曲は TuneCore Japan を通じて配信しています。主要なリンクは以下のとおりです。
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {MUSIC_PLATFORMS.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-colors"
                  >
                    <span className="text-sm font-bold text-[#0A3D62]">{p.name}</span>
                    <ExternalLink size={14} className="text-slate-400 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-[10px] font-black tracking-[0.25em] text-slate-400 uppercase mb-3">
              Other Services
            </p>
            <p className="text-[13px] text-slate-500 font-light leading-relaxed">
              {MUSIC_OTHER_SERVICES.join('／')} ほか。
              各サービスへのリンクは、上記リリースの配信ページからご確認いただけます。
            </p>
          </Card>
        </section>
      )}

      {/* 運営体制（役割のみ・個人情報は掲載しない） */}
      {teams.length > 0 && (
        <section className="mb-16">
          <SectionTitle label="Organization">運営体制</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {teams.map((t, i) => (
              <Card key={t.role} delay={i * 0.06} className="p-7">
                <p className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase mb-3">
                  {t.roleEn}
                </p>
                <h3 className="text-base font-black text-[#0A3D62] mb-1.5">
                  {t.role}
                </h3>
                <p className="text-[11px] text-slate-400 font-bold mb-4">
                  {t.scale}
                </p>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                  {t.description}
                </p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-slate-400 font-light leading-relaxed">
            ※ 学生が主体の活動であり、所属大学への確認および本人の同意が必要なため、
            個人を特定できる情報（氏名・所属学部・写真など）は掲載しておりません。
          </p>
        </section>
      )}

      {/* この活動の報告 */}
      {reports.length > 0 && (
        <section className="mb-16">
          <SectionTitle label="Reports">この活動の報告</SectionTitle>
          <div className="space-y-4">
            {reports.map((r, i) => (
              <Card key={r.id} delay={i * 0.06} className="p-7">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <time className="text-[11px] font-black text-slate-400">
                    {r.date}
                  </time>
                  <DivisionTag division={r.division} />
                </div>
                <h3 className="text-base font-black text-[#0A3D62] mb-2.5 leading-snug">
                  {r.title}
                </h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed line-clamp-2">
                  {r.lead}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <CTAButton variant="outline" onClick={() => setCurrentPage('reports')}>
              活動報告をすべて見る
              <ArrowRight size={15} />
            </CTAButton>
          </div>
        </section>
      )}

      {/* 独立性の注記 */}
      <section className="mb-14">
        <IndependenceNote division={division} />
      </section>

      {/* 他の活動への導線 */}
      <section className="mb-12">
        <SectionTitle label="Other Activities">学びの扉の他の活動</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {others.map((o, i) => (
            <Card key={o.id} delay={i * 0.06} className="p-7">
              <span aria-hidden="true" className="text-2xl block mb-4">
                {o.emoji}
              </span>
              <h3 className="text-base font-black text-[#0A3D62] mb-2 leading-snug">
                {o.name}
              </h3>
              <p className="text-[11px] font-bold text-slate-400 mb-4">{o.kind}</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-5">
                {o.summary}
              </p>
              <button
                onClick={() => setCurrentPage(o.id as PageType)}
                className="inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-700"
              >
                {o.linkLabel}
                <ArrowRight size={14} />
              </button>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-4">
        <CTAButton onClick={() => setCurrentPage('about')}>
          学びの扉の組織構成について
          <ArrowRight size={16} />
        </CTAButton>
        <CTAButton variant="outline" onClick={() => setCurrentPage('contact')}>
          お問い合わせ
        </CTAButton>
      </div>
    </PageShell>
  );
};

export default DivisionPage;
