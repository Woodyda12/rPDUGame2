import React, { useState } from "react";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

export default function SliderPuzzle() {
  const { solvePuzzle, solved } = useEscapeRoom();
  const [value, setValue] = useState(0);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    
    // Check if close to 42
    if (Math.abs(newValue - 42) <= 1) {
      solvePuzzle(3);
    }
  };

  if (solved[3]) {
    return (
      <div className="border border-green-500 p-2 bg-green-900 bg-opacity-90 rounded">
        <span className="text-green-400">✓ Power Level Calibrated</span>
      </div>
    );
  }

  return (
    <div className="border border-orange-500 p-2 bg-black bg-opacity-90 rounded hover:bg-opacity-100 transition-all duration-200 cursor-pointer">
      <div className="text-orange-400 text-sm mb-1 font-mono">Power Level: {value}%</div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-32 accent-orange-500 cursor-pointer hover:accent-orange-400 transition-colors duration-200"
      />
      <div className="text-xs text-gray-400 mt-1">Target: 42%</div>
    </div>
  );
}
