import { useCallback } from 'react';

const SOUND_EFFECTS = {
  correct: '/sounds/correct.mp3',
  incorrect: '/sounds/incorrect.mp3',
  attack: '/sounds/attack.mp3',
  powerup: '/sounds/powerup.mp3',
} as const;

export function useSoundEffects() {
  const playSound = useCallback((effect: keyof typeof SOUND_EFFECTS) => {
    const audio = new Audio(SOUND_EFFECTS[effect]);
    audio.play().catch(error => {
      console.warn('Sound playback failed:', error);
    });
  }, []);

  return { playSound };
}