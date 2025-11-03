"use client";

import { useEffectOnce } from "@/hooks/use-effect-once";
import { Check } from "lucide-react";
import posthog from "posthog-js";
import React, { useState } from "react";
import { TimedContent } from "./timed-content";
import { Version } from "./versions";

export default function AboveTheFold({ version }: { version: Version }) {
  const { atf, videoId } = version;

  const [isUnlocked, setIsUnlocked] = useState(false);
  const unlockAfter = 6 * 60; // 6 minutes

  useEffectOnce(() => {
    // Register variant in PostHog
    try {
      const params = new URLSearchParams(window.location.search);
      const v = (params.get("v") || "a").toLowerCase();
      if ("abcdef".includes(v)) {
        posthog.register({ variant: v });
        try {
          localStorage.setItem("ph_variant", v);
        } catch {}
      }
    } catch {}

    // @ts-ignore
    window._wq = window._wq || [];

    // Guard variables for tracking
    let __unlockSent = false;
    let __m3 = false,
      __m6 = false,
      __m8 = false,
      __done = false;
    let __videoPlayed = false;
    let __dur = 0;

    // @ts-ignore
    window._wq.push({
      id: videoId,
      onReady: (video: any) => {
        video.bind("timechange", (t: number) => {
          // Cache duration once
          if (!__dur && typeof video.duration === "function") {
            video.duration((d: number) => {
              __dur = d || 0;
            });
          }

          // Video play event
          if (!__videoPlayed && t > 1) {
            __videoPlayed = true;
            posthog.capture("video_play");
          }

          // Progress milestones
          if (!__m3 && t >= 180) {
            __m3 = true;
            posthog.capture("video_progress", { milestone: "3min" });
          }
          if (!__m6 && t >= 360) {
            __m6 = true;
            posthog.capture("video_progress", { milestone: "6min" });
          }
          if (!__m8 && t >= 480) {
            __m8 = true;
            posthog.capture("video_progress", { milestone: "8min" });
          }

          // Unlock logic at 6 minutes
          if (!__unlockSent && t >= 360) {
            __unlockSent = true;
            setIsUnlocked(true);
            posthog.capture("video_offer_unlocked");
          }

          // Complete event
          if (!__done && __dur && t >= __dur * 0.95) {
            __done = true;
            posthog.capture("video_progress", { milestone: "complete" });
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
