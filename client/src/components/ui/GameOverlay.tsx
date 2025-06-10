// NOTE: client/src/components/ui/GameOverlay.tsx - See README for details.
import React from "react";
import KeypadPuzzle from "../puzzles/KeypadPuzzle";
import SliderPuzzle from "../puzzles/SliderPuzzle";
import GearPuzzle from "../puzzles/GearPuzzle";
import ROT13Puzzle from "../puzzles/ROT13Puzzle";
import HintSystem from "./HintSystem";
import SequenceIndicator from "./SequenceIndicator";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

function GameOverlay() {
  const { solved, startTime, isComplete } = useEscapeRoom();
  
  const completionTime = isComplete ? Math.floor((Date.now() - startTime) / 1000) : 0;

  return (
    <div 
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{
        maxWidth: '800px',
        maxHeight: '600px',
        margin: '0 auto',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {/* Puzzle UI Elements */}
      <div className="relative w-full h-full">
        
        {/* Control Panels - Bottom Right */}
        <div className="absolute bottom-4 right-4 space-y-2 pointer-events-auto">
          <SliderPuzzle />
          <GearPuzzle />
          <ROT13Puzzle />
        </div>
        
        {/* Access Panel - Bottom Left */}
        <div className="absolute bottom-4 left-4 pointer-events-auto">
          <KeypadPuzzle />
        </div>
        
        {/* PDU Status Display */}
        <div className="absolute top-4 left-4 pointer-events-auto">
          <div className="bg-black bg-opacity-90 border border-gray-600 p-3 rounded font-mono text-sm">
            <div className="text-yellow-400 mb-2">PDU Status:</div>
            <div className="space-y-1">
              <div className={`${solved[0] ? 'text-green-400' : 'text-red-400'}`}>
                ACCESS: {solved[0] ? 'UNLOCKED' : 'LOCKED'}
              </div>
              <div className={`${solved[1] ? 'text-green-400' : 'text-red-400'}`}>
                SEQUENCE: {solved[1] ? 'COMPLETE' : 'PENDING'}
              </div>
              <div className={`${solved[2] ? 'text-green-400' : 'text-red-400'}`}>
                NETWORK: {solved[2] ? 'ONLINE' : 'OFFLINE'}
              </div>
              <div className={`${solved[3] ? 'text-green-400' : 'text-red-400'}`}>
                POWER: {solved[3] ? 'STABLE' : 'UNSTABLE'}
              </div>
              <div className={`${solved[4] ? 'text-green-400' : 'text-red-400'}`}>
                TOOLS: {solved[4] ? 'READY' : 'MISSING'}
              </div>
              <div className={`${solved[5] ? 'text-green-400' : 'text-red-400'}`}>
                DIAG: {solved[5] ? 'CLEAR' : 'ERROR'}
              </div>
            </div>
          </div>
        </div>
        
        <SequenceIndicator />
        <HintSystem />
      </div>
    </div>
  );
}

export default React.memo(GameOverlay);
