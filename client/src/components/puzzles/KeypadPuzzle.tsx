import React, { useState } from "react";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

export default function KeypadPuzzle() {
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
      <div className="border border-green-500 p-2 bg-green-100 rounded">
        <span className="text-green-800">✓ Keypad Solved</span>
      </div>
    );
  }

  return (
    <div className="border border-gray-500 p-2 bg-black bg-opacity-80 rounded">
      <div className="text-white text-sm mb-2">Keypad Code:</div>
      <div className="flex gap-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-16 px-1 text-black text-sm"
          maxLength={3}
          placeholder="000"
        />
        <button
          onClick={handleSubmit}
          className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
