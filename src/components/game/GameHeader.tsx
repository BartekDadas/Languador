import { useGameStore } from '../../store/gameStore';
import { LogOut } from 'lucide-react';
import { auth } from '../../lib/firebase';

export function GameHeader() {
  const player = useGameStore((state) => state.player);

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-3">
        {player?.photoURL && (
          <img
            src={player.photoURL}
            alt={player.name}
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="font-medium text-gray-800">{player?.name}</span>
      </div>
      <button
        onClick={() => auth.signOut()}
        className="flex items-center text-gray-600 hover:text-gray-800"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
}