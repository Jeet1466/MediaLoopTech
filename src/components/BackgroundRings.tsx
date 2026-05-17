'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GradientTexture } from '@react-three/drei';
import * as THREE from 'three';

function Ring({ radius, tube, arc, colorStops, colors, speed, rotationOffset, mouse }: any) {
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Loop animation
      meshRef.current.rotation.z -= speed * delta;
    }
    
    if (ref.current) {
      // Interactive subtle movement based on mouse pointer
      const targetX = (mouse.current.x * Math.PI) / 10;
      const targetY = (mouse.current.y * Math.PI) / 10;
      
      ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x);
      ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
    }
  });

  return (
    <group ref={ref}>
      <mesh ref={meshRef} rotation={[0, 0, rotationOffset]}>
        <torusGeometry args={[radius, tube, 32, 100, arc]} />
        <meshBasicMaterial transparent opacity={0.9} side={THREE.DoubleSide}>
          <GradientTexture stops={colorStops} colors={colors} size={1024} />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
}

export default function BackgroundRings() {
  const mouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        
        {/* Massive Outer Ring */}
        <Ring 
          radius={12} 
          tube={0.3} 
          arc={Math.PI * 1.5} 
          colorStops={[0, 0.5, 1]} 
          colors={['#FF1493', '#FF4500', '#FF8C00']} 
          speed={0.1}
          rotationOffset={0}
          mouse={mouse}
        />
        
        {/* Medium Middle Ring */}
        <Ring 
          radius={8.5} 
          tube={0.2} 
          arc={Math.PI * 1.7} 
          colorStops={[0, 1]} 
          colors={['#FF8C00', '#FF1493']} 
          speed={-0.15}
          rotationOffset={Math.PI}
          mouse={mouse}
        />

        {/* Small Inner Ring */}
        <Ring 
          radius={5} 
          tube={0.15} 
          arc={Math.PI * 1.8} 
          colorStops={[0, 0.8, 1]} 
          colors={['#FF00FF', '#FF1493', '#FF4500']} 
          speed={0.2}
          rotationOffset={Math.PI / 2}
          mouse={mouse}
        />
        
      </Canvas>
    </div>
  );
}
