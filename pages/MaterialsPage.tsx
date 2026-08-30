import React from 'react';
import { ExternalLink, FileText, Download } from 'lucide-react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import {
  SectionTitle,
  Prose,
  Card,
  Badge,
  NoteBox,
  CTAButton,
} from '../components/ui/Blocks';
import { MATERIAL_ITEMS, ORG } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

const SUBJECTS = ['化学基礎・化学', '英語リスニング'] as const;

const statusTone = (s: string) =>
  s === '公開中' ? 'green' : s === '制作中' ? 'amber' : 'slate';

const MaterialsPage: React.FC<Props> = ({ setCurrentPage }) => (
  <PageShell
    page="materials"
    title="学習支援・教材"
    titleEn="Learning Materials"
    lead="学びの扉が制作・公開している学習教材の一覧です。化学基礎・化学、英語リスニングの2領域を対象に、解説教材と演習問題を用意しています。すべて無料・登録不要でご利用いただけます。"
    setCurrentPage={setCurrentPage}
  >
    {/* 方針 */}
    <section className="mb-20">
      <SectionTitle label="教材づくりの方針">教材の考え方</SectionTitle>
      <Prose>
        <p>
          私たちの教材は、網羅性よりも「つまずく場所を通過できること」を優先しています。
          過去問や活動で聞いた高校生の声から、実際に手が止まる箇所を特定し、
          そこを重点的に解説する構成にしています。
        </p>
        <p>
          また、すべての問題に解説を付け、
          正解の根拠だけでなく「なぜ他の選択肢が誤りなのか」まで記述しています。
          答え合わせで終わらせず、次の問題に転用できる判断基準を持ち帰ってもらうためです。
        </p>
      </Prose>
    </section>

    {/* 教科別ラインナップ */}
    {SUBJECTS.map((subject) => {
      const items = MATERIAL_ITEMS.filter((m) => m.subject === subject);
      if (items.length === 0) return null;

      return (
        <section key={subject} className="mb-20">
          <SectionTitle label="教材のラインナップ">{subject}</SectionTitle>

          <div className="space-y-5">
            {items.map((m, i) => (
              <Card key={m.id} delay={i * 0.06} className="p-7 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="w-12 h-12 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge tone={statusTone(m.status) as any}>{m.status}</Badge>
                      <span className="text-[12.5px] font-bold text-ink-muted">
                        {m.format}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-ink-strong mb-3 leading-snug">
                      {m.title}
                    </h3>
                    <p className="text-[15.5px] text-ink-muted leading-[1.85]">
                      {m.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {m.href && (
                        <a
                          href={m.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-md text-xs font-semibold hover:bg-brand-hover transition-colors"
                        >
                          利用する
                          <ExternalLink size={13} />
                        </a>
                      )}
                      {m.id === 'listening-1a' && (
                        <button
                          onClick={() => setCurrentPage('contact')}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunken text-ink-strong rounded-md text-xs font-semibold hover:bg-slate-100 transition-colors border border-line"
                        >
                          <Download size={13} />
                          配布についてお問い合わせ
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      );
    })}

    {/* 使い方 */}
    <section className="mb-16">
      <SectionTitle label="使い方">おすすめの使い方</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            n: '01',
            t: 'まず解いてから読む',
            b: '解説を先に読むと「わかったつもり」になりやすいです。まず自力で解き、間違えた直後に解説を読む順番をおすすめします。',
          },
          {
            n: '02',
            t: '誤りの理由を言葉にする',
            b: '正解した問題でも、他の選択肢を切った理由を言葉にできるか確認してください。そこが本番で差になります。',
          },
          {
            n: '03',
            t: '同じ単元を日を置いて2回',
            b: '一度で仕上げようとせず、数日空けて同じ単元をもう一度解いてください。定着の確認になります。',
          },
        ].map((s, i) => (
          <Card key={i} delay={i * 0.06} interactive className="p-7">
            {/* 手順番号。白背景では blue-200 が薄すぎるため、枠付きの濃色で示します */}
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-brand-accent text-[15px] font-bold tabular-nums">
              {s.n}
            </span>
            <h4 className="font-bold text-ink-strong mt-4 mb-3 text-[16px]">{s.t}</h4>
            <p className="text-[14.5px] text-ink-body leading-[1.85]">{s.b}</p>
          </Card>
        ))}
      </div>
    </section>

    <NoteBox title="教材の利用について" tone="amber">
      <p>
        個人の学習目的でのご利用は自由です。学校の授業・課題・塾などでご利用になる場合は、
        出典（学びの扉／教材名）を明記のうえ、お問い合わせページからご一報ください。
        無断での複製・再配布・改変および商用利用はお控えください。
      </p>
      <p>
        教材内容に誤りを見つけられた場合は、該当箇所をお知らせいただけると助かります。
        確認のうえ速やかに訂正します。
      </p>
    </NoteBox>

    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      <CTAButton href={ORG.learningAppUrl} external>
        学習アプリで化学を演習する
        <ExternalLink size={15} />
      </CTAButton>
      <CTAButton variant="outline" onClick={() => setCurrentPage('learning-app')}>
        学習アプリについて詳しく
      </CTAButton>
    </div>
  </PageShell>
);

export default MaterialsPage;
