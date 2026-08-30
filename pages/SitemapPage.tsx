import React from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import { resolveIcon, SectionTitle, Card } from '../components/ui/Blocks';
import {
  MAIN_NAV,
  LEGAL_NAV,
  DIVISION_NAV,
  PAGE_META,
} from '../content/navigation';
import { ORG } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

const Group: React.FC<{
  title: string;
  label: string;
  items: typeof MAIN_NAV;
  setCurrentPage: (p: PageType) => void;
}> = ({ title, label, items, setCurrentPage }) => (
  <section className="mb-16">
    <SectionTitle label={label}>{title}</SectionTitle>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <Card key={item.page} delay={i * 0.04} className="overflow-hidden">
          <button
            onClick={() => setCurrentPage(item.page)}
            className="w-full text-left p-6 hover:bg-sunken/70 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-grow">
                <p className="text-[15.5px] font-semibold text-ink-strong group-hover:text-blue-700 transition-colors mb-2 flex items-center gap-2.5">
                  <span className="text-ink-muted" aria-hidden="true">
                    {resolveIcon(item.icon, 'w-4 h-4')}
                  </span>
                  {item.label}
                </p>
                <p className="text-xs text-ink-muted leading-[1.85] line-clamp-2">
                  {PAGE_META[item.page]?.description ?? ''}
                </p>
              </div>
              <ChevronRight
                size={16}
                className="text-line-strong shrink-0 mt-1 group-hover:text-blue-700 group-hover:translate-x-1 transition-all"
              />
            </div>
          </button>
        </Card>
      ))}
    </div>
  </section>
);

const SitemapPage: React.FC<Props> = ({ setCurrentPage }) => (
  <PageShell
    page="sitemap"
    title="サイトマップ"
    titleEn="Sitemap"
    lead="学びの扉公式サイトの全ページ一覧です。「学びの扉」は資金・会計・運営が独立した3つの活動の総称であるため、活動ごとにページを分けています。お探しの情報が見つからない場合は、お問い合わせページからご連絡ください。"
    setCurrentPage={setCurrentPage}
  >
    {/* 3つの活動（資金・運営が独立しているため、別ページとして先頭に掲載） */}
    <Group
      title="3つの活動（それぞれ独立）"
      label="3つの活動"
      items={DIVISION_NAV}
      setCurrentPage={setCurrentPage}
    />

    <Group
      title="学びの扉全体について"
      label="学びの扉全体について"
      items={MAIN_NAV}
      setCurrentPage={setCurrentPage}
    />

    <Group
      title="規約・ポリシー"
      label="規約・ポリシー"
      items={LEGAL_NAV}
      setCurrentPage={setCurrentPage}
    />

    {/* 外部サービス */}
    <section>
      <SectionTitle>関連サービス・SNS</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            href: ORG.learningAppUrl,
            icon: 'Beaker',
            label: '学習アプリ',
            desc: '「学びの扉アプリ」が開発・運営する無料の化学学習サービス',
          },
          {
            href: ORG.instagram,
            icon: 'Instagram',
            label: `Instagram ${ORG.instagramHandle}`,
            desc: '活動の最新情報・プログラムの募集案内',
          },
        ].map((x, i) => (
          <Card key={i} delay={i * 0.05} className="overflow-hidden">
            <a
              href={x.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 hover:bg-sunken/70 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[15.5px] font-semibold text-ink-strong group-hover:text-blue-700 transition-colors mb-2 flex items-center gap-2.5">
                    <span className="text-ink-muted" aria-hidden="true">
                      {resolveIcon(x.icon, 'w-4 h-4')}
                    </span>
                    {x.label}
                  </p>
                  <p className="text-xs text-ink-muted leading-[1.85]">
                    {x.desc}
                  </p>
                </div>
                <ExternalLink
                  size={15}
                  className="text-line-strong shrink-0 mt-1 group-hover:text-blue-700 transition-colors"
                />
              </div>
            </a>
          </Card>
        ))}
      </div>
    </section>
  </PageShell>
);

export default SitemapPage;
