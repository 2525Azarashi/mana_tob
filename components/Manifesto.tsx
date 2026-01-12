
import React from 'react';
import { motion, Variants } from 'framer-motion';

const Manifesto: React.FC = () => {
  // Define container variants with explicit typing to resolve TypeScript errors
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // Define item variants with explicit typing and 'as const' for the cubic-bezier array
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="manifesto-section" className="py-40 bg-white relative overflow-hidden">
      {/* 装飾的な背景テキスト */}
      <div 
        className="absolute top-20 left-[-5%] text-[20rem] font-black text-slate-50 pointer-events-none select-none italic leading-none opacity-40 z-0"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Vision
      </div>

      {/* 指定された半透過背景画像 */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <img 
          src="https://lh3.googleusercontent.com/d/1pCsrB9neAJ5m9oay8VuuL74VSZ8SkZyw" 
          alt="Philosophy Background" 
          className="w-full h-full object-cover opacity-[0.08] mix-blend-multiply"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="text-xs font-black tracking-[0.5em] text-blue-600 uppercase mb-6 block">Philosophy</span>
            <h2 
              className="text-5xl md:text-7xl font-black text-[#0A3D62] leading-[1.1] tracking-tighter"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              教育の格差を、<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400">Wisdom</span> で越える。
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:max-w-md pb-4"
          >
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              受験勉強をこれから頑張ろう、良い志望校に行きたい。そんな方々のためにこのサイトを立ち上げました。私たちが自身の経験と後悔から紡ぎ出した「知恵の結晶」をここに公開します。
            </p>
          </motion.div>
        </div>

        {/* 作成者の想い (メインストーリー) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 p-10 md:p-16 bg-white/40 backdrop-blur-sm rounded-[4rem] border border-blue-100"
        >
          <div className="max-w-4xl mx-auto space-y-10">
            <h3 className="text-3xl font-black text-[#0A3D62] italic border-l-4 border-blue-600 pl-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Message from Creator
            </h3>
            
            <div className="prose prose-blue text-slate-700 text-lg leading-relaxed font-medium space-y-8">
              <section className="space-y-4">
                <p>
                  このサイトは、世の中の受験生全員が利用できるものではありません。お世話になった方や関わりのあった方にこそ利用してほしいという思いがあります。それだけ自信をもって教材を作っています。質問もフォームから受け付けています。このプリント外のことでも、できる限り答えたいなと思います。
                </p>
              </section>

              <section className="space-y-4">
                <h4 className="text-xl font-black text-[#0A3D62]">〈市販の参考書のほうがいいんじゃないの？〉</h4>
                <p>
                  基本的に、市販の参考書で事が済む教科や単元のものは制作していません。例えば物理なら『物理のエッセンス』をしておけば良いわけで、わざわざ作るメリットがないからです。
                </p>
                <p>
                  この教材は、「世の中にこのような参考書があればもう少し点数がとれたのに」「これがあれば暗記が効率的にでき、勉強時間が短縮できるよな」という、自分たちの経験に基づいた知恵をもとに作成しています。
                </p>
              </section>

              <section className="space-y-4">
                <p>
                  受験生は皆勉強します。でも、環境や質は人によって違います。塾が深夜まで空いている都会と、10時で閉まる地方。予備校講師の授業を直接受ける都会と、質問もできない映像授業を受ける地方。
                </p>
                <p>
                  「伸び切らない」のは努力の不足ではなく、他教科の効率化が足りず、本当に必要な教科に時間を割けなかったからかもしれません。このプリントを使ったら、この現実が次の世代から変わるかもしれない。その思いで制作を行いました。
                </p>
              </section>

              <p className="bg-white/60 p-8 rounded-3xl border border-blue-100 shadow-sm italic">
                少し自慢になりますが、かつて私が作った倫理や情報のプリントは、参考書を持っている友人からも「貸してほしい」「ちょうだい」と言われるほど評判が良く、内容は保証します。ぜひ利用してください。
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Card 01: The Reality */}
          <motion.div variants={itemVariants} className="group">
            <div className="bg-white/80 backdrop-blur-sm p-12 rounded-[3.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col h-full hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700">
              <div 
                className="italic text-blue-600 font-black text-6xl mb-10 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                01
              </div>
              <h4 
                className="text-2xl font-black text-[#0A3D62] mb-8 tracking-tight flex items-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Reality
                <div className="h-px bg-slate-100 flex-grow ml-4"></div>
              </h4>
              <p className="text-slate-600 leading-relaxed text-base font-medium mb-6">
                都会と地方の環境差。誰もが勉強はしている。けれど「環境や質」の格差が、残酷なまでに結果に反映されてしまう現実。
              </p>
              <p className="text-slate-500 leading-relaxed text-sm font-light mt-auto">
                この現実を受け入れるのか、それとも変えるのか。私たちは後者を選び、次の世代へ知恵を繋ぎます。
              </p>
            </div>
          </motion.div>

          {/* Card 02: Optimization (Offset) */}
          <motion.div variants={itemVariants} className="group md:mt-16">
            <div className="bg-white/80 backdrop-blur-sm p-12 rounded-[3.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col h-full hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700">
              <div 
                className="italic text-blue-600 font-black text-6xl mb-10 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                02
              </div>
              <h4 
                className="text-2xl font-black text-[#0A3D62] mb-8 tracking-tight flex items-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Optimization
                <div className="h-px bg-slate-100 flex-grow ml-4"></div>
              </h4>
              <p className="text-slate-600 leading-relaxed text-base font-medium mb-6">
                市販の参考書で足りるなら、それを使えばいい。ここにあるのは「もっとこうであれば良かった」という現場の知恵です。
              </p>
              <p className="text-slate-500 leading-relaxed text-sm font-light mt-auto italic">
                学習時間を短縮し、本当に時間が必要な教科へ投資する。そのための「最短ルート」を提供します。
              </p>
            </div>
          </motion.div>

          {/* Card 03: The Proof */}
          <motion.div variants={itemVariants} className="group md:mt-32">
            <div className="bg-[#0A3D62]/90 backdrop-blur-sm p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(10,61,98,0.2)] flex flex-col h-full hover:scale-[1.02] transition-all duration-700 text-white">
              <div 
                className="italic text-cyan-400 font-black text-6xl mb-10 opacity-40 group-hover:opacity-100 transition-all duration-700"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                03
              </div>
              <h4 
                className="text-2xl font-black text-white mb-8 tracking-tight flex items-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Quality Verified
                <div className="h-px bg-white/10 flex-grow ml-4"></div>
              </h4>
              <p className="text-blue-100 leading-relaxed text-base font-medium mb-6">
                参考書を持っている友人ですら「そのプリントが欲しい」と求めた、核心を突くクオリティ。
              </p>
              <p className="text-blue-200/70 text-sm font-light mt-auto">
                内容は保証します。受験生の生の声から生まれた、確かな信頼と実績を。
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
