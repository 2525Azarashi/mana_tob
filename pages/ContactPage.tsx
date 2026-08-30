import React, { useState } from 'react';
import {
  Mail,
  Instagram,
  ChevronDown,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { PageType } from '../types';
import PageShell from '../components/ui/PageShell';
import { SectionTitle, Card, NoteBox } from '../components/ui/Blocks';
import { ORG, FAQS } from '../content/site';

interface Props {
  setCurrentPage: (page: PageType) => void;
}

const TOPICS = [
  '教材の内容についての質問',
  '教材の誤りの指摘',
  '学習アプリの不具合報告',
  '学校・団体との連携のご相談',
  '取材のご依頼',
  'メンバー参加の希望',
  'その他',
];

const ContactPage: React.FC<Props> = ({ setCurrentPage }) => {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  /**
   * サーバーを持たない構成のため、mailto でメールクライアントを起動します。
   * （フォーム内容がサーバーに送信されることはありません）
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !body.trim()) {
      setError('お名前とお問い合わせ内容は必須です。');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('メールアドレスの形式をご確認ください。');
      return;
    }

    const subject = `【${topic}】${name} 様よりお問い合わせ`;
    const text = [
      `お名前：${name}`,
      `ご返信先：${email || '（未記入）'}`,
      `ご用件：${topic}`,
      '',
      '── お問い合わせ内容 ──',
      body,
    ].join('\n');

    window.location.href = `mailto:${ORG.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(text)}`;
    setSent(true);
  };

  return (
    <PageShell
      page="contact"
      title="お問い合わせ"
      titleEn="Contact Us"
      lead="教材に関するご質問、誤りのご指摘、学校・団体との連携のご相談、取材のご依頼などを承っています。いただいたご連絡は運営メンバーで確認のうえ返信します。"
      setCurrentPage={setCurrentPage}
    >
      {/* 連絡先 */}
      <section className="mb-20">
        <SectionTitle>連絡先</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Card className="p-8">
            <div className="w-12 h-12 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <p className="text-[12px] font-semibold tracking-[0.08em] text-ink-muted mb-3">
              Email
            </p>
            <a
              href={`mailto:${ORG.email}`}
              className="text-base font-semibold text-ink-strong hover:text-blue-600 transition-colors break-all"
            >
              {ORG.email}
            </a>
            <p className="mt-4 text-xs text-ink-muted leading-[1.85]">
              学生による運営のため、返信までに数日〜1週間ほどお時間をいただく場合があります。
            </p>
          </Card>

          <Card className="p-8" delay={0.07}>
            <div className="w-12 h-12 rounded-md bg-pink-50 text-pink-600 flex items-center justify-center mb-6">
              <Instagram className="w-6 h-6" />
            </div>
            <p className="text-[12px] font-semibold tracking-[0.08em] text-ink-muted mb-3">
              Instagram
            </p>
            <a
              href={ORG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-ink-strong hover:text-blue-600 transition-colors"
            >
              {ORG.instagramHandle}
            </a>
            <p className="mt-4 text-xs text-ink-muted leading-[1.85]">
              活動の最新情報や、プログラムの募集開始をお知らせしています。DMも受け付けています。
            </p>
          </Card>
        </div>
      </section>

      {/* フォーム */}
      <section className="mb-20">
        <SectionTitle label="お問い合わせ内容">お問い合わせフォーム</SectionTitle>

        <Card className="p-8 sm:p-10">
          <p className="text-sm text-ink-muted leading-[1.85] mb-8">
            下記フォームにご入力のうえ「メールを作成する」を押すと、
            入力内容が反映された状態でお使いのメールソフトが起動します。
            内容をご確認のうえ送信してください。
            <span className="block mt-2 text-xs text-ink-muted">
              ※ 入力内容が当サイトのサーバーに保存・送信されることはありません。
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ご用件 */}
            <div>
              <label
                htmlFor="topic"
                className="block text-xs font-semibold text-ink-strong mb-2.5 tracking-wider"
              >
                ご用件 <span className="text-blue-700">*</span>
              </label>
              <select
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-5 py-3.5 bg-sunken border border-line rounded-md text-[15.5px] text-ink-body font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* お名前 */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-ink-strong mb-2.5 tracking-wider"
              >
                お名前 / 学校名・団体名 <span className="text-blue-700">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例）三重県立〇〇高等学校 山田"
                className="w-full px-5 py-3.5 bg-sunken border border-line rounded-md text-[15.5px] text-ink-body focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* メール */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-ink-strong mb-2.5 tracking-wider"
              >
                ご返信先メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-5 py-3.5 bg-sunken border border-line rounded-md text-[15.5px] text-ink-body focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* 内容 */}
            <div>
              <label
                htmlFor="body"
                className="block text-xs font-semibold text-ink-strong mb-2.5 tracking-wider"
              >
                お問い合わせ内容 <span className="text-blue-700">*</span>
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={7}
                placeholder="教材の誤りをご指摘いただく場合は、教材名と問題番号もあわせてご記入いただけると助かります。"
                className="w-full px-5 py-3.5 bg-sunken border border-line rounded-md text-[15.5px] text-ink-body leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {sent && (
              <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                  メールソフトを起動しました。起動しない場合は、お手数ですが
                  <a
                    href={`mailto:${ORG.email}`}
                    className="underline decoration-emerald-300 underline-offset-4 font-bold mx-1"
                  >
                    {ORG.email}
                  </a>
                  宛に直接ご連絡ください。
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-brand text-white rounded-md font-semibold text-sm hover:bg-brand-hover transition-all shadow-md"
            >
              <Send size={16} />
              メールを作成する
            </button>
          </form>
        </Card>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <SectionTitle>よくあるご質問</SectionTitle>

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-md border border-line overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-sunken/70 transition-colors"
              >
                <span className="text-[15.5px] font-semibold text-ink-strong leading-snug">
                  <span className="text-blue-700 mr-2.5">Q.</span>
                  {f.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-ink-muted shrink-0 transition-transform duration-300 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 pt-1 border-t border-slate-50">
                  <p className="text-[15.5px] text-ink-body leading-[1.9]">
                    <span className="font-semibold text-ink-muted mr-2.5">A.</span>
                    {f.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <NoteBox title="ご連絡にあたってのお願い" tone="amber">
        <p>
          学びの扉は学生による運営のため、個別の学習相談・進路相談へのご回答には
          お時間をいただく場合があります。また、内容によってはご返信を差し控える場合があります。
          あらかじめご了承ください。
        </p>
        <p>
          いただいた個人情報は、お問い合わせへの返信および必要な連絡のみに使用します。詳細は
          <button
            onClick={() => setCurrentPage('privacy')}
            className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4 mx-1"
          >
            プライバシーポリシー
          </button>
          をご覧ください。
        </p>
      </NoteBox>
    </PageShell>
  );
};

export default ContactPage;
