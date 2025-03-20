import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
// import { TextureLoader } from 'three';

interface Props {
  position: [number, number, number];
  size: number;
  color: string;
  rotation: [number, number, number];
  rotationSpeed: number; // Speed of rotation
  rotationClockwise: boolean; // Direction of rotation
  // onLoadComplete: () => void; // Callback to notify parent when loading is complete
}

const Hemisphere = ({ position, size, color, rotation, rotationSpeed, rotationClockwise }: Props) => {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const gltf = useGLTF('/models/hemisphere_hollow.glb') as any;
  const mesh = gltf.nodes['Sphere'] as THREE.Mesh;

  // set mesh size
  // mesh.geometry.scale(size, size, size);

  // Frame loop for controlling the rotation
  useFrame(() => {
    if (!meshRef.current) return; // Skip rotation if assets are not loaded or rotation not started
    // rotate mesh
    // meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
    // if (rotationClockwise) {
    //   meshRef.current.rotation.z += rotationSpeed;
    // } else {
    //   meshRef.current.rotation.z -= rotationSpeed;
    // }

  });
  // console.log('color :>> ', color);
  return (
    <mesh ref={meshRef} position={position} rotation={rotation} geometry={mesh.geometry} scale={[size, size, size]}>
      <meshPhysicalMaterial
        ref={materialRef}        
        clearcoat={1}
        clearcoatRoughness={0}
        transmission={0}
        opacity={1}
        roughness={1}
        metalness={1}
        reflectivity={1}
        ior={1.45}
        thickness={1}
        attenuationDistance={7.6}
        color={color}
        // transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Hemisphere;
