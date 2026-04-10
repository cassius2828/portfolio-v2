"use client";

import type { CommunityImpactPhoto } from "~/lib/community-impact-data";

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
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] outline-none ring-[var(--color-accent)] transition-shadow focus-visible:ring-2"
          >
            {/* HEIC is not supported by next/image; use native img for all grid assets. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
            />
            <figcaption
              className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 sm:p-4"
              aria-hidden="true"
            >
              <span className="max-h-[min(70%,14rem)] w-full overflow-y-auto text-left text-xs font-medium leading-snug text-white sm:text-sm">
                {photo.alt}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
