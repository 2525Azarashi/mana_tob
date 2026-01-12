
import React, { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSent(true);
    setMessage('');
    setTimeout(() => {
      setIsSent(false);
    }, 5000);
  };

  return (
    <section className="py-24 bg-[#0A3D62] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-blue-200">学習に関する質問やフィードバックはこちらから。</p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 bg-gray-100 flex items-center space-x-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <p className="text-gray-900 font-bold leading-tight">学びの扉 サポート</p>
              <p className="text-xs text-green-500 font-medium">● オンライン</p>
            </div>
          </div>
          
          <div className="h-64 overflow-y-auto p-6 space-y-4 bg-white">
             <div className="flex space-x-3">
               <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <Bot size={16} />
               </div>
               <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                 こんにちは！『学びの扉』へようこそ。何かお手伝いできることはありますか？
               </div>
             </div>
             {isSent && (
               <div className="flex space-x-3 flex-row-reverse space-x-reverse animate-slide-in-right">
                 <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">
                    <User size={16} />
                 </div>
                 <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
                   メッセージを送信しました。
                 </div>
               </div>
             )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="質問内容を入力してください..." 
                className="w-full py-4 pl-6 pr-14 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button 
                type="submit"
                className="absolute right-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
