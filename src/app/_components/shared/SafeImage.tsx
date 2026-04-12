"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_RETRIES = 3;
const RETRY_DELAYS_MS = [1000, 2000, 4000];

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc: string;
}

export function SafeImage({ fallbackSrc, src, alt, ...props }: SafeImageProps) {
  const [attempt, setAttempt] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleError = useCallback(() => {
    setAttempt((prev) => {
      const next = prev + 1;
      if (next < MAX_RETRIES) {
        setWaiting(true);
        timerRef.current = setTimeout(() => {
          setWaiting(false);
        }, RETRY_DELAYS_MS[prev] ?? 2000);
      }
      return next;
    });
  }, []);

  if (waiting) return null;

  const exhausted = attempt >= MAX_RETRIES;
  const resolvedSrc = exhausted ? fallbackSrc : src || fallbackSrc;

  const cacheBustedSrc =
    !exhausted && attempt > 0 && typeof resolvedSrc === "string"
      ? `${resolvedSrc}${resolvedSrc.includes("?") ? "&" : "?"}r=${attempt}`
      : resolvedSrc;

  return (
    <Image
      key={`${typeof src === "string" ? src : fallbackSrc}-${attempt}`}
      {...props}
      src={cacheBustedSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
