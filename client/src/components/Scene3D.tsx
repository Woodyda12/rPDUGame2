import { useRef, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, Raycaster, Vector2, Color } from "three";
import { useEscapeRoom } from "../lib/stores/useEscapeRoom";

export default function Scene3D() {
  const { camera, gl } = useThree();
  const { solvePuzzle, addColorToSequence } = useEscapeRoom();
  
  // Object refs
  const keypadRef = useRef<Mesh>(null);
  const paintingRef = useRef<Mesh>(null);
  const redBoxRef = useRef<Mesh>(null);
  const greenBoxRef = useRef<Mesh>(null);
  const blueBoxRef = useRef<Mesh>(null);
  const yellowBoxRef = useRef<Mesh>(null);

  const raycaster = new Raycaster();
  const mouse = new Vector2();

  const handleClick = useCallback((event: MouseEvent) => {
    const canvas = gl.domElement;
    const rect = canvas.getBoundingClientRect();
    
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    const objects = [
      keypadRef.current,
      paintingRef.current,
      redBoxRef.current,
      greenBoxRef.current,
      blueBoxRef.current,
      yellowBoxRef.current
    ].filter(Boolean) as Mesh[];
    
    const intersects = raycaster.intersectObjects(objects);
    
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      
      if (clickedObject === keypadRef.current) {
        const code = prompt('Enter code:');
        if (code === '314') {
          solvePuzzle(0);
        }
      } else if (clickedObject === paintingRef.current) {
        solvePuzzle(2);
      } else if (clickedObject === redBoxRef.current) {
        addColorToSequence('r');
      } else if (clickedObject === greenBoxRef.current) {
        addColorToSequence('g');
      } else if (clickedObject === blueBoxRef.current) {
        addColorToSequence('b');
      } else if (clickedObject === yellowBoxRef.current) {
        addColorToSequence('y');
      }
    }
  }, [camera, gl, solvePuzzle, addColorToSequence]);

  useFrame(() => {
    // Animation loop - can add any continuous updates here
  });

  // Add click event listener
  React.useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handleClick);
    return () => canvas.removeEventListener('pointerdown', handleClick);
  }, [gl, handleClick]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={1} />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Keypad */}
      <mesh ref={keypadRef} position={[-2, 1, -1]}>
        <boxGeometry args={[0.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      
      {/* Color boxes */}
      <mesh ref={redBoxRef} position={[-1.5, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="red" />
      </mesh>
      
      <mesh ref={greenBoxRef} position={[-0.9, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="green" />
      </mesh>
      
      <mesh ref={blueBoxRef} position={[-0.3, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      
      <mesh ref={yellowBoxRef} position={[0.3, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      
      {/* Painting */}
      <mesh ref={paintingRef} position={[2, 1, -2]} rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
      
      {/* Gear posts */}
      <mesh position={[-1, 0.25, 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh position={[1, 0.25, 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </>
  );
}
