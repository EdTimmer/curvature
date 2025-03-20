import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  // size: number;
  color: string;
}

const Gate = ({ position, color }: Props) => {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.3, 32, 1, true]}  />
      <meshStandardMaterial
        opacity={1}
        roughness={0}
        metalness={1}
        color={color}
        // transparent={true}
        // depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Gate;