import React from 'react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import { NoteBox } from '../components/ui/Blocks';
import { ORG } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

/** 法務系ページ共通の見出し */
const H2: React.FC<{ n: string; children: React.ReactNode }> = ({ n, children }) => (
  <h2 className="text-xl sm:text-2xl font-semibold text-ink-strong mt-14 mb-6 pb-4 border-b border-line leading-snug">
    <span className="text-blue-700 mr-3">{n}</span>
    {children}
  </h2>
);

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-base font-semibold text-ink-strong mt-9 mb-4">{children}</h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[16px] text-ink-body leading-[1.95] mb-5">{children}</p>
);

const UL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="space-y-3 mb-6 pl-1">
    {items.map((it, i) => (
      <li key={i} className="flex items-start gap-3.5">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-[0.7rem]" />
        <span className="text-[15.5px] text-ink-body leading-[1.9]">{it}</span>
      </li>
    ))}
  </ul>
);

const PrivacyPage: React.FC<Props> = ({ setCurrentPage }) => (
  <PageShell
    page="privacy"
    title="プライバシーポリシー"
    titleEn="Privacy Policy"
    lead={`当サイトの運営主体である「学びの扉アプリ」（以下「当団体」）は、当団体が運営するウェブサイトおよびサービス（以下あわせて「当サイト」）における個人情報およびそれに準ずる情報の取り扱いについて、以下のとおり定めます。`}
    setCurrentPage={setCurrentPage}
  >
    <div className="max-w-3xl">
      <NoteBox title="このポリシーの適用範囲と運営主体">
        <p>
          本ポリシーは、学びの扉公式サイト（{ORG.siteUrl.replace('https://', '')}）
          および当団体が開発・運営する 学習アプリ（
          {ORG.learningAppUrl.replace('https://', '')}）に適用されます。
        </p>
        <p>
          なお「学びの扉」は、3つの活動（学びの扉アプリ、学生学修コミュニティ「まなとび」、
          音楽活動「まなとび。」）の総称です。当サイトおよび 学習アプリの運営主体は
          このうち「学びの扉アプリ」であり、本ポリシーにもとづく責任は同活動が負います。
          他の2つの活動とは資金・会計・運営を分けており、取得した情報を
          活動間で共有することはありません。
        </p>
      </NoteBox>

      <H2 n="1.">運営者情報</H2>
      <UL
        items={[
          <>総称：{ORG.name}（資金・運営が独立した3つの活動の総称）</>,
          <>当サイトの運営主体：学びの扉アプリ</>,
          <>
            責任者：{ORG.representative}
            <span className="block text-xs text-ink-muted mt-1">
              ※ 学生が主体の活動であり、所属大学への確認および本人の同意が
              必要なため、現在は役職表記のみとしています。法令にもとづく請求および
              公的機関からの照会に対しては、下記メールアドレスより別途ご案内します。
            </span>
          </>,
          <>活動拠点：{ORG.base}</>,
          <>
            連絡先：
            <a
              href={`mailto:${ORG.email}`}
              className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 break-all"
            >
              {ORG.email}
            </a>
          </>,
          <>個人情報に関する問い合わせ窓口：上記メールアドレス</>,
        ]}
      />

      <H2 n="2.">取得する情報</H2>
      <H3>2-1. お問い合わせによりご提供いただく情報</H3>
      <P>
        お問い合わせの際にご入力・ご送信いただくお名前、メールアドレス、
        学校名・団体名、お問い合わせ内容などの情報を取得します。
        なお当サイトのお問い合わせフォームは、入力内容をお使いのメールソフトに引き渡す方式であり、
        当サイトのサーバーに入力内容を保存することはありません。
      </P>

      <H3>2-2. 端末内に保存される学習データ</H3>
      <P>
        学習アプリの演習機能における進捗・解答状況などは、ご利用の端末のブラウザ内
        （localStorage 等）に保存される場合があります。
        これらは当団体のサーバーに送信されるものではなく、
        ブラウザのデータ削除により消去されます。
      </P>

      <H3>2-3. アクセスに伴い自動的に取得される情報</H3>
      <P>
        当サイトの利用状況を把握するため、以下の情報が自動的に取得される場合があります。
        これらの情報から特定の個人を識別することはありません。
      </P>
      <UL
        items={[
          'IPアドレス、ブラウザの種類・バージョン、OSの種類',
          '閲覧したページのURL、滞在時間、参照元のURL',
          '端末の種類（PC／スマートフォン等）、画面サイズ',
          'アクセス日時',
        ]}
      />

      <H2 n="3.">情報の利用目的</H2>
      <P>取得した情報は、以下の目的の範囲内でのみ利用します。</P>
      <UL
        items={[
          'お問い合わせへの回答および必要なご連絡のため',
          '教材・サービスの内容の改善、および不具合の修正のため',
          '当サイトの利用状況の分析、コンテンツ改善のため',
          '広告配信および広告効果の測定のため',
          '法令に基づく対応のため',
        ]}
      />

      <H2 n="4.">Cookie（クッキー）の使用について</H2>
      <P>
        当サイトでは、利便性の向上、アクセス状況の分析、および広告配信のために
        Cookie およびこれに類する技術を使用する場合があります。
        Cookie は、ウェブサイトがご利用の端末に保存する小さなテキストファイルであり、
        これによって個人を特定できる情報が取得されることはありません。
      </P>
      <P>
        Cookie の使用は、ご利用のブラウザの設定により無効にすることができます。
        ただし、無効にした場合、当サイトの一部機能が正常に動作しなくなる可能性があります。
        設定方法はお使いのブラウザのヘルプをご確認ください。
      </P>

      <H2 n="5.">広告配信について（Google AdSense）</H2>
      <P>
        当サイトでは、サーバー費用等の運営費に充てるため、第三者配信の広告サービス
        （Google AdSense を含む）を利用する場合があります。
      </P>
      <UL
        items={[
          <>
            第三者配信事業者（Google を含む）は、Cookie
            を使用して、ユーザーが当サイトや他のサイトに過去にアクセスした際の情報にもとづき、
            適切と思われる広告を表示します。
          </>,
          <>
            Google が広告 Cookie を使用することにより、Google
            やそのパートナーは、当サイトや他のサイトへのアクセス情報にもとづいて広告を配信できます。
          </>,
          <>
            ユーザーは
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1"
            >
              広告設定
            </a>
            ページで、パーソナライズ広告を無効にすることができます。
          </>,
          <>
            また
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1"
            >
              aboutads.info
            </a>
            から、第三者配信事業者のパーソナライズ広告を無効にすることも可能です。
          </>,
          <>
            第三者配信事業者による Cookie
            の取り扱いについては、各事業者のプライバシーポリシーをご確認ください。Google
            のポリシーは
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1"
            >
              こちら
            </a>
            です。
          </>,
        ]}
      />
      <P>
        なお、広告の配信内容が、当サイトが提供する教材および解説の内容に影響を与えることはありません。
      </P>

      <H2 n="6.">アクセス解析ツールについて</H2>
      <P>
        当サイトでは、アクセス状況の把握のために Google Analytics
        等のアクセス解析ツールを利用する場合があります。
        これらのツールは Cookie を使用してデータを収集しますが、
        収集されるデータは匿名で収集されており、個人を特定するものではありません。
      </P>
      <P>
        Google Analytics によるデータ収集は、
        <a
          href="https://tools.google.com/dlpage/gaoptout?hl=ja"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1"
        >
          Google アナリティクス オプトアウト アドオン
        </a>
        により無効にすることができます。
      </P>

      <H2 n="7.">第三者への提供</H2>
      <P>
        当団体は、取得した個人情報を、ご本人の同意なく第三者に提供・開示することはありません。
        ただし、以下の場合を除きます。
      </P>
      <UL
        items={[
          '法令にもとづく開示請求があった場合',
          '人の生命、身体または財産の保護のために必要があり、本人の同意を得ることが困難な場合',
          '前記「広告配信」「アクセス解析」に記載した範囲で、Cookie 等の情報が第三者配信事業者により取得される場合',
        ]}
      />

      <H2 n="8.">未成年の方のご利用について</H2>
      <P>
        当サイトは高校生を主な対象としています。
        未成年の方が当サイトにお問い合わせをされる場合は、
        あらかじめ保護者の方の同意を得たうえでご連絡ください。
      </P>
      <P>
        なお当団体は、教材の利用にあたって氏名・住所・電話番号等の登録を求めることはありません。
      </P>

      <H2 n="9.">情報の管理と保存期間</H2>
      <P>
        取得した個人情報は、漏えい、紛失、改ざん、不正アクセスを防止するため、
        必要かつ適切な措置を講じて管理します。
        お問い合わせに関する情報は、対応の完了後、
        必要な期間を経過した時点で速やかに削除します。
      </P>

      <H2 n="10.">開示・訂正・削除のご請求</H2>
      <P>
        ご本人から、個人情報の開示、訂正、利用停止または削除のご請求があった場合は、
        ご本人であることを確認のうえ、法令に従い速やかに対応します。
        ご請求は
        <a
          href={`mailto:${ORG.email}`}
          className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1 break-all"
        >
          {ORG.email}
        </a>
        までご連絡ください。
      </P>

      <H2 n="11.">外部サイトへのリンク</H2>
      <P>
        当サイトから外部サイトへリンクしている場合、
        リンク先サイトにおける個人情報の取り扱いについて当団体は責任を負いません。
        リンク先各サイトのプライバシーポリシーをご確認ください。
      </P>

      <H2 n="12.">本ポリシーの変更</H2>
      <P>
        当団体は、法令の改正やサービス内容の変更に応じて、本ポリシーを変更する場合があります。
        変更後の内容は当ページに掲載した時点から効力を生じます。
        重要な変更を行う場合は、当サイト上でお知らせします。
      </P>

      <H2 n="13.">お問い合わせ窓口</H2>
      <P>
        本ポリシーに関するご質問、個人情報の取り扱いに関するお問い合わせは、
        以下までご連絡ください。
      </P>
      <UL
        items={[
          <>学びの扉アプリ（当サイトの運営主体）</>,
          <>
            メール：
            <a
              href={`mailto:${ORG.email}`}
              className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 break-all"
            >
              {ORG.email}
            </a>
          </>,
          <>
            お問い合わせページ：
            <button
              onClick={() => setCurrentPage('contact')}
              className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4"
            >
              お問い合わせフォーム
            </button>
          </>,
        ]}
      />

      <div className="mt-16 pt-8 border-t border-line">
        <p className="text-xs font-bold text-ink-muted tracking-wider">
          制定日：2026年8月29日
        </p>
        <p className="text-xs font-bold text-ink-muted tracking-wider mt-1.5">
          最終改定日：2026年8月29日
        </p>
      </div>
    </div>
  </PageShell>
);

export default PrivacyPage;
