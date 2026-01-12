
import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { MATERIALS, getIcon } from '../constants';
import { Material } from '../types';

interface MaterialsSectionProps {
  onStartQuiz: (materialId: string) => void;
  onViewPdf: (material: Material) => void;
}

const MaterialsSection: React.FC<MaterialsSectionProps> = ({ onStartQuiz, onViewPdf }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const handleAction = (material: Material) => {
    if (material.id === 'ct-strategy') {
      onViewPdf(material);
    } else {
      onStartQuiz(material.id);
    }
  };

  return (
    <section id="materials-section" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black tracking-[0.4em] text-blue-600 uppercase mb-4">Lineup</h2>
          <h3 className="text-5xl font-black text-[#0A3D62] mb-6">学習教材</h3>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full"></div>
          <p className="mt-8 text-slate-500 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            共通テストの「核心」を掴むための、戦略的ラインナップ。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MATERIALS.map((material) => (
            <div 
              key={material.id} 
              className="group bg-white rounded-[3rem] overflow-hidden shadow-lg hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100 flex flex-col h-full hover:-translate-y-2"
            >
              <div className="p-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg ${material.color} text-white group-hover:scale-110 transition-transform duration-500`}>
                  {getIcon(material.icon, "w-8 h-8")}
                </div>
                
                <div className="mb-6">
                  <span className="text-[10px] font-black tracking-[0.2em] px-4 py-1.5 bg-slate-50 text-slate-400 border border-slate-100 rounded-full uppercase">
                    {material.tag}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-[#0A3D62] mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                  {material.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-12 font-medium">
                  {material.description}
                </p>
                
                <div className="mt-auto flex flex-col space-y-4">
                  <button 
                    onClick={() => handleAction(material)}
                    className="w-full py-5 bg-[#0A3D62] text-white rounded-2xl font-black hover:bg-blue-700 hover:shadow-2xl transition-all shadow-xl flex items-center justify-center group/btn"
                  >
                    {material.id === 'ct-strategy' ? '教材を読む' : '演習する'}
                    <ChevronRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setSelectedMaterial(material)}
                    className="w-full py-3 text-xs font-black text-slate-300 hover:text-[#0A3D62] tracking-widest uppercase transition-colors"
                  >
                    Overview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setSelectedMaterial(null)}
          ></div>
          <div className="relative bg-white rounded-[4rem] w-full max-w-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.25)] border border-slate-100 animate-scale-in">
            <button 
              onClick={() => setSelectedMaterial(null)}
              className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors p-2 z-10"
            >
              <X size={32} />
            </button>
            <div className="p-12 md:p-16">
              <div className="flex items-center mb-12">
                 <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mr-8 shadow-2xl ${selectedMaterial.color} text-white`}>
                    {getIcon(selectedMaterial.icon, "w-10 h-10")}
                 </div>
                 <div>
                    <span className="text-xs font-black text-blue-600 tracking-[0.3em] uppercase block mb-2">{selectedMaterial.tag}</span>
                    <h2 className="text-4xl font-black text-[#0A3D62] leading-tight">{selectedMaterial.title}</h2>
                 </div>
              </div>
              <div className="prose prose-blue mb-16">
                <p className="text-blue-600 font-black text-2xl italic mb-8 tracking-tighter">「核心を掴む」</p>
                <p className="text-slate-500 leading-relaxed text-xl font-light">
                  {selectedMaterial.summary}
                </p>
              </div>
              <button 
                onClick={() => {
                  handleAction(selectedMaterial);
                  setSelectedMaterial(null);
                }}
                className="w-full py-6 bg-gradient-to-r from-[#0A3D62] to-blue-700 text-white rounded-[2rem] font-black text-xl hover:shadow-[0_30px_60px_rgba(10,61,98,0.3)] transition-all shadow-2xl"
              >
                {selectedMaterial.id === 'ct-strategy' ? '教材を今すぐ読む' : '演習を開始する'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MaterialsSection;
