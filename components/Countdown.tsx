"use client";

import { useEffect, useState } from "react";

const WEDDING_AT = new Date("2026-10-12T11:30:00+05:30").getTime();

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getRemaining(now: number): Remaining {
  const diff = Math.max(0, WEDDING_AT - now);
  if (diff === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

function LeafDivider() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 28"
      className="h-7 w-3 text-[#c4a35a]"
      fill="none"
    >
      <path
        d="M6 2 C6 2 2 10 2 16 C2 20 4 24 6 26 C8 24 10 20 10 16 C10 10 6 2 6 2 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <path d="M6 8 V24" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center gap-1">
      <span className="font-display text-[1.85rem] leading-none tracking-tight text-white tabular-nums sm:text-[2.15rem]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/70">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!remaining) {
    return (
      <div
        className="flex h-[4.5rem] items-center justify-center"
        aria-hidden
      />
    );
  }

  if (remaining.done) {
    return (
      <p className="font-serif text-center text-sm italic text-[#c4a35a]">
        The day is here
      </p>
    );
  }

  return (
    <div
      className="flex items-center justify-center gap-2 sm:gap-3"
      role="timer"
      aria-live="polite"
      aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes remaining`}
    >
      <Unit value={remaining.days} label="Days" />
      <LeafDivider />
      <Unit value={remaining.hours} label="Hours" />
      <LeafDivider />
      <Unit value={remaining.minutes} label="Minutes" />
    </div>
  );
}
