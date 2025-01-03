import type { GameStatistics } from '../types/game';

export async function updatePlayerScore(score: number): Promise<void> {
  // Mock implementation - just log the score update
  console.log('Score updated:', score);
}

export async function getPlayerStats(): Promise<GameStatistics> {
  // Return mock statistics
  return {
    roundsPlayed: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    averageResponseTime: 0,
  };
}