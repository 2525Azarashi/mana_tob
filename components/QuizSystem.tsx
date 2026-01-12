
import React, { useState, useEffect } from 'react';
// Added BookOpen and Star to the imports from lucide-react
import { ArrowLeft, CheckCircle, XCircle, ChevronRight, Home, RefreshCw, BookOpen, Star } from 'lucide-react';
import { QuizSet, QuizQuestion } from '../types';
import { QUIZ_DATA } from '../constants';

interface QuizSystemProps {
  onBack: () => void;
  onHome: () => void;
}

const QuizSystem: React.FC<QuizSystemProps> = ({ onBack, onHome }) => {
  const [view, setView] = useState<'selection' | 'running' | 'result'>('selection');
  const [selectedQuiz, setSelectedQuiz] = useState<QuizSet | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const startQuiz = (quiz: QuizSet) => {
    // Select 20 questions randomly if available
    const allQuestions = [...quiz.questions];
    const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, 20);
    setSelectedQuiz(quiz);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers({});
    setIsAnswered(false);
    setCorrectCount(0);
    setView('running');
  };

  const handleAnswer = (answer: string | number) => {
    if (isAnswered) return;
    
    const currentQuestion = shuffledQuestions[currentIndex];
    const isCorrect = answer === currentQuestion.correct;
    
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    if (isCorrect) setCorrectCount(prev => prev + 1);
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
    } else {
      setView('result');
    }
  };

  if (view === 'selection') {
    return (
      <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto min-h-screen animate-fade-in">
        <button onClick={onBack} className="flex items-center text-[#0A3D62] mb-8 hover:underline font-bold">
          <ArrowLeft size={20} className="mr-2" /> 戻る
        </button>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0A3D62] mb-4">重要用語一問一答</h1>
          <p className="text-gray-600">共通テストの「核心」を突く20問。まずはここから始めましょう。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {QUIZ_DATA.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 flex flex-col items-center text-center transform transition hover:scale-[1.02]">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{quiz.title}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">{quiz.description}</p>
              <div className="mt-auto text-[#1976D2] font-black text-xl mb-8">全 20 問</div>
              <button 
                onClick={() => startQuiz(quiz)}
                className="w-full py-4 bg-gradient-to-r from-[#0A3D62] to-[#1976D2] text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all shadow-lg"
              >
                開始
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'running' && selectedQuiz) {
    const q = shuffledQuestions[currentIndex];
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correct;

    return (
      <div className="pt-24 pb-12 px-4 max-w-3xl mx-auto min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => setView('selection')} className="flex items-center text-gray-500 hover:text-[#0A3D62] font-bold">
            <ArrowLeft size={20} className="mr-2" /> 中断する
          </button>
          <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-bold text-gray-600">
            Q {currentIndex + 1} / {shuffledQuestions.length}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(10,61,98,0.1)] p-10 md:p-16 mb-8 border border-gray-50 animate-scale-in">
          <h2 className="text-3xl font-bold text-[#0A3D62] mb-12 text-center leading-[1.6]">
            {q.text}
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => handleAnswer('○')}
              disabled={isAnswered}
              className={`py-12 rounded-3xl text-5xl font-bold transition-all transform active:scale-95 ${
                isAnswered && q.correct === '○' ? 'bg-[#4CAF50] text-white shadow-lg' :
                isAnswered && userAnswer === '○' && q.correct !== '○' ? 'bg-[#F44336] text-white shadow-lg' :
                'bg-gray-50 text-[#1976D2] hover:bg-blue-50 border-2 border-transparent hover:border-blue-200'
              }`}
            >
              ○
            </button>
            <button
              onClick={() => handleAnswer('×')}
              disabled={isAnswered}
              className={`py-12 rounded-3xl text-5xl font-bold transition-all transform active:scale-95 ${
                isAnswered && q.correct === '×' ? 'bg-[#4CAF50] text-white shadow-lg' :
                isAnswered && userAnswer === '×' && q.correct !== '×' ? 'bg-[#F44336] text-white shadow-lg' :
                'bg-gray-50 text-[#1976D2] hover:bg-blue-50 border-2 border-transparent hover:border-blue-200'
              }`}
            >
              ×
            </button>
          </div>

          {isAnswered && (
            <div className={`mt-12 p-8 rounded-3xl animate-fade-in ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border-2`}>
              <div className="flex items-center mb-4">
                {isCorrect ? (
                  <><CheckCircle className="text-[#4CAF50] mr-3" size={28} /> <span className="text-[#2E7D32] font-black text-2xl">正解！</span></>
                ) : (
                  <><XCircle className="text-[#F44336] mr-3" size={28} /> <span className="text-[#C62828] font-black text-2xl">不正解</span></>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">{q.explanation}</p>
              <button 
                onClick={nextQuestion}
                className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-black transition-all shadow-xl"
              >
                {currentIndex + 1 < shuffledQuestions.length ? '次の問題へ' : '結果を見る'}
                <ChevronRight className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === 'result') {
    return (
      <div className="pt-24 pb-12 px-4 max-w-2xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="bg-white rounded-[3rem] shadow-[0_30px_70px_rgba(10,61,98,0.15)] p-12 text-center animate-scale-in border border-gray-100">
          <div className="w-24 h-24 bg-blue-50 text-[#1976D2] rounded-full flex items-center justify-center mx-auto mb-8">
            <Star size={48} />
          </div>
          <h1 className="text-4xl font-black text-[#0A3D62] mb-6">全問回答！</h1>
          <div className="inline-block px-8 py-4 bg-blue-50 rounded-2xl mb-4">
            <p className="text-3xl text-[#1976D2] font-black">
              {correctCount} / {shuffledQuestions.length}
            </p>
          </div>
          <p className="text-xl text-gray-500 mb-12 font-medium">お疲れ様でした！</p>
          
          <div className="space-y-4 max-w-sm mx-auto">
            <button 
              onClick={() => setView('selection')}
              className="w-full py-5 bg-gradient-to-r from-[#0A3D62] to-[#1976D2] text-white rounded-2xl font-bold flex items-center justify-center hover:shadow-2xl transition-all shadow-xl"
            >
              <RefreshCw className="mr-2" size={20} />
              クイズをリセット
            </button>
            <button 
              onClick={onHome}
              className="w-full py-5 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-bold flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Home className="mr-2" size={20} />
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizSystem;
