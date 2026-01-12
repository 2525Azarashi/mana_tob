
import React, { useState, useEffect } from 'react';
import { PageType, Material } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import MaterialsSection from './components/MaterialsSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import QuizSystem from './components/QuizSystem';
import SakuraEffect from './components/SakuraEffect';
import PDFViewer from './components/PDFViewer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activePdf, setActivePdf] = useState<{url: string, title: string} | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleViewPdf = (material: Material) => {
    const pdfUrl = material.id === 'ct-strategy' 
      ? "https://drive.google.com/file/d/1fb9rGxaR5k_MMksbavBBtoFp9KMlmsyj/view?usp=sharing"
      : "";
    
    if (pdfUrl) {
      setActivePdf({ url: pdfUrl, title: material.title });
      setCurrentPage('pdf-viewer');
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <Manifesto />
            <MaterialsSection 
              onStartQuiz={(id) => setCurrentPage('quiz-select')} 
              onViewPdf={handleViewPdf}
            />
            <ContactForm />
          </>
        );
      case 'quiz-select':
      case 'quiz':
      case 'result':
        return (
          <QuizSystem 
            onBack={() => setCurrentPage('home')} 
            onHome={() => setCurrentPage('home')} 
          />
        );
      case 'pdf-viewer':
        return activePdf ? (
          <PDFViewer 
            pdfUrl={activePdf.url} 
            title={activePdf.title} 
            onBack={() => setCurrentPage('home')} 
          />
        ) : null;
      case 'privacy':
        return (
          <div className="pt-40 pb-24 px-4 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-5xl font-black mb-12 text-[#0A3D62] tracking-tighter">プライバシーポリシー</h1>
            <div className="prose prose-blue text-slate-600 space-y-8 text-lg font-light leading-relaxed">
              <p>当アプリケーション（以下、「本アプリ」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。</p>
              <h2 className="text-3xl font-black text-[#0A3D62] mt-12 mb-6">1. 収集する情報</h2>
              <p>本アプリは、クイズの進捗状況などをブラウザのローカルメモリに一時的に保存することがありますが、ユーザーを個人的に識別できる情報をサーバーに送信することはありません。</p>
              <h2 className="text-3xl font-black text-[#0A3D62] mt-12 mb-6">2. 情報の利用目的</h2>
              <p>収集された学習データは、学習体験の向上および進捗管理のためにのみ使用されます。</p>
            </div>
            <button onClick={() => setCurrentPage('home')} className="mt-16 px-10 py-4 bg-slate-50 text-[#0A3D62] rounded-2xl font-black hover:bg-slate-100 transition-all border border-slate-100 shadow-sm">ホームに戻る</button>
          </div>
        );
      case 'terms':
        return (
          <div className="pt-40 pb-24 px-4 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-5xl font-black mb-12 text-[#0A3D62] tracking-tighter">利用規約</h1>
            <div className="prose prose-blue text-slate-600 space-y-8 text-lg font-light leading-relaxed">
              <p>この利用規約は、本アプリの利用者と運営者の間で適用されます。</p>
              <h2 className="text-3xl font-black text-[#0A3D62] mt-12 mb-6">1. サービスの目的</h2>
              <p>本アプリは教育支援を目的としており、試験結果を保証するものではありません。</p>
              <h2 className="text-3xl font-black text-[#0A3D62] mt-12 mb-6">2. 禁止事項</h2>
              <p>コンテンツの無断転載、商用利用、システムの不正解析を禁止します。</p>
            </div>
            <button onClick={() => setCurrentPage('home')} className="mt-16 px-10 py-4 bg-slate-50 text-[#0A3D62] rounded-2xl font-black hover:bg-slate-100 transition-all border border-slate-100 shadow-sm">ホームに戻る</button>
          </div>
        );
      case 'sitemap':
        return (
          <div className="pt-40 pb-24 px-4 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-5xl font-black mb-12 text-[#0A3D62] tracking-tighter">サイトマップ</h1>
            <ul className="space-y-6">
              <li><button onClick={() => setCurrentPage('home')} className="text-2xl font-black text-blue-600 hover:text-blue-800 transition-colors">ホーム</button></li>
              <li><button onClick={() => setCurrentPage('quiz-select')} className="text-2xl font-black text-blue-600 hover:text-blue-800 transition-colors">重要用語一問一答</button></li>
              <li><button onClick={() => setCurrentPage('privacy')} className="text-2xl font-black text-blue-600 hover:text-blue-800 transition-colors">プライバシーポリシー</button></li>
              <li><button onClick={() => setCurrentPage('terms')} className="text-2xl font-black text-blue-600 hover:text-blue-800 transition-colors">利用規約</button></li>
            </ul>
            <button onClick={() => setCurrentPage('home')} className="mt-16 px-10 py-4 bg-slate-50 text-[#0A3D62] rounded-2xl font-black hover:bg-slate-100 transition-all border border-slate-100 shadow-sm">ホームに戻る</button>
          </div>
        );
      default:
        return <div className="pt-32">Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <SakuraEffect />
      <Navbar setCurrentPage={setCurrentPage} />
      <main>
        {renderContent()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-in-right { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
