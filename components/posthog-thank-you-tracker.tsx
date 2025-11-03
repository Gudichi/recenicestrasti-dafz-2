"use client";

import { useEffectOnce } from "@/hooks/use-effect-once";
import posthog from "posthog-js";

export const PostHogThankYouTracker = ({
  amount = 47,
  currency = "EUR",
}: {
  amount?: number;
  currency?: string;
}) => {
  useEffectOnce(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const status = params.get("redirect_status");
      const intent = params.get("payment_intent") || params.get("session_id");

      // ako postoji spremljeni variant, registriraj ga da se doda na evente
      try {
        const v = localStorage.getItem("ph_variant");
        if (v) posthog.register({ variant: v });
      } catch {}

      if (
        status === "succeeded" &&
        intent &&
        !sessionStorage.getItem("ph_purchased")
      ) {
        sessionStorage.setItem("ph_purchased", "1");
        posthog.capture("purchase", {
          value: amount,
          currency,
          order_id: intent,
        });
      } else if (
        status &&
        status !== "succeeded" &&
        intent &&
        !sessionStorage.getItem("ph_failed")
      ) {
        sessionStorage.setItem("ph_failed", "1");
        posthog.capture("payment_failed", { order_id: intent, status });
      }
    } catch (e) {
      console.warn("PostHogThankYouTracker error", e);
    }
  });

  return null;
};

