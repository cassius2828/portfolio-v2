"use client";

import { motion } from "framer-motion";
import { CommunityPhotoGrid } from "./CommunityPhotoGrid";
import {
  communityImpactArtPhotos,
  communityImpactCoachingPhotos,
  communityImpactMentorshipPhotos,
} from "~/lib/community-impact-images";

const sections = [
  {
    id: "coaching",
    title: "Coaching",
    description:
      "I coached with Vacaville High School football at my alma mater for the 2021–22 and 2022–23 seasons, helping athletes grow within the program. From 2021–2025 I also trained athletes independently and at Fitness Explosion, where I was the lead trainer for youth athletes—bringing the same habits, knowledge, and energy I learned through my own career and supporting young people in sport and beyond.",
    photos: communityImpactCoachingPhotos,
  },
  {
    id: "youth-center-mentorships",
    title: "Youth Center Mentorships",
    description:
      "The Richmond Youth Program, affiliated with the Rosie the Riveter Foundation, is the main focus of this work—toy drives, mentorship days, guest speakers, and talks that meet young people where they are. I also continue mentoring former athletes and youth from other programs, building on the same commitment to growth, opportunity, and community.",
    photos: communityImpactMentorshipPhotos,
  },
  {
    id: "community-art-contributions",
    title: "Community Art Contributions",
    description:
      "Main contributions include the Rocky Hill mural: I worked alongside lead artist Leslie Molera and helped guide youth artists from vision to finished wall. I spoke at the unveiling and again on MLK Day in Vacaville, CA. I also helped plan additional park art across Vacaville, including work at Trower Park.",
    photos: communityImpactArtPhotos,
  },
] as const;

export function CommunityImpactContent() {
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
