// NOTE: client/src/components/puzzles/KeypadPuzzle.tsx - See README for details.
import React, { useState } from "react";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

function KeypadPuzzle() {
  const { solvePuzzle, solved } = useEscapeRoom();
  const [input, setInput] = useState("");
  
  const handleSubmit = () => {
    if (input === "314") {
      solvePuzzle(0);
      setInput("");
    } else {
      setInput("");
      alert("Incorrect code!");
    }
  };

  if (solved[0]) {
    return (
      <div className="border border-green-500 p-2 bg-green-900 bg-opacity-90 rounded">
        <span className="text-green-400">✓ Breaker Reset</span>
      </div>
    );
  }

  return (
    <div className="border border-red-500 p-2 bg-gray-800 bg-opacity-90 rounded hover:bg-opacity-100 transition-all duration-200 cursor-pointer">
      <div className="text-red-400 text-sm mb-2 font-mono">Breaker Reset Code:</div>
      <div className="flex gap-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-16 px-1 text-green-400 text-sm bg-gray-900 border border-gray-600 font-mono hover:border-green-500 transition-colors duration-200"
          maxLength={3}
          placeholder="000"
        />
        <button
          onClick={handleSubmit}
          className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 border border-red-400 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default React.memo(KeypadPuzzle);
