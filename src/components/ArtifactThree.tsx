import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';
import cylinderFragmentShader from '../shaders/artifactTwo/fragment_two.glsl?raw'
import cylinderVertexShader from '../shaders/artifactTwo/vertex_two.glsl?raw'
import { forwardRef, useRef } from 'react';

interface ArtifactMaterialType extends THREE.ShaderMaterial {
  uNoiseSwirlSteps: number,
  uNoiseSwirlValue: number,
  uNoiseScale: number,
  uNoiseTimeScale: number,
  uOpacity: number,
  ref: React.MutableRefObject<THREE.ShaderMaterial>;
}

const ArtifactMaterial = shaderMaterial(
  {
    u_Time: 0,
  },
  cylinderVertexShader,
  cylinderFragmentShader
)

extend({ ArtifactMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      artifactMaterial: ReactThreeFiber.MaterialNode<
      ArtifactMaterialType,
        {
          u_Time: number;
          uNoiseSwirlSteps: number,
          uNoiseSwirlValue: number,
          uNoiseScale: number,
          uNoiseTimeScale: number,
          uOpacity: number,
        }
      >;
    }
  }
}

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
  children?: React.ReactNode;
}

const ArtifactThree = forwardRef<any, Props>(({ position, rotation = [0, 0, 0], children }, ref) => {
  const localRef = useRef<THREE.Mesh>(null);
  const meshRef = (ref as React.RefObject<THREE.Mesh>) || localRef;
  const materialRef = useRef<ArtifactMaterialType>(null!)
  // const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_Time.value = clock.getElapsedTime()
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.z += 0.02;
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={0.8}>
      {/* <torusKnotGeometry args={[0.2, 0.02, 236, 36, 5, 4]} /> */}
      <sphereGeometry args={[0.03, 32, 32]} />
      <artifactMaterial
        ref={materialRef}
        attach="material"
      />
      {children}
    </mesh>
  );
});

export default ArtifactThree;