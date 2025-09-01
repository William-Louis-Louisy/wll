"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

interface IAudioContext {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  stop: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioContext = createContext<IAudioContext | undefined>(undefined);

export const useAudio = (): IAudioContext => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to safely get le player
  const getAudio = (): HTMLAudioElement | null => audioRef.current;

  const play = () => {
    const audio = getAudio();
    if (audio && audio.paused) {
      audio.play();
    }
  };

  const pause = () => {
    const audio = getAudio();
    if (audio && !audio.paused) {
      audio.pause();
    }
  };

  const stop = () => {
    const audio = getAudio();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, play, pause, stop, audioRef }}>
      {children}
      <audio
        ref={audioRef}
        src="/audio/WanHand - push to the sun.mp3"
        preload="auto"
      />
    </AudioContext.Provider>
  );
};
