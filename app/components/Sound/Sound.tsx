'use client';
import { useEffect, useRef } from "react";
import { useSoundStore } from "../store/Store";

const Sound = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { sound } = useSoundStore();
  
  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current) {
        // Try to play the audio
        audioRef.current.volume = sound.volume;
        audioRef.current.play()
          .then(() => {
            console.log('Audio started successfully');
            // Update store state if needed
            if (!sound.isSoundPlaying) {
              sound.setToggleSound();
            }
          })
          .catch((error) => {
            console.error('Failed to play:', error);
          });
        
        // Remove event listeners after first successful interaction
        document.removeEventListener('click', startAudio);
        document.removeEventListener('keydown', startAudio);
        document.removeEventListener('touchstart', startAudio);
      }
    };

    // Add event listeners to the document
    document.addEventListener('click', startAudio);
    document.addEventListener('keydown', startAudio);
    document.addEventListener('touchstart', startAudio);

    // Cleanup function
    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('keydown', startAudio);
      document.removeEventListener('touchstart', startAudio);
    };
  }, [sound.setToggleSound]); // Include setToggleSound in dependencies

  return (
    <audio
      ref={audioRef}
      src={sound.src}
      preload="auto"
      loop={true}

    />
  );
};

export default Sound;


  //src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  