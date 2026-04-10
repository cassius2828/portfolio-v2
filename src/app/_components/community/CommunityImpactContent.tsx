"use client";

import { motion } from "framer-motion";
import { CommunityPhotoGrid } from "./CommunityPhotoGrid";
import type { CommunityImpactPhoto } from "~/lib/community-impact-data";

export interface CommunityImpactSectionView {
  id: string;
  title: string;
  description: string;
  photos: CommunityImpactPhoto[];
}

interface CommunityImpactContentProps {
  sections: CommunityImpactSectionView[];
}

export function CommunityImpactContent({ sections }: CommunityImpactContentProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
          <span className="gradient-text">Community</span>{" "}
          <span className="text-[var(--color-text-primary)]">Impact</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-[var(--color-text-secondary)] md:text-xl">
          Service outside of code—coaching, youth mentorship, and creative work
          in the community. Hover a photo to read its caption.
        </p>
      </motion.div>

      <div className="flex flex-col gap-16 md:gap-20">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            className="scroll-mt-28"
            aria-labelledby={`${section.id}-heading`}
          >
            <div className="mb-6 text-center md:text-left">
              <h2
                id={`${section.id}-heading`}
                className="text-2xl font-bold text-[var(--color-text-primary)] md:text-3xl"
              >
                {section.title}
              </h2>
              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-[var(--gradient-primary)] md:mx-0" />
              <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)] md:mx-0">
                {section.description}
              </p>
            </div>
            <CommunityPhotoGrid photos={section.photos} />
          </motion.section>
        ))}
      </div>
    </div>
  );
}
