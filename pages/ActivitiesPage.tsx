import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import {
  SectionTitle,
  Card,
  NoteBox,
  CTAButton,
  resolveIcon,
} from '../components/ui/Blocks';
import { DivisionTag, StructureNote } from '../components/ui/DivisionNotice';
import { ACTIVITIES, DIVISIONS } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

const ActivitiesPage: React.FC<Props> = ({ setCurrentPage }) => (
  <PageShell
    page="activities"
    title="活動内容"
    titleEn="Our Activities"
    lead="「学びの扉」という名前のもとで行っている取り組みを一覧にしています。なお「学びの扉」は3つの活動の総称であり、それぞれ資金・会計・運営を独立して行っています。各取り組みがどの活動に属するのかをタグで示しています。"
    setCurrentPage={setCurrentPage}
  >
    {/* 「学びの扉」が総称であることの明示 */}
    <section className="mb-16">
      <StructureNote setCurrentPage={setCurrentPage} />
    </section>

    {ACTIVITIES.map((a, idx) => (
      <section key={a.id} className="mb-20">
        <Card className="overflow-hidden">
          {/* ヘッダー */}
          <div className="bg-gradient-to-br from-[#0A3D62] to-blue-800 p-8 sm:p-10 text-white">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-md bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/20">
                {resolveIcon(a.icon, 'w-7 h-7')}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2.5">
                  <span className="text-[12px] font-semibold tracking-[0.08em] text-cyan-300">
                    {String(idx + 1).padStart(2, '0')} / {a.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full bg-white/15 border border-white/25 text-white">
                    <span aria-hidden="true">
                      {resolveIcon(
                        DIVISIONS.find((d) => d.id === a.division)?.icon ?? 'Layers',
                        'w-3 h-3',
                      )}
                    </span>
                    {DIVISIONS.find((d) => d.id === a.division)?.shortName}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold leading-snug text-white">
                  {a.title}
                </h2>
              </div>
            </div>
          </div>

          {/* 本文 */}
          <div className="p-8 sm:p-10">
            <p className="text-[17px] text-ink-body leading-[1.9] mb-8">
              {a.summary}
            </p>

            <p className="text-xs font-semibold text-ink-muted tracking-[0.06em] mb-5">
              具体的な取り組み
            </p>
            <ul className="space-y-4 mb-8">
              {a.details.map((d, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-[15.5px] text-ink-body leading-[1.85]">
                    {d}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              {a.linkTo && (
                <button
                  onClick={() => setCurrentPage(a.linkTo as PageType)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sunken hover:bg-blue-50 text-ink-strong hover:text-blue-700 rounded-md text-xs font-semibold transition-all border border-line"
                >
                  {a.linkLabel}
                  <ArrowRight size={14} />
                </button>
              )}
              {/* この取り組みを行っている活動のページへ */}
              <DivisionTag
                division={a.division}
                onClick={() => setCurrentPage(a.division)}
              />
            </div>
          </div>
        </Card>
      </section>
    ))}

    {/* 活動の進め方 */}
    <section className="mb-20">
      <SectionTitle>活動の進め方</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            step: 'STEP 1',
            title: '課題を特定する',
            body:
              '過去問の分析や、活動で聞いた高校生の声から「どこでつまずくのか」を具体的に特定します。思い込みで教材をつくらないための最初の工程です。',
          },
          {
            step: 'STEP 2',
            title: '教材・企画をつくる',
            body:
              '特定した課題に対して、解説教材や演習問題、あるいは対話セッションを設計します。解説には必ず「なぜそうなるか」を書き込みます。',
          },
          {
            step: 'STEP 3',
            title: '公開・実施する',
            body:
              '教材はWebまたはPDFで無料公開し、プログラムは高校生を募って実施します。参加費・利用料は取りません。',
          },
          {
            step: 'STEP 4',
            title: '記録して改訂する',
            body:
              '参加者の振り返りや誤答の傾向を記録として残し、次の教材・企画に反映させます。やって終わりにしないための工程です。',
          },
        ].map((s, i) => (
          <Card key={i} delay={i * 0.06} className="p-7">
            <p className="text-[12px] font-semibold tracking-[0.08em] text-blue-700 mb-3">
              {s.step}
            </p>
            <h3 className="text-base font-semibold text-ink-strong mb-3">{s.title}</h3>
            <p className="text-sm text-ink-muted leading-[1.85]">
              {s.body}
            </p>
          </Card>
        ))}
      </div>
    </section>

    <NoteBox title="連携・ご依頼について">
      <p>
        ご相談の際は、どの活動（学びの扉アプリ／学生学修コミュニティ「まなとび」／
        音楽活動「まなとび。」）に関するものかをご明記いただけると、
        担当への取り次ぎが円滑に進みます。
      </p>
      <p>
        学校・教育委員会・団体の皆さまとの連携（出張プログラムの実施、教材の授業利用など）についても
        ご相談を承っています。取材のご依頼も同様です。
        お問い合わせページよりご連絡ください。
      </p>
    </NoteBox>

    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      <CTAButton onClick={() => setCurrentPage('reports')}>
        活動報告を読む
        <ArrowRight size={16} />
      </CTAButton>
      <CTAButton variant="outline" onClick={() => setCurrentPage('contact')}>
        お問い合わせ
      </CTAButton>
    </div>
  </PageShell>
);

export default ActivitiesPage;
