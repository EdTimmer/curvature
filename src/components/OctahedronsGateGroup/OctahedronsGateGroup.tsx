import { forwardRef, useRef } from "react";
import * as THREE from 'three';
import ArtifactOctahedron from "../ArtifactOctahedron";
import { getSquareVertices } from "../../utilities/verticesCalculator";

interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  isMovingForward: boolean;
  children?: React.ReactNode;
}

const OctahedronsGateGroup = forwardRef<THREE.Group, Props>(({ position, rotation, scale, isMovingForward, children }, ref) => {
  const localRef = useRef<THREE.Group>(null);
  const groupRef = (ref as React.RefObject<THREE.Group>) || localRef;

  const squarePositions = getSquareVertices(0.18);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <group position={squarePositions[0]} rotation={[0, 0, 0]} >
        <ArtifactOctahedron position={[0, 0, 0]} isMovingForward={isMovingForward} />
      </group>
      <group position={squarePositions[1]} rotation={[0, 0, Math.PI / 2]} >
        <ArtifactOctahedron position={[0, 0, 0]} isMovingForward={isMovingForward} />
      </group>
      <group position={squarePositions[2]} rotation={[0, 0, Math.PI]} >
        <ArtifactOctahedron position={[0, 0, 0]}  isMovingForward={isMovingForward}/>
      </group>
      <group position={squarePositions[3]} rotation={[0, 0, -Math.PI / 2]} >
        <ArtifactOctahedron position={[0, 0, 0]} isMovingForward={isMovingForward} />
      </group>
      {children}
    </group>
  )
});

export default OctahedronsGateGroup;