import React from 'react';
import {
  ExternalLink,
  Smartphone,
  CircleDollarSign,
  UserX,
  RefreshCw,
  ArrowRight,
  Check,
  Beaker,
} from 'lucide-react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import {
  SectionTitle,
  Prose,
  Card,
  NoteBox,
  CTAButton,
} from '../components/ui/Blocks';
import { ORG } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

const FEATURES = [
  {
    icon: <CircleDollarSign className="w-6 h-6" />,
    title: '完全無料',
    body: '利用料はかかりません。有料プランや課金要素もありません。',
  },
  {
    icon: <UserX className="w-6 h-6" />,
    title: '登録不要',
    body: 'アカウント登録もアプリのインストールも不要。開いたらすぐ演習を始められます。',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'スマホ完結',
    body: 'ブラウザで動くWebサービスです。スマートフォン・タブレット・PCに対応しています。',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: '継続的に改訂',
    body: '誤答の傾向や寄せられた意見をもとに、問題と解説を継続的に見直しています。',
  },
];

const LearningAppPage: React.FC<Props> = ({ setCurrentPage }) => (
  <PageShell
    page="learning-app"
    emoji="💻"
    title="学習アプリの紹介"
    titleEn="Learning App"
    lead="学習アプリは、「学びの扉」の3つの活動のうち「学びの扉アプリ」が開発・運営する無料の化学学習サービスです。化学基礎・化学の単元別演習を、登録不要・スマートフォンだけで進められます。"
    setCurrentPage={setCurrentPage}
  >
    {/* サービスカード */}
    <section className="mb-20">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-[#0A3D62] via-blue-800 to-blue-700 p-9 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute top-[-30%] right-[-10%] w-72 h-72 bg-cyan-400/20 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-7">
              <Beaker className="w-8 h-8" />
            </div>
            <p className="text-[10px] font-black tracking-[0.35em] text-cyan-300 uppercase mb-4">
              Developed & Operated by Manabi-no-Tobira App
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black tracking-tight mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              化学学習アプリ
            </h2>
            <p className="text-blue-100 font-light leading-relaxed text-[16px] max-w-2xl mb-8">
              「学びの扉アプリ」が開発・運営する、無料の化学学習サービス。
              化学基礎・化学の主要単元を、その場で解説を読みながら演習できます。
            </p>
            <a
              href={ORG.learningAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#0A3D62] rounded-2xl font-black text-sm hover:bg-blue-50 transition-colors shadow-xl"
            >
              学習アプリを開く
              <ExternalLink size={15} />
            </a>
            <p className="mt-5 text-[11px] font-bold text-blue-200 tracking-wider">
              {ORG.learningAppUrl.replace('https://', '')}
            </p>
          </div>
        </div>
      </Card>
    </section>

    {/* 特徴 */}
    <section className="mb-20">
      <SectionTitle label="Features">学習アプリの特徴</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {FEATURES.map((f, i) => (
          <Card key={i} delay={i * 0.06} className="p-7 flex gap-5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              {f.icon}
            </div>
            <div>
              <h3 className="font-black text-[#0A3D62] mb-2 text-[15px]">{f.title}</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                {f.body}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>

    {/* なぜつくったか */}
    <section className="mb-20">
      <SectionTitle label="Why We Built It">なぜ学習アプリをつくったのか</SectionTitle>
      <Prose>
        <p>
          化学基礎は、mol計算のように「一度つまずくとそこから先がすべて止まる」単元を含んでいます。
          そして多くの場合、つまずいているのは計算そのものではなく、
          「何をどの量に換算しているのか」という理解の部分です。
        </p>
        <p>
          紙の教材では、間違えた問題の解説を探すまでに手間がかかり、
          その間に「なぜ間違えたのか」という感覚が薄れてしまいます。
          間違えた直後に理由を読める状態をつくりたい——それが、この学習アプリを
          Webサービスとして開発した理由です。
        </p>
        <p>
          演習から解説への遷移を最短にし、スマートフォンだけで完結する設計にしました。
          通学中や授業の合間といった短い時間でも、1問単位で学習を積み上げられます。
        </p>
      </Prose>
    </section>

    {/* 収録内容 */}
    <section className="mb-20">
      <SectionTitle label="Contents">扱っている単元</SectionTitle>
      <Card className="p-8 sm:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
          {[
            '物質の構成と純物質・混合物',
            '原子の構造と電子配置',
            '化学結合（イオン結合・共有結合・金属結合）',
            '物質量（mol）とアボガドロ定数',
            'モル濃度と溶液の調製',
            '化学反応式と量的関係',
            '酸と塩基・pH',
            '中和反応と中和滴定',
            '酸化還元反応と酸化数',
            '金属のイオン化傾向',
            '電池と電気分解',
            '反応速度と化学平衡',
          ].map((u, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                <Check size={10} strokeWidth={3.5} />
              </span>
              <span className="text-[15px] text-slate-600 font-light">{u}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 font-medium leading-relaxed">
          ※ 収録単元・問題数は継続的に追加・改訂しています。最新の内容は
          学習アプリ本体でご確認ください。
        </p>
      </Card>
    </section>

    {/* 使い方 */}
    <section className="mb-20">
      <SectionTitle label="Getting Started">使いはじめる手順</SectionTitle>
      <div className="space-y-4">
        {[
          {
            n: 1,
            t: `${ORG.learningAppUrl.replace('https://', '')} を開く`,
            b: 'ブラウザでアクセスするだけです。アプリのインストールは不要です。',
          },
          {
            n: 2,
            t: '学習したい単元を選ぶ',
            b: '学校の進度に合わせて選んでも、苦手な単元から始めても構いません。',
          },
          {
            n: 3,
            t: '演習して、その場で解説を読む',
            b: '間違えた直後に理由を確認してください。ここが最も学習効果の高い瞬間です。',
          },
          {
            n: 4,
            t: '日を置いて同じ単元をもう一度',
            b: '定着の確認になります。2回目で正答できれば、その単元は通過できています。',
          },
        ].map((s, i) => (
          <Card key={i} delay={i * 0.05} className="p-6 flex items-start gap-5">
            <span className="w-8 h-8 rounded-xl bg-[#0A3D62] text-white text-sm font-black flex items-center justify-center shrink-0">
              {s.n}
            </span>
            <div>
              <h4 className="font-black text-[#0A3D62] mb-1.5 text-[15px] break-all">
                {s.t}
              </h4>
              <p className="text-sm text-slate-500 font-light leading-relaxed">{s.b}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>

    <NoteBox title="学習アプリの運営主体について">
      <p>
        学習アプリは外部企業のサービスではなく、「学びの扉」の3つの活動のうち
        <strong className="font-bold">学びの扉アプリ</strong>
        が企画・開発・運営しているサービスです。
        教材の内容、問題の作成、解説の執筆、システムの開発と保守は、
        すべて学びの扉アプリのメンバーが担当しています。
      </p>
      <p>
        なお「学びの扉」は3つの活動の総称であり、学生学修コミュニティ「まなとび」
        （三重大学での探究活動）および音楽活動「まなとび。」とは、
        資金・会計・運営を分けています。学習アプリの運営に関する責任は
        学びの扉アプリが負います。
      </p>
      <p>
        学習アプリに関するご質問・不具合のご報告・内容の誤りのご指摘は、
        当サイトのお問い合わせページから承ります。
      </p>
    </NoteBox>

    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      <CTAButton href={ORG.learningAppUrl} external>
        学習アプリを開く
        <ExternalLink size={15} />
      </CTAButton>
      <CTAButton variant="outline" onClick={() => setCurrentPage('materials')}>
        他の教材も見る
        <ArrowRight size={15} />
      </CTAButton>
    </div>
  </PageShell>
);

export default LearningAppPage;
