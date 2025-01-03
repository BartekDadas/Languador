import { useState, useEffect } from 'react';
import { PlayerArea } from './battle/PlayerArea';
import { AIOpponent } from './battle/AIOpponent';
import { ChallengeArea } from './battle/ChallengeArea';
import { GameControls } from './battle/GameControls';
import { GameHeader } from './battle/GameHeader';
import { VictoryModal } from './ui/VictoryModal';
import { POWER_UPS } from '../../utils/powerUps';
import { generateQuestion } from '../../utils/questionGenerator';
import { getTopics } from '../../services/wordService';
import type { GameState, Topic, Question } from '../../types/game';
import { useNavigate } from 'react-router-dom';

export function BattleArena() {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [timer, setTimer] = useState(30);
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    try {
      setIsLoading(true);
      const topics = await getTopics();
      const initialTopic = topics[0];
      const firstQuestion = await generateQuestion(initialTopic);
      
      setGameState({
        playerHealth: 100,
        aiHealth: 100,
        level: 1,
        topic: initialTopic,
        score: 0,
        playerCombo: 0,
        playerPowerUps: POWER_UPS.slice(0, 2),
        aiLevel: 1,
        aiMood: 'neutral',
        timeLeft: 30,
        currentQuestion: firstQuestion,
        currentOptions: firstQuestion.options,
      });
    } catch (error) {
      console.error('Failed to initialize game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPaused && gameState) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPaused, gameState]);

  useEffect(() => {
    if (gameState?.aiHealth <= 0) {
      setShowVictory(true);
      setIsPaused(true);
    }
  }, [gameState?.aiHealth]);

  const handleTimeUp = async () => {
    if (!gameState) return;

    const nextQuestion = await generateQuestion(gameState.topic);
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        playerHealth: Math.max(0, prev.playerHealth - 5),
        playerCombo: 0,
        aiMood: 'challenging',
        currentQuestion: nextQuestion,
        currentOptions: nextQuestion.options,
      };
    });
    setTimer(30);
  };

  const handleAnswer = async (answer: string) => {
    if (!gameState) return;
    
    const isCorrect = answer === gameState.currentQuestion.answer;
    const nextQuestion = await generateQuestion(gameState.topic);
    
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        playerHealth: isCorrect ? prev.playerHealth : Math.max(0, prev.playerHealth - 10),
        aiHealth: isCorrect ? Math.max(0, prev.aiHealth - 15) : prev.aiHealth,
        score: isCorrect ? prev.score + (10 * prev.playerCombo) : prev.score,
        playerCombo: isCorrect ? prev.playerCombo + 1 : 0,
        aiMood: isCorrect ? 'impressed' : 'encouraging',
        currentQuestion: nextQuestion,
        currentOptions: nextQuestion.options,
      };
    });

    setTimer(30);
  };

  const resetGame = () => {
    initializeGame();
    setTimer(30);
    setIsPaused(false);
    setShowVictory(false);
  };

  const handleFinishGame = () => {
    navigate('/');
  };

  if (isLoading || !gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading game...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      <GameHeader 
        level={gameState.level}
        topic={gameState.topic.name}
        score={gameState.score}
        isPaused={isPaused}
        onPause={() => setIsPaused(!isPaused)}
      />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <PlayerArea 
          health={gameState.playerHealth}
          combo={gameState.playerCombo}
          powerUps={gameState.playerPowerUps}
        />
        
        <AIOpponent 
          health={gameState.aiHealth}
          level={gameState.aiLevel}
          mood={gameState.aiMood}
        />
      </div>

      <ChallengeArea 
        question={gameState.currentQuestion}
        timeLeft={timer}
        onAnswer={handleAnswer}
        disabled={isPaused}
      />

      <GameControls 
        onReset={resetGame}
        onPause={() => setIsPaused(!isPaused)}
        onFinishGame={handleFinishGame}
        isPaused={isPaused}
      />

      {showVictory && (
        <VictoryModal
          score={gameState.score}
          onClose={resetGame}
        />
      )}
    </div>
  );
}