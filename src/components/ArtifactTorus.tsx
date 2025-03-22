import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';
import cylinderFragmentShader from '../shaders/artifactTwo/fragment_two.glsl?raw'
import cylinderVertexShader from '../shaders/artifactTwo/vertex_two.glsl?raw'
import { forwardRef, useRef } from 'react';

// interface Props {
//   position: [number, number, number];
//   rotation: [number, number, number];
//   children?: React.ReactNode;
// }

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
  rotation?: [number, number, number];
  children?: React.ReactNode;
}

const ArtifactLong = forwardRef<any, Props>(({ position, rotation = [0, 0, 0], children }, ref) => {
  const localRef = useRef<THREE.Mesh>(null);
  const meshRef = (ref as React.RefObject<THREE.Mesh>) || localRef;
  const materialRef = useRef<ArtifactMaterialType>(null!)
  // const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_Time.value = clock.getElapsedTime()
    }
    if (meshRef.current) {
      // meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x -= 0.02;
      // meshRef.current.rotation.z += 0.02;
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, 0]} scale={1}>
      {/* <torusKnotGeometry args={[0.2, 0.02, 236, 36, 5, 4]} /> */}
      <torusKnotGeometry args={[2, 0.15, 252, 16, 6, 4]} />
      <artifactMaterial
        ref={materialRef}
        attach="material"
      />
      {children}
    </mesh>
  );
});

export default ArtifactLong;