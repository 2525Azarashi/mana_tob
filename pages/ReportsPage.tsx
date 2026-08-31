import React, { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import { resolveIcon, Card, Badge, NoteBox, CTAButton } from '../components/ui/Blocks';
import { REPORTS, ORG, DIVISIONS, Division } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

const CATEGORIES = [
  'すべて',
  '教師塾',
  '教材開発',
  'サービス開発',
  '音楽活動',
  'お知らせ',
] as const;

const categoryTone = (c: string) =>
  c === '教師塾'
    ? 'blue'
    : c === '教材開発'
      ? 'green'
      : c === 'サービス開発'
        ? 'amber'
        : 'slate';

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
};

const ReportsPage: React.FC<Props> = ({ setCurrentPage }) => {
  const [filter, setFilter] = useState<string>('すべて');
  /** 活動（学びの扉アプリ／コミュニティ／音楽）での絞り込み */
  const [divFilter, setDivFilter] = useState<Division['id'] | 'all'>('all');

  const list = REPORTS.filter(
    (r) =>
      (filter === 'すべて' || r.category === filter) &&
      (divFilter === 'all' || r.division === divFilter),
  );

  return (
    <PageShell
      page="reports"
      title="活動報告"
      titleEn="Activity Reports"
      lead="「学びの扉」の各活動が実際に行ったことを、時系列で記録・公開しています。何を実施し、そこから何がわかったのかまで書き残すことを方針としています。各記事がどの活動のものなのかは、タグで確認できます。"
      setCurrentPage={setCurrentPage}
    >
      {/* 活動（部門）での絞り込み。資金・運営が別のため分けて見られるようにしています */}
      <div className="mb-8">
        <p className="text-[12px] font-semibold tracking-[0.08em] text-ink-muted mb-3">
          活動で絞り込む
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setDivFilter('all')}
            className={`px-5 py-2.5 rounded-md text-xs font-semibold transition-all border ${
              divFilter === 'all'
                ? 'bg-brand text-white border-brand'
                : 'bg-white text-ink-muted border-line hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            すべての活動
          </button>
          {DIVISIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDivFilter(d.id)}
              className={`px-5 py-2.5 rounded-md text-xs font-semibold transition-all border ${
                divFilter === d.id
                  ? 'bg-brand text-white border-brand'
                  : 'bg-white text-ink-muted border-line hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              <span aria-hidden="true" className="mr-1.5">
                {resolveIcon(d.icon, 'w-3.5 h-3.5')}
              </span>
              {d.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* カテゴリフィルタ */}
      <div className="mb-12">
        <p className="text-[12px] font-semibold tracking-[0.08em] text-ink-muted mb-3">
          カテゴリで絞り込む
        </p>
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2.5 rounded-md text-xs font-semibold transition-all border ${
                filter === c
                  ? 'bg-brand text-white border-brand'
                  : 'bg-white text-ink-muted border-line hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 記事一覧 */}
      <div className="space-y-10">
        {list.map((r, i) => (
          <Card key={r.id} delay={i * 0.06} className="overflow-hidden">
            <article>
              {/* 記事ヘッダー */}
              <div className="p-8 sm:p-10 border-b border-line bg-sunken/50">
                {/*
                  [重要] ここにあった DivisionTag（どの活動の記事かを示すタグ）は
                    不要とのご指示で削除しました。復活させないでください。
                */}
                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <Badge tone={categoryTone(r.category) as any}>{r.category}</Badge>
                  <time
                    dateTime={r.date}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-muted"
                  >
                    <Calendar size={13} />
                    {formatDate(r.date)}
                  </time>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold text-ink-strong leading-snug tracking-tight mb-4">
                  {r.title}
                </h2>
                <p className="text-[15.5px] font-bold text-blue-600 leading-relaxed">
                  {r.lead}
                </p>
              </div>

              {/* 本文 */}
              <div className="p-8 sm:p-10">
                <div className="space-y-6 text-[16px] text-ink-body leading-[1.95]">
                  {r.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>

                {/* 事実データ */}
                {r.facts && (
                  <div className="mt-9 pt-8 border-t border-line">
                    <p className="text-[12px] font-semibold tracking-[0.08em] text-ink-muted mb-5">
                      実施概要
                    </p>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {r.facts.map((f, k) => (
                        <div key={k} className="flex gap-4">
                          <dt className="text-xs font-semibold text-ink-muted w-20 shrink-0 pt-0.5">
                            {f.label}
                          </dt>
                          <dd className="text-sm text-ink-body font-medium leading-relaxed">
                            {f.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </article>
          </Card>
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-center py-20 text-ink-muted font-bold text-sm">
          この条件に当てはまる活動報告はまだありません。
        </p>
      )}

      <div className="mt-16">
        <NoteBox title="最新の活動について">
          <p>
            開催予定のプログラムや、公開したばかりの教材については、Instagram（
            <a
              href={ORG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4"
            >
              {ORG.instagramHandle}
            </a>
            ）でも随時お知らせしています。
          </p>
        </NoteBox>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <CTAButton onClick={() => setCurrentPage('achievements')}>
          活動実績を見る
          <ArrowRight size={15} />
        </CTAButton>
        <CTAButton variant="outline" onClick={() => setCurrentPage('activities')}>
          活動内容を見る
        </CTAButton>
      </div>
    </PageShell>
  );
};

export default ReportsPage;
