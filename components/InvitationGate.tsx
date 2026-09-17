"use client";

import { useRef, useState, type TransitionEvent } from "react";
import { BackgroundMedia } from "@/components/BackgroundMedia";

function SpeakerOnIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M4.5 9.5v5h3.2L13 18.8V5.2L7.7 9.5H4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16.2 9.2a4.2 4.2 0 0 1 0 5.6M18.6 7a7.2 7.2 0 0 1 0 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M4.5 9.5v5h3.2L13 18.8V5.2L7.7 9.5H4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 9.5 21 14m0-4.5-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InvitationGate({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opened, setOpened] = useState(false);
  const [gateVisible, setGateVisible] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [leaving, setLeaving] = useState(false);

  async function openInvitation() {
    const audio = audioRef.current;
    const playPromise = audio
      ? ((audio.volume = 0.5), (audio.muted = false), audio.play())
      : null;

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      void video.play().catch(() => {});
    }

    setOpened(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGateVisible(false);
    } else {
      setLeaving(true);
      window.setTimeout(() => setGateVisible(false), 800);
    }

    if (playPromise) {
      try {
        await playPromise;
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }
    }
  }

  function onGateTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (leaving) setGateVisible(false);
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
      return;
    }
    audio.pause();
    setMusicOn(false);
  }

  return (
    <>
      <audio
        ref={audioRef}
        id="backgroundMusic"
        loop
        preload="auto"
        className="pointer-events-none fixed top-0 left-0 h-px w-px opacity-0"
      >
        <source src="/audio.mp3" type="audio/mpeg" />
      </audio>

      <BackgroundMedia playing={opened} videoRef={videoRef} />

      {opened ? children : null}

      {gateVisible ? (
        <div
          className={`invite-gate ${leaving ? "invite-gate-leave" : ""}`}
          onTransitionEnd={onGateTransitionEnd}
        >
          <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
            <p className="font-serif text-[1.05rem] leading-relaxed text-white/85 sm:text-[1.15rem]">
              You are invited to the wedding of
            </p>
            <h1 className="mt-6 font-display text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-white sm:text-[2.75rem]">
              <span className="block">Aswani Kishore</span>
              <span className="mt-2 block font-display text-[1.2rem] font-normal italic text-[#c4a35a] sm:text-[1.35rem]">
                &amp;
              </span>
              <span className="mt-2 block">John V Alukkal</span>
            </h1>
            <button
              type="button"
              onClick={() => void openInvitation()}
              className="mt-10 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full border border-[#c4a35a]/70 bg-[#c4a35a]/15 px-6 font-sans text-[0.95rem] font-semibold tracking-wide text-white backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 ease-out hover:border-[#c4a35a] hover:bg-[#c4a35a]/30 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a35a]"
            >
              Open invitation
            </button>
          </div>
        </div>
      ) : null}

      {opened ? (
        <button
          type="button"
          onClick={toggleMusic}
          aria-pressed={musicOn}
          aria-label={musicOn ? "Pause music" : "Play music"}
          className="fixed right-4 bottom-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#c4a35a]/60 bg-[#131519]/70 text-white backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 ease-out hover:border-[#c4a35a] hover:bg-[#c4a35a]/25 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a35a]"
        >
          {musicOn ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
        </button>
      ) : null}
    </>
  );
}
