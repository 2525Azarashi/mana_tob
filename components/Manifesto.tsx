
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
        className="absolute top-20 left-[-5%] text-[20rem] font-black text-slate-50 pointer-events-none select-none italic leading-none opacity-40"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Vision
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
              都会と地方、環境の不均衡。受験生なら誰もが直面する「時間の壁」。私たちは、自らの後悔と成功の足跡を辿り、その不均衡を打破するための「知恵の結晶」をここに公開します。
            </p>
          </motion.div>
        </div>

        {/* 作成者の想い (メインストーリー) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 p-10 md:p-16 bg-blue-50/50 rounded-[4rem] border border-blue-100"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <h3 className="text-3xl font-black text-[#0A3D62] italic border-l-4 border-blue-600 pl-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Message from Creator
            </h3>
            <div className="prose prose-blue text-slate-700 text-lg leading-relaxed font-medium space-y-6">
              <p>
                自分は受験時代に、最後の最後に点数が伸び切らない教科があったんですけど、（その教科のプリントは作ってないので安心を）その理由ってたぶん、その教科の勉強時間が少なかったからなんですよね多分。でも、他教科を効率よく勉強出来たら、その自分が必要としている教科に時間を割けて、もっと点数が上がっていましたね多分。
              </p>
              <p>
                受験生になったら、皆勉強はするんですよ。勉強してなくて落ちるんじゃないんですよ皆。実際自分の周りもめっちゃしてましたね。でもたぶん環境とか、質とかは人によって違って、都会に地方は負けますよね。塾が深夜まで空いている都会と、10時で閉まる地方、実際の予備校講師の授業を受ける都会、質問などもできないただ映像授業をうける地方などが例ですかね。
              </p>
              <p>
                今年は、自分が通っている東進は東大０、京大０、医学部０、他の少し名が知れている大学ですら受かるのは元々受かるといわれていた子だけ。あんまり伸び切った人がいないですね。これが現実ですね。これを受け入れるのか。でもこのプリントを使ったらこの現実が次の世代から変わるかもしれない。その思いで、プリント制作を行いました。ぜひ利用してください。
              </p>
              <p className="bg-white/60 p-6 rounded-3xl border border-blue-100 shadow-sm italic">
                ちなみに少し自慢にはなりますけど、自分が作っていた倫理や情報のプリントは、そこら辺の参考書よりも周りの子らからしたら評判良くて、その子らは情報の参考書を持ってるのに、俺のプリント貸してとか、ちょうだいとか言われることになったりしたので、内容は保証します。それでは失礼します。
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
            <div className="bg-white p-12 rounded-[3.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col h-full hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700">
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
                塾が深夜まで開く都会と、10時で閉まる地方。一流講師の熱量を直接受ける都会と、質問もできず映像を眺める地方。
              </p>
              <p className="text-slate-500 leading-relaxed text-sm font-light mt-auto">
                「伸び切らない」のは努力の不足ではなく、環境の差という残酷な現実。この現実に、私たちは知恵で立ち向かいます。
              </p>
            </div>
          </motion.div>

          {/* Card 02: Optimization (Offset) */}
          <motion.div variants={itemVariants} className="group md:mt-16">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col h-full hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700">
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
                他教科を効率よく学べれば、本当に点数が必要な教科に時間を割けたはず。
              </p>
              <p className="text-slate-500 leading-relaxed text-sm font-light mt-auto italic">
                「時間」こそが最大の資産。最短で理解を深めることで、自分の可能性を最大化してほしい。
              </p>
            </div>
          </motion.div>

          {/* Card 03: The Proof */}
          <motion.div variants={itemVariants} className="group md:mt-32">
            <div className="bg-[#0A3D62] p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(10,61,98,0.2)] flex flex-col h-full hover:scale-[1.02] transition-all duration-700 text-white">
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
                友人らからも「参考書より分かりやすい」と評判だった、核心を突く自作プリント。
              </p>
              <p className="text-blue-200/70 text-sm font-light mt-auto">
                内容は保証します。市販の参考書を超えた、受験生の現場から生まれた「答え」がここにあります。
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
