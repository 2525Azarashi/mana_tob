
import React from 'react';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface PDFViewerProps {
  onBack: () => void;
  pdfUrl: string;
  title: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ onBack, pdfUrl, title }) => {
  // Google Drive のURLを埋め込み用の /preview に変換
  const embedUrl = pdfUrl.replace('/view?usp=sharing', '/preview');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-12 px-4 max-w-6xl mx-auto min-h-screen flex flex-col"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <button 
          onClick={onBack} 
          className="flex items-center text-[#0A3D62] hover:text-blue-600 font-black transition-colors group w-fit"
        >
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-blue-50 transition-colors">
            <ArrowLeft size={20} />
          </div>
          戻る
        </button>
        
        <div className="flex flex-col md:items-center">
          <div className="flex items-center space-x-3 mb-1">
            <FileText size={24} className="text-blue-600" />
            <h1 className="text-2xl font-black text-[#0A3D62]">{title}</h1>
          </div>
          <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Embedded Document Viewer</p>
        </div>

        <a 
          href={pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center px-6 py-3 bg-[#0A3D62] text-white rounded-2xl font-black text-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          外部ビューアで開く
          <ExternalLink size={16} className="ml-2" />
        </a>
      </div>

      <div className="flex-grow bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 relative min-h-[600px]">
        <iframe
          src={embedUrl}
          className="w-full h-full absolute inset-0"
          allow="autoplay"
          title={title}
        ></iframe>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-400 font-medium italic">
          ※ PDFが表示されない場合は、右上の「外部ビューアで開く」ボタンをご利用ください。
        </p>
      </div>
    </motion.div>
  );
};

export default PDFViewer;
