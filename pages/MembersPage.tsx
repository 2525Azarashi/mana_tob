import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import {
  SectionTitle,
  Prose,
  Card,
  DefinitionList,
  NoteBox,
  CTAButton,
} from '../components/ui/Blocks';
import { StructureNote } from '../components/ui/DivisionNotice';
import { TEAMS, ORG, DIVISIONS } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

/**
 * 運営体制ページ。
 *
 * ⚠ 個人が特定できる情報（氏名・所属学部・写真など）は掲載しません。
 *   大学への確認と本人の同意が必要なため、担当している役割のみを公開しています。
 *   許可が取れるまで、この方針を変更しないでください。
 */
const MembersPage: React.FC<Props> = ({ setCurrentPage }) => (
  <PageShell
    page="members"
    emoji="👥"
    title="運営体制"
    titleEn="Organization"
    lead="学びの扉は、資金・会計・運営がそれぞれ独立した3つの活動から成り立っています。それぞれの活動が何を担当しているのかを明示しておくことは、私たちの活動に対する責任の所在を示すことでもあると考えています。"
    setCurrentPage={setCurrentPage}
  >
    {/* 組織構成 */}
    <section className="mb-16">
      <SectionTitle label="Structure">組織構成</SectionTitle>
      <Prose className="mb-8">
        <p>
          「学びの扉」は総称です。その下に、学習サービスを開発・運営する
          <strong>学びの扉アプリ</strong>、三重大学で探究に取り組む
          <strong>学生学修コミュニティ「まなとび」</strong>、楽曲を制作する
          <strong>音楽活動「まなとび。」</strong>という3つの活動が並列で存在します。
        </p>
        <p>
          同じ名前を用いていますが、資金の面からもこれらは別の活動として運営しています。
          会計は活動ごとに独立して管理しており、一方の活動が他方の責任を負うものではありません。
        </p>
      </Prose>
      <StructureNote setCurrentPage={setCurrentPage} />
    </section>

    {/* 活動ごとの担当 */}
    <section className="mb-16">
      <SectionTitle label="Teams">活動ごとの担当</SectionTitle>

      {DIVISIONS.map((d) => {
        const teams = TEAMS.filter((t) => t.division === d.id);
        if (teams.length === 0) return null;

        return (
          <div key={d.id} className="mb-12">
            <button
              onClick={() => setCurrentPage(d.id as PageType)}
              className="group flex items-center gap-3 mb-6 text-left"
            >
              <span aria-hidden="true" className="text-xl">
                {d.emoji}
              </span>
              <span className="text-lg font-black text-[#0A3D62] group-hover:text-blue-700 transition-colors">
                {d.name}
              </span>
              <ArrowRight
                size={15}
                className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all"
              />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {teams.map((t, i) => (
                <Card key={t.role} delay={i * 0.05} className="p-7">
                  <p className="text-[10px] font-black tracking-[0.28em] text-blue-500 uppercase mb-3">
                    {t.roleEn}
                  </p>
                  <h3 className="text-base font-black text-[#0A3D62] mb-1.5">
                    {t.role}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold mb-4">
                    {t.scale}
                  </p>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">
                    {t.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </section>

    {/* 個人情報の公開方針 */}
    <section className="mb-16">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
        <div className="flex items-start gap-3.5">
          <span className="w-8 h-8 rounded-xl bg-white text-[#0A3D62] flex items-center justify-center shrink-0 border border-slate-200">
            <ShieldCheck size={16} />
          </span>
          <div>
            <p className="text-sm font-black text-[#0A3D62] mb-2.5">
              メンバーの個人情報について
            </p>
            <p className="text-[14px] text-slate-600 font-light leading-relaxed mb-3">
              学びの扉は学生が主体となって活動しています。メンバーの氏名・所属学部・写真などの
              個人が特定できる情報の公開には、所属大学への確認および本人の同意が必要となるため、
              現時点では掲載しておりません。
            </p>
            <p className="text-[14px] text-slate-600 font-light leading-relaxed">
              運営の責任の所在については、上記のとおり活動ごとの担当領域を公開しています。
              団体としての確認が必要な事項については、お問い合わせ窓口より承ります。
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* 運営情報 */}
    <section className="mb-16">
      <SectionTitle label="Operation">運営に関する情報</SectionTitle>
      <DefinitionList
        items={[
          { label: '名称', value: `${ORG.name}（3つの活動の総称）` },
          {
            label: '活動区分',
            value:
              '学びの扉アプリ（学習サービスの開発・運営）／学生学修コミュニティ「まなとび」（三重大学での探究活動）／音楽活動「まなとび。」（楽曲制作）',
          },
          { label: '活動開始', value: ORG.founded },
          { label: '活動拠点', value: ORG.base },
          {
            label: '会計',
            value:
              '3つの活動それぞれで独立して管理しています。活動間で資金を共有していません。',
          },
          {
            label: '意思決定',
            value: '各活動の運営メンバーの合議によって、活動ごとに決定しています。',
          },
          {
            label: '活動資金',
            value:
              'メンバーによる自主的な負担、および活動に対する支援によって運営しています。教材・サービスの利用者から費用を徴収することはありません。',
          },
          {
            label: '広告掲載',
            value:
              'サイト運営費（サーバー費用等）に充てるため、当サイトおよび一部サービスに広告を掲載する場合があります。掲載内容が教材の内容に影響することはありません。',
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
        ]}
      />
    </section>

    {/* 参加について */}
    <NoteBox title="メンバー募集について">
      <p>
        学びの扉では、教材制作・プログラム運営・Web開発に関わる学生メンバーを随時募集しています。
        教育学部でなくても、教職志望でなくても構いません。
        「地方の高校生の学習環境をなんとかしたい」という問題意識を共有できる方であれば歓迎します。
      </p>
      <p>
        ご関心のある方は、お問い合わせページまたは Instagram（{ORG.instagramHandle}
        ）のDMからご連絡ください。関心のある活動（学びの扉アプリ／学生学修コミュニティ／音楽活動）
        をお知らせいただけると助かります。
      </p>
    </NoteBox>

    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      <CTAButton onClick={() => setCurrentPage('contact')}>
        お問い合わせ
        <ArrowRight size={15} />
      </CTAButton>
      <CTAButton variant="outline" onClick={() => setCurrentPage('about')}>
        学びの扉とは
      </CTAButton>
    </div>
  </PageShell>
);

export default MembersPage;
