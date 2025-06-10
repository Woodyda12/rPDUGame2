import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import Scene3D from "./Scene3D";
import GameOverlay from "./ui/GameOverlay";
import { useEscapeRoom } from "../lib/stores/useEscapeRoom";
import { useAudio } from "../lib/stores/useAudio";

export default function EscapeRoom() {
  const { solved, checkComplete } = useEscapeRoom();
  const { playSuccess } = useAudio();

  useEffect(() => {
    // Check if all puzzles are solved
    if (solved.every(Boolean)) {
      playSuccess();
    }
  }, [solved, playSuccess]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{
          position: [0, 1.6, 5],
          fov: 70,
          near: 0.1,
          far: 100
        }}
        style={{
          width: '800px',
          height: '600px',
          maxWidth: '100%',
          maxHeight: '100%',
          margin: '0 auto',
          display: 'block',
          background: '#000'
        }}
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
      
      <GameOverlay />
    </div>
  );
}
