import * as THREE from 'three';
import { useRef } from "react";
import { useFrame } from '@react-three/fiber';

interface Props {
  position: [number, number, number];
  size: number;
  color: string;
}

const Orb = ({ position, size, color }: Props) => {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (orbRef.current) {
      orbRef.current.rotation.y += 0.01;
      orbRef.current.rotation.x += 0.01;
      orbRef.current.rotation.z += 0.01;
    }
  });
  
  return (
    <mesh ref={orbRef} position={position}>
      <icosahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        opacity={1}
        roughness={0.5}
        metalness={1}
        color={color}
        side={THREE.DoubleSide}
      />
      {/* <meshPhysicalMaterial
        clearcoat={1}  // Shiny surface effect
        transmission={1}  // Fully transparent
        opacity={0.5}  // Fully opaque but will be transparent due to transmission
        // transparent={true}  // Enable transparency
        roughness={0}  // Smooth like glass
        reflectivity={0.1}  // Adjust reflection intensity
        metalness={0}  // Glass is non-metallic
        ior={1.45}  // Typical for glass (Index of Refraction)
        thickness={0.1}  // Controls the refraction and look of thickness
        // attenuationColor="#ffffff"  // The color of the glass when light passes through
        attenuationDistance={0.5}  // Distance at which the glass becomes less transparent
        envMapIntensity={0.5}  // Control the strength of the reflections
        // color="#999999"  // Use a slightly grey color instead of pure white
        // color='black'
        color= '#b9f9f4' // '#FFC300' '#b9f9db'
      /> */}
    </mesh>
  );
};

export default Orb;