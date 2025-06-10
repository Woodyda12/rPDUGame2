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
    
    if (slotId === "slot1" && gearId === "gear1") {
      setGear1Placed(true);
    } else if (slotId === "slot2" && gearId === "gear2") {
      setGear2Placed(true);
    }
    
    // Check if both gears are placed after this drop
    
    if ((slotId === "slot1" && gearId === "gear1" && gear2Placed) ||
        (slotId === "slot2" && gearId === "gear2" && gear1Placed)) {
      solvePuzzle(4);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (solved[4]) {
    return (
      <div className="border border-green-500 p-2 bg-green-100 rounded">
        <span className="text-green-800">✓ Gears Solved</span>
      </div>
    );
  }

  return (
    <div className="border border-gray-500 p-2 bg-black bg-opacity-80 rounded">
      <div className="text-white text-sm mb-2">Drag gears to slots:</div>
      <div className="flex gap-2 mb-2">
        {!gear1Placed && (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, "gear1")}
            className="text-2xl cursor-grab select-none"
          >
            ⚙️
          </div>
        )}
        {!gear2Placed && (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, "gear2")}
            className="text-2xl cursor-grab select-none"
          >
            ⚙️
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <div
          onDrop={(e) => handleDrop(e, "slot1")}
          onDragOver={handleDragOver}
          className="w-10 h-10 border border-dashed border-gray-400 flex items-center justify-center"
        >
          {gear1Placed && <span className="text-2xl">⚙️</span>}
        </div>
        <div
          onDrop={(e) => handleDrop(e, "slot2")}
          onDragOver={handleDragOver}
          className="w-10 h-10 border border-dashed border-gray-400 flex items-center justify-center"
        >
          {gear2Placed && <span className="text-2xl">⚙️</span>}
        </div>
      </div>
    </div>
  );
}
