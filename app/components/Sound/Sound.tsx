'use client';
import { useEffect, useRef } from "react";
import { useSoundStore } from "../store/Store";

const Sound = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { sound } = useSoundStore();
  
  useEffect(() => {
    const startAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = sound.volume;
          await audioRef.current.play();
          console.log('Audio started successfully');
          
          // Remove listeners after successful play
          document.removeEventListener('click', startAudio);
          document.removeEventListener('keydown', startAudio);
          document.removeEventListener('touchstart', startAudio);
        } catch (error) {
          console.error('Failed to play:', error);
        }
      }
    };

    // Add initial interaction listeners
    document.addEventListener('click', startAudio);
    document.addEventListener('keydown', startAudio);
    document.addEventListener('touchstart', startAudio);

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('keydown', startAudio);
      document.removeEventListener('touchstart', startAudio);
    };
  }, []);  // Remove sound.setToggleSound from dependencies

  // Toggle handler
  useEffect(() => {
    if (!audioRef.current) return;

    const audioElement = audioRef.current;
    
    if (sound.isSoundPlaying) {
      audioElement.play()
        .catch(error => console.error('Play failed:', error));
    } else {
      audioElement.pause();
    }
  }, [sound.isSoundPlaying]);
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
  