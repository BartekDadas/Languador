import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useGameStore } from '../../store/gameStore';
import { GameBoard } from './GameBoard';
import { GameStats } from './GameStats';
import { GameControls } from './GameControls';

interface GamePanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export function GamePanel({ isVisible, onClose }: GamePanelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const initializeSession = useGameStore((state) => state.initializeSession);
  const gameSession = useGameStore((state) => state.gameSession);

  useEffect(() => {
    if (isVisible && !gameSession) {
      initializeSession();
      setIsLoading(false);
    }
  }, [isVisible, gameSession, initializeSession]);

  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    initializeSession();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="!p-2"
            aria-label="Close game panel"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {isLoading ? (
          <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <Card>
                <GameBoard isPlaying={isPlaying} />
              </Card>
            </div>

            <div className="space-y-4">
              <GameStats />
              <Card>
                <GameControls
                  isPlaying={isPlaying}
                  onStart={handleStart}
                  onPause={handlePause}
                  onReset={handleReset}
                />
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}