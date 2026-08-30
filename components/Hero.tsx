import React from 'react';
import { ArrowRight, ChevronDown, ImageOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageType } from '../types';
import { DIVISIONS } from '../content/site';
import { resolveIcon } from './ui/Blocks';

interface HeroProps {
  setCurrentPage: (page: PageType) => void;
}

/**
 * トップページの冒頭。
 *
 * [重要] 装飾方針
 *   ・絵文字は使用しません（目印が必要な場合は lucide-react のアイコンを使う）。
 *   ・ランダム生成の浮遊図形・波アニメーション・巨大なぼかし円などの
 *     意味のない装飾は置きません。伝えるべき情報だけを配置します。
 *   ・見出しはグラデーション切り抜きや極端なウェイトを使わず、
 *     文字サイズと余白で階層を作ります。
 */
const Hero: React.FC<HeroProps> = ({ setCurrentPage }) => {
  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  /*
    活動の様子（実際の写真）。

    [重要] 画像は public/images/ に置いて自サイトから配信します。
      以前は Google ドライブの共有URL（lh3.googleusercontent.com）を
      直接参照していましたが、
        ・アクセス集中時にブラウザ側で配信がブロックされる
        ・ファイルの共有設定が変わると無断で表示されなくなる
        ・画像サイズが最適化されず通信量が大きい
      という問題があるため、リポジトリ管理の静的ファイルに移しました。

    alt 文は「何が写っているか」を具体的に書きます
    （画像が表示できない環境や音声読み上げでも内容が伝わるようにするため）。

    width / height は実寸を指定します。読み込み前でも領域が確保され、
    表示中にレイアウトが飛ぶ現象（CLS）を防げます。

    position は切り抜きの注視点です。枠の縦横比に合わせて余分が切られる際、
    既定の中央基準だと主題（板書・手元）が外れることがあるため個別に指定します。
  */
  const photos = [
    {
      src: '/images/activity-chemistry-class.jpg',
      alt: '教室で化学の授業を受ける高校生たち。黒板には酸と塩基の反応式が書かれている',
      width: 1477,
      height: 1108,
      position: 'center 40%',
    },
    {
      src: '/images/activity-blackboard.jpg',
      alt: '黒板に整理された、酸と塩基の中和反応のパターン一覧',
      width: 1600,
      height: 900,
      position: 'center',
    },
    {
      // 縦長写真。中央基準だと手前の人物の後頭部が主役になってしまうため、
      // 実験の器具と記録用紙が写る上寄りを注視点にします。
      src: '/images/activity-experiment.jpg',
      alt: '「黒インクは何色でできているだろう」という問いに取り組み、ペーパークロマトグラフィーの結果を記録する生徒',
      width: 1200,
      height: 1600,
      position: 'center 28%',
    },
  ];

  /*
    万一の読み込み失敗時に、壊れた画像アイコンと左寄せの alt 文字で
    体裁が崩れるのを防ぎ、その枠だけを控えめなプレースホルダにします。
  */
  const [broken, setBroken] = React.useState<Record<number, boolean>>({});
  const markBroken = (i: number) => setBroken((prev) => ({ ...prev, [i]: true }));

  return (
    <section className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 border-b border-line overflow-hidden">
      {/*
        背景。ぼかし円ではなく、ごく薄いグリッドと上下のグラデーションで
        「奥行き」だけを与えます（意味のない図形は置きません）。
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #E3E8EF 1px, transparent 1px), linear-gradient(to bottom, #E3E8EF 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse 80% 55% at 50% 0%, #000 40%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 55% at 50% 0%, #000 40%, transparent 100%)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sunken to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 xl:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-accent mb-6 py-1.5 px-3 rounded-full bg-blue-50 border border-blue-100">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              3つの活動の総称・公式サイト
            </p>

            <h1 className="text-[44px] sm:text-[58px] lg:text-[68px] font-bold tracking-[-0.02em] leading-[1.15] text-ink-strong mb-4">
              学びの扉
            </h1>

            <p className="text-[18px] sm:text-[21px] font-medium text-brand mb-7">
              ～私たちにできることを～
            </p>

            <p className="text-[17px] sm:text-[18px] text-ink-body leading-[1.9] max-w-xl mb-8">
              「学びの扉」は、学びをきっかけに人の可能性を広げる
              <strong className="font-bold text-ink-strong">3つの活動の総称</strong>です。
            </p>

            {/* 3つの活動（アイコンは lucide-react、絵文字は使いません） */}
            <ul className="space-y-2.5 mb-7 max-w-xl">
              {DIVISIONS.map((d, i) => (
                <motion.li
                  key={d.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
                  className="flex items-start gap-3.5 p-3 rounded-lg border border-line bg-white/70 shadow-sm"
                >
                  <span
                    aria-hidden="true"
                    className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-brand-accent flex items-center justify-center shrink-0"
                  >
                    {resolveIcon(d.icon, 'w-4 h-4')}
                  </span>
                  <span className="text-[15.5px] leading-[1.6] pt-0.5">
                    <span className="block font-bold text-ink-strong">{d.name}</span>
                    <span className="block text-[14px] text-ink-muted mt-0.5">{d.kind}</span>
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="text-[14px] text-ink-muted leading-[1.85] max-w-xl mb-8">
              ※ 上記3つの活動は、資金・会計・運営をそれぞれ独立して行っています。
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5">
              <button
                onClick={() => setCurrentPage('about')}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-brand text-white rounded-lg font-bold text-[15.5px] shadow-md hover:bg-brand-hover hover:shadow-lg transition-all duration-200 active:translate-y-px"
              >
                学びの扉とは
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>
              <button
                onClick={() => setCurrentPage('learning-app')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white border border-line-strong text-brand rounded-lg font-bold text-[15.5px] hover:border-brand hover:bg-sunken transition-all duration-200 active:translate-y-px"
              >
                学習アプリを見る
              </button>
            </div>
          </motion.div>

          {/*
            活動写真。同じ大きさで3枚並べると平板になるため、
            1枚を主役（大）＋2枚を従（小）にして視線の順序を作ります。
          */}
          <div className="grid grid-cols-2 gap-3.5">
            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-2 overflow-hidden rounded-xl border border-line bg-sunken shadow-md"
            >
              {broken[0] ? (
                <div className="w-full aspect-[16/10] flex items-center justify-center bg-sunken">
                  <ImageOff aria-hidden="true" className="w-7 h-7 text-line-strong" />
                  <span className="sr-only">{photos[0].alt}</span>
                </div>
              ) : (
                <img
                  src={photos[0].src}
                  alt={photos[0].alt}
                  width={photos[0].width}
                  height={photos[0].height}
                  loading="eager"
                  decoding="async"
                  onError={() => markBroken(0)}
                  style={{ objectPosition: photos[0].position }}
                  className="w-full h-full object-cover aspect-[16/10]"
                />
              )}
            </motion.figure>

            {photos.slice(1).map((photo, idx) => (
              <motion.figure
                key={photo.src}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden rounded-xl border border-line bg-sunken shadow-sm"
              >
                {broken[idx + 1] ? (
                  <div className="w-full aspect-[4/3] flex items-center justify-center bg-sunken">
                    <ImageOff aria-hidden="true" className="w-6 h-6 text-line-strong" />
                    <span className="sr-only">{photo.alt}</span>
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                    onError={() => markBroken(idx + 1)}
                    style={{ objectPosition: photo.position }}
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                )}
              </motion.figure>
            ))}
          </div>
        </div>

        {/* 続きへの導線 */}
        <div className="mt-14 sm:mt-16 flex justify-center">
          <button
            onClick={scrollToAbout}
            className="group inline-flex flex-col items-center gap-1.5 text-[14px] font-medium text-ink-muted hover:text-brand transition-colors"
          >
            学びの扉について
            <ChevronDown
              size={16}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
