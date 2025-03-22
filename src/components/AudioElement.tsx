import React from 'react';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { PositionalAudio } from '@react-three/drei';

const LazyPositionalAudio = React.lazy(() => 
  new Promise(resolve => {
    // Delay the import to give the browser time to settle
    setTimeout(() => {
      // @ts-ignore - this is a workaround for dynamic imports
      resolve({ default: PositionalAudio });
    }, 50);
  })
);

interface AudioElementProps {
  audioEnabled: boolean;
  audioInitialized: boolean;
  id: string;
  url: string;
  setAudioRef: (id: string) => (ref: THREE.PositionalAudio | null) => void;
}

const AudioElement = ({ audioEnabled, audioInitialized, id, url, setAudioRef }: AudioElementProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (audioEnabled && audioInitialized && !isLoaded) {
      // Slight delay to stagger loading
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, parseInt(id.replace(/\D/g, '')) * 10); // Stagger loading based on ID
      return () => clearTimeout(timeout);
    }
  }, [audioEnabled, audioInitialized, isLoaded, id]);

  if (!audioEnabled || !audioInitialized || !isLoaded) return null;
  
  return (
    <Suspense fallback={null}>
      <LazyPositionalAudio 
        ref={setAudioRef(id)} 
        url={url} 
        distance={1} 
      />
    </Suspense>
  );
}

export default AudioElement;