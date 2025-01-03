import { create } from 'zustand';
import type { GameRoom, Player, GameSession } from '../types/game';
import { auth } from '../lib/firebase';
import { getDisplayName } from '../lib/auth';
import { createGuestId, createGuestPlayer, initializeGameSession } from '../lib/mockSession';

interface GameState {
  currentRoom: GameRoom | null;
  player: Player | null;
  gameSession: GameSession | null;
  setRoom: (room: GameRoom | null) => void;
  setPlayer: (player: Player | null) => void;
  updateScore: (playerId: string, newScore: number) => void;
  initializePlayer: () => void;
  initializeSession: () => void;
  resetSession: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentRoom: null,
  player: null,
  gameSession: null,
  setRoom: (room) => set({ currentRoom: room }),
  setPlayer: (player) => set({ player }),
  updateScore: (playerId, newScore) =>
    set((state) => ({
      currentRoom: state.currentRoom
        ? {
            ...state.currentRoom,
            players: state.currentRoom.players.map((p) =>
              p.id === playerId ? { ...p, score: newScore } : p
            ),
          }
        : null,
    })),
  initializePlayer: () => {
    const user = auth.currentUser;
    if (user) {
      const guestId = createGuestId();
      const player = createGuestPlayer(guestId);
      set({ 
        player: {
          ...player,
          id: user.uid,
          name: getDisplayName(user),
          photoURL: user.photoURL || undefined,
        }
      });
    }
  },
  initializeSession: () => {
    set((state) => {
      if (!state.player) {
        const guestId = createGuestId();
        const player = createGuestPlayer(guestId);
        const session = initializeGameSession(player);
        return { player, gameSession: session };
      }
      const session = initializeGameSession(state.player);
      return { gameSession: session };
    });
  },
  resetSession: () => {
    set((state) => ({
      gameSession: state.player ? initializeGameSession(state.player) : null
    }));
  },
}));