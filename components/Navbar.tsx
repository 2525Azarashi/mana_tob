
import React, { useState, useEffect } from 'react';
import { Instagram, Globe } from 'lucide-react';
import { PageType } from '../types';
import { motion } from 'framer-motion';

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
      scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 shadow-md' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center cursor-pointer space-x-6 group"
            onClick={() => setCurrentPage('home')}
          >
            {/* ロゴコンテナ */}
            <div className="h-14 flex items-center relative bg-white/80 backdrop-blur-sm px-5 py-2 rounded-2xl shadow-xl shadow-blue-900/5 border border-white min-w-[140px] justify-center overflow-hidden">
              <img 
                src="logo.png" 
                alt="mntb" 
                className="h-full w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.logo-text-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'logo-text-fallback flex items-center font-black tracking-tighter text-2xl italic bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent';
                    fallback.innerText = 'mntb';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
            <div className="flex flex-col border-l-2 border-slate-100 pl-6 py-1">
              <span className={`text-2xl font-black tracking-tighter leading-none transition-colors text-[#0A3D62] group-hover:text-blue-600`}>
                学びの扉
              </span>
              <span className="text-[10px] font-bold text-blue-400 tracking-[0.3em] uppercase mt-2 opacity-80">Project mntb</span>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-5">
            <motion.a 
              whileHover={{ y: -2, scale: 1.1 }}
              href="https://www.instagram.com/mana_tob1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-pink-500 transition-all p-2.5 bg-slate-50/50 rounded-xl"
            >
              <Instagram size={20} />
            </motion.a>
            <motion.a 
              whileHover={{ y: -2, scale: 1.1 }}
              href="https://sites.google.com/d/1tzy9JK1XCJ4OvzJ6O-_FRgCKxNnNELVo/p/1EKqYi-znTwSuQQJW7WmGWgilKf9aVOZh/edit" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-blue-600 transition-all p-2.5 bg-slate-50/50 rounded-xl"
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
