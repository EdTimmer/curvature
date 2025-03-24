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
  scale?: number;
  rotation?: [number, number, number];
  rotationSpeed?: number;
  children?: React.ReactNode;
}

const ArtifactSphere = forwardRef<any, Props>(({ position, scale = 1, rotation = [0, 0, 0], rotationSpeed = 3, isMovingForward, children }, ref) => {
  const localRef = useRef<THREE.Mesh>(null);
  const meshRef = (ref as React.RefObject<THREE.Mesh>) || localRef;
  const materialRef = useRef<ArtifactMaterialType>(null!)
  // const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_Time.value = clock.getElapsedTime()
    }
    if (meshRef.current) {
      if (isMovingForward) {
        meshRef.current.rotation.x -= rotationSpeed * delta;
      } else {
        meshRef.current.rotation.x += rotationSpeed * delta;
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <artifactMaterial
        ref={materialRef}
        attach="material"
      />
      {children}
    </mesh>
  );
});

export default ArtifactSphere;