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
          <div className="bg-gray-800 bg-opacity-90 border border-gray-500 p-3 rounded font-mono text-sm">
            <div className="text-yellow-400 mb-2">PDU Tasks:</div>
            <div className="space-y-1">
              <div className={`${solved[0] ? 'text-green-400' : 'text-red-400'}`}> 
                BREAKER: {solved[0] ? 'RESET' : 'TRIPPED'}
              </div>
              <div className={`${solved[1] ? 'text-green-400' : 'text-red-400'}`}> 
                WHIP: {solved[1] ? 'PATCHED' : 'FAULT'}
              </div>
              <div className={`${solved[2] ? 'text-green-400' : 'text-red-400'}`}> 
                PHASES: {solved[2] ? 'BALANCED' : 'IMBALANCED'}
              </div>
              <div className={`${solved[3] ? 'text-green-400' : 'text-red-400'}`}> 
                FUSE: {solved[3] ? 'REPLACED' : 'BLOWN'}
              </div>
              <div className={`${solved[4] ? 'text-green-400' : 'text-red-400'}`}> 
                EPO: {solved[4] ? 'BYPASSED' : 'ACTIVE'}
              </div>
              <div className={`${solved[5] ? 'text-green-400' : 'text-red-400'}`}> 
                CTRL: {solved[5] ? 'ONLINE' : 'OFFLINE'}
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
