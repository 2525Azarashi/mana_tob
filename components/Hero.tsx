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
 * 背景に流れる曲線の色。
 * 背面の装飾なので彩度・不透明度を抑えた青系のみです。
 * [重要] これは当初のサイトで使っていた配色そのものです。変えないでください。
 */
const WAVE_COLORS = [
  'rgba(10, 61, 98, 0.25)', // Deep Blue
  'rgba(25, 118, 210, 0.18)', // Primary Blue
  'rgba(14, 165, 233, 0.15)', // Sky Blue
  'rgba(34, 211, 238, 0.12)', // Cyan
];

/*
  ===== 背景の曲線（当初のデザイン） =====

  [重要] この構図は「当初のサイトのもの」です。作り直さないでください。
    32 本の 2 次ベジェが viewBox の中心 (500 500) を共有し、
    そこで一点に絞られて、砂時計のようにくびれた形になります。
    「学びの扉」の向こう側へ視線が吸い込まれていく情景を作る要素です。

  [重要] 「定規で引いたような直線を扇状に集める」形には戻さないでください。
    数値の上ではどちらも一点で交わりますが、直線の束は
    有機的なうねりが無く、縞模様のように見えて不快でした
    （実際にその状態を出してご指摘をいただいています）。
    やわらかさは Q（2 次ベジェ）の制御点が生む「たわみ」から来ています。

  パスの読み方:
    M -200 y            … 画面左外から始める（端が切れているように見せる）
    Q cx cy 500 500     … 制御点 (cx, cy) でたわませ、中心 (500 500) で終える
    T 1200 y2           … T は「直前の制御点を反転」して滑らかに続ける短縮記法。
                          中心を通り抜けて画面右外へ抜けていきます
    [重要] 終点 500 500 が全 32 本で共通であることが「一点に交わる」の実体です。
      ここの数値を線ごとに変えると収束が崩れます。

  [重要] viewBox="0 0 1000 1000" ＋ preserveAspectRatio="none" のため、
    座標は幅・高さに対する千分率として引き伸ばされます。
    この変形は点を点に移すので、画面上でも交点は 1 点のままです。
*/
const WAVE_COUNT = 32;

/** i 番目の曲線の形。phase 0 が基本形、1 がゆらぎの折り返し地点です。 */
const wavePath = (i: number, phase: 0 | 1) =>
  phase === 0
    ? `M -200 ${1200 - i * 20} Q ${300 + i * 10} ${700 - i * 15} 500 500 T 1200 ${-200 + i * 20}`
    : `M -150 ${1250 - i * 20} Q ${350 + i * 10} ${650 - i * 15} 550 450 T 1250 ${-150 + i * 20}`;

const WAVES = Array.from({ length: WAVE_COUNT }, (_, i) => ({
  color: WAVE_COLORS[i % WAVE_COLORS.length],
  width: 1.2 + (i % 6) * 0.8,
  // d を配列で渡すと framer-motion が形状の間を往復して、ゆらぎになります
  d: [wavePath(i, 0), wavePath(i, 1), wavePath(i, 0)],
}));

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
        [重要] この背景エフェクト（青のぼかし光＋中心で一点に交わる曲線＋薄いグリッド）は
          サイトの世界観を担う要素です。単色の白背景に戻さないでください。
          曲線は viewBox の中心 (500 500) で一点に絞られる構図です
          （詳しくは上の WAVES の説明）。

        可読性への配慮:
          ・すべて aria-hidden + pointer-events-none の純粋な装飾です
          ・曲線は本文より背面（この div = z-0、本文ラッパー = relative z-10）に置き、
            文字の上に重ねません。
            [重要] 当初のコードでは曲線が z-20（本文の前面）にありましたが、
              見出し「学びの扉」の上を何本もの線が横切って読みにくかったため、
              重ね順だけは背面のまま維持しています。前面に戻さないでください。
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

        {/*
          中心で一点に交わる曲線（当初のデザイン）。
          ゆらぎを与えて静止画に見えないようにします。
          preserveAspectRatio="none" で縦横が別々に引き伸ばされますが、
          この変形は「点を点に移す」ため、収束点は画面上でも 1 点のままです。

          [重要] mask で「見出しがある左側だけ」を淡くしています。
            32 本の線は中心へ向かって束になるため、そのままでは見出し
            「学びの扉」の上を何本もの線が横切って読みにくくなります。
            この mask は可読性のためのものなので外さないでください。
            （線を消すのではなく、左側だけ淡くして奥行きは残しています。
              当初の配色は不透明度 0.12〜0.25 と元々淡いので、
              当初のコードにあった opacity-60 の重ねがけはしていません。
              両方かけると線がほとんど見えなくなります。）
        */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          style={{
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 34%, rgba(0,0,0,0.8) 58%, #000 78%)',
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 34%, rgba(0,0,0,0.8) 58%, #000 78%)',
          }}
        >
          {/*
            [重要] ここで pathLength や opacity を repeat: Infinity の
              animate に混ぜないでください。
              当初のコードはそうなっていましたが、
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
                duration: 12 + (i % 10),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.1,
              }}
            />
          ))}
        </svg>

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sunken to-transparent" />
      </div>

      {/*
        [重要] 幅と列比は当初のもの（max-w-7xl / 1.1fr_0.9fr）に戻しています。
          見出しが whitespace-nowrap で「xl:9rem × 4 文字」を折り返さないため、
          左の列にそれだけの幅が必要です。max-w-6xl や 1fr_0.9fr に狭めると
          「扉」が右に溢れて section の overflow-hidden で切られます。
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/*
              [重要] ここに「3つの活動の総称・公式サイト」のような
                丸いバッジ（ピル型のラベル）を置かないでください。
                いかにもテンプレート的で不要と判断して外したものです。
                同じ内容は下のリード文で本文として述べているため、
                情報としても欠けていません。
            */}

            {/*
              ===== サイトの看板「学びの扉」 =====

              [重要] 書体・グラデーションはご本人のご指示で決まっています。
                「もっと上品に」「明朝の方が合う」等のこちらの美観判断で
                作り変えないでください。過去に 2 回差し戻しになっています。

              経緯:
                1. 当初は 'Playfair Display', serif（和文は OS 依存の明朝体）。
                2. 私の判断で明朝体（Zen Old Mincho）に差し替え → 差し戻し。
                3. 当初の指定に復元。
                4. 今回ご指示「扉のグラデーションは濃く、フォントも特徴的に」
                   → 書体を Dela Gothic One、グラデーションを濃色系に変更。

              書体（Dela Gothic One）:
                和文グリフが実在する極太ディスプレイ書体です。
                以前の "'Playfair Display', serif" と違い、
                和文が閲覧者の OS の既定明朝体に落ちる問題は解消しました。
                [重要] ウェイトは 400 のみ存在します。
                  そのため font-black（900）ではなく font-normal を使い、
                  Tailwind の font-* を付けずに fontWeight 400 のままにしています。
                  700/900 を指定すると実体が無く、ブラウザの合成ボールドで
                  極太の輪郭がつぶれて汚くなります。上げないでください。
                [重要] 本文には使わないでください。看板の 1 か所専用です。

              グラデーション（濃色化）:
                旧: from-blue-700 via-blue-500 to-cyan-400
                  → 終端の cyan-400(#22d3ee) が白背景で 1.81:1 しかなく、
                    「扉」の 34.1% のピクセルが 3:1 未満という実測値でした。
                新: from-blue-900 via-blue-700 to-cyan-700
                  → 実測コントラスト（白背景）
                     blue-900 #1e3a8a = 10.36:1
                     blue-700 #1d4ed8 =  6.70:1
                     cyan-700 #0e7490 =  5.36:1
                  最も淡い終端でも 5.36:1 で、WCAG AA の本文基準 4.5:1 すら
                  上回ります。青→シアンの色相変化は残しつつ濃くしました。
                [重要] to-cyan-400 / to-cyan-300 など明るい終端に戻すと
                  可読性が基準未達に戻ります。薄くしないでください。

              はみ出しについて:
                whitespace-nowrap + overflow-visible + py-4 pr-12 は
                「4 文字を絶対に折り返さず、斜体の右肩と発光を切らせない」ための
                当初からの指定です。外すと「扉」の右側が切れます。

              自動検査の限界（申し送り）:
                [重要] この span は text-transparent（＝ color が透明）なので、
                  計算上の文字色を見る自動コントラスト検査は素通りします。
                  検査結果が「0 件」でも未達が無い証明にはなりません。
                  色を変えた際は必ずピクセル実測で確認してください。
            */}
            <h1
              className="text-6xl sm:text-7xl lg:text-[7.5rem] xl:text-[9rem] leading-[1.3] tracking-tighter text-[#0A3D62] whitespace-nowrap py-4 pr-12 overflow-visible"
              style={{ fontFamily: "'Dela Gothic One', 'Noto Sans JP', sans-serif", fontWeight: 400 }}
            >
              学びの
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-700 pr-2">
                扉
              </span>
            </h1>

            <p
              className="text-xl lg:text-2xl xl:text-3xl text-blue-600 font-black italic tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
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
