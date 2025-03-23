import { forwardRef, useMemo, useRef } from "react";
import * as THREE from 'three';
import ArtifactOctahedron from "../ArtifactOctahedron";
import { getEquilateralTriangleVertices, getSquareVertices } from "../../utilities/verticesCalculator";

interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  children?: React.ReactNode;
}

const OctahedronsGateGroup = forwardRef<THREE.Group, Props>(({ position, rotation, scale, children }, ref) => {
  const localRef = useRef<THREE.Group>(null);
  const groupRef = (ref as React.RefObject<THREE.Group>) || localRef;

  const squarePositions = getSquareVertices(0.15);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <group position={squarePositions[0]} rotation={[0, 0, 0]} >
        <ArtifactOctahedron position={[0, 0, 0]} />
      </group>
      <group position={squarePositions[1]} rotation={[0, 0, Math.PI / 2]} >
        <ArtifactOctahedron position={[0, 0, 0]} />
      </group>
      <group position={squarePositions[2]} rotation={[0, 0, Math.PI]} >
        <ArtifactOctahedron position={[0, 0, 0]} />
      </group>
      <group position={squarePositions[3]} rotation={[0, 0, -Math.PI / 2]} >
        <ArtifactOctahedron position={[0, 0, 0]} />
      </group>
      {children}
    </group>
  )
});

export default OctahedronsGateGroup;