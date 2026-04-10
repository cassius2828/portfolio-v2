"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";

const MAX_RETRIES = 3;

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc: string;
}

export function SafeImage({ fallbackSrc, src, alt, ...props }: SafeImageProps) {
  const [attempt, setAttempt] = useState(0);

  const handleError = useCallback(() => {
    setAttempt((prev) => prev + 1);
  }, []);

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
