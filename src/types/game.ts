export interface GameState {
  playerHealth: number;
  aiHealth: number;
  level: number;
  topic: Topic;
  score: number;
  playerCombo: number;
  playerPowerUps: PowerUp[];
  aiLevel: number;
  aiMood: AIMood;
  timeLeft: number;
  currentQuestion: Question;
  currentOptions: string[];
}

export interface GameSession {
  id: string;
  startTime: number;
  player: Player;
  currentRound: number;
  maxRounds: number;
  status: 'waiting' | 'active' | 'completed';
  score: number;
  position: { x: number; y: number };
  inventory: InventoryItem[];
  statistics: GameStatistics;
}

export interface Player {
  id: string;
  name: string;
  photoURL?: string;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  level: number;
  inventory: InventoryItem[];
  statistics: PlayerStatistics;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

export interface GameStatistics {
  roundsPlayed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageResponseTime: number;
}

export interface PlayerStatistics {
  gamesPlayed: number;
  totalScore: number;
  averageScore: number;
  winRate: number;
}

export interface Question {
  id: string;
  text: string;
  prompt: string;
  answer: string;
  difficulty: number;
  options?: string[];
}

export interface PowerUp {
  id: string;
  name: string;
  icon: string;
  effect: string;
}

export interface Word {
  id: string;
  english: string;
  spanish: string;
  difficulty: number;
  topicId: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: number;
}

export type AIMood = 'neutral' | 'impressed' | 'challenging' | 'encouraging';

export interface GameRoom {
  id: string;
  players: Player[];
  currentWord?: Word;
  options?: string[];
  timer: number;
  status: 'waiting' | 'active' | 'completed';
}