"use client";

import { useEffect, useState } from "react";

const formatTime = (time: number) => time.toString().padStart(2, "0");

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 19,
    minutes: 27,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev; // Stop at 00:00:00
        }

        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }

        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <p className="font-sans text-gray-600 mb-4">⏰ OSTALO TI JE SAMO:</p>
      <div className="inline-block border-2 border-green-300 text-gray-800 px-6 py-3 rounded-lg">
        <div className="text-2xl font-bold font-mono">
          {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
          {formatTime(timeLeft.seconds)}
        </div>
      </div>
    </div>
  );
};
