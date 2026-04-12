"use client";

import { motion } from "framer-motion";
import { FADE_LEFT, FADE_RIGHT, staggerItem } from "~/lib/motion";
import {
  highlights,
  skills,
  stats,
  primarySkills,
  secondarySkills,
  codingJourneyStart,
} from "~/lib/content";

export function About() {
  return (
    <section id="about" className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500 opacity-[0.03] blur-[120px]" />
      </div>

      {/* Highlights Banner */}
      <div className="mb-24 bg-[var(--gradient-primary)] py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                {...staggerItem(i)}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm font-semibold text-white md:text-base">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* About Text */}
          <motion.div {...FADE_LEFT}>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">About Me</h2>
            <div className="mb-4 h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />

            <div className="space-y-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              <p>
                Full Stack Engineer at SyncSmart with deep expertise in{" "}
                <span className="text-[var(--color-accent)]">
                  {primarySkills}
                </span>
                , and building type-safe APIs. I also work extensively with{" "}
                {secondarySkills}. I lead development of production
                applications, own features end-to-end, and architect solutions
                that scale.
              </p>
              <p>
                Since {codingJourneyStart}, I&apos;ve shipped real-world
                freelance projects, graduated from General Assembly&apos;s
                Software Engineering Immersive, and earned AWS Cloud
                Practitioner, AWS AI Practitioner, and Professional Scrum Master
                I certifications. I was promoted within three months at
                SyncSmart to lead frontend development and drive system design
                decisions across the organization.
              </p>
              <p>
                I hold a BA in Communication Management (Cum Laude) from Azusa
                Pacific University and am currently pursuing a{" "}
                <span className="text-[var(--color-accent)]">
                  BS in Computer Science
                </span>{" "}
                with a concentration in Software Engineering at SNHU,
                maintaining a 3.85 GPA and earning Honor Roll every term.
              </p>
              <p>
                Beyond engineering, I bring leadership shaped by 13 years of
                competitive football, youth mentoring at the Richmond Youth
                Center, and active community involvement. I&apos;m driven to
                build efficient, scalable systems and to master engineering
                fundamentals that complement modern tooling.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            {...FADE_RIGHT}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-6 text-2xl font-bold">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                stats.projects,
                stats.certifications,
                stats.yearsExperience,
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  {...staggerItem(i, 0.4)}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-[var(--color-accent)]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
