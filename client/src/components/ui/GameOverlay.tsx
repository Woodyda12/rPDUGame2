import KeypadPuzzle from "../puzzles/KeypadPuzzle";
import SliderPuzzle from "../puzzles/SliderPuzzle";
import GearPuzzle from "../puzzles/GearPuzzle";
import ROT13Puzzle from "../puzzles/ROT13Puzzle";
import { useEscapeRoom } from "../../lib/stores/useEscapeRoom";

export default function GameOverlay() {
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
        
        {/* Slider Puzzle */}
        <div className="absolute top-2 left-2 pointer-events-auto">
          <SliderPuzzle />
        </div>
        
        {/* Gear Puzzle */}
        <div className="absolute top-16 left-2 pointer-events-auto">
          <GearPuzzle />
        </div>
        
        {/* ROT13 Puzzle */}
        <div className="absolute top-32 left-2 pointer-events-auto">
          <ROT13Puzzle />
        </div>
        
        {/* Success Message */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">🎉 Escaped! 🎉</h2>
              <p className="text-lg">
                Time: {completionTime} seconds
              </p>
              <p className="text-sm mt-2 text-gray-600">
                Screenshot this achievement!
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => window.location.reload()}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
