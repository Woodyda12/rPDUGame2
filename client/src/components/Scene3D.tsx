import React, { useRef, useCallback, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, Raycaster, Vector2, Color } from "three";
import { useEscapeRoom } from "../lib/stores/useEscapeRoom";
import { useGame } from "../lib/stores/useGame";

export default function Scene3D() {
  const { camera, gl } = useThree();
  const { solvePuzzle, addColorToSequence } = useEscapeRoom();
  const { phase } = useGame();
  const [isHovering, setIsHovering] = useState(false);
  
  // Object refs
  const keypadRef = useRef<any>(null);
  const paintingRef = useRef<Mesh>(null);
  const redBoxRef = useRef<Mesh>(null);
  const greenBoxRef = useRef<Mesh>(null);
  const blueBoxRef = useRef<Mesh>(null);
  const yellowBoxRef = useRef<Mesh>(null);

  const raycaster = new Raycaster();
  const mouse = new Vector2();

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (phase !== "playing") return;
    
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
    
    const intersects = raycaster.intersectObjects(objects, true);
    
    if (intersects.length > 0) {
      if (!isHovering) {
        setIsHovering(true);
        canvas.style.cursor = 'pointer';
      }
    } else {
      if (isHovering) {
        setIsHovering(false);
        canvas.style.cursor = 'default';
      }
    }
  }, [camera, gl, phase, isHovering, keypadRef, paintingRef, redBoxRef, greenBoxRef, blueBoxRef, yellowBoxRef]);

  const handleClick = useCallback((event: MouseEvent) => {
    if (phase !== "playing") return;
    
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
    
    const intersects = raycaster.intersectObjects(objects, true);
    
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      
      if (clickedObject === keypadRef.current || clickedObject.parent === keypadRef.current) {
        const code = prompt('Enter PDU access code:');
        if (code === '314') {
          solvePuzzle(0);
        }
      } else if (clickedObject === paintingRef.current) {
        solvePuzzle(2);
      } else if (clickedObject === redBoxRef.current || clickedObject.parent?.children.includes(redBoxRef.current!)) {
        addColorToSequence('r');
      } else if (clickedObject === greenBoxRef.current || clickedObject.parent?.children.includes(greenBoxRef.current!)) {
        addColorToSequence('g');
      } else if (clickedObject === blueBoxRef.current || clickedObject.parent?.children.includes(blueBoxRef.current!)) {
        addColorToSequence('b');
      } else if (clickedObject === yellowBoxRef.current || clickedObject.parent?.children.includes(yellowBoxRef.current!)) {
        addColorToSequence('y');
      }
    }
  }, [camera, gl, solvePuzzle, addColorToSequence, phase]);

  useFrame(() => {
    // Animation loop - can add any continuous updates here
  });

  // Add event listeners
  React.useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handleClick);
    canvas.addEventListener('pointermove', handleMouseMove);
    return () => {
      canvas.removeEventListener('pointerdown', handleClick);
      canvas.removeEventListener('pointermove', handleMouseMove);
    };
  }, [gl, handleClick, handleMouseMove]);

  return (
    <>
      {/* Data center lighting */}
      <ambientLight intensity={0.3} color="#1a1a2e" />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color="#ffffff" castShadow />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color="#00ff00" />
      <pointLight position={[3, 2, -2]} intensity={0.5} color="#00aa00" />
      <spotLight position={[0, 4, 0]} intensity={0.6} color="#ffffff" angle={Math.PI / 3} />
      
      {/* Data center floor - raised floor tiles */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Floor grid pattern */}
      {Array.from({ length: 8 }, (_, i) => 
        Array.from({ length: 8 }, (_, j) => (
          <mesh key={`tile-${i}-${j}`} rotation={[-Math.PI / 2, 0, 0]} position={[(i - 3.5) * 2, 0.01, (j - 3.5) * 2]}>
            <planeGeometry args={[1.8, 1.8]} />
            <meshStandardMaterial color="#333" transparent opacity={0.5} />
          </mesh>
        ))
      )}
      
      {/* Main PDU Unit (was keypad) */}
      <group ref={keypadRef} position={[-3, 1.2, -2]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 1.5, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0.3, 0.16]}>
          <boxGeometry args={[0.6, 0.4, 0.02]} />
          <meshStandardMaterial color="#00ff00" emissive="#003300" />
        </mesh>
        <mesh position={[0, -0.2, 0.16]}>
          <boxGeometry args={[0.7, 0.8, 0.02]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>
      
      {/* Server Racks (was color boxes) - now themed as PDU components */}
      <group position={[0, 0.5, 1]}>
        <mesh ref={redBoxRef} position={[-2, 0, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <mesh position={[-2, 0.3, 0.21]}>
          <boxGeometry args={[0.4, 0.1, 0.02]} />
          <meshStandardMaterial color="#ff0000" emissive="#330000" />
        </mesh>
        
        <mesh ref={greenBoxRef} position={[-0.7, 0, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshStandardMaterial color="#006400" />
        </mesh>
        <mesh position={[-0.7, 0.3, 0.21]}>
          <boxGeometry args={[0.4, 0.1, 0.02]} />
          <meshStandardMaterial color="#00ff00" emissive="#003300" />
        </mesh>
        
        <mesh ref={blueBoxRef} position={[0.7, 0, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshStandardMaterial color="#000080" />
        </mesh>
        <mesh position={[0.7, 0.3, 0.21]}>
          <boxGeometry args={[0.4, 0.1, 0.02]} />
          <meshStandardMaterial color="#0080ff" emissive="#000033" />
        </mesh>
        
        <mesh ref={yellowBoxRef} position={[2, 0, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshStandardMaterial color="#B8860B" />
        </mesh>
        <mesh position={[2, 0.3, 0.21]}>
          <boxGeometry args={[0.4, 0.1, 0.02]} />
          <meshStandardMaterial color="#ffff00" emissive="#333300" />
        </mesh>
      </group>
      
      {/* Network Panel (was painting) */}
      <mesh ref={paintingRef} position={[3, 1.5, -2]} rotation={[0, -Math.PI / 6, 0]}>
        <boxGeometry args={[1.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[3, 1.5, -1.95]} rotation={[0, -Math.PI / 6, 0]}>
        <planeGeometry args={[1, 0.6]} />
        <meshStandardMaterial color="#00aa00" emissive="#001100" />
      </mesh>
      
      {/* Cable Management Posts (was gear posts) */}
      <mesh position={[-1, 0.4, 3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[-1, 0.8, 3]}>
        <torusGeometry args={[0.2, 0.05, 8, 16]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      
      <mesh position={[1, 0.4, 3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[1, 0.8, 3]}>
        <torusGeometry args={[0.2, 0.05, 8, 16]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      
      {/* Overhead Cable Trays */}
      {[-2, 0, 2].map((x, i) => (
        <mesh key={`tray-${i}`} position={[x, 2.8, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.1, 8]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      ))}
      
      {/* Wall-mounted electrical panels */}
      <mesh position={[-4, 1.5, 0]}>
        <boxGeometry args={[0.2, 1, 0.8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[4, 1.5, 0]}>
        <boxGeometry args={[0.2, 1, 0.8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </>
  );
}
