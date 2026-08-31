import React from 'react';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import {
  SectionTitle,
  Prose,
  Card,
  NoteBox,
  CTAButton,
} from '../components/ui/Blocks';
import { ACHIEVEMENTS, TIMELINE, ORG } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

const AchievementsPage: React.FC<Props> = ({ setCurrentPage }) => (
  <PageShell
    page="achievements"
    title="活動実績"
    titleEn="Achievements"
    lead="これまでの活動を、数値とあゆみで記録しています。掲載しているのは実際に確認できている事実のみです。なお「学びの扉」は3つの活動の総称です。あゆみの各項目には、どの活動のできごとなのかをタグで示しています。"
    setCurrentPage={setCurrentPage}
  >
    {/* 数値 */}
    <section className="mb-24">
      <SectionTitle label="数字で見る活動">数字で見る学びの扉</SectionTitle>
      <p className="text-[14px] text-ink-muted leading-[1.85] mb-8 -mt-4">
        ※ 下記は3つの活動を合わせた実績です。活動ごとの内訳は、
        各活動のページおよび活動報告をご覧ください。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {ACHIEVEMENTS.map((a, i) => (
          <Card key={i} delay={i * 0.07} className="p-7 text-center">
            <div className="flex items-baseline justify-center gap-1.5 mb-4">
              <span
                className="text-5xl font-semibold text-ink-strong"
                
              >
                {a.value}
              </span>
              <span className="text-sm font-semibold text-ink-muted">{a.unit}</span>
            </div>
            <p className="text-[14px] font-semibold text-ink-strong mb-2 leading-snug">
              {a.label}
            </p>
            <p className="text-[12.5px] text-ink-muted font-medium leading-relaxed">
              {a.note}
            </p>
          </Card>
        ))}
      </div>
    </section>

    {/* あゆみ */}
    <section className="mb-24">
      <SectionTitle>活動のあゆみ</SectionTitle>

      <div className="relative pl-8 sm:pl-10">
        {/* 縦線 */}
        <div className="absolute left-[9px] sm:left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-300 to-slate-100 rounded-full" />

        <div className="space-y-10">
          {TIMELINE.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* ドット */}
              <span className="absolute left-[-31px] sm:left-[-39px] top-1.5 w-5 h-5 rounded-full bg-white border-[3px] border-blue-500 shadow-sm" />

              {/*
                [重要] ここにあった DivisionTag（どの活動のできごとかを示すタグ）は
                  不要とのご指示で削除しました。復活させないでください。
              */}
              <div className="mb-2.5">
                <p className="text-xs font-semibold tracking-[0.06em] text-blue-600">
                  {t.date}
                </p>
              </div>
              <h3 className="text-lg font-semibold text-ink-strong mb-3 leading-snug">
                {t.title}
              </h3>
              <p className="text-[15.5px] text-ink-body leading-[1.9]">
                {t.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* 成果物 */}
    <section className="mb-24">
      <SectionTitle label="公開している教材">発行した記録・教材</SectionTitle>
      <Prose className="mb-8">
        <p>
          活動ごとに記録を残すことを方針としています。
          参加者の振り返りを収録した学習記録や、分析にもとづいて制作した教材は、
          次の企画を設計するための検証材料として活用しています。
        </p>
      </Prose>

      <div className="space-y-4">
        {[
          {
            title: '三重のみらい教師塾 学習記録 vol.01',
            meta: '2026年8月発行 ／ 全34ページ',
            body:
              '講演内容、2つのセッションの記録、参加した高校生および大学生スタッフ全員の振り返りを収録。写真については参加者のプライバシー保護処理を施したうえで掲載しています。',
          },
          {
            title: '共通テスト英語リスニング 第1問A 類題集',
            meta: '2026年8月公開 ／ 全13セット・52問',
            body:
              '過去問の出題形式を数年分分析し、正誤の分岐点（数量・時刻・否定・比較）を意図的に配置した類題を作成。全問に話者設定と日本語解説を付しています。',
          },
          {
            title: '化学の道しるべ（理論化学）',
            meta: '制作・改訂中',
            body:
              '理論化学を体系的に読み進められる解説教材。「化学反応と電気エネルギー編」など単元別に演習問題を収録し、継続的に校正・追補を行っています。',
          },
        ].map((p, i) => (
          <Card key={i} delay={i * 0.06} className="p-7 sm:p-8">
            <p className="text-[12.5px] font-semibold text-blue-700 tracking-wider mb-3">
              {p.meta}
            </p>
            <h3 className="text-base font-semibold text-ink-strong mb-3 leading-snug">
              {p.title}
            </h3>
            <p className="text-sm text-ink-muted leading-[1.85]">{p.body}</p>
          </Card>
        ))}
      </div>
    </section>

    {/* 活動風景 */}
    <section className="mb-16">
      <SectionTitle label="活動の記録">活動の様子</SectionTitle>
      <Card className="p-10 sm:p-14 text-center border-dashed border border-line-strong shadow-none bg-sunken/50">
        <ImageIcon className="w-10 h-10 text-line-strong mx-auto mb-5" />
        <p className="text-sm font-bold text-ink-muted mb-2">
          活動写真の掲載を準備しています
        </p>
        <p className="text-xs text-ink-muted leading-[1.85] max-w-md mx-auto">
          参加者のプライバシー保護の観点から、掲載にあたっては本人の同意確認および
          必要な画像処理を行っています。準備が整い次第、順次公開します。
        </p>
      </Card>
    </section>

    <NoteBox title="実績の掲載方針" tone="amber">
      <p>
        当ページに掲載している数値・実績は、私たちが実際に確認できている事実のみです。
        参加者数や効果に関して、根拠のない数字や誇張した表現は掲載しません。
      </p>
      <p>
        記載内容について確認が必要な事項がございましたら、
        <button
          onClick={() => setCurrentPage('contact')}
          className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1"
        >
          お問い合わせ
        </button>
        よりご連絡ください。
      </p>
    </NoteBox>

    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      <CTAButton onClick={() => setCurrentPage('reports')}>
        活動報告の詳細を読む
        <ArrowRight size={15} />
      </CTAButton>
      <CTAButton variant="outline" href={ORG.instagram} external>
        Instagram を見る
      </CTAButton>
    </div>
  </PageShell>
);

export default AchievementsPage;
