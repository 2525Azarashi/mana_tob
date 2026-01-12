
import React from 'react';
import { Zap, Activity, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const scrollToMaterials = () => {
    document.getElementById('materials-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToManifesto = () => {
    document.getElementById('manifesto-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // 六角形のエフェクト用データ
  const floatingHexagons = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: 40 + Math.random() * 120,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 15 + Math.random() * 20,
    delay: i * -2,
    opacity: 0.08 + Math.random() * 0.12,
  }));

  // 背景の青系統カラーパレット
  const waveColors = [
    'rgba(10, 61, 98, 0.25)',   // Deep Blue
    'rgba(25, 118, 210, 0.18)', // Primary Blue
    'rgba(14, 165, 233, 0.15)', // Sky Blue
    'rgba(34, 211, 238, 0.12)', // Cyan
  ];

  // 指定された画像URL
  const images = [
    "https://lh3.googleusercontent.com/d/1gY-_SEjojvO9SxzywBSv8uerfno6jROB",
    "https://lh3.googleusercontent.com/d/1STNihBrECkAcQWXt1emdt21QFvCPfxG7",
    "https://lh3.googleusercontent.com/d/11St0QtJeEZ1UzhIYK9sHEANvcW9EeH4H"
  ];

  // アルバム風の回転角度と配置
  const albumStyles = [
    { rotate: 'rotate-2', x: '15px', y: '0px' },
    { rotate: '-rotate-3', x: '-15px', y: '-5px' },
    { rotate: 'rotate-1', x: '10px', y: '0px' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
      {/* 背景装飾レイヤー (背面) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* 浮遊する青い六角形 */}
        {floatingHexagons.map((hex) => (
          <motion.div
            key={hex.id}
            style={{
              position: 'absolute',
              left: hex.left,
              top: hex.top,
              width: hex.size,
              height: hex.size,
              opacity: hex.opacity,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -60, 0],
              x: [0, 30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: hex.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <path d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" fill="none" stroke="#0A3D62" strokeWidth="2" />
            </svg>
          </motion.div>
        ))}

        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[600px] h-[600px] bg-cyan-100/30 rounded-full blur-[130px]"></div>
      </div>

      {/* 前面に重なるウェーブアニメーション (z-20に配置) */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none opacity-60">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="overflow-visible">
          {[...Array(32)].map((_, i) => (
            <motion.path
              key={i}
              d={`M -200 ${1200 - i * 20} Q ${300 + i * 10} ${700 - i * 15} 500 500 T ${1200} ${-200 + i * 20}`}
              fill="none"
              stroke={waveColors[i % waveColors.length]}
              strokeWidth={1.2 + (i % 6) * 0.8}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                d: [
                  `M -200 ${1200 - i * 20} Q ${300 + i * 10} ${700 - i * 15} 500 500 T ${1200} ${-200 + i * 20}`,
                  `M -150 ${1250 - i * 20} Q ${350 + i * 10} ${650 - i * 15} 550 450 T ${1250} ${-150 + i * 20}`,
                  `M -200 ${1200 - i * 20} Q ${300 + i * 10} ${700 - i * 15} 500 500 T ${1200} ${-200 + i * 20}`
                ]
              }}
              transition={{ 
                duration: 12 + (i % 10), 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.1
              }}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-6 overflow-visible">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-1 bg-blue-50/90 backdrop-blur-sm border border-blue-100 rounded-full text-blue-800 text-[10px] font-black tracking-[0.4em] uppercase"
              >
                <Activity size={12} className="mr-3 text-blue-500" />
                Intelligence & Strategy
              </motion.div>
              
              <div className="flex flex-col overflow-visible">
                <h1 
                  className="text-6xl sm:text-7xl lg:text-[7.5rem] xl:text-[9rem] font-black leading-[1.3] tracking-tighter text-[#0A3D62] whitespace-nowrap py-4 pr-12 overflow-visible"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  学びの<span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400 italic pr-2">扉</span>
                </h1>
              </div>
              
              <div className="space-y-4">
                <p className="text-xl lg:text-2xl xl:text-3xl text-blue-600 font-black italic tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ～私たちにできることを～
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
              </div>
              
              <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-snug max-w-2xl font-medium tracking-tight">
                参考書では届かない「核心」を。<br className="hidden md:block" />
                最短ルートで合格へ導く、知恵の拠点。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToMaterials}
                className="px-12 py-5 bg-[#0A3D62] text-white rounded-2xl font-black transition-all flex items-center justify-center text-lg shadow-[0_20px_40px_rgba(10,61,98,0.2)] hover:shadow-[0_25px_60px_rgba(10,61,98,0.3)]"
              >
                教材を見る
                <Zap size={20} className="ml-3 text-cyan-300 fill-cyan-300" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -4, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToManifesto}
                className="px-12 py-5 bg-white border border-slate-200 text-[#0A3D62] rounded-2xl font-bold transition-all flex items-center justify-center text-lg shadow-sm"
              >
                詳しく知る
              </motion.button>
            </div>
          </motion.div>
          
          {/* アルバム風画像レイアウト (ポラロイドスタイル & わずかな透過) */}
          <div className="relative flex flex-col items-center gap-4 lg:pl-10">
            {images.map((url, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={{ 
                  opacity: 0.85, // わずかに透過
                  y: 0, 
                  rotate: parseInt(albumStyles[idx].rotate.replace('rotate-', '').replace('-rotate-', '-')) 
                }}
                transition={{ duration: 1, delay: 0.5 + idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  opacity: 1, // ホバー時は不透明に
                  scale: 1.04, 
                  rotate: 0, 
                  zIndex: 50,
                  transition: { duration: 0.4 }
                }}
                style={{ 
                  transform: `translateX(${albumStyles[idx].x}) translateY(${albumStyles[idx].y})` 
                }}
                className="relative p-4 pb-16 bg-white rounded-sm shadow-[0_15px_45px_-10px_rgba(0,0,0,0.12)] border border-slate-100 group cursor-pointer w-full max-w-[400px]"
              >
                <div className="aspect-[16/9] overflow-hidden bg-slate-50 border border-slate-50">
                  <img 
                    src={url} 
                    alt={`Memory ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-4 left-0 w-full flex justify-center">
                  <div className="h-0.5 w-1/4 bg-slate-100 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
        onClick={scrollToManifesto}
      >
        <span className="text-[8px] font-black text-[#0A3D62] tracking-[0.5em] uppercase mb-2">Discovery</span>
        <ChevronDown size={20} className="text-[#0A3D62]" />
      </motion.div>
    </section>
  );
};

export default Hero;
