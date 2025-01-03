import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function BattleEnvironment() {
  const gridRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    gridRef.current.rotation.x = Math.PI / 2;
    gridRef.current.position.z = (t * 0.5) % 2;
  });

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Moving grid floor */}
      <mesh ref={gridRef} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshStandardMaterial
          color="#1a1a2e"
          wireframe
          opacity={0.2}
          transparent
        />
      </mesh>
      
      {/* Background sphere */}
      <mesh position={[0, 0, -10]}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshStandardMaterial
          color="#2a2a4e"
          side={2}
          opacity={0.1}
          transparent
        />
      </mesh>
    </>
  );
}