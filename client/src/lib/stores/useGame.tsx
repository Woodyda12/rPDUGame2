// NOTE: client/src/lib/stores/useGame.tsx - See README for details.
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "title" | "playing" | "success" | "failure";

interface GameState {
  phase: GamePhase;
  timeLeft: number; // in seconds
  hintsUsed: number;
  
  // Actions
  start: () => void;
  restart: () => void;
  end: (success: boolean) => void;
  tick: () => void;
  useHint: () => void;
}

export const useGame = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    phase: "title",
    timeLeft: 600, // 10 minutes in seconds
    hintsUsed: 0,
    
    start: () => set({ phase: "playing", timeLeft: 600, hintsUsed: 0 }),
    restart: () => set({ phase: "title", timeLeft: 600, hintsUsed: 0 }),
    end: (success: boolean) => set({ phase: success ? "success" : "failure" }),
    useHint: () => {
      const state = get();
      if (state.phase === "playing" && state.timeLeft > 60) {
        set({ 
          timeLeft: state.timeLeft - 60, // Reduce by 1 minute
          hintsUsed: state.hintsUsed + 1 
        });
      }
    },
    tick: () => {
      const state = get();
      if (state.phase === "playing" && state.timeLeft > 0) {
        const newTimeLeft = state.timeLeft - 1;
        if (newTimeLeft <= 0) {
          set({ timeLeft: 0, phase: "failure" });
        } else {
          set({ timeLeft: newTimeLeft });
        }
      }
    }
  }))
);
