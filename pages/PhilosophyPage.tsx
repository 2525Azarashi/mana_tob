import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import { SectionTitle, Prose, Card, CTAButton } from '../components/ui/Blocks';
import { VALUES } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

const PhilosophyPage: React.FC<Props> = ({ setCurrentPage }) => (
  <PageShell
    page="philosophy"
    emoji="💡"
    title="教育への考え方"
    titleEn="Our Philosophy"
    lead="どんな教材をつくるか、どんな場をつくるかは、結局「教育をどう捉えているか」に規定されます。私たちが活動の判断基準にしている4つの考え方を、はっきり言葉にしておきます。"
    setCurrentPage={setCurrentPage}
  >
    {/* 冒頭のステートメント */}
    <section className="mb-20">
      <Card className="p-9 sm:p-12 bg-gradient-to-br from-slate-50 to-blue-50/40 border-blue-100">
        <Quote className="w-9 h-9 text-blue-300 mb-6" />
        <p className="text-xl sm:text-2xl font-black text-[#0A3D62] leading-[1.7] tracking-tight mb-6">
          学びの機会は、生まれた場所や家庭の状況によって
          <br className="hidden sm:block" />
          あらかじめ分けられてよいものではない。
        </p>
        <p className="text-[15px] text-slate-500 font-light leading-relaxed">
          私たちは、そう考えています。その考えを実現する手段として、
          無料の教材とサービスを自分たちの手でつくり、対話の場を運営しています。
        </p>
      </Card>
    </section>

    {/* 4つの考え方 */}
    <section className="mb-24">
      <SectionTitle label="Our Values">私たちが大切にしている4つのこと</SectionTitle>

      <div className="space-y-8">
        {VALUES.map((v, i) => (
          <Card key={v.no} delay={i * 0.07} className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row gap-8">
              {/* 番号 */}
              <div className="shrink-0">
                <span
                  className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-cyan-400 italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {v.no}
                </span>
              </div>

              <div className="flex-grow">
                <h3 className="text-xl sm:text-2xl font-black text-[#0A3D62] leading-snug mb-4 tracking-tight">
                  {v.title}
                </h3>
                <p className="text-[15px] font-bold text-blue-600 mb-6 leading-relaxed">
                  {v.lead}
                </p>
                <div className="h-px bg-slate-100 mb-6" />
                <p className="text-[16px] text-slate-600 font-light leading-[1.95]">
                  {v.body}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>

    {/* 教材制作の方針 */}
    <section className="mb-24">
      <SectionTitle label="Editorial Policy">教材づくりで守っていること</SectionTitle>
      <Prose>
        <p>
          考え方を掲げるだけでは意味がないので、教材制作の実務ルールとして落とし込んでいます。
          学びの扉が公開する教材は、次の基準を満たしたものだけです。
        </p>
      </Prose>

      <div className="mt-8 space-y-4">
        {[
          {
            title: '解説には必ず「誤りの理由」を書く',
            body:
              '正解の根拠だけでなく、なぜ他の選択肢が誤りなのかを記述します。消去法を根拠のある技術にするためです。',
          },
          {
            title: '事実確認をしていない内容は載せない',
            body:
              '出題範囲や制度に関する記述は、公的な資料や実際の過去問にあたって確認します。推測を断定として書きません。',
          },
          {
            title: '誤りの指摘には速やかに対応する',
            body:
              '教材に誤りが見つかった場合は訂正し、必要に応じて活動報告でお知らせします。訂正の履歴を隠しません。',
          },
          {
            title: '成績や合否を保証する表現は使わない',
            body:
              '「必ず伸びる」「これだけで合格」といった表現は用いません。学習の責任を引き受けるのは学習者本人だからです。',
          },
          {
            title: 'どの端末でも同じ内容が読めるようにする',
            body:
              '化学式の下付き・上付き文字が環境によって崩れないようにするなど、表示環境による不利をなくす実装を選びます。',
          },
        ].map((r, i) => (
          <Card key={i} delay={i * 0.05} className="p-7 flex gap-5">
            <span className="w-7 h-7 rounded-lg bg-[#0A3D62] text-white text-xs font-black flex items-center justify-center shrink-0">
              {i + 1}
            </span>
            <div>
              <h4 className="font-black text-[#0A3D62] mb-2 text-[15px]">{r.title}</h4>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                {r.body}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>

    <div className="flex flex-col sm:flex-row gap-4">
      <CTAButton onClick={() => setCurrentPage('materials')}>
        教材ラインナップを見る
        <ArrowRight size={16} />
      </CTAButton>
      <CTAButton variant="outline" onClick={() => setCurrentPage('activities')}>
        活動内容を見る
      </CTAButton>
    </div>
  </PageShell>
);

export default PhilosophyPage;
