// NOTE: client/src/components/ui/SequenceIndicator.tsx - See README for details.
import React from "react";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

function SequenceIndicator() {
  const { colorSequence, solved } = useEscapeRoom();
  
  if (solved[1]) return null;

  const targetSequence = ["r", "g", "b", "y"];
  const colorNames = { r: "Red", g: "Green", b: "Blue", y: "Yellow" };
  const colorClasses = { 
    r: "bg-red-500", 
    g: "bg-green-500", 
    b: "bg-blue-500", 
    y: "bg-yellow-500" 
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
      <div className="bg-gray-800 bg-opacity-90 border border-gray-500 p-2 rounded font-mono text-xs">
        <div className="text-gray-400 mb-1 text-center">Activation Sequence</div>
        <div className="flex gap-1">
          {targetSequence.map((targetColor, index) => {
            const isActive = index < colorSequence.length;
            const isCorrect = isActive && colorSequence[index] === targetColor;
            const isWrong = isActive && colorSequence[index] !== targetColor;
            
            return (
              <div
                key={index}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center text-xs font-bold ${
                  isCorrect 
                    ? `${colorClasses[targetColor as keyof typeof colorClasses]} border-white text-white` 
                    : isWrong
                    ? "bg-red-600 border-red-400 text-white"
                    : "bg-gray-700 border-gray-500 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <div className="text-xs text-gray-500 mt-1 text-center">
          Progress: {colorSequence.length}/4
        </div>
      </div>
    </div>
  );
}

export default React.memo(SequenceIndicator);
