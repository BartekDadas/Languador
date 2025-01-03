import { useState, useEffect } from 'react';
import { Timer } from '../ui/Timer';
import { useLocaleStore } from '../../../store/localeStore';
import type { Question } from '../../../types/game';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ChallengeAreaProps {
  question: Question;
  timeLeft: number;
  onAnswer: (answer: string) => void;
  disabled: boolean;
}

export function ChallengeArea({
  question,
  timeLeft,
  onAnswer,
  disabled
}: ChallengeAreaProps) {
  const t = useLocaleStore((state) => state.t);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(null);
  }, [question]);

  const handleAnswerClick = (option: string) => {
    if (disabled || selectedAnswer !== null) return;
    
    setSelectedAnswer(option);
    const correct = option === question.answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      onAnswer(option);
    }, 1000);
  };

  return (
    <div className="max-w-xl w-full mx-auto p-4 bg-black/20 backdrop-blur-md rounded-xl transform-gpu perspective-1000">
      <div className="mb-3">
        <Timer value={timeLeft} maxValue={30} />
      </div>

      <div className="text-center mb-4 transform-gpu translate-z-20">
        <h3 className="text-sm text-purple-200 mb-1">{t('game.questionPrompt')}</h3>
        <p className="text-2xl font-bold text-white text-shadow-glow">{question.text}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={disabled || selectedAnswer !== null}
            className={`
              relative p-3 rounded-lg font-medium transition-all transform-gpu hover:scale-105
              ${
                selectedAnswer === null
                  ? 'bg-white/10 hover:bg-white/20 active:scale-95'
                  : selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-500/80 text-white'
                    : 'bg-red-500/80 text-white'
                  : option === question.answer && showFeedback
                  ? 'bg-green-500/50 text-white'
                  : 'bg-white/5'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              backdrop-blur-md
              border border-white/10
              shadow-xl
              text-sm
            `}
          >
            {option}
            {showFeedback && selectedAnswer === option && (
              <span className="absolute -top-1 -right-1 transform-gpu translate-z-30">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400 animate-bounce" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 animate-bounce" />
                )}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}