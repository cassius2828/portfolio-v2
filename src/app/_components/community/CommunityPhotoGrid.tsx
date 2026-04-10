"use client";

import type { CommunityImpactPhoto } from "~/lib/community-impact-data";
import { FALLBACK_IMG } from "~/lib/constants";
import { SafeImage } from "../shared/SafeImage";

interface CommunityPhotoGridProps {
  photos: CommunityImpactPhoto[];
}

export function CommunityPhotoGrid({ photos }: CommunityPhotoGridProps) {
  return (
    <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <li key={photo.src} className="min-w-0">
          <figure
            tabIndex={0}
            aria-label={photo.alt}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] ring-[var(--color-accent)] transition-shadow outline-none focus-visible:ring-2"
          >
            <SafeImage
              src={photo.src}
              alt={photo.alt}
              fallbackSrc={FALLBACK_IMG}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={85}
              className="object-cover transition-transform duration-300 group-focus-within:scale-[1.02] group-hover:scale-[1.02]"
            />
            <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 sm:p-4">
              <span className="max-h-[min(70%,14rem)] w-full overflow-y-auto text-left text-xs leading-snug font-medium text-white sm:text-sm">
                {photo.alt}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
