import { forwardRef, useRef } from "react";
import * as THREE from 'three';
import ArtifactTorus from "../ArtifactTorus";

interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  count: number;
  children?: React.ReactNode;
}

const ThreeRingsGroup = forwardRef<THREE.Group, Props>(({ position, rotation, scale, count, children }, ref) => {
  const localRef = useRef<THREE.Group>(null);
  const groupRef = (ref as React.RefObject<THREE.Group>) || localRef;

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <ArtifactTorus position={[0, 0, 1]} scale={[0.5, 0.5, 6]} rotation={[0, 0, 0]} />
      {count >= 1 && <ArtifactTorus position={[0, 0, 0.5]} scale={[0.5, 0.5, 6]} rotation={[0, 0, 0]} />}
      <ArtifactTorus position={[0, 0, 0]} scale={[0.5, 0.5, 6]} rotation={[0, 0, 0]} />
      {count >= 2 && <ArtifactTorus position={[0, 0, -0.5]} scale={[0.5, 0.5, 6]} rotation={[0, 0, 0]} />}
      <ArtifactTorus position={[0, 0, -1]} scale={[0.5, 0.5, 6]} rotation={[0, 0, 0]} />
      {children}
    </group>
  )
});

export default ThreeRingsGroup;