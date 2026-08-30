import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Beaker,
  Users,
  FileText,
  Star,
  Code,
  ShieldCheck,
  HelpCircle,
  Terminal,
  Zap,
  Heart,
  Target,
  Sparkles,
  GraduationCap,
  Globe,
  Mail,
  Instagram,
  Music,
  Smartphone,
  Home,
  Lightbulb,
  Newspaper,
  BarChart3,
  Scale,
  Map,
  Layers,
} from 'lucide-react';

/* ---------- アイコン解決 ----------
 * 絵文字は使用しません。視覚的な目印が必要な箇所は必ずここ経由で
 * lucide-react のアイコンを使ってください。
 */
export const resolveIcon = (name: string, className = 'w-6 h-6') => {
  const map: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className={className} />,
    Beaker: <Beaker className={className} />,
    Users: <Users className={className} />,
    FileText: <FileText className={className} />,
    Star: <Star className={className} />,
    Code: <Code className={className} />,
    ShieldCheck: <ShieldCheck className={className} />,
    HelpCircle: <HelpCircle className={className} />,
    Terminal: <Terminal className={className} />,
    Zap: <Zap className={className} />,
    Heart: <Heart className={className} />,
    Target: <Target className={className} />,
    Sparkles: <Sparkles className={className} />,
    GraduationCap: <GraduationCap className={className} />,
    Globe: <Globe className={className} />,
    Mail: <Mail className={className} />,
    Instagram: <Instagram className={className} />,
    Music: <Music className={className} />,
    Smartphone: <Smartphone className={className} />,
    Home: <Home className={className} />,
    Lightbulb: <Lightbulb className={className} />,
    Newspaper: <Newspaper className={className} />,
    BarChart3: <BarChart3 className={className} />,
    Scale: <Scale className={className} />,
    Map: <Map className={className} />,
    Layers: <Layers className={className} />,
  };
  return map[name] ?? <BookOpen className={className} />;
};

/* ---------- セクション見出し ----------
 * 見出しは「サイズ差」で階層を作ります。装飾記号・絵文字は付けません。
 * label は任意。見出しと同義になる語は置かないでください。
 */
export const SectionTitle: React.FC<{
  label?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className = '' }) => (
  <div className={`mb-10 ${className}`}>
    {label && (
      <p className="flex items-center gap-2.5 text-[12px] font-bold tracking-[0.08em] text-brand-accent mb-3.5">
        <span aria-hidden="true" className="h-[3px] w-6 rounded-full bg-brand-accent" />
        {label}
      </p>
    )}
    <h2 className="text-[26px] sm:text-[32px] font-bold text-ink-strong tracking-[-0.01em] leading-[1.4]">
      {children}
    </h2>
    <div className="mt-5 h-px w-full bg-line" />
  </div>
);

/* ---------- 本文段落 ----------
 * 日本語の長文は 17px / 行間 1.9 前後がもっとも読みやすいレンジです。
 * 1行が長くなりすぎないよう、呼び出し側で max-w を併用してください。
 */
export const Prose: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`space-y-6 text-[17px] leading-[1.9] text-ink-body ${className}`}
  >
    {children}
  </div>
);

/* ---------- カード ----------
 * ごく浅い影＋ヘアライン境界で「面」を立ち上げます。
 * interactive を渡した場合のみホバーで 2px 浮きます。
 */
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  interactive?: boolean;
}> = ({ children, className = '', delay = 0, interactive = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`bg-white rounded-xl border border-line shadow-sm ${
      interactive ? 'lift hover:border-line-strong' : ''
    } ${className}`}
  >
    {children}
  </motion.div>
);

/* ---------- 定義リスト（団体概要など） ---------- */
export const DefinitionList: React.FC<{
  items: { label: string; value: React.ReactNode }[];
}> = ({ items }) => (
  <dl className="divide-y divide-line border-y border-line">
    {items.map((item, i) => (
      <div
        key={i}
        className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-1.5 sm:gap-8 py-5"
      >
        <dt className="text-[14px] font-bold text-ink-muted pt-1">
          {item.label}
        </dt>
        <dd className="text-[16px] text-ink-body leading-[1.85]">
          {item.value}
        </dd>
      </div>
    ))}
  </dl>
);

/* ---------- バッジ ----------
 * 12px / bold まで上げ、文字色は各系統の 700〜800 番でコントラストを確保します。
 */
export const Badge: React.FC<{
  children: React.ReactNode;
  tone?: 'blue' | 'green' | 'amber' | 'slate';
}> = ({ children, tone = 'blue' }) => {
  const tones = {
    blue: 'bg-blue-50 text-blue-800 border-blue-200/80',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-900 border-amber-200/80',
    slate: 'bg-sunken text-ink-muted border-line-strong/70',
  };
  return (
    <span
      className={`inline-flex items-center text-[12px] font-bold px-2.5 py-1 rounded-md border ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

/* ---------- 注意書き / 補足ボックス ----------
 * 左に色帯を置いて「補足である」ことを一目で分かるようにします。
 */
export const NoteBox: React.FC<{
  title?: string;
  children: React.ReactNode;
  tone?: 'blue' | 'amber';
}> = ({ title, children, tone = 'blue' }) => {
  const styles =
    tone === 'amber'
      ? 'bg-amber-50/60 border-amber-200 before:bg-amber-400'
      : 'bg-sunken border-line before:bg-brand-accent/70';
  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-6 sm:p-7 pl-7 sm:pl-8
        before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:content-[''] ${styles}`}
    >
      {title && (
        <p className="font-bold text-ink-strong mb-2.5 text-[16px]">{title}</p>
      )}
      <div className="text-[15.5px] leading-[1.9] text-ink-body space-y-3">
        {children}
      </div>
    </div>
  );
};

/* ---------- CTA（学習アプリへの導線などに使用） ----------
 * primary は影で前に出し、outline は境界のみ。文字は 15px 以上を確保します。
 */
export const CTAButton: React.FC<{
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  external?: boolean;
}> = ({ href, onClick, children, variant = 'primary', external }) => {
  const cls =
    variant === 'primary'
      ? 'bg-brand text-white shadow-md hover:bg-brand-hover hover:shadow-lg'
      : 'bg-white text-brand border border-line-strong hover:border-brand hover:bg-sunken';
  const base =
    'group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-bold text-[15.5px] ' +
    'transition-all duration-200 active:translate-y-px ' +
    cls;

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={base}
      >
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  );
};
