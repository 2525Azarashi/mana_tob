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
} from 'lucide-react';

/* ---------- アイコン解決 ---------- */
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
  };
  return map[name] ?? <BookOpen className={className} />;
};

/* ---------- セクション見出し ---------- */
export const SectionTitle: React.FC<{
  label?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className = '' }) => (
  <div className={`mb-10 ${className}`}>
    {label && (
      <p className="text-[10px] font-black tracking-[0.35em] text-blue-600 uppercase mb-4">
        {label}
      </p>
    )}
    <h2 className="text-2xl sm:text-3xl font-black text-[#0A3D62] tracking-tight leading-snug flex items-start gap-3">
      <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 to-cyan-400 rounded-full shrink-0 mt-1" />
      <span>{children}</span>
    </h2>
  </div>
);

/* ---------- 本文段落 ---------- */
export const Prose: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`space-y-6 text-[17px] leading-[1.95] text-slate-600 font-light ${className}`}
  >
    {children}
  </div>
);

/* ---------- カード ---------- */
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-20px_rgba(10,61,98,0.12)] ${className}`}
  >
    {children}
  </motion.div>
);

/* ---------- 定義リスト（団体概要など） ---------- */
export const DefinitionList: React.FC<{
  items: { label: string; value: React.ReactNode }[];
}> = ({ items }) => (
  <dl className="divide-y divide-slate-100 border-y border-slate-100">
    {items.map((item, i) => (
      <div
        key={i}
        className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 py-5"
      >
        <dt className="text-xs font-black text-slate-400 tracking-wider uppercase pt-1">
          {item.label}
        </dt>
        <dd className="text-base text-slate-700 font-medium leading-relaxed">
          {item.value}
        </dd>
      </div>
    ))}
  </dl>
);

/* ---------- バッジ ---------- */
export const Badge: React.FC<{
  children: React.ReactNode;
  tone?: 'blue' | 'green' | 'amber' | 'slate';
}> = ({ children, tone = 'blue' }) => {
  const tones = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    slate: 'bg-slate-50 text-slate-500 border-slate-200',
  };
  return (
    <span
      className={`inline-block text-[10px] font-black tracking-[0.15em] px-3 py-1.5 rounded-full border uppercase ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

/* ---------- 注意書き / 補足ボックス ---------- */
export const NoteBox: React.FC<{
  title?: string;
  children: React.ReactNode;
  tone?: 'blue' | 'amber';
}> = ({ title, children, tone = 'blue' }) => {
  const styles =
    tone === 'amber'
      ? 'bg-amber-50/60 border-amber-200/70'
      : 'bg-blue-50/50 border-blue-100';
  return (
    <div className={`rounded-[1.75rem] border p-7 sm:p-8 ${styles}`}>
      {title && (
        <p className="font-black text-[#0A3D62] mb-3 text-base">{title}</p>
      )}
      <div className="text-[15px] leading-relaxed text-slate-600 font-light space-y-3">
        {children}
      </div>
    </div>
  );
};

/* ---------- CTA（学習アプリへの導線などに使用） ---------- */
export const CTAButton: React.FC<{
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  external?: boolean;
}> = ({ href, onClick, children, variant = 'primary', external }) => {
  const cls =
    variant === 'primary'
      ? 'bg-[#0A3D62] text-white hover:bg-blue-800 shadow-lg shadow-blue-900/15'
      : 'bg-white text-[#0A3D62] border-2 border-slate-200 hover:border-blue-400';
  const base = `inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-black text-sm transition-all ${cls}`;

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
