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
      <div className="border border-green-500 p-2 bg-green-100 rounded">
        <span className="text-green-800">✓ Slider Solved</span>
      </div>
    );
  }

  return (
    <div className="border border-gray-500 p-2 bg-black bg-opacity-80 rounded">
      <div className="text-white text-sm mb-1">Slider: {value}</div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-30"
      />
    </div>
  );
}
