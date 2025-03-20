import { shaderMaterial } from '@react-three/drei';
import { extend, ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three'
import planeVertexShader from '../../assets/shaders/vertex.glsl?raw';
import planeFragmentShader from '../../assets/shaders/fragment.glsl?raw';

const PlaneMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.0, 0.0, 0.0),
  },
  planeVertexShader,
  planeFragmentShader
);

// Make shader material available in JSX
extend({ PlaneMaterial });

/**
 * Global declaration to let TypeScript know about plutoniumMaterial.
 * Can place this in the same file or a separate *.d.ts file.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      planeMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof PlaneMaterial>;
    }
  }
}

const PlaneComponent = () => {
  return (
    <mesh>
      <planeGeometry args={[5, 5]} />
      <planeMaterial attach="material" />        
    </mesh>
  );
}

export default PlaneComponent;