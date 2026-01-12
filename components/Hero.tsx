
import React from 'react';
import { Zap, Globe, Cpu, CheckCircle, Activity, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const scrollToMaterials = () => {
    document.getElementById('materials-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToManifesto = () => {
    document.getElementById('manifesto-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // 回転する六角形のデータを生成（奥行き感のための設定を追加）
  const floatingHexagons = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: 40 + Math.random() * 160,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 20 + Math.random() * 30,
    delay: i * -3,
    opacity: 0.02 + Math.random() * 0.06,
    blur: Math.random() > 0.7 ? 'blur(2px)' : 'none', // 一部をぼかして奥行きを出す
    zIndex: Math.random() > 0.5 ? 0 : -1
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
      {/* 背景装飾レイヤー */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* 回転する正六角形アニメーションレイヤー */}
        <div className="absolute inset-0 z-0">
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
                filter: hex.blur,
                zIndex: hex.zIndex
              }}
              animate={{
                rotate: [0, 360],
                y: [0, -60, 0],
                x: [0, 30, 0],
              }}
              transition={{
                duration: hex.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <path
                  d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z"
                  fill="none"
                  stroke="#1976D2"
                  strokeWidth="1.2"
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* 幾何学的リニアウェーブ（線形の波） */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg width="100%" height="100%" className="overflow-visible">
            {[...Array(16)].map((_, i) => (
              <motion.path
                key={i}
                d={`M -100 ${250 + i * 12} L 350 ${200 + i * 18} L 750 ${320 + i * 8} L 1150 ${250 + i * 22} L 1700 ${300 + i * 12}`}
                fill="none"
                stroke={`rgba(25, 118, 210, ${0.05 + i * 0.012})`}
                strokeWidth="0.4"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  d: [
                    `M -100 ${250 + i * 12} L 350 ${200 + i * 18} L 750 ${320 + i * 8} L 1150 ${250 + i * 22} L 1700 ${300 + i * 12}`,
                    `M -100 ${270 + i * 12} L 400 ${180 + i * 18} L 800 ${340 + i * 8} L 1100 ${230 + i * 22} L 1700 ${320 + i * 12}`,
                    `M -100 ${250 + i * 12} L 350 ${200 + i * 18} L 750 ${320 + i * 8} L 1150 ${250 + i * 22} L 1700 ${300 + i * 12}`
                  ]
                }}
                transition={{ 
                  duration: 10 + i * 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
        </div>
        
        {/* グラデーションオーブ */}
        <div className="absolute top-[-10%] right-[-10%] w-[900px] h-[900px] bg-blue-50 opacity-40 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-sky-50 opacity-30 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 xl:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8 lg:space-y-10"
          >
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center px-5 py-1.5 bg-blue-50/80 backdrop-blur-sm border border-blue-100 rounded-full text-blue-700 text-[10px] font-black tracking-[0.4em] uppercase"
              >
                <Activity size={14} className="mr-3" />
                Intelligence & Strategy
              </motion.div>
              
              <div className="flex flex-col">
                <h1 className="text-6xl sm:text-7xl lg:text-[7.5rem] xl:text-[9.5rem] font-black leading-[1.05] tracking-tighter text-[#0A3D62] whitespace-nowrap">
                  学びの<span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400 drop-shadow-sm">扉</span>
                </h1>
              </div>
              
              <div className="space-y-4">
                <p className="text-xl lg:text-2xl xl:text-3xl text-blue-500 font-black font-playfair italic tracking-tight">
                  ～私たちにできることを～
                </p>
                <div className="h-1.5 w-24 lg:w-32 bg-gradient-to-r from-blue-600 via-blue-400 to-transparent rounded-full"></div>
              </div>
              
              <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-600 leading-snug max-w-2xl font-black tracking-tight">
                参考書では届かない「核心」を。<br className="hidden md:block" />
                最短ルートで合格へ導く知恵の拠点。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.button 
                whileHover={{ scale: 1.05, y: -4, shadow: "0 25px 60px rgba(10, 61, 98, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToMaterials}
                className="px-10 py-5 bg-[#0A3D62] text-white rounded-2xl font-black transition-all flex items-center justify-center text-lg xl:text-xl shadow-2xl"
              >
                教材を見る
                <Zap size={22} className="ml-3 text-cyan-300 fill-cyan-300" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -4, bg: "#f8fafc" }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToManifesto}
                className="px-10 py-5 bg-white border-2 border-slate-100 text-[#0A3D62] rounded-2xl font-bold transition-all flex items-center justify-center text-lg xl:text-xl shadow-sm"
              >
                詳しく知る
              </motion.button>
            </div>
          </motion.div>
          
          {/* 右側の近未来UIカード */}
          <div className="relative h-[600px] xl:h-[700px] hidden lg:flex items-center justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-[420px] xl:max-w-[480px] h-[580px] xl:h-[650px] bg-white rounded-[4rem] xl:rounded-[5rem] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.12)] border border-slate-50 overflow-hidden flex flex-col"
            >
              {/* カード内ヘッダー */}
              <div className="p-8 xl:p-12 pb-0 flex justify-between items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-slate-100"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-100"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-100"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[9px] font-black text-slate-300 tracking-[0.2em] uppercase">Status</span>
                  <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black border border-blue-100 flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    ACTIVE
                  </div>
                </div>
              </div>

              {/* メインビジュアル */}
              <div className="px-8 xl:px-12 pt-8 xl:pt-12 pb-6 flex-grow space-y-8 xl:space-y-12">
                <div className="relative rounded-[2.5rem] xl:rounded-[3.5rem] overflow-hidden shadow-2xl h-48 xl:h-60 group">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" 
                    alt="Network" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/10 to-transparent flex items-end p-6 xl:p-10">
                    <div>
                      <h3 className="text-white text-2xl xl:text-3xl font-black mb-1 xl:mb-2 italic tracking-tighter">核心を突く。</h3>
                      <p className="text-blue-100/80 text-[10px] xl:text-xs font-medium tracking-wide">膨大なデータから抽出されたエッセンスを武器に。</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 xl:gap-8">
                  <div className="p-5 xl:p-8 bg-slate-50/50 rounded-[2rem] xl:rounded-[3rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-300">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 bg-blue-100 text-blue-600 rounded-xl xl:rounded-2xl flex items-center justify-center mb-4 xl:mb-6">
                      <Cpu size={20} />
                    </div>
                    <div className="text-2xl xl:text-3xl font-black text-[#0A3D62]">98%</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Accuracy</div>
                  </div>
                  <div className="p-5 xl:p-8 bg-slate-50/50 rounded-[2rem] xl:rounded-[3rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-300">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 bg-cyan-100 text-cyan-600 rounded-xl xl:rounded-2xl flex items-center justify-center mb-4 xl:mb-6">
                      <Globe size={20} />
                    </div>
                    <div className="text-2xl xl:text-3xl font-black text-[#0A3D62]">FAST</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Delivery</div>
                  </div>
                </div>
              </div>

              {/* カードフッター */}
              <div className="p-8 xl:p-12 pt-0 flex items-center justify-between border-t border-slate-50 mt-auto">
                <div className="flex items-center space-x-3 xl:space-x-4">
                  <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl xl:rounded-2xl bg-[#0A3D62] flex items-center justify-center shadow-lg shadow-blue-900/20">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] xl:text-[10px] font-black text-[#0A3D62] uppercase tracking-[0.2em] italic">Official Verified</span>
                  </div>
                </div>
                <div className="text-[9px] font-black text-slate-200">VER. 3.0.2</div>
              </div>
            </motion.div>

            {/* フローティング・バッジ */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-4 -left-4 w-24 h-24 xl:w-28 xl:h-28 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[2rem] xl:rounded-[2.5rem] shadow-xl z-20 flex items-center justify-center text-white"
            >
              <Activity size={32} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* スクロールを促す矢印UI */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-1 cursor-pointer"
        onClick={() => document.getElementById('manifesto-section')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] font-black text-[#0A3D62] tracking-[0.4em] uppercase opacity-40">Scroll to Detail</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#0A3D62] opacity-40"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
