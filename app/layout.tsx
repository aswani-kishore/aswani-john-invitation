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
        {/*
          THESIS: Invitation lives on cinematic media — video and music set the atmosphere; names lead.
          OWN-WORLD: Full-bleed Video.mp4 with overlay.png veil; audio.mpeg on first gesture; white + gold #c4a35a; Bodoni Moda + Source Serif 4 + Karla.
          STORY: Guest sees who, when, how soon, and where; taps Share Location to open or share the venue map.
          FIRST VIEWPORT: Background video; centered intro, names, date, countdown, venue, Share Location.
        */}
        {children}
      </body>
    </html>
  );
}
