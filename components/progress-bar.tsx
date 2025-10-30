"use client";

import { useEffect, useState } from "react";

export const PRICE = 47;

export const ProgressBar = () => {
  const [spotCount, setSpotCount] = useState<number>(44);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpotCount((prev) => {
        if (prev >= 49) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 15000); // every 15 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-700 mb-2">
        <span>{spotCount}/50 mjesta popunjeno</span>
        <span>{Math.round((spotCount / 50) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`bg-[#1C7C7D] h-3 rounded-full transition-all duration-500 animate-pulse`}
          style={{ width: `${(spotCount / 50) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};