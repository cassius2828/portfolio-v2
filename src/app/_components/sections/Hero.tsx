"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Project } from "../../../../generated/prisma";
import { ProjectCard } from "../shared/ProjectCard";
import { personalInfo, socialLinks } from "~/lib/content";

interface HeroProps {
  featuredProjects: Project[];
}

export function Hero({ featuredProjects }: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--gradient-bg)]" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500 opacity-5 blur-[100px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2520_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2520_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:justify-between">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]"
            >
              {personalInfo.title}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 max-w-xl text-lg text-[var(--color-text-secondary)] lg:text-xl"
            >
              {personalInfo.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <Link href="/#contact" className="btn-primary">
                Get in Touch
              </Link>
              <a
                href={socialLinks.credly.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                View Credly Badges
              </a>
            </motion.div>
          </motion.div>

          {/* Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-shrink-0"
          >
            <div className="animate-pulse-glow relative h-72 w-72 overflow-hidden rounded-2xl md:h-96 md:w-96">
              <Image
                src="/images/headshot.webp"
                alt={personalInfo.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border-2 border-[var(--color-accent)] opacity-30" />
            <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-[var(--color-accent)] opacity-20" />
          </motion.div>
        </div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-32"
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Featured Projects
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-[var(--gradient-primary)]" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <ProjectCard project={project} featured />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
