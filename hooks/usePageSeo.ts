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
 * ページ別の SEO タグ（title / description / canonical / OGP / Twitter）を更新します。
 *
 * SPA では head が初期HTMLのまま残るため、ページ遷移のたびにここで書き換えます。
 * これにより各URLを個別に共有・インデックスさせられます。
 */
export const usePageSeo = (page: PageType) => {
  useEffect(() => {
    const meta = PAGE_META[page];
    if (!meta) return;

    const url = pageUrl(page);
    document.title = meta.title;

    setMeta(
      'meta[name="description"]',
      () => Object.assign(document.createElement('meta'), { name: 'description' }),
      'content',
      meta.description
    );

    setMeta(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      'href',
      url
    );

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
