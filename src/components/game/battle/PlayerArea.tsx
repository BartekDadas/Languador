import { Shield, Zap } from 'lucide-react';
import { HealthBar } from '../ui/HealthBar';
import { ComboMeter } from '../ui/ComboMeter';
import { PowerUpList } from '../ui/PowerUpList';
import { useLocaleStore } from '../../../store/localeStore';
import type { PowerUp } from '../../../types/game';
import './PlayerArea.css';

interface PlayerAreaProps {
  health: number;
  combo: number;
  powerUps: PowerUp[];
}

export function PlayerArea({ health, combo, powerUps }: PlayerAreaProps) {
  const t = useLocaleStore((state) => state.t);

  return (
    <div className="player-container">
      <div className="player-character">
        <div className="player-model">
          <div className="player-avatar">
            <div className="player-head">
              <Shield className="w-12 h-12 text-blue-400" />
            </div>
            <div className="player-body">
              <div className="player-core">
                <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="player-platform" />
        </div>

        <div className="player-stats">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">
              {t('game.battleStation')}
            </h2>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-400">
                {t('game.combo')} x{combo}
              </span>
            </div>
          </div>
          <HealthBar value={health} maxValue={100} />
          
          <div className="mt-4 space-y-4">
            <ComboMeter value={combo} />
            <PowerUpList items={powerUps} />
          </div>
        </div>
      </div>
    </div>
  );
}