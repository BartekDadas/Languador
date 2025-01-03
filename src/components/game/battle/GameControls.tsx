import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { useState } from 'react';
import { SettingsModal } from '../ui/SettingsModal';

interface GameControlsProps {
  onReset: () => void;
  onPause: () => void;
  onFinishGame: () => void;
  isPaused: boolean;
}

export function GameControls({ onReset, onPause, onFinishGame, isPaused }: GameControlsProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <button
          onClick={onPause}
          className="flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
          title={isPaused ? 'Resume' : 'Pause'}
        >
          {isPaused ? (
            <Play className="w-6 h-6" />
          ) : (
            <Pause className="w-6 h-6" />
          )}
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
          title="Reset Game"
        >
          <RotateCcw className="w-6 h-6" />
        </button>

        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
          title="Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onFinishGame={() => {
            setShowSettings(false);
            onFinishGame();
          }}
        />
      )}
    </>
  );
}