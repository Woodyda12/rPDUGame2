// NOTE: client/src/components/EscapeRoom.tsx - See README for details.
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, lazy } from "react";

// Lazy load heavier components to reduce initial bundle size
const Scene3D = lazy(() => import("./Scene3D"));
const GameOverlay = lazy(() => import("./ui/GameOverlay"));
import TitleScreen from "./ui/TitleScreen";
import EndScreen from "./ui/EndScreen";
import Timer from "./ui/Timer";
import { useEscapeRoom } from "../lib/stores/useEscapeRoom";
import { useAudio } from "../lib/stores/useAudio";
import { useGame } from "../lib/stores/useGame";

export default function EscapeRoom() {
  const { solved } = useEscapeRoom();
  const { playSuccess } = useAudio();
  const { phase, end } = useGame();

  useEffect(() => {
    // Check if all puzzles are solved
    if (phase === "playing" && solved.every(Boolean)) {
      playSuccess();
      end(true);
    }
  }, [solved, playSuccess, phase, end]);

  if (phase === "title") {
    return <TitleScreen />;
  }

  if (phase === "success" || phase === "failure") {
    return <EndScreen />;
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative',
      backgroundImage: 'url(/datacenter-bg.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
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
          background: 'rgba(34, 34, 34, 0.7)'
        }}
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
      
      <Timer />
      <Suspense fallback={null}>
        <GameOverlay />
      </Suspense>
    </div>
  );
}
