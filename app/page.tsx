import { BackgroundMedia } from "@/components/BackgroundMedia";
import { Countdown } from "@/components/Countdown";
import { ShareLocation } from "@/components/ShareLocation";

function DiamondRule() {
  return (
    <div className="flex w-full max-w-[14rem] items-center gap-3" aria-hidden>
      <span className="h-px flex-1 bg-white/35" />
      <span className="block h-1.5 w-1.5 rotate-45 bg-[#c4a35a]" />
      <span className="h-px flex-1 bg-white/35" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden px-5 py-10 sm:px-8 sm:py-14">
      <BackgroundMedia />

      <div className="invite-enter relative z-10 flex w-full max-w-lg flex-col items-center text-center text-white">
        <p className="invite-enter invite-enter-delay-1 max-w-sm font-serif text-[0.95rem] leading-relaxed text-white/80 sm:text-[1.05rem]">
          Together with our families,
          <br />
          we invite you to celebrate our wedding
        </p>

        <header className="invite-enter invite-enter-delay-1 mt-8">
          <h1 className="font-display text-[2.35rem] leading-[1.15] tracking-[-0.02em] text-white sm:text-[3rem]">
            <span className="block">John V Alukkal</span>
            <span className="mt-2 block font-display text-[1.25rem] font-normal italic text-[#c4a35a] sm:text-[1.4rem]">
              &amp;
            </span>
            <span className="mt-2 block">Aswani Kishore</span>
          </h1>
        </header>

        <div className="invite-enter invite-enter-delay-2 mt-8 flex w-full flex-col items-center gap-5">
          <DiamondRule />
          <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.28em] text-white/85">
            October 12 · 11:30 AM
          </p>
          <Countdown />
        </div>

        <footer className="invite-enter invite-enter-delay-3 mt-10 flex w-full flex-col items-center gap-4">
          <p className="font-serif text-[1.1rem] italic leading-snug text-white/90">
            Flora Charishma Residency
          </p>
          <ShareLocation />
        </footer>
      </div>
    </main>
  );
}
