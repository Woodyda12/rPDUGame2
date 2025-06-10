// NOTE: client/src/components/ui/EndScreen.tsx - See README for details.
import React from "react";
import { useGame } from "../../lib/stores/useGame";

export default function EndScreen() {
  const { phase, timeLeft, restart } = useGame();
  
  const isSuccess = phase === "success";
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${
      isSuccess 
        ? 'bg-gradient-to-b from-green-800 via-blue-800 to-gray-900'
        : 'bg-gradient-to-b from-red-800 via-gray-800 to-gray-900'
    }`}>
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="bg-gray-800 bg-opacity-80 rounded-lg p-8 border-2 border-opacity-50"
             style={{ borderColor: isSuccess ? '#10b981' : '#ef4444' }}>
          
          <h1 className={`text-5xl font-bold mb-6 ${
            isSuccess ? 'text-green-400' : 'text-red-400'
          }`}>
            {isSuccess ? 'SUCCESS' : 'FAILURE'}
          </h1>
          
          <div className="mb-8">
            {isSuccess ? (
              <>
                <p className="text-2xl text-white mb-4">Power restored. Access granted.</p>
                <p className="text-lg text-green-300">
                  Time remaining: {minutes}:{seconds.toString().padStart(2, '0')}
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl text-white mb-4">Backup power depleted. System locked.</p>
                <p className="text-lg text-red-300">You're trapped.</p>
              </>
            )}
          </div>
          
          <button
            onClick={restart}
            className={`text-xl font-bold py-4 px-8 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 shadow-lg ${
              isSuccess 
                ? 'bg-green-600 hover:bg-green-700 text-white border-green-400' 
                : 'bg-gray-600 hover:bg-gray-700 text-white border-gray-400'
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}