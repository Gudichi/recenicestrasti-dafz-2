"use client";

import { useEffectOnce } from "@/hooks/use-effect-once";
import { useState } from "react";
import { TimedContent } from "./timed-content";

export default function HomePage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const unlockAfter = 6 * 60; // 6 minutes

  useEffectOnce(() => {
    // @ts-ignore
    window._wq = window._wq || [];

    // @ts-ignore
    window._wq.push({
      id: "w91eh5o6nn",
      onReady: (video: any) => {
        video.bind("timechange", (t: number) => {
          if (t >= unlockAfter && !isUnlocked) {
            setIsUnlocked(true);
          }
        });
      },
    });
  });

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-12">
        {/* Main Headline */}
        <h1 className="font-serif text-3xl md:text-6xl font-bold text-accent text-center mb-4 md:mb-8 leading-tight">
          Postoji Jedna Rečenica Od 6 Riječi Koja Počinje Slovom 'F' koja čini
          da se muškarac ludo zaljubi u tebe I Briše Svaku Drugu Ženu Iz
          Njegovog Uma
        </h1>

        {/* Sub-headline */}
        <h2 className="font-serif text-lg md:text-2xl text-accent text-center mb-4 md:mb-8 leading-relaxed max-w-3xl mx-auto font-semibold">
          Ako se udaljio, postao hladan ili 'trebate razmotriti odnos' -
          zaboravite na 'razgovore o odnosu' koji ga tjeraju da bježi. Pošaljite
          mu WhatsApp poruku s ovom rečenicom danas navečer i za 24 sata padat
          će na koljena pred vašim vratima
        </h2>

        {/* Wistia Video Section */}
        <div className="mb-6 flex justify-center">
          <div
            className="wistia-wrapper"
            style={{ position: "relative", maxWidth: "900px", width: "100%" }}
          >
            <div
              className="wistia_embed wistia_async_w91eh5o6nn"
              style={{ aspectRatio: "16/9" }}
            ></div>
          </div>
        </div>

        {/* Sub-sub headline */}
        <h3 className="font-sans text-base md:text-xl text-primary text-center mb-6 md:mb-12 font-medium">
          Pogledajte kratki video poviše da saznaš koja je to točno rečenica i
          kako je poslati da postigne maksimalni učinak u 24 sata 🎯
        </h3>

        {/* Social Proof Image */}
        <div className="mb-6 flex justify-center">
          <img
            src="/SocialProof.png"
            alt="Social Proof - Ljudi koji su već dobili rezultate"
            className="w-full max-w-lg md:max-w-md h-auto"
          />
        </div>
      </div>

      {/* <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="text-center">
          <button
            onClick={() => scrollToSection("offer-section")}
            className="bg-[#1C7C7D] hover:bg-[#165a5c] text-white font-sans font-bold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full max-w-md"
          >
            Želim pristupiti programu Rečenice Strasti i osigurati svoje mjesto
            prije nego što ponuda istekne
          </button>
          <div className="mt-6 flex justify-center">
            <img
              src="/SocialProof.png"
              alt="Rečenice strasti - Social proof"
              className="w-full max-w-xl md:max-w-lg h-auto"
            />
          </div>
        </div>
      </div> */}

      {isUnlocked && <TimedContent />}
    </div>
  );
}
