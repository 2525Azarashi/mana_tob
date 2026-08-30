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
 *   ・背景の青いぼかし光と流れる曲線、そして見出し「学びの扉」の
 *     ブランド青＋グラデーションは、このサイトの世界観を担う要素です。
 *     「装飾を削る」目的で外さないでください。
 *   ・ただし装飾は必ず背面に置き、文字の上に重ねません。可読性を最優先します。
 *     具体的には「背景 = z-0 / 本文ラッパー = relative z-10」で重ね順を作ります。
 *     [重要] 背景に -z-10 は使わないでください。祖先（App の bg-white）より
 *       後ろに回り込んでしまい、背景が一切描画されなくなります（実際に出した不具合）。
 */

/**
 * 背景に流れる曲線。
 * d を配列で渡すと framer-motion が形状の間を往復して、ゆらぎになります。
 * 色は薄い青系のみ（背面の装飾なので彩度・不透明度を抑えています）。
 */
const WAVE_COLORS = [
  'rgba(10, 61, 98, 0.42)',
  'rgba(21, 101, 192, 0.34)',
  'rgba(14, 165, 233, 0.26)',
  'rgba(34, 211, 238, 0.22)',
];

/*
  曲線の座標。
  [重要] viewBox="0 0 1000 1000" の内側に収まる値にしてください。
    元のコードは y が -200〜1250 の範囲で、
    preserveAspectRatio="none" と組み合わせると
    線の大部分が表示領域の外に出てしまい、ほとんど見えませんでした。
    ここでは 0〜1000 の範囲で、画面を斜めに横切るようにしています。
*/
const WAVES = Array.from({ length: 16 }, (_, i) => {
  const y0 = 120 + i * 52; // 左端の高さ
  const y1 = 40 + i * 48; // 右端の高さ
  return {
    color: WAVE_COLORS[i % WAVE_COLORS.length],
    width: 1.1 + (i % 4) * 0.5,
    d: [
      `M -50 ${y0} C 250 ${y0 - 90} 600 ${y1 + 110} 1050 ${y1}`,
      `M -50 ${y0 + 26} C 260 ${y0 - 30} 620 ${y1 + 40} 1050 ${y1 - 24}`,
      `M -50 ${y0} C 250 ${y0 - 90} 600 ${y1 + 110} 1050 ${y1}`,
    ],
  };
});

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
        背景の雰囲気づくり。
        [重要] この背景エフェクト（青のぼかし光＋流れる曲線＋薄いグリッド）は
          サイトの世界観を担う要素です。単色の白背景に戻さないでください。

        可読性への配慮:
          ・すべて aria-hidden + pointer-events-none の純粋な装飾です
          ・曲線は本文より背面（この div = z-0、本文ラッパー = relative z-10）に置き、
            文字の上に重ねません（以前は前面 z-20 に重ねていたため
            見出しの上に線が走っていました）
          ・[重要] ここを -z-10 にすると祖先の白背景より後ろへ回り込み、
            背景がまるごと見えなくなります。z-0 のままにしてください。
          ・不透明度を低く抑え、文字とのコントラストを損ないません
      */}
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-white overflow-hidden">
        {/* 薄いグリッド（奥行き） */}
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

        {/* 青系のぼかし光。ゆっくり呼吸するように明滅します */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[720px] h-[720px] rounded-full bg-blue-100/50 blur-[150px]"
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-15%] left-[-10%] w-[560px] h-[560px] rounded-full bg-cyan-100/40 blur-[130px]"
          animate={{ opacity: [0.45, 0.7, 0.45], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 流れる曲線。ゆらぎを与えて静止画に見えないようにします */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          {/*
            [重要] ここで pathLength や opacity を repeat: Infinity の
              animate に混ぜないでください。
              線が延々と「0から描き直し」を繰り返す状態になり、
              strokeDasharray がごく小さい値のまま固定されて
              ほとんど見えなくなります（実際にその不具合を出しました）。
              繰り返すのは形状（d）のゆらぎだけにします。
          */}
          {WAVES.map((wave, i) => (
            <motion.path
              key={i}
              fill="none"
              stroke={wave.color}
              strokeWidth={wave.width}
              d={wave.d[0]}
              animate={{ d: wave.d }}
              transition={{
                duration: 14 + (i % 7),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.12,
              }}
            />
          ))}
        </svg>

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sunken to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
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

            {/*
              サイトの看板。
              [重要] このブランド表現（ブランド青＋「扉」のグラデーション＋
                Playfair Display）はサイトの第一印象を決める要素です。
                プレーンな黒文字に戻さないでください。

              可読性について:
                グラデーションの色は「大きな文字」の基準（3:1）を
                すべて満たす範囲に収めています。
                  #0A3D62 ブランド青 11.3:1
                  #1E4FD8 →           5.9:1
                  #1565C0 →           5.6:1
                  #0E7490 シアン寄り   4.0:1
                明るい cyan-400（#22d3ee）は白背景で 1.8:1 しかなく
                読めないため使いません。
                また bg-clip-text は文字を透明にする手法なので、
                非対応ブラウザで文字が消えないよう
                フォールバックの色を color で先に指定しています。
            */}
            <h1 className="font-brand text-[44px] sm:text-[58px] lg:text-[68px] font-bold tracking-[-0.01em] leading-[1.2] text-brand mb-4">
              学びの
              <span
                className="italic bg-gradient-to-br from-[#1E4FD8] via-[#1565C0] to-[#0E7490] bg-clip-text"
                style={{ color: '#1565C0', WebkitTextFillColor: 'transparent' }}
              >
                扉
              </span>
            </h1>

            <p className="font-brand text-[18px] sm:text-[21px] font-bold italic tracking-tight text-brand-accent mb-2">
              ～私たちにできることを～
            </p>
            {/* 見出し下のアクセント罫線（ブランド青から透明へ） */}
            <div
              aria-hidden="true"
              className="h-1 w-20 rounded-full bg-gradient-to-r from-brand to-transparent mb-7"
            />

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
