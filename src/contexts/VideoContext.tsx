"use client";
import React, { createContext, useContext, useState, useRef } from "react";

interface IVideoContext {
  isVideoPlaying: boolean;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

interface VideoProviderProps {
  children: React.ReactNode;
}

export const VideoContext = createContext<IVideoContext | undefined>(undefined);

export const useVideo = (): IVideoContext => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const getVideo = (): HTMLVideoElement | null => videoRef.current;

  const playVideo = () => {
    const video = getVideo();
    if (video) {
      video.play();
      setIsVideoPlaying(true);
    }
  };

  const pauseVideo = () => {
    const video = getVideo();
    if (video) {
      video.pause();
    }
  };

  const stopVideo = () => {
    const video = getVideo();
    if (video) {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        isVideoPlaying,
        playVideo,
        pauseVideo,
        stopVideo,
        videoRef,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
