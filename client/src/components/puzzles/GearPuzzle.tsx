import React, { useState } from "react";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

export default function GearPuzzle() {
  const { solvePuzzle, solved } = useEscapeRoom();
  const [gear1Placed, setGear1Placed] = useState(false);
  const [gear2Placed, setGear2Placed] = useState(false);
  
  const handleDragStart = (e: React.DragEvent, gearId: string) => {
    e.dataTransfer.setData("text/plain", gearId);
  };
  
  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    const gearId = e.dataTransfer.getData("text/plain");
    
    let newGear1Placed = gear1Placed;
    let newGear2Placed = gear2Placed;
    
    if (slotId === "slot1" && gearId === "gear1") {
      setGear1Placed(true);
      newGear1Placed = true;
    } else if (slotId === "slot2" && gearId === "gear2") {
      setGear2Placed(true);
      newGear2Placed = true;
    }
    
    // Check if both gears are now placed
    if (newGear1Placed && newGear2Placed) {
      solvePuzzle(4);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (solved[4]) {
    return (
      <div className="border border-green-500 p-2 bg-green-900 bg-opacity-90 rounded">
        <span className="text-green-400">✓ Tools Installed</span>
      </div>
    );
  }

  return (
    <div className="border border-blue-500 p-2 bg-black bg-opacity-90 rounded hover:bg-opacity-100 transition-all duration-200 cursor-pointer">
      <div className="text-blue-400 text-sm mb-2 font-mono">Install Tools:</div>
      <div className="flex gap-2 mb-2">
        {!gear1Placed && (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, "gear1")}
            className="text-xl cursor-grab select-none bg-gray-700 px-2 py-1 rounded border border-gray-500 text-white hover:bg-gray-600 hover:scale-105 transition-all duration-200"
          >
            🔧
          </div>
        )}
        {!gear2Placed && (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, "gear2")}
            className="text-xl cursor-grab select-none bg-gray-700 px-2 py-1 rounded border border-gray-500 text-white hover:bg-gray-600 hover:scale-105 transition-all duration-200"
          >
            🔌
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <div
          onDrop={(e) => handleDrop(e, "slot1")}
          onDragOver={handleDragOver}
          className="w-12 h-10 border border-dashed border-blue-400 flex items-center justify-center bg-gray-800 rounded text-xs text-gray-400 hover:border-blue-300 hover:bg-gray-700 transition-all duration-200"
        >
          {gear1Placed ? <span className="text-lg">🔧</span> : "TOOL"}
        </div>
        <div
          onDrop={(e) => handleDrop(e, "slot2")}
          onDragOver={handleDragOver}
          className="w-12 h-10 border border-dashed border-blue-400 flex items-center justify-center bg-gray-800 rounded text-xs text-gray-400 hover:border-blue-300 hover:bg-gray-700 transition-all duration-200"
        >
          {gear2Placed ? <span className="text-lg">🔌</span> : "PWR"}
        </div>
      </div>
    </div>
  );
}
