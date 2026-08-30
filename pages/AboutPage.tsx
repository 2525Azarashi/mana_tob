import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import {
  SectionTitle,
  Prose,
  Card,
  DefinitionList,
  CTAButton,
} from '../components/ui/Blocks';
import { StructureNote } from '../components/ui/DivisionNotice';
import { ORG, DIVISIONS } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

/**
 * 「学びの扉とは」ページ。
 *
 * ⚠ 最重要: 「学びの扉」は3つの独立した活動の総称であることを、
 *   このページで最初に明確に説明します。混同を招く書き方をしないでください。
 */
const AboutPage: React.FC<Props> = ({ setCurrentPage }) => (
  <PageShell
    page="about"
    emoji="🏠"
    title="学びの扉とは"
    titleEn="About Us"
    lead="「学びの扉」は、ひとつの団体名ではなく、3つの活動の総称です。それぞれ資金・会計・運営を独立して行っているため、当サイトでも活動ごとにページを分けてご紹介しています。"
    setCurrentPage={setCurrentPage}
  >
    {/* 組織構成（最初に説明する） */}
    <section className="mb-24">
      <SectionTitle label="Structure">3つの活動から成り立っています</SectionTitle>
      <Prose className="mb-8">
        <p>
          私たちは「学びの扉／まなとび」という名前を共有して活動していますが、
          その内実は<strong>互いに独立した3つの活動</strong>です。
          学習サービスを開発・運営する事業活動、三重大学における学生の探究活動、
          そして楽曲を制作する音楽活動。目的も、関わる人も、扱う資金も異なります。
        </p>
        <p>
          資金の面からもこれらを別の活動として区分しており、会計は活動ごとに独立して管理しています。
          そのため、一方の活動が他方の債務や責任を負うことはありません。
          この点を誤解なくお伝えするため、当サイトでは活動ごとにページを分けています。
        </p>
      </Prose>
      <StructureNote setCurrentPage={setCurrentPage} />
    </section>

    {/* 各活動の概要 */}
    <section className="mb-24">
      <SectionTitle label="Activities">それぞれの活動について</SectionTitle>

      <div className="space-y-6">
        {DIVISIONS.map((d, i) => (
          <Card key={d.id} delay={i * 0.06} className="p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <span
                aria-hidden="true"
                className="text-3xl leading-none shrink-0"
              >
                {d.emoji}
              </span>
              <div className="flex-grow">
                <p className="text-[10px] font-black tracking-[0.28em] text-blue-500 uppercase mb-2.5">
                  {d.nameEn}
                </p>
                <h3 className="text-lg font-black text-[#0A3D62] leading-snug mb-1.5">
                  {d.name}
                </h3>
                <p className="text-[11px] font-bold text-slate-400 mb-4">
                  {d.kind}
                </p>
                <p className="text-[15px] text-slate-600 font-light leading-[1.9] mb-5">
                  {d.summary}
                </p>
                <button
                  onClick={() => setCurrentPage(d.id as PageType)}
                  className="inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {d.linkLabel}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>

    {/* 共通する出発点 */}
    <section className="mb-24">
      <SectionTitle label="Our Origin">共通する出発点</SectionTitle>
      <Prose>
        <p>
          活動としては分かれていますが、「学び」をきっかけに人の可能性を広げたいという
          関心は共有しています。とくに学習支援に関わる活動については、
          私たち自身の経験が出発点になっています。
        </p>
        <p>
          私たちの多くは、地方の高校で受験期を過ごしました。
          通える塾が限られていたり、そもそもどんな参考書を選べばよいのかがわからなかったり、
          「情報を持っている人が有利になる」構造を、当事者として経験してきました。
        </p>
        <p>
          だから学びの扉アプリが公開する教材とWebサービスは、すべて無料です。
          インターネットにつながる環境さえあれば、住んでいる場所や家庭の状況に関係なく、
          同じ入口に立てる状態をつくりたいと考えています。
        </p>
      </Prose>
    </section>

    {/* 概要 */}
    <section className="mb-24">
      <SectionTitle label="Overview">概要</SectionTitle>
      <DefinitionList
        items={[
          { label: '名称', value: `${ORG.name}（3つの活動の総称）` },
          { label: '英字表記', value: ORG.nameEn },
          { label: '活動開始', value: ORG.founded },
          { label: '活動拠点', value: ORG.base },
          { label: '主な対象', value: ORG.audience },
          {
            label: '活動区分',
            value:
              '学びの扉アプリ（学習サービスの開発・運営）／学生学修コミュニティ「まなとび」（三重大学での探究活動）／音楽活動「まなとび。」（楽曲制作）',
          },
          {
            label: '会計',
            value:
              '3つの活動それぞれで独立して管理しています。活動間で資金を共有していません。',
          },
          {
            label: '運営するサービス',
            value: (
              <a
                href={ORG.learningAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:text-blue-800 underline decoration-blue-200 underline-offset-4"
              >
                学習アプリ（{ORG.learningAppUrl.replace('https://', '')}）
                ※学びの扉アプリが運営
              </a>
            ),
          },
          {
            label: 'お問い合わせ',
            value: (
              <a
                href={`mailto:${ORG.email}`}
                className="text-blue-600 font-bold hover:text-blue-800 underline decoration-blue-200 underline-offset-4 break-all"
              >
                {ORG.email}
              </a>
            ),
          },
          {
            label: 'SNS',
            value: (
              <a
                href={ORG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:text-blue-800 underline decoration-blue-200 underline-offset-4"
              >
                Instagram {ORG.instagramHandle}
              </a>
            ),
          },
        ]}
      />
    </section>

    {/* 名前の由来 */}
    <section className="mb-20">
      <SectionTitle label="Our Name">「学びの扉」という名前について</SectionTitle>
      <Prose>
        <p>
          「学びの扉」は、「学びの扉」を意味しています。
          扉は、開ければ向こう側に進めるけれど、閉じていれば何があるのかもわかりません。
          私たちが向き合いたいのは、まさにこの「閉じている状態」です。
        </p>
        <p>
          学力が足りないから進めないのではなく、
          扉の存在を知らなかったり、開け方がわからなかったりする。
          その扉を一枚でも開けておくこと、そして
          「ここから入れるよ」と隣で伝えることが、私たちにできることだと考えています。
        </p>
        <p>
          3つの活動が同じ名前を用いているのは、この考え方を共有しているからです。
          ただし運営と会計は、それぞれ独立して行っています。
        </p>
      </Prose>
    </section>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row gap-4">
      <CTAButton onClick={() => setCurrentPage('philosophy')}>
        教育への考え方を読む
        <ArrowRight size={16} />
      </CTAButton>
      <CTAButton variant="outline" onClick={() => setCurrentPage('members')}>
        運営体制を見る
      </CTAButton>
    </div>
  </PageShell>
);

export default AboutPage;
