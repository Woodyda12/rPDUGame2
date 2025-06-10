import React, { useState } from "react";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

export default function ROT13Puzzle() {
  const { solvePuzzle, solved } = useEscapeRoom();
  const [input, setInput] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInput(value);
    
    if (value === "748") {
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
    <div className="border border-purple-500 p-2 bg-black bg-opacity-90 rounded">
      <div className="text-purple-400 text-sm mb-1 font-mono">Error Code: 748</div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="w-16 px-1 text-purple-400 text-sm bg-black border border-gray-600 font-mono"
        placeholder="???"
      />
      <div className="text-xs text-gray-400 mt-1">Decode to resolve</div>
    </div>
  );
}
