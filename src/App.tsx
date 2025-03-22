import './App.css'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, CameraShake } from '@react-three/drei';
// import PlaneComponent from './components/PlaneComponent/PlaneComponent';
import styles from './styles/App.module.scss';
import Hemisphere from './components/Hemisphere';
import TorusKnot from './components/TorusKnot';
import { CircularProgress, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import TorusGroup from './components/TorusGroup/TorusGroup';
import { Suspense, useEffect, useRef, useState } from 'react';
import { SwapHorizontalCircle, SwapHorizontalCircleOutlined, SwapHorizOutlined } from '@mui/icons-material';

function App() {
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wasEnabledBeforeTabChange = useRef<boolean>(false);
  const [isMovingForward, setIsMovingForward] = useState(true);

  // Pre-initialize audio context on component mount
  useEffect(() => {
    const initAudioContext = () => {
      // Create a silent audio context to initialize browser audio system
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const silentBuffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = silentBuffer;
        source.connect(audioContext.destination);
        source.start(0);
        source.stop(0.001); // Stop it immediately
        
        // Mark as initialized
        setAudioInitialized(true);
      } catch (e) {
        console.log('Audio pre-initialization failed:', e);
      }
    };
    
    // Initialize after a delay to not block initial render
    const timer = setTimeout(initAudioContext, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is now hidden
        wasEnabledBeforeTabChange.current = audioEnabled;
        if (audioEnabled) {
          setAudioEnabled(false);
        }
      } else {
        // Tab is visible again - restore previous state if it was enabled
        if (wasEnabledBeforeTabChange.current) {
          setAudioEnabled(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [audioEnabled]);

  const handleAudioClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Prevent multiple clicks during transition
    if (isTransitioning) return;
    
    setIsTransitioning(true);

    // For first click, show loading indicator longer
    if (!audioEnabled) {
      setAudioLoading(true);
    }
    
    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    // Handle toggle with appropriate delays for first click vs subsequent clicks
    if (!audioEnabled) {
      // First enable - longer delay to initialize audio
      clickTimeoutRef.current = setTimeout(() => {
        setAudioEnabled(true);
        // Keep transition state for a bit more to mask any flicker
        setTimeout(() => {
          setIsTransitioning(false);
          setAudioLoading(false);
        }, 150);
      }, 150);
    } else {
      // Subsequent clicks - shorter delay
      clickTimeoutRef.current = setTimeout(() => {
        setAudioEnabled(false);
        setIsTransitioning(false);
      }, 100);
    }
  };

  return (
    <div className={styles.appWrapper}>
      <div className="plane">
        <Canvas
          gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
          style={{ opacity: isTransitioning ? 0.98 : 1,  transition: 'opacity 0.15s ease' }}
          // frameloop={audioLoading ? 'demand' : 'always'}
        >
          <Suspense fallback={null}>
            <TorusGroup 
              audioInitialized={audioInitialized}
              audioEnabled={audioEnabled}
              isMovingForward={isMovingForward}
            />
          </Suspense>
          <fog attach="fog" args={['#f3efef', 0.5, 28]} />
          {/* <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} /> */}
          <PerspectiveCamera
            makeDefault
            fov={20}
            position={[0, 0, 1]}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 0, 10]} />
          <directionalLight position={[0, 10, 0]} />
          <directionalLight position={[0, 0, 1]} />

          <TorusGroup audioInitialized={audioInitialized} audioEnabled={audioEnabled} isMovingForward={isMovingForward} />

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
      <div className={styles.controls}>
        <IconButton 
          aria-label="volume"
          type="button"
          disabled={isTransitioning || !audioInitialized}
          onClick={handleAudioClick}
          sx={{ 
            color: 'white', 
            position: 'absolute', 
            top: '20px', 
            right: '90px',
            backgroundColor: 'rgba(0,0,0,0.2)',
            opacity: isTransitioning ? 0.7 : 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.4)',
            },
            '&:focus': {
              outline: 'none',
            },
            '&:focus-visible': {
              outline: 'none',
            },
          }}
        >
          {isTransitioning ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            audioEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />
          )}
        </IconButton>

        <IconButton 
          aria-label="volume"
          type="button"
          disabled={isTransitioning || !audioInitialized}
          onClick={() => setIsMovingForward(!isMovingForward)}
          sx={{ 
            color: 'white', 
            position: 'absolute', 
            top: '20px', 
            right: '40px',
            backgroundColor: 'rgba(0,0,0,0.2)',
            opacity: isTransitioning ? 0.7 : 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.4)',
            },
            '&:focus': {
              outline: 'none',
            },
            '&:focus-visible': {
              outline: 'none',
            },
          }}
        >
          {isTransitioning ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <SwapHorizOutlined />
          )}
        </IconButton>
      </div>
      

      {audioLoading && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.01)', // Nearly invisible
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}
      
    </div>
  )
}

export default App
