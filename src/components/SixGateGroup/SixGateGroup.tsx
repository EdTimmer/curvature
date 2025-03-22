import { forwardRef, useRef } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import ArtifactFour from "../ArtifactFour";

interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  children?: React.ReactNode;
}

const SixGateGroup = forwardRef<THREE.Group, Props>(({ position, rotation, scale, children }, ref) => {
  const localRef = useRef<THREE.Group>(null);
  const groupRef = (ref as React.RefObject<THREE.Group>) || localRef;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= 0.015;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <ArtifactFour position={[0, -0.3, 0]} rotation={[0, 0, 0]} scale={1.2} />
      <ArtifactFour position={[0.26, -0.15, 0]} rotation={[0, 0, Math.PI/3]} scale={1.2} />
      <ArtifactFour position={[0.26, 0.15, 0]} rotation={[0, 0, 2*Math.PI/3]} scale={1.2} />
      <ArtifactFour position={[0, 0.3, 0]} rotation={[0, 0, Math.PI]} scale={1.2} />
      <ArtifactFour position={[-0.26, 0.15, 0]} rotation={[0, 0, 4*Math.PI/3]} scale={1.2} />
      <ArtifactFour position={[-0.26, -0.15, 0]} rotation={[0, 0, 5*Math.PI/3]} scale={1.2} />
      {children}
    </group>
  )
});

export default SixGateGroup;