import { Trophy, Clock } from 'lucide-react';

interface GameHeaderProps {
  level: number;
  topic: string;
  score: number;
  isPaused: boolean;
  onPause: () => void;
}

export function GameHeader({ level, topic, score, isPaused }: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <div className="text-white">
          <div className="text-sm opacity-80">Level {level}</div>
          <div className="font-semibold">{topic}</div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-medium">
            {isPaused ? 'PAUSED' : 'IN PROGRESS'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">{score}</span>
        </div>
      </div>
    </div>
  );
}