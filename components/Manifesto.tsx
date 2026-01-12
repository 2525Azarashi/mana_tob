
import React from 'react';
import { motion, Variants } from 'framer-motion';

const Manifesto: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="manifesto-section" className="py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-sm font-black tracking-[0.4em] text-blue-600 uppercase mb-6">Philosophy</h2>
          <h3 className="text-5xl md:text-6xl font-black text-[#0A3D62] mb-8 leading-tight">
            私たちの想い
          </h3>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Section 1: Introduction */}
          <motion.div variants={itemVariants} className="group">
            <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="font-playfair italic text-blue-600 font-black text-5xl mb-8 opacity-20 group-hover:opacity-40 transition-opacity">01</div>
              <h4 className="text-2xl font-black text-[#0A3D62] mb-6 tracking-tight">〈初めに〉</h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                受験勉強をこれから頑張ろう。勉強しないとやばい。良い志望校に行きたい。そんな方々のためにこのサイトを立ち上げました。
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mt-6 font-light">
                このサイトは、世の中の受験生全員が利用できるものではありません。プリントを作っている自分からしても、お世話になった方々や関わりのあった方々に利用してほしいという思いがあります。
              </p>
            </div>
          </motion.div>

          {/* Section 2: Strategy */}
          <motion.div variants={itemVariants} className="group">
            <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 md:mt-12">
              <div className="font-playfair italic text-blue-600 font-black text-5xl mb-8 opacity-20 group-hover:opacity-40 transition-opacity">02</div>
              <h4 className="text-2xl font-black text-[#0A3D62] mb-6 tracking-tight">〈独自性〉</h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                市販の参考書で事が済む教科や単元の参考書や問題集は制作していません。
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mt-6 font-light italic border-l-4 border-blue-100 pl-6">
                「世の中にこのような参考書があれば点数がとれたのに」「暗記が効率的にできるよな」という自身の経験に基づいた知恵を形にしています。
              </p>
            </div>
          </motion.div>

          {/* Section 3: Merits */}
          <motion.div variants={itemVariants} className="group">
            <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 md:mt-24">
              <div className="font-playfair italic text-blue-600 font-black text-5xl mb-8 opacity-20 group-hover:opacity-40 transition-opacity">03</div>
              <h4 className="text-2xl font-black text-[#0A3D62] mb-6 tracking-tight">〈このサイトの良さ〉</h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                ただ単にプリントを貼っているわけではなく、適宜改訂を行います。倫理や情報のプリントは最新の出題傾向に合わせ、常にアップデートし続けます。
              </p>
              <div className="mt-auto pt-8">
                <div className="h-px w-full bg-gray-100 mb-6"></div>
                {/* ボランティア活動に関する文言を削除 */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
