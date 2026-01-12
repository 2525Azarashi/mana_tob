
import React from 'react';
import { User } from 'lucide-react';
import { CREATORS } from '../constants';

const CreatorsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {CREATORS.map((creator, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                 <User size={48} className="text-gray-400" />
              </div>
              <div className="text-center sm:text-left">
                <div className="mb-2">
                  <span className="text-blue-600 text-sm font-bold block mb-1">{creator.role}</span>
                  <h4 className="text-2xl font-bold text-gray-900">{creator.name}</h4>
                </div>
                <p className="text-gray-600 leading-relaxed italic">
                  "{creator.description}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorsSection;
