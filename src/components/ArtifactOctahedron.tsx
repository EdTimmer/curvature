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
    uNoiseSwirlSteps: 2,
    uNoiseSwirlValue: 1.0,
    uNoiseScale: 1.0,
    uNoiseTimeScale: 0.05,
    uOpacity: 0.3,
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
  isMovingForward: boolean;
  children?: React.ReactNode;
}

const ArtifactOctahedron = forwardRef<any, Props>(({ position, isMovingForward, children }, ref) => {
  const localRef = useRef<THREE.Mesh>(null);
  const meshRef = (ref as React.RefObject<THREE.Mesh>) || localRef;
  const materialRef = useRef<ArtifactMaterialType>(null!)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_Time.value = clock.getElapsedTime()
    }
    if (meshRef.current) {
      if (isMovingForward) {
        meshRef.current.rotation.x -= 0.04;
      } else {
        meshRef.current.rotation.x += 0.04;
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, 0]} scale={[1, 1.3, 1]}>
      <octahedronGeometry args={[0.1, 0]} />
      <artifactMaterial
        ref={materialRef}
        attach="material"
      />
      {children}
    </mesh>
  );
});

export default ArtifactOctahedron;