import React from 'react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import { NoteBox } from '../components/ui/Blocks';
import { ORG } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

const H2: React.FC<{ n: string; children: React.ReactNode }> = ({ n, children }) => (
  <h2 className="text-xl sm:text-2xl font-black text-[#0A3D62] mt-14 mb-6 pb-4 border-b border-slate-100 leading-snug">
    <span className="text-blue-500 mr-3">{n}</span>
    {children}
  </h2>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[16px] text-slate-600 font-light leading-[1.95] mb-5">{children}</p>
);

const OL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ol className="space-y-3.5 mb-6">
    {items.map((it, i) => (
      <li key={i} className="flex items-start gap-4">
        <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
          {i + 1}
        </span>
        <span className="text-[15px] text-slate-600 font-light leading-[1.9]">{it}</span>
      </li>
    ))}
  </ol>
);

const TermsPage: React.FC<Props> = ({ setCurrentPage }) => (
  <PageShell
    page="terms"
    emoji="📜"
    title="利用規約"
    titleEn="Terms of Use"
    lead={`本規約は、「学びの扉」の3つの活動のうち「学びの扉アプリ」（以下「当団体」）が運営するウェブサイトおよび提供する教材・サービス（以下あわせて「本サービス」）の利用条件を定めるものです。本サービスをご利用いただく際は、本規約に同意いただいたものとみなします。`}
    setCurrentPage={setCurrentPage}
  >
    <div className="max-w-3xl">
      <NoteBox title="本規約の適用範囲と運営主体">
        <p>
          本規約は、学びの扉公式サイト（{ORG.siteUrl.replace('https://', '')}）、
          学習アプリ（{ORG.learningAppUrl.replace('https://', '')}）、
          および当団体が公開する教材（PDF・Web教材等）に適用されます。
        </p>
        <p>
          「学びの扉」は、3つの活動（学びの扉アプリ、学生学修コミュニティ「まなとび」、
          音楽活動「まなとび。」）の総称であり、それぞれ資金・会計・運営を
          独立して行っています。本規約にいう「当団体」は、本サービスを運営する
          「学びの扉アプリ」のみを指し、他の2つの活動は本規約の当事者となりません。
          また、一方の活動が他方の債務や責任を負うことはありません。
        </p>
      </NoteBox>

      <H2 n="第1条">目的および位置づけ</H2>
      <P>
        本サービスは、高校生・受験生の自主的な学習を支援することを目的として、
        学生が主体となって運営する当団体（学びの扉アプリ）が無償で提供するものです。
      </P>
      <P>
        本サービスは学習の補助を目的としたものであり、
        特定の試験における成績の向上、合格、その他いかなる結果も保証するものではありません。
        学習の方針および進め方の最終的な判断は、利用者ご自身に帰属します。
      </P>

      <H2 n="第2条">利用料金</H2>
      <P>
        本サービスの利用は無料です。当団体が利用者に対して利用料金を請求することはありません。
        ただし、インターネット接続に必要な通信料は利用者のご負担となります。
      </P>
      <P>
        なお、運営費（サーバー費用等）に充てるため、本サービス内に広告を掲載する場合があります。
        広告の掲載が教材および解説の内容に影響を与えることはありません。
      </P>

      <H2 n="第3条">知的財産権</H2>
      <P>
        本サービスで提供される教材、問題、解説、図表、文章、デザイン、ロゴその他一切のコンテンツに関する
        著作権およびその他の知的財産権は、当団体または正当な権利者に帰属します。
      </P>

      <H2 n="第4条">教材の利用範囲</H2>
      <P>以下の範囲でのご利用は自由です。事前のご連絡も不要です。</P>
      <OL
        items={[
          '利用者ご自身の学習のために、画面上で閲覧・演習すること',
          '利用者ご自身の学習のために、教材を印刷して使用すること',
          '当サイトのURLを、SNS・ブログ等でリンクとして紹介すること',
        ]}
      />
      <P>
        学校の授業・課題、塾・予備校の指導など、教育目的で第三者に配布・提示される場合は、
        出典（学びの扉／教材名）を明記のうえ、
        <button
          onClick={() => setCurrentPage('contact')}
          className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1"
        >
          お問い合わせページ
        </button>
        から事前にご一報ください。原則として許諾いたします。
      </P>

      <H2 n="第5条">禁止事項</H2>
      <P>本サービスの利用にあたり、以下の行為を禁止します。</P>
      <OL
        items={[
          'コンテンツの全部または一部を、当団体の許諾なく複製・転載・再配布・公衆送信すること',
          'コンテンツを改変し、当団体の著作物であるかのように、または当団体の関与があるかのように表示すること',
          'コンテンツを販売・貸与その他の方法で商業的に利用すること',
          '本サービスのシステムに対する不正アクセス、リバースエンジニアリング、自動化されたプログラムによる過度なアクセス',
          '本サービスの運営を妨害する行為、または他の利用者の利用を妨げる行為',
          '当団体、他の利用者、または第三者の権利・名誉を侵害する行為',
          '法令または公序良俗に反する行為',
        ]}
      />

      <H2 n="第6条">コンテンツの正確性と訂正</H2>
      <P>
        当団体は、教材の内容について、公的な資料および実際の出題を確認のうえ制作していますが、
        その完全性・正確性・最新性を保証するものではありません。
      </P>
      <P>
        教材に誤りが発見された場合、当団体は速やかに訂正し、
        必要に応じて活動報告ページ等でお知らせします。
        誤りを発見された場合は、該当箇所（教材名・問題番号）をお知らせいただけると助かります。
      </P>

      <H2 n="第7条">サービスの変更・中断・終了</H2>
      <P>
        当団体は、以下の場合において、利用者への事前の通知なく、
        本サービスの内容を変更し、または提供を中断・終了することがあります。
      </P>
      <OL
        items={[
          'システムの保守・点検・更新を行う場合',
          '地震、火災、停電、通信回線の障害等、当団体の責めに帰さない事由が生じた場合',
          '運営体制の変更その他、当団体が本サービスの提供継続が困難と判断した場合',
        ]}
      />
      <P>
        本サービスの変更・中断・終了により利用者に生じた損害について、当団体は責任を負いません。
      </P>

      <H2 n="第8条">免責事項</H2>
      <OL
        items={[
          '当団体は、本サービスの利用によって利用者に生じたいかなる損害についても、当団体に故意または重大な過失がある場合を除き、責任を負いません。',
          '当団体は、本サービスが利用者の特定の目的に適合すること、期待する結果が得られることを保証しません。',
          '本サービスからリンクする外部サイトの内容について、当団体は責任を負いません。',
          '本サービス内に掲載される広告の内容および広告主との取引について、当団体は責任を負いません。',
        ]}
      />

      <H2 n="第9条">個人情報の取り扱い</H2>
      <P>
        本サービスの利用に伴い取得する情報の取り扱いについては、
        <button
          onClick={() => setCurrentPage('privacy')}
          className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1"
        >
          プライバシーポリシー
        </button>
        に定めるところによります。
      </P>

      <H2 n="第10条">未成年の利用者について</H2>
      <P>
        本サービスは高校生を主な対象としています。
        未成年の方が当団体にお問い合わせをされる場合、
        または当団体が主催するプログラムへ参加される場合は、
        あらかじめ保護者の方の同意を得てください。
      </P>

      <H2 n="第11条">本規約の変更</H2>
      <P>
        当団体は、必要と判断した場合、利用者に通知することなく本規約を変更することができます。
        変更後の規約は、当ページに掲載した時点から効力を生じます。
        変更後に本サービスをご利用いただいた場合、変更後の規約に同意したものとみなします。
      </P>

      <H2 n="第12条">準拠法および管轄</H2>
      <P>
        本規約の解釈および適用は日本法に準拠します。
        本サービスに関して紛争が生じた場合は、当団体の所在地を管轄する裁判所を
        第一審の専属的合意管轄裁判所とします。
      </P>

      <H2 n="第13条">お問い合わせ</H2>
      <P>
        本規約に関するご質問は、
        <a
          href={`mailto:${ORG.email}`}
          className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1 break-all"
        >
          {ORG.email}
        </a>
        または
        <button
          onClick={() => setCurrentPage('contact')}
          className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1"
        >
          お問い合わせページ
        </button>
        よりご連絡ください。
      </P>

      <div className="mt-16 pt-8 border-t border-slate-100">
        <p className="text-xs font-bold text-slate-400 tracking-wider">
          制定日：2026年8月29日
        </p>
        <p className="text-xs font-bold text-slate-400 tracking-wider mt-1.5">
          最終改定日：2026年8月29日
        </p>
      </div>
    </div>
  </PageShell>
);

export default TermsPage;
