"use client";

import { useEffectOnce } from "@/hooks/use-effect-once";
import posthog from "posthog-js";

export const PostHogThankYouTracker = () => {
  useEffectOnce(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const status = params.get("redirect_status");
      const intent = params.get("payment_intent");

      if (
        status === "succeeded" &&
        intent &&
        !sessionStorage.getItem("ph_purchased")
      ) {
        sessionStorage.setItem("ph_purchased", "1");
        posthog.capture("purchase", {
          value: 47,
          currency: "EUR",
          order_id: intent,
        });
      }

      if (
        status &&
        status !== "succeeded" &&
        intent &&
        !sessionStorage.getItem("ph_failed")
      ) {
        sessionStorage.setItem("ph_failed", "1");
        posthog.capture("payment_failed", { order_id: intent, status });
      }
    } catch (error) {
      // Silent fail
    }
  });

  return null;
};

