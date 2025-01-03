import { useState, useCallback } from 'react';
import type { GameState, Question } from '../types/game';
import { generateQuestion } from '../utils/questionGenerator';

const INITIAL_STATE: GameState = {
  playerHealth: 100,
  aiHealth: 100,
  level: 1,
  topic: 'Basic Phrases',
  score: 0,
  playerCombo: 0,
  playerPowerUps: [],
  aiLevel: 1,
  aiMood: 'neutral',
  timeLeft: 30,
  currentQuestion: generateQuestion('Basic Phrases'),
  currentOptions: [],
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  const handleAnswer = useCallback(async (answer: string) => {
    const isCorrect = answer === gameState.currentQuestion.answer;
    
    setGameState(prev => ({
      ...prev,
      playerHealth: isCorrect ? prev.playerHealth : Math.max(0, prev.playerHealth - 10),
      aiHealth: isCorrect ? Math.max(0, prev.aiHealth - 15) : prev.aiHealth,
      score: isCorrect ? prev.score + (10 * prev.playerCombo) : prev.score,
      playerCombo: isCorrect ? prev.playerCombo + 1 : 0,
      aiMood: isCorrect ? 'impressed' : 'encouraging',
    }));

    return isCorrect;
  }, [gameState.currentQuestion]);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
  }, []);

  return {
    gameState,
    handleAnswer,
    resetGame,
  };
}