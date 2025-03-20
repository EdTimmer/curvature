import './App.css'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, CameraShake } from '@react-three/drei';
// import PlaneComponent from './components/PlaneComponent/PlaneComponent';
import styles from './styles/App.module.scss';
import Hemisphere from './components/Hemisphere';
import TorusKnot from './components/TorusKnot';
import Sphere from './components/Sphere';
import Torus from './components/Torus';

function App() {
  return (
    <div className={styles.appWrapper}>
      <div className="plane">
        <Canvas gl={{ antialias: true }}>
          <fog attach="fog" args={['#f3efef', 0.5, 28]} />
          {/* <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} /> */}
          <PerspectiveCamera
            makeDefault
            fov={20}
            position={[0, 0, 1]}
            // ref={(camera) => camera?.lookAt(0, 0, 0)}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 0, 10]} />
          <directionalLight position={[0, 10, 0]} />
          <directionalLight position={[0, 0, 1]} />
          {/* <PlaneComponent /> */}
          {/* <Hemisphere
            position={[0, 0.1, 0]}
            size={2}
            color={'pink'}
            rotation={[0, 0, 0]}
            rotationSpeed={0}
            rotationClockwise={true}
          /> */}
          {/* <Hemisphere
            position={[0, 0, -0.3]}
            size={1}
            color={'lightblue'}
            rotation={[Math.PI / 2, 0, Math.PI]}
            rotationSpeed={0.01}
            rotationClockwise={false}
          /> */}
          {/* <Hemisphere
            position={[0, 0, 0]}
            size={0.6}
            color={'yellow'}
            rotation={[Math.PI / 2, 0, 1]}
            rotationSpeed={0.03}
            rotationClockwise={true}
          /> */}
          {/* <TorusKnot /> */}
          {/* <Sphere position={[0, 0, 0]} size={1.4} color={'pink'} /> */}
          <Torus />

          <OrbitControls enableDamping enableZoom={true} />
          <CameraShake
            maxYaw={0.1} // Max amount camera can yaw in either direction
            maxPitch={0.1} // Max amount camera can pitch in either direction
            maxRoll={0.1} // Max amount camera can roll in either direction
            yawFrequency={0.1} // Frequency of the the yaw rotation
            pitchFrequency={0.1} // Frequency of the pitch rotation
            rollFrequency={0.1} // Frequency of the roll rotation
            intensity={1} // initial intensity of the shake
            decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
          />
        </Canvas>
      </div>
      
    </div>
  )
}

export default App
