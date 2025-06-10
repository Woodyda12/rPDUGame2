import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "title" | "playing" | "success" | "failure";

interface GameState {
  phase: GamePhase;
  timeLeft: number; // in seconds
  
  // Actions
  start: () => void;
  restart: () => void;
  end: (success: boolean) => void;
  tick: () => void;
}

export const useGame = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    phase: "title",
    timeLeft: 600, // 10 minutes in seconds
    
    start: () => set({ phase: "playing", timeLeft: 600 }),
    restart: () => set({ phase: "title", timeLeft: 600 }),
    end: (success: boolean) => set({ phase: success ? "success" : "failure" }),
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
