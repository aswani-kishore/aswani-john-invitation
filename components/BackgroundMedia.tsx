"use client";

import { useEffect, type RefObject } from "react";

export function BackgroundMedia({
  playing,
  videoRef,
}: {
  playing: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!playing) {
      video.pause();
      return;
    }
    video.currentTime = 0;
    void video.play().catch(() => {});
  }, [playing, videoRef]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        id="backgroundVideo"
        className="absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-105 object-cover object-center"
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/Video.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(19, 21, 25, 0.55), rgba(19, 21, 25, 0.45)), url(/overlay.png)",
          backgroundSize: "auto, 256px 256px",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, repeat",
        }}
      />
    </div>
  );
}
