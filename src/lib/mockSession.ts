import { nanoid } from 'nanoid';
import type { GameSession, Player } from '../types/game';

export function createGuestId(): string {
  return nanoid(8);
}

export function createGuestPlayer(guestId: string): Player {
  return {
    id: guestId,
    name: `Guest_${guestId}`,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    level: 1,
    inventory: [],
    statistics: {
      gamesPlayed: 0,
      totalScore: 0,
      averageScore: 0,
      winRate: 0
    }
  };
}

export function initializeGameSession(player: Player): GameSession {
  return {
    id: nanoid(),
    startTime: Date.now(),
    player,
    currentRound: 0,
    maxRounds: 10,
    status: 'active',
    score: 0,
    position: { x: 0, y: 0 },
    inventory: [
      { id: 'starter_hint', name: 'Hint Card', quantity: 3 },
      { id: 'time_boost', name: 'Time Booster', quantity: 1 }
    ],
    statistics: {
      roundsPlayed: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      averageResponseTime: 0
    }
  };
}