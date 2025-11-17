
import React from 'react';

interface ResultCardProps {
  result: string;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-purple-600">你的姻缘预测</h2>
      <div className="border-t-2 border-pink-200 my-4"></div>
      <p className="text-lg text-gray-700 whitespace-pre-line leading-relaxed my-6">
        {result}
      </p>
      <div className="border-t-2 border-pink-200 my-4"></div>
      <button
        onClick={onReset}
        className="mt-4 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
      >
        再试一次
      </button>
    </div>
  );
};

export default ResultCard;
