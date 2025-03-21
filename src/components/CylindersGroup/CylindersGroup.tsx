import { useRef } from "react";
import * as THREE from 'three';
import ShaderCylinder from "./ShaderCylinder";
import { useFrame } from "@react-three/fiber";

interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

const CylindersGroup = ({ position, rotation, scale }: Props) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <ShaderCylinder position={[0, -0.3, 0]} rotation={[0, 0, 0]} />
      <ShaderCylinder position={[0.26, 0.15, 0]} rotation={[0, 0, 2 * Math.PI / 3]} />
      <ShaderCylinder position={[-0.26, 0.15, 0]} rotation={[0, 0, -2 * Math.PI / 3]} />
    </group>
  )
}

export default CylindersGroup;