// NOTE: client/src/components/ui/TitleScreen.tsx - See README for details.
import React from "react";
import { useGame } from "../../lib/stores/useGame";

export default function TitleScreen() {
  const { start } = useGame();

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-blue-800 to-gray-900 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wide">
            Escape the Data Center
          </h1>
          <h2 className="text-2xl text-blue-300 font-semibold">
            A Rack PDU Repair Challenge
          </h2>
        </div>
        
        <div className="bg-gray-800 bg-opacity-70 rounded-lg p-8 mb-8 border border-blue-500">
          <h3 className="text-xl text-yellow-400 font-semibold mb-6">Instructions:</h3>
          
          <div className="text-left space-y-4 text-gray-200">
            <p className="text-lg">
              You're locked inside a secure data center.<br />
              The power system is failing — and the Rack PDU is the key to getting out.
            </p>
            
            <div className="space-y-2">
              <p>🛠 Resolve six power tasks to bring the rack online:</p>
              <p className="text-sm pl-4">1. Reset the breaker</p>
              <p className="text-sm pl-4">2. Repatch the whip</p>
              <p className="text-sm pl-4">3. Balance the phases</p>
              <p className="text-sm pl-4">4. Replace the blown fuse</p>
              <p className="text-sm pl-4">5. Bypass the EPO circuit</p>
              <p className="text-sm pl-4">6. Reboot the controller</p>
              <p>🔍 Hover over components to examine them.</p>
              <p>✅ Solve the issues in the correct order.</p>
              <p>⏱ You have 10 minutes before the backup power fails.</p>
              <p>🚪 Fix the PDU. Escape the room. Or stay locked inside forever.</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={start}
          className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-4 px-12 rounded-lg border-2 border-red-400 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Click to Begin
        </button>
      </div>
    </div>
  );
}