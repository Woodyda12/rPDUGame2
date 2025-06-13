// NOTE: client/src/components/ui/HintSystem.tsx - See README for details.
import React, { useState } from "react";
import { useGame } from "../../lib/stores/useGame";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

const HINTS = {
  0: "Mathematics controls the switch. Use the circular constant to reset.",
  1: "Patch the whip by following the standard color order.",
  2: "Tap the old phase meter to balance the load.",
  3: "Set the replacement fuse to the meaning of life percent.",
  4: "Jump the safety link with the correct connectors.",
  5: "Decode the reboot string on the controller display."
};

export default function HintSystem() {
  const { useHint, timeLeft, hintsUsed } = useGame();
  const { solved } = useEscapeRoom();
  const [activeHint, setActiveHint] = useState<number | null>(null);

  const getAvailableHints = () => {
    return Object.keys(HINTS)
      .map(Number)
      .filter(puzzleIndex => !solved[puzzleIndex]);
  };

  const handleHintRequest = (puzzleIndex: number) => {
    if (timeLeft > 60) {
      useHint();
      setActiveHint(puzzleIndex);
      setTimeout(() => setActiveHint(null), 8000); // Hide hint after 8 seconds
    }
  };

  const availableHints = getAvailableHints();

  if (availableHints.length === 0) return null;

  return (
    <div className="absolute top-4 right-20 max-w-xs pointer-events-auto">
      <div className="bg-gray-800 bg-opacity-90 border border-yellow-500 p-3 rounded font-mono text-sm">
        <div className="text-yellow-400 mb-2 text-center">Hint System</div>
        <div className="text-xs text-gray-400 mb-2 text-center">
          Cost: 1 minute per hint
        </div>
        
        {activeHint !== null && (
          <div className="mb-3 p-2 bg-yellow-900 bg-opacity-50 border border-yellow-600 rounded">
            <div className="text-yellow-300 text-xs font-bold mb-1">HINT:</div>
            <div className="text-yellow-100 text-xs">{HINTS[activeHint as keyof typeof HINTS]}</div>
          </div>
        )}
        
        <div className="space-y-1">
          {availableHints.map(puzzleIndex => (
            <button
              key={puzzleIndex}
              onClick={() => handleHintRequest(puzzleIndex)}
              disabled={timeLeft <= 60}
              className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                timeLeft <= 60 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-yellow-700 hover:bg-yellow-600 text-yellow-100 cursor-pointer'
              }`}
            >
              {puzzleIndex === 0 && "Reset Breaker"}
              {puzzleIndex === 1 && "Repatch Whip"}
              {puzzleIndex === 2 && "Balance Phases"}
              {puzzleIndex === 3 && "Replace Fuse"}
              {puzzleIndex === 4 && "Bypass EPO"}
              {puzzleIndex === 5 && "Reboot Controller"}
            </button>
          ))}
        </div>
        
        <div className="text-xs text-gray-400 mt-2 text-center">
          Hints used: {hintsUsed}
        </div>
      </div>
    </div>
  );
}