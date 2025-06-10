import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface EscapeRoomState {
  solved: boolean[];
  colorSequence: string[];
  startTime: number;
  isComplete: boolean;
  
  // Actions
  solvePuzzle: (puzzleIndex: number) => void;
  addColorToSequence: (color: string) => void;
  reset: () => void;
}

export const useEscapeRoom = create<EscapeRoomState>()(
  subscribeWithSelector((set, get) => ({
    solved: [false, false, false, false, false, false], // 6 puzzles total
    colorSequence: [],
    startTime: Date.now(),
    isComplete: false,
    
    solvePuzzle: (puzzleIndex: number) => {
      set((state) => {
        if (state.solved[puzzleIndex]) return state; // Already solved
        
        const newSolved = [...state.solved];
        newSolved[puzzleIndex] = true;
        
        // Check if all puzzles are now solved
        const isComplete = newSolved.every(Boolean);
        
        return {
          solved: newSolved,
          isComplete
        };
      });
    },
    
    addColorToSequence: (color: string) => {
      set((state) => {
        const newSequence = [...state.colorSequence, color];
        
        // Check if sequence matches the target: "rgby"
        const targetSequence = "rgby";
        const currentSequenceStr = newSequence.join("");
        
        // If sequence is getting too long or doesn't match start of target, reset
        if (newSequence.length > 4 || !targetSequence.startsWith(currentSequenceStr)) {
          if (currentSequenceStr === targetSequence) {
            // Sequence is correct! Solve puzzle 1
            const newSolved = [...state.solved];
            newSolved[1] = true;
            const isComplete = newSolved.every(Boolean);
            
            return {
              colorSequence: [],
              solved: newSolved,
              isComplete
            };
          } else {
            // Reset sequence if it doesn't match
            return { colorSequence: [] };
          }
        }
        
        // Check if we completed the sequence
        if (currentSequenceStr === targetSequence) {
          const newSolved = [...state.solved];
          newSolved[1] = true;
          const isComplete = newSolved.every(Boolean);
          
          return {
            colorSequence: [],
            solved: newSolved,
            isComplete
          };
        }
        
        return { colorSequence: newSequence };
      });
    },
    
    reset: () => {
      set({
        solved: [false, false, false, false, false, false],
        colorSequence: [],
        startTime: Date.now(),
        isComplete: false
      });
    }
  }))
);
