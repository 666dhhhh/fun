import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (key: string, value: string) => void;
  onNext: () => void;
  currentAnswer?: string;
  isLastQuestion: boolean;
  isLoading?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, onNext, currentAnswer, isLastQuestion, isLoading }) => {
  const isAnswered = currentAnswer !== undefined && currentAnswer.trim() !== '';

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">{question.text}</h2>
      
      {question.type === 'radio' && question.options && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => onAnswer(question.key, option)}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md
                ${currentAnswer === option 
                  ? 'bg-pink-500 text-white ring-2 ring-offset-2 ring-pink-500' 
                  : 'bg-white text-gray-700 hover:bg-pink-100'}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {question.type === 'text' && (
        <div className="w-full max-w-xs mb-8">
          <input
            type="text"
            value={currentAnswer || ''}
            onChange={(e) => onAnswer(question.key, e.target.value)}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg text-center text-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
            placeholder="在此输入..."
            autoFocus
          />
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!isAnswered || isLoading}
        className="w-full max-w-xs px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            生成中...
          </>
        ) : isLastQuestion ? '查看结果' : '下一题'}
      </button>
    </div>
  );
};

export default QuestionCard;