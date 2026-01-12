
import React from 'react';
import { Instagram, Globe, Mail, User } from 'lucide-react';
import { PageType } from '../types';
import { CREATORS } from '../constants';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 overflow-hidden relative">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 mb-20">
          {/* 左側：作成者紹介 */}
          <div>
            <div className="flex items-center space-x-3 mb-10">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              <h3 className="text-white text-xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>作成者紹介</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {CREATORS.map((creator, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex space-x-5 p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors">
                    <User size={24} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <h4 className="text-white font-bold text-base group-hover:text-blue-400 transition-colors">{creator.name}</h4>
                      <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{creator.role}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400 font-medium">
                      {creator.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* 右側：リンク */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest opacity-50">Menu</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">ホーム</button></li>
                <li><button onClick={() => setCurrentPage('quiz-select')} className="hover:text-blue-400 transition-colors">一問一答</button></li>
                <li><a href="#materials-section" className="hover:text-blue-400 transition-colors">教材一覧</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest opacity-50">Legal</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => setCurrentPage('privacy')} className="hover:text-blue-400 transition-colors">プライバシー</button></li>
                <li><button onClick={() => setCurrentPage('terms')} className="hover:text-blue-400 transition-colors">利用規約</button></li>
                <li><button onClick={() => setCurrentPage('sitemap')} className="hover:text-blue-400 transition-colors">サイトマップ</button></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest opacity-50">Social</h4>
              <div className="flex flex-wrap gap-3">
                <motion.a 
                  whileHover={{ y: -3, backgroundColor: '#E1306C' }}
                  href="https://www.instagram.com/mana_tob1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/5 rounded-2xl text-white transition-all border border-white/5"
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3, backgroundColor: '#2563eb' }}
                  href="https://sites.google.com/d/1tzy9JK1XCJ4OvzJ6O-_FRgCKxNnNELVo/p/1EKqYi-znTwSuQQJW7WmGWgilKf9aVOZh/edit" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/5 rounded-2xl text-white transition-all border border-white/5"
                >
                  <Globe size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3, backgroundColor: '#0A3D62' }}
                  href="mailto:support@example.com" 
                  className="p-3 bg-white/5 rounded-2xl text-white transition-all border border-white/5"
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        
        {/* フッターボトム */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center space-x-5">
             <div className="h-10 flex items-center justify-center">
               <Logo className="h-8" />
             </div>
             <div className="flex flex-col">
               <span className="text-white font-black text-sm tracking-tight leading-snug">学びの扉</span>
               <span className="text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">Project mntb</span>
             </div>
           </div>
           <div className="flex flex-col md:items-end gap-1">
             <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">© {new Date().getFullYear()} All Rights Reserved.</p>
             <p className="text-[9px] font-medium text-slate-600">Created with intelligence for the next generation.</p>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
