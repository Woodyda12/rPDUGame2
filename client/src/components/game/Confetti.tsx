import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useGame } from "@/lib/stores/useGame";

export function Confetti() {
  const phase = useGame((state) => state.phase);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (phase !== "success") return null;
  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={300}
      recycle={false}
    />
  );
}
