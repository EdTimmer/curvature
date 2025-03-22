import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
  color: string;
}

const Sphere = ({ position, size, color, rotation }: Props) => {
  return (
    <mesh position={position} rotation={rotation}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        opacity={1}
        roughness={0.4}
        metalness={0.8}
        color={color}
        emissive={'hotpink'}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

export default Sphere;