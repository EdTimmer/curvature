import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import Astronaut from '../Astronaut';
import OctahedronsGateGroup from '../OctahedronsGateGroup/OctahedronsGateGroup';
import RingsGroup from '../RingsGroup/RingsGroup';
import SixSpheresGateGroup from '../SixSpheresGateGroup/SixSpheresGateGroup';
import ThreeSpheresGateGroup from '../ThreeSpheresGateGroup/ThreeSpheresGateGroup';
import AudioElement from '../AudioElement';

interface Props {
  audioInitialized: boolean;
  audioEnabled: boolean;
  isMovingForward: boolean;
}
const TorusGroup = ({ audioInitialized, audioEnabled, isMovingForward }: Props) => {
  const [audioReady, setAudioReady] = useState(false);
  const [count, setCount] = useState(0);
  
  // Add this effect to handle staged audio initialization
  useEffect(() => {
    if (audioEnabled && audioInitialized && !audioReady) {
      // Give time for the component to render before enabling audio
      const timer = setTimeout(() => {
        setAudioReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [audioEnabled, audioInitialized, audioReady]);

  // Use a single ref for all audio elements
  const audioRefs = useRef<Map<string, THREE.PositionalAudio>>(new Map());

  // Object refs
  const astronautOneRef = useRef<THREE.Object3D | null>(null);
  const astronautTwoRef = useRef<THREE.Object3D | null>(null);
  const astronautThreeRef = useRef<THREE.Object3D | null>(null);
  const astronautFourRef = useRef<THREE.Object3D | null>(null);
  
  const groupRef = useRef<THREE.Group>(null);
  const torusGroupRef = useRef<THREE.Group>(null);
  
  const gateGroupOneRef = useRef<THREE.Group>(null);
  const gateGroupTwoRef = useRef<THREE.Group>(null);
  const gateGroupThreeRef = useRef<THREE.Group>(null);
  const gateGroupFourRef = useRef<THREE.Group>(null);

  // Pre-load audio resources but keep them silent until needed
  const audioFiles = useMemo(() => [
    { id: 'audio1', url: '../audio/radio-2.mp3', ref: 'audioOneRef', objectRef: astronautOneRef },
    { id: 'audio2', url: '../audio/radio-1.mp3', ref: 'audioTwoRef', objectRef: astronautTwoRef },
    { id: 'audio3', url: '../audio/radio-6.mp3', ref: 'audioThreeRef', objectRef: astronautThreeRef },
    { id: 'audio4', url: '../audio/radio-7.mp3', ref: 'audioFourRef', objectRef: astronautFourRef },
    { id: 'artifact1', url: '../audio/ambient-1.mp3', ref: 'artifactOneAudioRef', objectRef: gateGroupOneRef },
    { id: 'artifact2', url: '../audio/ambient-1.mp3', ref: 'artifactTwoAudioRef', objectRef: gateGroupTwoRef },
    { id: 'artifact3', url: '../audio/ambient-1.mp3', ref: 'artifactThreeAudioRef', objectRef: gateGroupThreeRef },
    { id: 'artifact4', url: '../audio/ambient-1.mp3', ref: 'artifactFourAudioRef', objectRef: gateGroupFourRef },
  ], []);

  // Rusty metal texture
  const { texture, normalMap, roughnessMap } = useMemo(() => {
    const texture = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_diff_2k.jpg');
    const normalMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_nor_gl_2k.png');
    const roughnessMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_rough_2k.png');
    
    if (texture && normalMap && roughnessMap) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.LinearFilter;
    }
    
    return { texture, normalMap, roughnessMap };
  }, []);

  // Check if the assets are loaded; otherwise, return null
  if (!texture || !normalMap || !roughnessMap) {
    return null;
  }

  // Audio management
  useEffect(() => {
    // When audio is disabled, stop all active audio
    if (!audioEnabled) {
      audioRefs.current.forEach(audio => {
        if (audio && audio.isPlaying) {
          audio.stop();
        }
      });
    }
  }, [audioEnabled]);

  useFrame((_, delta) => {
    if (!torusGroupRef.current) return;

    // Increment coount for full loop
    if (count === 0 && Math.abs(torusGroupRef.current.rotation.y) >= 2 * Math.PI + 0.5) {
      setCount(count + 1);
    }
    if (count === 1 && Math.abs(torusGroupRef.current.rotation.y) >= 4 * Math.PI + 0.5) {
      setCount(count + 1);
    }
    // Set direction of rotation around Y axis
    if (isMovingForward) { 
      torusGroupRef.current.rotation.y += delta * 0.095;
    } else {
      torusGroupRef.current.rotation.y -= delta * 0.095;
    }
  });

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.055;
  });

  const { camera } = useThree();

  const distanceForSound = 10;

  // One consolidated proximity check instead of multiple separate functions
  useFrame(() => {
    if (!audioEnabled || !audioInitialized) return;
    
    audioFiles.forEach(({ id, objectRef }) => {
      const audio = audioRefs.current.get(id);
      const object = objectRef.current;
      
      if (audio && object) {
        const position = new THREE.Vector3();
        object.getWorldPosition(position);
        const distance = camera.position.distanceTo(position);
        
        // Manage playback based on distance
        if (distance > distanceForSound && audio.isPlaying) {
          audio.stop();
        } else if (distance <= distanceForSound && !audio.isPlaying && audioEnabled) {
          audio.play();
        }
      }
    });
  });
  
  // Reference capturing function for the audio elements
  const setAudioRef = (id: string) => (ref: THREE.PositionalAudio | null) => {
    if (ref) {
      audioRefs.current.set(id, ref);
    }
  };
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={torusGroupRef} position={[28, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <torusGeometry args={[28, 0.4, 336, 900]} />
          <meshStandardMaterial
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

        {/* West */}
        <SixSpheresGateGroup ref={gateGroupTwoRef} position={[-28, 0, 0]} rotation={[0, 0, 0]} scale={1.2} count={count}>
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="artifact2" 
            url="../audio/ambient-1.mp3" 
            setAudioRef={setAudioRef}
          />
        </SixSpheresGateGroup>

        {/* North */}
        <ThreeSpheresGateGroup ref={gateGroupFourRef} position={[0, 0, -28]} rotation={[0, -Math.PI / 2, 0]} isMovingForward={isMovingForward} scale={1.2}>
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="artifact4" 
            url="../audio/ambient-1.mp3" 
            setAudioRef={setAudioRef}
          />
        </ThreeSpheresGateGroup>

        {count >= 1 && <ThreeSpheresGateGroup ref={gateGroupFourRef} position={[-1.5, 0, -28]} rotation={[0, -Math.PI / 2, 0]} isMovingForward={isMovingForward} scale={1.2}>
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="artifact4" 
            url="../audio/ambient-1.mp3" 
            setAudioRef={setAudioRef}
          />
        </ThreeSpheresGateGroup>}

        {count >= 2 && <ThreeSpheresGateGroup ref={gateGroupFourRef} position={[1.5, 0, -28]} rotation={[0, -Math.PI / 2, 0]} isMovingForward={isMovingForward} scale={1.2}>
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="artifact4" 
            url="../audio/ambient-1.mp3" 
            setAudioRef={setAudioRef}
          />
        </ThreeSpheresGateGroup>}

        {/* East */}
        <OctahedronsGateGroup ref={gateGroupOneRef} position={[28, 0, 0]} rotation={[0, Math.PI, 0]} isMovingForward={isMovingForward} scale={1.2}>
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="artifact1" 
            url="../audio/ambient-1.mp3" 
            setAudioRef={setAudioRef}
          />
        </OctahedronsGateGroup>

        {count >= 1 && <OctahedronsGateGroup ref={gateGroupOneRef} position={[28, 0, -1.5]} rotation={[0, Math.PI, 0]} isMovingForward={isMovingForward} scale={1.2}>
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="artifact1" 
            url="../audio/ambient-1.mp3" 
            setAudioRef={setAudioRef}
          />
        </OctahedronsGateGroup>}

        {count >= 2 && <OctahedronsGateGroup ref={gateGroupOneRef} position={[28, 0, 1.5]} rotation={[0, Math.PI, 0]} isMovingForward={isMovingForward} scale={1.2}>
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="artifact1" 
            url="../audio/ambient-1.mp3" 
            setAudioRef={setAudioRef}
          />
        </OctahedronsGateGroup>}

        {/* South */}
        <RingsGroup ref={gateGroupThreeRef} position={[0, 0, 28]} rotation={[0, Math.PI / 2, 0]} scale={1.2} count={count}>
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="artifact3" 
            url="../audio/ambient-1.mp3" 
            setAudioRef={setAudioRef}
          />
        </RingsGroup>

        <Astronaut ref={astronautOneRef} scale={0.035} position={[-19.9, 0, -19.9]} rotation={[0, 0, Math.PI / 2]}>
          <object3D />
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="audio1" 
            url="../audio/radio-2.mp3" 
            setAudioRef={setAudioRef}
          />
        </Astronaut>

        <Astronaut ref={astronautTwoRef} scale={0.035} position={[-19.9, 0, 19.9]} rotation={[0, 0, Math.PI / 2]}>
          <object3D />
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="audio2" 
            url="../audio/radio-1.mp3" 
            setAudioRef={setAudioRef}
          />
        </Astronaut>

        <Astronaut ref={astronautThreeRef} scale={0.035} position={[19.9, 0, 19.9]} rotation={[0, 0, Math.PI / 2]}>
          <object3D />
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="audio3" 
            url="../audio/radio-6.mp3" 
            setAudioRef={setAudioRef}
          />
        </Astronaut>

        <Astronaut ref={astronautFourRef} scale={0.035} position={[19.9, 0, -19.9]} rotation={[0, 0, Math.PI / 2]}>
          <object3D />
          <AudioElement 
            audioEnabled={audioEnabled && audioReady}
            audioInitialized={audioInitialized}
            id="audio4" 
            url="../audio/radio-7.mp3" 
            setAudioRef={setAudioRef}
          />
        </Astronaut>
      </group>
    </group>
  );
};

export default TorusGroup;