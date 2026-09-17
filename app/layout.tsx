import type { Metadata } from "next";
import { Bodoni_Moda, Source_Serif_4, Karla } from "next/font/google";
import { BackgroundMusic } from "@/components/BackgroundMusic";
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
        <BackgroundMusic />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var audio=document.getElementById("backgroundMusic");if(!audio)return;audio.volume=0.5;function clear(){document.removeEventListener("pointerdown",playMusic,true);document.removeEventListener("touchstart",playMusic,true);document.removeEventListener("click",playMusic,true)}function playMusic(){if(!audio.paused){clear();return}var result=audio.play();if(result&&result.then)result.then(clear).catch(function(){})}playMusic();audio.addEventListener("canplay",playMusic);document.addEventListener("DOMContentLoaded",playMusic);window.addEventListener("pageshow",playMusic);document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")playMusic()});document.addEventListener("pointerdown",playMusic,true);document.addEventListener("touchstart",playMusic,true);document.addEventListener("click",playMusic,true)})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
