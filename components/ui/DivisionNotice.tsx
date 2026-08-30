import React from 'react';
import { Info, Layers } from 'lucide-react';
import { resolveIcon } from './Blocks';
import { PageType } from '../../types';
import { DIVISIONS, Division } from '../../content/site';

/**
 * 「学びの扉」の3つの活動は資金・運営が独立していることを示す共通表示。
 *
 * [重要] この注記は、同名の別活動が混同されるのを防ぐために設けています。
 *   各活動ページ・活動報告記事などから必ず参照してください。
 */

/** 活動（部門）を示す小さなタグ。記事やカードの見出し横に置きます。 */
export const DivisionTag: React.FC<{
  division: Division['id'];
  onClick?: () => void;
}> = ({ division, onClick }) => {
  const d = DIVISIONS.find((x) => x.id === division);
  if (!d) return null;

  const base =
    'inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-2.5 py-1 rounded border transition-colors';
  const tone: Record<Division['id'], string> = {
    app: 'bg-blue-50 text-blue-700 border-blue-100',
    community: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    music: 'bg-purple-50 text-purple-700 border-purple-100',
  };

  const content = (
    <>
      <span aria-hidden="true">{resolveIcon(d.icon, 'w-3 h-3')}</span>
      {d.shortName}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${base} ${tone[division]} hover:brightness-95`}
        title={`${d.name} の活動`}
      >
        {content}
      </button>
    );
  }
  return <span className={`${base} ${tone[division]}`}>{content}</span>;
};

/** 個別の活動ページ内で、その活動の独立性を明示するボックス。 */
export const IndependenceNote: React.FC<{ division: Division['id'] }> = ({ division }) => {
  const d = DIVISIONS.find((x) => x.id === division);
  if (!d) return null;

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-6 sm:p-7">
      <div className="flex items-start gap-3.5">
        <span className="w-8 h-8 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <Info size={16} />
        </span>
        <div>
          <p className="text-sm font-bold text-amber-900 mb-2">
            会計・運営の独立性について
          </p>
          <p className="text-[14px] text-amber-900/90 leading-[1.9]">
            {d.independence}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 「学びの扉」という名称が3つの活動の総称であることを説明するボックス。
 * トップページや「学びの扉とは」で使用します。
 */
export const StructureNote: React.FC<{
  setCurrentPage?: (page: PageType) => void;
}> = ({ setCurrentPage }) => (
  <div className="rounded-lg border border-line bg-sunken p-6 sm:p-8">
    <div className="flex items-start gap-3.5 mb-5">
      <span className="w-8 h-8 rounded-md bg-white text-ink-strong flex items-center justify-center shrink-0 border border-line">
        <Layers size={16} />
      </span>
      <div>
        <p className="text-sm font-bold text-ink-strong mb-2">
          「学びの扉」は3つの活動の総称です
        </p>
        <p className="text-[14px] text-ink-body leading-[1.9]">
          同じ「学びの扉／まなとび」という名前を用いていますが、下記の3つは
          <strong className="font-bold text-ink-body">
            資金・会計・運営をそれぞれ独立して
          </strong>
          行っています。一方の活動が他方の責任を負うものではありません。
        </p>
      </div>
    </div>

    <ul className="space-y-2.5 pl-0 sm:pl-12">
      {DIVISIONS.map((d) => (
        <li key={d.id}>
          {setCurrentPage ? (
            <button
              onClick={() => setCurrentPage(d.id as PageType)}
              className="w-full text-left flex items-start gap-3 p-3.5 rounded-md bg-white border border-line hover:border-brand transition-colors group"
            >
              <span aria-hidden="true" className="text-ink-muted mt-0.5">
                {resolveIcon(d.icon, 'w-4 h-4')}
              </span>
              <span>
                <span className="block text-[14px] font-semibold text-ink-strong group-hover:text-blue-700">
                  {d.name}
                </span>
                <span className="block text-[12px] text-ink-muted mt-0.5">
                  {d.kind}
                </span>
              </span>
            </button>
          ) : (
            <div className="flex items-start gap-3 p-3.5 rounded-md bg-white border border-line">
              <span aria-hidden="true" className="text-ink-muted mt-0.5">
                {resolveIcon(d.icon, 'w-4 h-4')}
              </span>
              <span>
                <span className="block text-[14px] font-semibold text-ink-strong">
                  {d.name}
                </span>
                <span className="block text-[12px] text-ink-muted mt-0.5">
                  {d.kind}
                </span>
              </span>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default StructureNote;
