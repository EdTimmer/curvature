import { forwardRef, useRef } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import ArtifactSmallSphere from "../ArtifactSmallSphere";
import { getHexagonVertices } from "../../utilities/calculator.ts";
interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  count: number;
  rotationSpeed?: number;
  children?: React.ReactNode;
}

const SixSpheresGateGroup = forwardRef<THREE.Group, Props>(({ position, rotation, scale, count, rotationSpeed = 1, children }, ref) => {
  const localRef = useRef<THREE.Group>(null);
  const groupRef = (ref as React.RefObject<THREE.Group>) || localRef;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= rotationSpeed * delta;
    }
  });

  const hexPositions = getHexagonVertices(0.27);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <ArtifactSmallSphere position={hexPositions[0]} rotation={[0, 0, 0]} scale={1.4} />
      <ArtifactSmallSphere position={hexPositions[1]} rotation={[0, 0, Math.PI/3]} scale={1.4} />
      <ArtifactSmallSphere position={hexPositions[2]} rotation={[0, 0, 2*Math.PI/3]} scale={1.4} />
      <ArtifactSmallSphere position={hexPositions[3]} rotation={[0, 0, Math.PI]} scale={1.4} />
      <ArtifactSmallSphere position={hexPositions[4]} rotation={[0, 0, 4*Math.PI/3]} scale={1.4} />
      <ArtifactSmallSphere position={hexPositions[5]} rotation={[0, 0, 5*Math.PI/3]} scale={1.4} />

      {count >= 1 && (
        <group position={[0, 0, 1.5]} >
          <ArtifactSmallSphere position={hexPositions[0]} rotation={[0, 0, 0]} scale={1.4} />
          <ArtifactSmallSphere position={hexPositions[1]} rotation={[0, 0, Math.PI/3]} scale={1.4} />
          <ArtifactSmallSphere position={hexPositions[2]} rotation={[0, 0, 2*Math.PI/3]} scale={1.4} />
          <ArtifactSmallSphere position={hexPositions[3]} rotation={[0, 0, Math.PI]} scale={1.4} />
          <ArtifactSmallSphere position={hexPositions[4]} rotation={[0, 0, 4*Math.PI/3]} scale={1.4} />
          <ArtifactSmallSphere position={hexPositions[5]} rotation={[0, 0, 5*Math.PI/3]} scale={1.4} />
        </group>
        )
      }

      {count >= 2 && (
        <group position={[0, 0, - 1.5]} >
          <ArtifactSmallSphere position={hexPositions[0]} rotation={[0, 0, 0]} scale={1.4} />
          <ArtifactSmallSphere position={hexPositions[1]} rotation={[0, 0, Math.PI/3]} scale={1.4} />
          <ArtifactSmallSphere position={hexPositions[2]} rotation={[0, 0, 2*Math.PI/3]} scale={1.4} />
          <ArtifactSmallSphere position={hexPositions[3]} rotation={[0, 0, Math.PI]} scale={1.4} />
          <ArtifactSmallSphere position={hexPositions[4]} rotation={[0, 0, 4*Math.PI/3]} scale={1.4} />
          <ArtifactSmallSphere position={hexPositions[5]} rotation={[0, 0, 5*Math.PI/3]} scale={1.4} />
        </group>
        )
      }
      {children}
    </group>
  )
});

export default SixSpheresGateGroup;