import React, { useState } from "react";
import { useGame } from "../../lib/stores/useGame";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

const HINTS = {
  0: "The PDU access code is π (pi) rounded to 3 digits: 3.14",
  1: "Click the server components in this order: Red, Green, Blue, Yellow",
  2: "Click on the network monitoring panel to establish connection",
  3: "Adjust the power level slider to exactly 42% for optimal PDU performance",
  4: "Drag the wrench tool to TOOL slot and power connector to PWR slot",
  5: "Error code 748 is the same number - just enter 748 to clear the diagnostic"
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
    <div className="absolute top-20 right-4 max-w-xs pointer-events-auto">
      <div className="bg-black bg-opacity-90 border border-yellow-500 p-3 rounded font-mono text-sm">
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
              {puzzleIndex === 0 && "PDU Access"}
              {puzzleIndex === 1 && "Sequence"}
              {puzzleIndex === 2 && "Network"}
              {puzzleIndex === 3 && "Power Level"}
              {puzzleIndex === 4 && "Tools"}
              {puzzleIndex === 5 && "Diagnostics"}
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