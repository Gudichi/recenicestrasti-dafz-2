"use client";

import { useEffect, useRef } from "react";

export const useEffectOnce = (callback: () => void, when = []) => {
  const hasRunOnce = useRef(false);
  useEffect(() => {
    if (!hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, when);
};
