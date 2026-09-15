"use client";

import { useCallback, useState } from "react";

const LOCATION_URL = "https://share.google/GFI1miwu2bHCMtHFK";
const SHARE_TITLE = "John & Aswani — Wedding Location";
const SHARE_TEXT = "Flora Charishma Residency — October 12, 2026";

function PinIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-[1.05rem] w-[1.05rem]"
      fill="none"
    >
      <path
        d="M12 21s-6.5-5.2-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function ShareLocation() {
  const [status, setStatus] = useState<"idle" | "shared">("idle");

  const onShare = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: LOCATION_URL,
        });
        setStatus("shared");
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
    window.open(LOCATION_URL, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <button
      type="button"
      onClick={onShare}
      className="group inline-flex h-12 w-full max-w-xs items-center justify-center gap-2.5 rounded-full border border-[#c4a35a]/70 bg-[#c4a35a]/15 px-6 font-sans text-[0.95rem] font-semibold tracking-wide text-white backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 ease-out hover:border-[#c4a35a] hover:bg-[#c4a35a]/30 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a35a]"
    >
      <PinIcon />
      <span>{status === "shared" ? "Location shared" : "Share Location"}</span>
    </button>
  );
}
