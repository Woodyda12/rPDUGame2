import { useState } from "react";
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
      <div className="border border-green-500 p-2 bg-green-100 rounded">
        <span className="text-green-800">✓ ROT13 Solved</span>
      </div>
    );
  }

  return (
    <div className="border border-gray-500 p-2 bg-black bg-opacity-80 rounded">
      <div className="text-white text-sm mb-1">Note ROT13: 748</div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="w-16 px-1 text-black text-sm"
        placeholder="???"
      />
    </div>
  );
}
