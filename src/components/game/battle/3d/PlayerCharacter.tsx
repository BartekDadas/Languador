import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Shield } from './models/Shield';
import { HealthBar3D } from './ui/HealthBar3D';

export function PlayerCharacter({ position, health, combo, isAttacking }) {
  const group = useRef();
  
  const { scale } = useSpring({
    scale: isAttacking ? 1.2 : 1,
    config: { tension: 300, friction: 10 }
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t) * 0.1;
  });

  return (
    <animated.group ref={group} position={position} scale={scale}>
      <Shield />
      <HealthBar3D value={health} maxValue={100} position={[0, 2, 0]} />
      
      {combo > 0 && (
        <mesh position={[0, 2.5, 0]}>
          <textGeometry args={[`Combo x${combo}`, { size: 0.2, height: 0.05 }]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      )}
      
      <pointLight position={[0, 1, 0]} color="#60a5fa" intensity={0.5} />
    </animated.group>
  );
}