"use client";

import { motion } from "framer-motion";
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">About Me</h2>
            <div className="mb-4 h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />

            <div className="space-y-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              <p>
                I am a passionate software engineer with strong expertise in{" "}
                <span className="text-[var(--color-accent)]">
                  {primarySkills}
                </span>
                , and building RESTful APIs. Additionally, I have working
                knowledge of {secondarySkills}, and more.
              </p>
              <p>
                Since starting my coding journey in {codingJourneyStart},
                I&apos;ve graduated from General Assembly&apos;s Software
                Engineering Bootcamp (2024), earned cloud certifications, and
                completed numerous real-world freelance projects.
              </p>
              <p>
                I bring team-oriented skills, honed through collaboration with
                mid- and senior-level engineers on various group projects, along
                with managerial experience from previous roles. I hold a BA in
                Communication Studies and plan to further my education with a BS
                in Computer Science.
              </p>
              <p>
                I&apos;m continuously refining my skills while contributing to
                ongoing freelance projects, and I&apos;m driven to build
                efficient, scalable solutions.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[var(--color-accent)]">
                  {stats.projects.value}
                </div>
                <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {stats.projects.label}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[var(--color-accent)]">
                  {stats.certifications.value}
                </div>
                <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {stats.certifications.label}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[var(--color-accent)]">
                  {stats.yearsExperience.value}
                </div>
                <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {stats.yearsExperience.label}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
