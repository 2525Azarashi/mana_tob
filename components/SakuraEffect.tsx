import React, { useMemo } from 'react';

/**
 * 背景に舞う桜の花びら。
 *
 * [重要] サイトの季節感・情緒を担う装飾です。削除しないでください。
 *   スタイルは index.html の `.sakura-container` / `.sakura` にあります。
 *
 * 実装上の注意:
 *   花びらの位置や速度は useMemo で「最初の1回だけ」決めています。
 *   以前は描画のたびに Math.random() を呼んでいたため、
 *   ページを切り替えるなどで再描画が起きるたびに花びらが
 *   別の位置へワープしてしまう不具合がありました。
 *
 *   aria-hidden を付けて読み上げの対象から外します
 *   （内容を持たない純粋な装飾のため）。
 */
const PETAL_COUNT = 15;

const SakuraEffect: React.FC = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }, (_, id) => {
        const size = 10 + Math.random() * 15;
        return {
          id,
          left: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 5 + Math.random() * 10,
          size,
        };
      }),
    []
  );

  return (
    <div className="sakura-container" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.8}px`,
          }}
        />
      ))}
    </div>
  );
};

export default SakuraEffect;
