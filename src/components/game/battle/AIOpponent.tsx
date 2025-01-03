import { Bot, Brain } from 'lucide-react';
import { HealthBar } from '../ui/HealthBar';
import { useLocaleStore } from '../../../store/localeStore';
import type { AIMood } from '../../../types/game';
import './AIOpponent.css';

interface AIOpponentProps {
  health: number;
  level: number;
  mood: AIMood;
}

export function AIOpponent({ health, level, mood }: AIOpponentProps) {
  const t = useLocaleStore((state) => state.t);

  return (
    <div className="ai-opponent-container">
      <div className="ai-character">
        <div className="ai-model">
          <div className="ai-head">
            <Bot className="w-12 h-12 text-yellow-400" />
          </div>
          <div className="ai-body">
            <div className="ai-core">
              <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="ai-platform" />
        
        <div className="ai-stats">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">
              {t('game.languageMaster')}
            </h2>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400">
                {t('game.level')} {level}
              </span>
            </div>
          </div>
          <HealthBar value={health} maxValue={100} />
        </div>

        <div className="ai-mood">
          <div className="relative">
            <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-800 rotate-45" />
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-white text-sm">{getMoodMessage(mood)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMoodMessage(mood: AIMood): string {
  switch (mood) {
    case 'impressed':
      return "¡Excelente! Keep it up!";
    case 'challenging':
      return "¿Estás listo? Let's make it harder!";
    case 'encouraging':
      return "¡Tú puedes! Try again!";
    default:
      return "¡Vamos a practicar!";
  }
}