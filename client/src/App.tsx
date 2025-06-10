import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import EscapeRoom from "./components/EscapeRoom";
import "@fontsource/inter";

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <EscapeRoom />
      </Suspense>
    </div>
  );
}

export default App;
