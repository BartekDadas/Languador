import { useGameStore } from '../../store/gameStore';
import { Trophy, Target, X as XIcon } from 'lucide-react';

export function GameStats() {
  const player = useGameStore((state) => state.player);
  const currentRoom = useGameStore((state) => state.currentRoom);

  const correctAnswers = currentRoom?.players.find(p => p.id === player?.id)?.correctAnswers || 0;
  const incorrectAnswers = currentRoom?.players.find(p => p.id === player?.id)?.incorrectAnswers || 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Stats</h3>
        <Trophy className="w-5 h-5 text-yellow-500" />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Score</span>
          <span className="font-medium text-lg">{player?.score || 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center">
            <Target className="w-4 h-4 mr-1 text-green-500" />
            Correct
          </span>
          <span className="font-medium text-green-600">{correctAnswers}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center">
            <XIcon className="w-4 h-4 mr-1 text-red-500" />
            Incorrect
          </span>
          <span className="font-medium text-red-600">{incorrectAnswers}</span>
        </div>
      </div>
    </div>
  );
}