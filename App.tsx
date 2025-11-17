import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Question, Answers } from './types';
import { INITIAL_QUESTIONS, CRUSH_INITIALS_QUESTION } from './constants';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import ProgressBar from './components/ProgressBar';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAnswer = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (key === 'hasCrush') {
      const crushQuestionExists = questions.some(q => q.key === 'crushInitials');
      if (value === '是' && !crushQuestionExists) {
        const nextQuestionIndex = questions.findIndex(q => q.key === 'personality');
        const newQuestions = [...questions];
        newQuestions.splice(nextQuestionIndex, 0, CRUSH_INITIALS_QUESTION);
        setQuestions(newQuestions);
      } else if (value === '否' && crushQuestionExists) {
        setQuestions(INITIAL_QUESTIONS);
      }
    }
  };

  const calculateResult = useCallback(async (): Promise<string> => {
    const { gender, isSmart, isGoodLooking, hasCrush, crushInitials, personality } = answers;
    
    if (
      gender === '男' &&
      hasCrush === '是' &&
      crushInitials?.toLowerCase() === 'lxw'
    ) {
      return "呀宝宝你怎么想起来搜你老公了呀，我们的未来会非常非常美好捏～";
    }

    if (
      gender === '女' &&
      hasCrush === '是' &&
      crushInitials?.toLowerCase() === 'dh'
    ) {
      let finalResult = "你现在的这段姻缘未来将会非常美好，这个人会一直爱着你。即使生活中难免有一些小摩擦，你们所共有的忠诚与温柔终将带领你们挺过一切困难。";
      
      if (isSmart === '否' || isGoodLooking === '否') {
        finalResult += "\n\n在对方心中，你可是非常非常聪明又美丽的！要始终对自己充满信心哦，他会一直默默支持着你的❤️";
      }

      if (personality === '悲观') {
        finalResult += "\n\n生活是绚烂多彩的，每个人的生活都是独一无二的，别人的经历代表不了你，感受当下的爱，如果你觉得它是温暖的，那请相信世界上存在着长久的（甚至是一生的）、平平淡淡的美好爱情吧～";
      }
      return finalResult;
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: '请生成一小段模糊中立的未来姻缘预测，风格要温馨，长度在30个汉字以内。',
      });
      return response.text;
    } catch (error) {
      console.error("AI generation failed:", error);
      return "无法预测，但请相信美好的事情即将发生。";
    }
  }, [answers]);

  const handleNext = async () => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (!isLastQuestion) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsFading(false);
      }, 300);
    } else {
      setIsGenerating(true);
      const finalResult = await calculateResult();
      setIsFading(true); 
      setTimeout(() => {
        setResult(finalResult);
        setIsGenerating(false);
        setIsFading(false);
      }, 300);
    }
  };

  const handleReset = () => {
    setIsFading(true);
    setTimeout(() => {
      setQuestions(INITIAL_QUESTIONS);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setResult(null);
      setIsFading(false);
    }, 300);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const totalSteps = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalSteps) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300 min-h-screen flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white shadow-lg py-2 px-4 rounded-lg bg-black bg-opacity-10">
          预测你的未来姻缘
        </h1>
        <p className="text-white text-opacity-90 mt-2">回答几个问题，看看你的缘分走向</p>
      </header>

      <main className="w-full max-w-lg">
        <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          {!result ? (
            <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8">
              <ProgressBar progress={progress} />
              <QuestionCard 
                question={currentQuestion}
                onAnswer={handleAnswer}
                onNext={handleNext}
                currentAnswer={answers[currentQuestion.key]}
                isLastQuestion={isLastQuestion}
                isLoading={isGenerating}
              />
            </div>
          ) : (
            <ResultCard result={result} onReset={handleReset} />
          )}
        </div>
      </main>

      <footer className="mt-8 text-white text-opacity-70 text-sm">
        <p>仅供娱乐，请相信爱与自己</p>
      </footer>
    </div>
  );
};

export default App;
