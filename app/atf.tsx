"use client";

import { useEffectOnce } from "@/hooks/use-effect-once";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { TimedContent } from "./timed-content";
import { Version } from "./versions";

export default function AboveTheFold({ version }: { version: Version }) {
  const { atf, videoId } = version;

  const [isUnlocked, setIsUnlocked] = useState(false);
  const unlockAfter = 6 * 60 + 30; // 6 minutes and 30 seconds

  useEffectOnce(() => {
    // @ts-ignore
    window._wq = window._wq || [];

    // @ts-ignore
    window._wq.push({
      id: videoId,
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
        <h1 className="font-serif text-3xl md:text-6xl font-bold text-accent text-center mb-4 md:mb-8">
          {atf.headline}
        </h1>

        {/* Sub-headline */}
        <h2 className="font-sans text-lg md:text-2xl text-accent text-center mb-4 md:mb-8 leading-relaxed max-w-3xl mx-auto font-normal">
          {atf.subheadline}
        </h2>

        {/* Wistia Video Section */}
        <div className="mb-12 flex justify-center">
          <div
            className="wistia-wrapper"
            style={{ position: "relative", maxWidth: "900px", width: "100%" }}
          >
            <div
              className={`wistia_embed wistia_async_${videoId}`}
              style={{ aspectRatio: "16/9" }}
            ></div>
          </div>
        </div>

        {!isUnlocked && (
          <React.Fragment>
            <h3 className="text-2xl text-primary text-center mb-6 md:mb-8 font-medium">
              {version.atf.bulletPointsTitle}
            </h3>

            <ul className="list-none list-inside max-w-3xl mx-auto mb-6 space-y-4">
              {atf.bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="font-sans text-base md:text-lg text-accent leading-relaxed"
                >
                  <div className="flex gap-3">
                    <div className="flex justify-center items-center bg-teal-600 w-6 h-6 flex-shrink-0 mt-1 rounded-full">
                      <Check className="text-white w-4 h-4" />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: point }}></div>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="text-base md:text-lg text-primary text-center mb-12 font-medium">
              ⏱️ Video traje samo 11 minuta
            </h3>

            <h3 className="text-2xl text-accent text-center mb-6 md:mb-10 font-bold leading-relaxed">
              Prije nego odustaneš i pomisliš: “ovo nije za mene”, pogledaj što
              su postigle žene koje su bile u ISTOJ situaciji kao ti...
            </h3>

            <div className="grid grid-cols-1 gap-4 md:gap-8 w-full mb-12">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={`vsl-testem-${index + 1}-min.png`}
                  alt={`Žena ${index + 1}`}
                />
              ))}
            </div>
          </React.Fragment>
        )}
      </div>

      {isUnlocked && <TimedContent checkoutVersion={version.checkoutVersion} />}
    </div>
  );
}
