"use client";

import { useEffect, useRef } from "react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const clear = () => {
      document.removeEventListener("pointerdown", playMusic, true);
      document.removeEventListener("touchstart", playMusic, true);
      document.removeEventListener("click", playMusic, true);
    };

    const playMusic = () => {
      if (!audio.paused) {
        clear();
        return;
      }
      void audio.play().then(clear).catch(() => {});
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") playMusic();
    };

    playMusic();
    audio.addEventListener("canplay", playMusic);
    window.addEventListener("pageshow", playMusic);
    document.addEventListener("visibilitychange", onVisible);
    document.addEventListener("pointerdown", playMusic, true);
    document.addEventListener("touchstart", playMusic, true);
    document.addEventListener("click", playMusic, true);

    return () => {
      audio.removeEventListener("canplay", playMusic);
      window.removeEventListener("pageshow", playMusic);
      document.removeEventListener("visibilitychange", onVisible);
      clear();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      id="backgroundMusic"
      loop
      preload="auto"
      autoPlay
      className="pointer-events-none fixed top-0 left-0 h-px w-px opacity-0"
    >
      <source src="/audio.mp3" type="audio/mpeg" />
    </audio>
  );
}
