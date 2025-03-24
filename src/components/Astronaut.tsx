import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useLayoutEffect, useRef } from "react";
import * as THREE from 'three'

interface AstronautProps {
  children?: React.ReactNode;
  rotationSpeed?: number;
  [key: string]: any;
}

const Astronaut = forwardRef<any, AstronautProps>(({ children, rotationSpeed = 1.5, ...props }, ref) => {
  const { nodes, materials } = useGLTF('../../models/Astronaut-transformed.glb')
  // Create local ref if no ref is provided
  const localRef = useRef<THREE.Mesh>(null);
  const meshRef = (ref as React.RefObject<THREE.Mesh>) || localRef;

  useLayoutEffect(() => {
    Object.values(materials).forEach((material) => {
      (material as THREE.MeshStandardMaterial).roughness = 0
    })
  }, [])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta;
      meshRef.current.rotation.x += rotationSpeed * delta;
      meshRef.current.rotation.z += rotationSpeed * delta;
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