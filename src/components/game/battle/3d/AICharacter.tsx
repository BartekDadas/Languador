import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Bot } from './models/Bot';
import { HealthBar3D } from './ui/HealthBar3D';

export function AICharacter({ position, health, level, mood, isAttacking }) {
  const group = useRef();
  
  const { scale } = useSpring({
    scale: isAttacking ? 1.2 : 1,
    config: { tension: 300, friction: 10 }
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t + Math.PI) * 0.1;
  });

  return (
    <animated.group ref={group} position={position} scale={scale}>
      <Bot />
      <HealthBar3D value={health} maxValue={100} position={[0, 2, 0]} />
      
      <mesh position={[0, 2.5, 0]}>
        <textGeometry args={[`Level ${level}`, { size: 0.2, height: 0.05 }]} />
        <meshStandardMaterial color="#a78bfa" />
      </mesh>
      
      <pointLight position={[0, 1, 0]} color="#3b82f6" intensity={0.5} />
    </animated.group>
  );
}