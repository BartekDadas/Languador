import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useLocaleStore } from '../../store/localeStore';
import { Button } from '../ui/Button';
import { Timer } from '../ui/Timer';
import { MOCK_WORDS } from '../../data/mockWords';
import type { Word } from '../../types/game';

interface GameBoardProps {
  isPlaying: boolean;
}

export function GameBoard({ isPlaying }: GameBoardProps) {
  const t = useLocaleStore((state) => state.t);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const gameSession = useGameStore((state) => state.gameSession);

  // ... rest of the implementation remains the same ...

  if (!isPlaying) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t('game.ready')}
        </h2>
        <p className="text-gray-600">
          {t('game.readyDesc')}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{t('game.loading')}</p>
      </div>
    );
  }

  // ... rest of the render logic remains the same ...
}