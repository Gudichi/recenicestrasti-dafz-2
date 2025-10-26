"use client";

import { useEffectOnce } from "@/hooks/use-effect-once";
import { event } from "@/lib/pixel";

export const ClientEvent = ({
  eventCode,
  options = {},
}: {
  eventCode: string;
  options?: Record<string, any>;
}) => {
  useEffectOnce(() => {
    event(eventCode, options);
  });
  return null;
};
