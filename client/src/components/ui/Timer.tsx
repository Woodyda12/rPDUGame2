// NOTE: client/src/components/ui/Timer.tsx - See README for details.
import React, { useEffect } from "react";
import { useGame } from "../../lib/stores/useGame";

export default function Timer() {
  const { phase, timeLeft, tick } = useGame();

  useEffect(() => {
    if (phase === "playing") {
      const interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, tick]);

  if (phase !== "playing") return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft <= 120; // Last 2 minutes

  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg border-2 font-mono text-lg font-bold ${
      isLowTime 
        ? 'bg-red-900 border-red-500 text-red-200 animate-pulse'
        : 'bg-gray-800 border-blue-500 text-blue-200'
    }`}>
      <div className="flex items-center gap-2">
        <span className="text-sm">⏱</span>
        <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
}