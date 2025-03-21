import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';
import cylinderFragmentShader from '../shaders/cylinder/fragment_cylinder_two.glsl?raw'
import cylinderVertexShader from '../shaders/cylinder/vertex_cylinder.glsl?raw'
import { useRef } from 'react';

interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
}

interface CylinderMaterialType extends THREE.ShaderMaterial {
  uNoiseSwirlSteps: number,
  uNoiseSwirlValue: number,
  uNoiseScale: number,
  uNoiseTimeScale: number,
  uOpacity: number,
  ref: React.MutableRefObject<THREE.ShaderMaterial>;
}

const CylinderMaterial = shaderMaterial(
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

extend({ CylinderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      cylinderMaterial: ReactThreeFiber.MaterialNode<
      CylinderMaterialType,
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
  rotation: [number, number, number];
}

const ShaderSphere = ({ position, rotation }: Props) => {
  const materialRef = useRef<CylinderMaterialType>(null!)
  const meshRef = useRef<THREE.Mesh>(null)

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
      <torusKnotGeometry args={[0.2, 0.02, 236, 36, 5, 4]} />
      <cylinderMaterial
        ref={materialRef}
        attach="material"
        uNoiseSwirlSteps={2}
        uNoiseSwirlValue={1}
        uNoiseScale={1}
        uNoiseTimeScale={0.05}
        uOpacity={1.0}
      />
    </mesh>
  );
};

export default ShaderSphere;