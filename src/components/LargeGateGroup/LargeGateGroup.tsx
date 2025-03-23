import { forwardRef, useRef } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import ArtifactFour from "../ArtifactFour";
import { getEquilateralTriangleVertices } from "../../utilities/VerticesCalculator";

interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  children?: React.ReactNode;
}

const LargeGateGroup = forwardRef<THREE.Group, Props>(({ position, rotation, scale, children }, ref) => {
  const localRef = useRef<THREE.Group>(null);
  const groupRef = (ref as React.RefObject<THREE.Group>) || localRef;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= 0.01;
    }
  });

  const trianglePositions = getEquilateralTriangleVertices(0.18);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <ArtifactFour position={trianglePositions[0]} rotation={[0, 0, 0]} scale={3}/>
      <ArtifactFour position={trianglePositions[1]} rotation={[0, 0, 2 * Math.PI / 3]} scale={3} />
      <ArtifactFour position={trianglePositions[2]} rotation={[0, 0, -2 * Math.PI / 3]} scale={3} />
      {children}
    </group>
  )
});

export default LargeGateGroup;