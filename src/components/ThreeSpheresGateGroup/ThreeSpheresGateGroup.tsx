import { forwardRef, useRef } from "react";
import * as THREE from 'three';
import ArtifactSphere from "../ArtifactSphere";
import { getEquilateralTriangleVertices } from "../../utilities/verticesCalculator.ts";

interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  isMovingForward: boolean;
  children?: React.ReactNode;
}

const ThreeSpheresGateGroup = forwardRef<THREE.Group, Props>(({ position, rotation, scale, isMovingForward, children }, ref) => {
  const localRef = useRef<THREE.Group>(null);
  const groupRef = (ref as React.RefObject<THREE.Group>) || localRef;

  const trianglePositions = getEquilateralTriangleVertices(0.18);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <ArtifactSphere position={trianglePositions[0]} isMovingForward={isMovingForward} scale={1} />
      <group position={trianglePositions[1]} rotation={[0, 0, 2 * Math.PI / 3]}>
        <ArtifactSphere position={[0, 0, 0]} isMovingForward={isMovingForward} scale={1} />
      </group>
      <group position={trianglePositions[2]} rotation={[0, 0, -2 * Math.PI / 3]} >
        <ArtifactSphere position={[0, 0, 0]} isMovingForward={isMovingForward} scale={1} />
      </group>
      {children}
    </group>
  )
});

export default ThreeSpheresGateGroup;