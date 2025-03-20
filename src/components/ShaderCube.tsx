import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';
import sphereFragmentShader from '../shaders/smoke/fragment_smoke.glsl?raw'
import sphereVertexShader from '../shaders/smoke/vertex_smoke.glsl?raw'
import { useRef } from 'react';

interface Props {
  position: [number, number, number];
  size: number;
}

interface SphereMaterialTwoType extends THREE.ShaderMaterial {
  uNoiseSwirlSteps: number,
  uNoiseSwirlValue: number,
  uNoiseScale: number,
  uNoiseTimeScale: number,
  uOpacity: number,
  ref: React.MutableRefObject<THREE.ShaderMaterial>;
}

const SphereAnimatedMaterialTwo = shaderMaterial(
  {
    uTime: 0,
    uNoiseSwirlSteps: 2,
    uNoiseSwirlValue: 1.0,
    uNoiseScale: 1.0,
    uNoiseTimeScale: 0.05,
    uOpacity: 0.3,
  },
  sphereVertexShader,
  sphereFragmentShader
)

extend({ SphereMaterialThree: SphereAnimatedMaterialTwo });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphereMaterialThree: ReactThreeFiber.MaterialNode<
      SphereMaterialTwoType,
        {
          uTime: number;
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
  size: number;
}

const ShaderCube = ({ position, size }: Props) => {
  const materialThreeRef = useRef<SphereMaterialTwoType>(null!)

  useFrame(({ clock }) => {
    if (materialThreeRef.current) {
      materialThreeRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh position={position}>
      <boxGeometry args={[size, size, size]} />
      <sphereMaterialThree
        ref={materialThreeRef}
        attach="material"
        uNoiseSwirlSteps={2}
        uNoiseSwirlValue={1}
        uNoiseScale={1}
        uNoiseTimeScale={0.05}
        uOpacity={0.3}
      />
    </mesh>
  );
};

export default ShaderCube;