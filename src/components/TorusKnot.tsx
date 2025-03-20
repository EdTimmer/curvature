import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const TorusKnot = () => {
  const torusRef = useRef<THREE.Mesh>(null); 

  // const texture = useLoader(THREE.TextureLoader, '/images/oil-bright.jpg');

  // const envMap = useMemo(() => {
  //   texture.mapping = THREE.EquirectangularReflectionMapping;
  //   return texture;
  // }, [texture]);

  useFrame(() => {
    if (!torusRef.current) return; // Skip rotation if assets are not loaded or rotation not started
    // rotate mesh
    // torusRef.current.rotation.x += 0.01;
    // torusRef.current.rotation.y += 0.01;
    torusRef.current.rotation.z += -0.01;
    // if (rotationClockwise) {
    //   meshRef.current.rotation.z += rotationSpeed;
    // } else {
    //   meshRef.current.rotation.z -= rotationSpeed;
    // }

  });

  return (
    <mesh ref={torusRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusKnotGeometry args={[0.9, 0.1, 187, 16, 1, 6]} />
      <meshPhysicalMaterial
        clearcoat={1}
        clearcoatRoughness={0}
        transmission={1}
        opacity={1}
        roughness={0}
        metalness={0}
        reflectivity={1}
        ior={1.45}
        thickness={1}
        attenuationDistance={0.6}
        // color={color}
        // transparent={true}
        depthWrite={false}
        // envMap={envMap}
        color='pink'
      />
    </mesh>
  );
};

export default TorusKnot;