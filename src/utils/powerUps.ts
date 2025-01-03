import type { PowerUp } from '../types/game';

export const POWER_UPS: PowerUp[] = [
  {
    id: 'time-boost',
    name: 'Time Boost',
    icon: 'clock',
    effect: 'Extra time for current question',
  },
  {
    id: 'shield',
    name: 'Shield',
    icon: 'shield',
    effect: 'Prevent health loss on next mistake',
  },
  {
    id: 'double-damage',
    name: 'Double Damage',
    icon: 'zap',
    effect: 'Deal double damage on next correct answer',
  },
  {
    id: 'hint',
    name: 'Hint',
    icon: 'brain',
    effect: 'Remove two incorrect options',
  },
];