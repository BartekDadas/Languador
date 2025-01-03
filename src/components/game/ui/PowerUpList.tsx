import { Shield, Zap, Clock, Brain } from 'lucide-react';
import type { PowerUp } from '../../../types/game';

interface PowerUpListProps {
  items: PowerUp[];
}

export function PowerUpList({ items }: PowerUpListProps) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'shield':
        return <Shield className="w-5 h-5" />;
      case 'zap':
        return <Zap className="w-5 h-5" />;
      case 'clock':
        return <Clock className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-1 bg-white/10 rounded-full px-3 py-1"
          title={item.effect}
        >
          <span className="text-white/80">{getIcon(item.icon)}</span>
          <span className="text-sm text-white">{item.name}</span>
        </div>
      ))}
    </div>
  );
}