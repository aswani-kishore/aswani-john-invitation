import type { Metadata } from "next";
import { Bodoni_Moda, Source_Serif_4, Karla } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const sans = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John & Aswani — October 12",
  description:
    "Wedding invitation for John V Alukkal and Aswani Kishore — October 12, 2026 at Flora Charishma Residency.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <audio
          id="backgroundMusic"
          src="/audio.mpeg"
          autoPlay
          loop
          preload="auto"
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var audio=document.getElementById("backgroundMusic");if(!audio)return;audio.volume=0.5;function playMusic(){if(!audio.paused)return;var result=audio.play();if(result&&result.catch)result.catch(function(){})}playMusic();audio.addEventListener("canplay",playMusic);document.addEventListener("DOMContentLoaded",playMusic);window.addEventListener("pageshow",playMusic);document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")playMusic()});})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
