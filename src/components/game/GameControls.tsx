import { Play, Pause, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isPlaying: boolean;
}

export function GameControls({ onStart, onPause, onReset, isPlaying }: GameControlsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={isPlaying ? onPause : onStart}
        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        {isPlaying ? (
          <><Pause className="w-4 h-4 mr-2" /> Pause</>
        ) : (
          <><Play className="w-4 h-4 mr-2" /> Start</>
        )}
      </button>
      <button
        onClick={onReset}
        className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        <RotateCcw className="w-4 h-4 mr-2" /> Reset
      </button>
    </div>
  );
}