// NOTE: client/src/components/puzzles/ROT13Puzzle.tsx - See README for details.
import React, { useState } from "react";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

function ROT13Puzzle() {
  const { solvePuzzle, solved } = useEscapeRoom();
  const [input, setInput] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInput(value);
    
    if (value === "7738") {
      solvePuzzle(5);
    }
  };

  if (solved[5]) {
    return (
      <div className="border border-green-500 p-2 bg-green-900 bg-opacity-90 rounded">
        <span className="text-green-400">✓ Diagnostic Complete</span>
      </div>
    );
  }

  return (
    <div className="border border-purple-500 p-2 bg-gray-800 bg-opacity-90 rounded hover:bg-opacity-100 transition-all duration-200 cursor-pointer">
      <div className="text-purple-400 text-sm mb-1 font-mono">Error Code: RPDU</div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="w-20 px-1 text-purple-400 text-sm bg-gray-900 border border-gray-600 font-mono hover:border-purple-500 transition-colors duration-200 cursor-text"
        placeholder="????"
      />
      <div className="text-xs text-gray-400 mt-1">Decode to resolve</div>
    </div>
  );
}

export default React.memo(ROT13Puzzle);
