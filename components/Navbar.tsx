
import React, { useState, useEffect } from 'react';
import { Instagram, Globe } from 'lucide-react';
import { PageType } from '../types';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface NavbarProps {
  setCurrentPage: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="flex items-center cursor-pointer space-x-6 group"
            onClick={() => setCurrentPage('home')}
          >
            {/* ロゴコンテナ */}
            <div className="h-14 flex items-center relative px-2 py-2 shrink-0 justify-center overflow-visible">
              <Logo className="h-12 w-auto" />
            </div>
            {/* テキストコンテナ - ここにオレンジのアクセントを維持 */}
            <div className="flex flex-col border-l-2 border-orange-400 pl-6 py-1 shrink-0">
              <span 
                className="text-2xl font-black tracking-tighter leading-normal transition-colors text-orange-600 group-hover:text-orange-500"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                学びの扉
              </span>
              <span className="text-[10px] font-bold text-orange-400 tracking-[0.3em] uppercase mt-1">Project mntb</span>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-5">
            <motion.a 
              whileHover={{ y: -2, scale: 1.1 }}
              href="https://www.instagram.com/mana_tob1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-blue-600 transition-all p-2.5 bg-slate-50 rounded-xl"
            >
              <Instagram size={20} />
            </motion.a>
            <motion.a 
              whileHover={{ y: -2, scale: 1.1 }}
              href="https://sites.google.com/d/1tzy9JK1XCJ4OvzJ6O-_FRgCKxNnNELVo/p/1EKqYi-znTwSuQQJW7WmGWgilKf9aVOZh/edit" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-blue-600 transition-all p-2.5 bg-slate-50 rounded-xl"
            >
              <Globe size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
