import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture, Float } from '@react-three/drei';
import { Mesh, TextureLoader } from 'three';
import Sphere from '../Sphere';
import Gate from '../Gate';
import ShaderCylinder from '../CylindersGroup/ShaderCylinder';
import Astronaut from '../Astronaut';
import Orb from '../Orb';
import CylindersGroup from '../CylindersGroup/CylindersGroup';
import ShaderSphere from '../ShaderSphere';


const TorusGroup = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const torusGroupRef = useRef<THREE.Group>(null);
  const spaceman = useRef<THREE.Object3D | null>(null);

  // Load regular texture for the surface
  // const surfaceTexture = useTexture('/images/greenland.jpg');

  // Rusty metal texture
  const texture = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_diff_2k.jpg');
  const normalMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_nor_gl_2k.png');
  const roughnessMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_rough_2k.png');

  // Wood planks
  // const texture = useLoader(TextureLoader, '/textures/plank/raw_plank_wall_diff_2k.png');
  // const normalMap = useLoader(TextureLoader, '/textures/plank/raw_plank_wall_nor_gl_2k.png');
  // const roughnessMap = useLoader(TextureLoader, '/textures/plank/raw_plank_wall_rough_2k.png');

  // Rosewood
  // const texture = useLoader(TextureLoader, '/textures/rosewood/rosewood_veneer1_diff_2k.png');
  // const normalMap = useLoader(TextureLoader, '/textures/rosewood/rosewood_veneer1_nor_gl_2k.png');
  // const roughnessMap = useLoader(TextureLoader, '/textures/rosewood/rosewood_veneer1_rough_2k.png');

    // Brick
    // const texture = useLoader(TextureLoader, '/textures/brick/patterned_brick_floor_diff_2k.png');
    // const normalMap = useLoader(TextureLoader, '/textures/brick/patterned_brick_floor_nor_gl_2k.png');
    // const roughnessMap = useLoader(TextureLoader, '/textures/brick/patterned_brick_floor_rough_2k.png');

  // Check if the assets are loaded; otherwise, return null
  if (!texture || !normalMap || !roughnessMap) {
    return null;
  }

  useMemo(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;

    // normalMap.wrapS = THREE.RepeatWrapping;
    // normalMap.wrapT = THREE.RepeatWrapping;
    // normalMap.magFilter = THREE.LinearFilter;

    // roughnessMap.wrapS = THREE.RepeatWrapping;
    // roughnessMap.wrapT = THREE.RepeatWrapping;
    // roughnessMap.magFilter = THREE.LinearFilter;
  }, [texture, normalMap, roughnessMap]);


  // useFrame((state, delta) => {
  //   if (!torusRef.current) return;
  //   torusRef.current.rotation.z -= delta * 0.055;

  //   // rotate mesh around point at center of the scene
  //   // torusRef.current.rotation.z += 0.01;
  //   // torusRef.current.rotation.y += 0.01;

  // });

  useFrame((state, delta) => {
    if (!torusGroupRef.current) return;
    torusGroupRef.current.rotation.y += delta * 0.095;

  });

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.055;
  });
  

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={torusGroupRef} position={[28, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <torusGeometry args={[28, 0.4, 336, 900]} />
          <meshStandardMaterial
            // envMap={envMap}
            map={texture}
            normalMap={normalMap} // Normal map for surface details
            roughnessMap={roughnessMap} // Roughness map for surface shininess
            color='white'
            metalness={0}
            roughness={1}
            side={THREE.DoubleSide}
            opacity={0.4}
          />
        </mesh>
        <Float
          speed={10} // Animation speed, defaults to 1
          rotationIntensity={0.02} // XYZ rotation intensity, defaults to 1
          floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          // floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          {/* <Sphere position={[-28, 0.2, 0]} size={0.05} color={'pink'} /> */}
          {/* <Sphere position={[28, 0.2, 0]} size={0.05} color={'blue'} />     */}
          <Orb position={[28, 0.2, 0]} size={0.05} color={'#b9f9f4'} />
          <Sphere position={[0, 0.2, 28]} size={0.05} color={'pink'} />
          {/* <Sphere position={[0, 0.2, -28]} size={0.05} color={'yellow'} /> */}
          {/* <Orb position={[0, 0.2, -28]} size={0.05} color={'yellow'} /> */}
          {/* <Sphere position={[-19.8, 0, -19.8]} size={0.05} color={'red'} />
          <Sphere position={[-19.8, 0, 19.8]} size={0.05} color={'red'} />
          <Sphere position={[19.8, 0, 19.8]} size={0.05} color={'red'} />
          <Sphere position={[19.8, 0, -19.8]} size={0.05} color={'red'} /> */}

          {/* <Sphere position={[-20, 0, -20]} size={0.05} color={'red'} />
          <Sphere position={[-20, 0, 20]} size={0.05} color={'red'} />
          <Sphere position={[20, 0, 20]} size={0.05} color={'red'} /> */}
          {/* <Sphere position={[20, 0, -20]} size={0.05} color={'red'} /> */}
          
          
        </Float>

        {/* <ShaderCylinder position={[-28, 0, 0]} rotation={[0, Math.PI / 2, 0]} /> */}

        {/* <CylindersGroup position={[-28, 0, 0]} rotation={[0, 0, 0]} scale={1.1} /> */}
        <ShaderSphere position={[-28, 0, 0]} rotation={[0, 0, 0]} />

        <Astronaut scale={0.035} position={[-19.9, 0, -19.9]} rotation={[0, 0, Math.PI / 2]}>
          <object3D ref={spaceman} />
        </Astronaut>

        <Astronaut scale={0.035} position={[-19.9, 0, 19.9]} rotation={[0, 0, Math.PI / 2]}>
          <object3D ref={spaceman} />
        </Astronaut>

        <Astronaut scale={0.035} position={[19.9, 0, 19.9]} rotation={[0, 0, Math.PI / 2]}>
          <object3D ref={spaceman} />
        </Astronaut>

        <Astronaut scale={0.035} position={[19.9, 0, -19.9]} rotation={[0, 0, Math.PI / 2]}>
          <object3D ref={spaceman} />
        </Astronaut>
        {/* <Gate color='white' position={[-28, 0, 0]} />
        <Gate color='white' position={[28, 0, 0]} />
        <Gate color='white' position={[20, 0, -20]} />
        <Gate color='white' position={[20, 0, 20]} /> */}
      </group>
    </group>
  );
};

export default TorusGroup;