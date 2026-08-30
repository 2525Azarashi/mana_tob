import { useEffect } from 'react';
import { PageType } from '../types';
import { PAGE_META } from '../content/navigation';
import { ORG } from '../content/site';

/** head 内の meta / link タグを「無ければ作って」更新するヘルパー */
const setMeta = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = create();
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
};

/** そのページの正規URLを組み立てる */
export const pageUrl = (page: PageType): string =>
  page === 'home' ? ORG.siteUrl : `${ORG.siteUrl}/${page}`;

/**
 * 検索エンジンへの登録可否を指定する robots メタタグを更新します。
 *
 * [重要] 「見つかりません」画面では必ず noindex を出します。
 *   存在しないURLは無数に作れてしまうため、
 *   これを検索結果に載せると同じ内容のページが大量に登録され、
 *   重複コンテンツとして評価を落とします。
 *   また canonical も出しません（正規URLが存在しないため）。
 */
const setRobots = (noindex: boolean) => {
  const selector = 'meta[name="robots"]';
  const existing = document.head.querySelector(selector);
  if (!noindex) {
    // 通常ページでは robots タグを残さない（前のページの指定を引き継がせない）
    existing?.remove();
    return;
  }
  const tag =
    existing ?? document.head.appendChild(
      Object.assign(document.createElement('meta'), { name: 'robots' })
    );
  tag.setAttribute('content', 'noindex, follow');
};

/**
 * ページ別の SEO タグ（title / description / canonical / OGP / Twitter）を更新します。
 *
 * SPA では head が初期HTMLのまま残るため、ページ遷移のたびにここで書き換えます。
 * これにより各URLを個別に共有・インデックスさせられます。
 */
export const usePageSeo = (page: PageType) => {
  useEffect(() => {
    const meta = PAGE_META[page];
    if (!meta) return;

    // 「見つかりません」画面は検索エンジンに登録させない
    const isNotFound = page === 'notFound';
    setRobots(isNotFound);

    const url = pageUrl(page);
    document.title = meta.title;

    setMeta(
      'meta[name="description"]',
      () => Object.assign(document.createElement('meta'), { name: 'description' }),
      'content',
      meta.description
    );

    // canonical（正規URL）。
    // 「見つかりません」画面には正規URLが存在しないため、既存のタグを消して出しません。
    if (isNotFound) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    } else {
      setMeta(
        'link[rel="canonical"]',
        () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
        'href',
        url
      );
    }

    // OGP（property 属性を使う点に注意）
    const og: Array<[string, string]> = [
      ['og:title', meta.title],
      ['og:description', meta.description],
      ['og:url', url],
    ];
    og.forEach(([property, content]) => {
      setMeta(
        `meta[property="${property}"]`,
        () => {
          const el = document.createElement('meta');
          el.setAttribute('property', property);
          return el;
        },
        'content',
        content
      );
    });

    // Twitter Card（name 属性）
    const tw: Array<[string, string]> = [
      ['twitter:title', meta.title],
      ['twitter:description', meta.description],
    ];
    tw.forEach(([name, content]) => {
      setMeta(
        `meta[name="${name}"]`,
        () => Object.assign(document.createElement('meta'), { name }),
        'content',
        content
      );
    });
  }, [page]);
};

export default usePageSeo;
