import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocaleStore } from '../../../store/localeStore';
import { Button } from '../../ui/Button';

interface VictoryModalProps {
  score: number;
  onClose: () => void;
}

export function VictoryModal({ score, onClose }: VictoryModalProps) {
  const navigate = useNavigate();
  const t = useLocaleStore((state) => state.t);

  const handlePlayAgain = () => {
    onClose();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background/90 backdrop-blur-md rounded-xl p-8 max-w-md w-full mx-4 transform animate-fadeIn border border-white/10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-6">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            {t('game.victory')}
          </h2>
          <p className="text-gray-300 mb-6">
            {t('game.languageMaster')}
          </p>
          
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 mb-6 border border-white/10">
            <p className="text-sm text-gray-300">{t('game.score')}</p>
            <p className="text-3xl font-bold text-yellow-400">{score}</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handlePlayAgain}
              className="w-full"
              variant="primary"
            >
              {t('game.start')}
            </Button>
            <Button
              onClick={handleGoHome}
              className="w-full"
              variant="outline"
            >
              {t('nav.learn')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}