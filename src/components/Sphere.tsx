import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  size: number;
  color: string;
}

const Sphere = ({ position, size, color }: Props) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        opacity={1}
        roughness={1}
        metalness={0}
        color={color}
        // transparent={true}
        // depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Sphere;