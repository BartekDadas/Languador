import { useCallback } from 'react';

export function useAnimations() {
  const playAttackAnimation = useCallback((source: 'player' | 'ai') => {
    // Animation logic will be implemented here
    console.log(`Playing attack animation for ${source}`);
  }, []);

  const playDefenseAnimation = useCallback((source: 'player' | 'ai') => {
    // Animation logic will be implemented here
    console.log(`Playing defense animation for ${source}`);
  }, []);

  return {
    playAttackAnimation,
    playDefenseAnimation,
  };
}