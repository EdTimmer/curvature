import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useLayoutEffect, useRef } from "react";
import * as THREE from 'three'

interface AstronautProps {
  children?: React.ReactNode;
  rotationSpeed?: number;
  [key: string]: any;
}

const Astronaut = forwardRef<any, AstronautProps>(({ children, rotationSpeed = 0.02, ...props }, ref) => {
  const { nodes, materials } = useGLTF('../../models/Astronaut-transformed.glb')
  // Create local ref if no ref is provided
  const localRef = useRef<THREE.Mesh>(null);
  const meshRef = ref || localRef;

  useLayoutEffect(() => {
    Object.values(materials).forEach((material) => {
      (material as THREE.MeshStandardMaterial).roughness = 0
    })
  }, [])

  useFrame(() => {
    if (localRef.current) {
      localRef.current.rotation.y += rotationSpeed;
      localRef.current.rotation.x += rotationSpeed;
      localRef.current.rotation.z += rotationSpeed;
    }
  });
  
  return (
    <mesh
      castShadow
      receiveShadow
      ref={meshRef}
      {...props}
      geometry={(nodes.Astronaut_mesh as THREE.Mesh).geometry}
      material={materials.Astronaut_mat}
      material-envMapIntensity={0}
      dispose={null}>
      {children}
    </mesh>
  )
})

export default Astronaut;