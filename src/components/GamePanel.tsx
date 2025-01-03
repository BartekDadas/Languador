import { useState } from 'react';
import { X } from 'lucide-react';
import { GameBoard } from './GameBoard';
import { GameControls } from './game/GameControls';
import { GameStats } from './game/GameStats';
import { GameHeader } from './game/GameHeader';

interface GamePanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export function GamePanel({ isVisible, onClose }: GamePanelProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    // Add reset logic here
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-100 transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="relative h-full max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Close game panel"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-full flex flex-col space-y-4">
          <GameHeader />

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-4 h-full">
                <GameBoard />
              </div>
            </div>

            <div className="space-y-4">
              <GameStats />
              <div className="bg-white rounded-lg shadow-md p-4">
                <GameControls
                  isPlaying={isPlaying}
                  onStart={handleStart}
                  onPause={handlePause}
                  onReset={handleReset}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}