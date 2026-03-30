"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc: string;
}

export function SafeImage({ fallbackSrc, src, alt, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);

  const resolvedSrc = error ? fallbackSrc : (src || fallbackSrc);

  return (
    <Image
      {...props}
      src={resolvedSrc}
      alt={alt}
      onError={() => setError(true)}
    />
  );
}
