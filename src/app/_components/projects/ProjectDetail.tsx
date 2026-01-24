"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Project } from "../../../../generated/prisma";

interface ProjectDetailProps {
  project: Project;
}

const fallbackImg = "/images/api-programming.png";

export function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-5xl px-6 pb-24"
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </button>

      {/* Header */}
      <header className="mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 text-4xl font-bold md:text-5xl"
        >
          {project.title}
        </motion.h1>

        {project.featured && (
          <span className="inline-block rounded-full bg-[var(--color-accent-muted)] px-4 py-1 text-sm font-medium text-[var(--color-accent)]">
            Featured Project
          </span>
        )}
      </header>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mb-12 aspect-video overflow-hidden rounded-2xl"
      >
        <Image
          src={project.img || fallbackImg}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Description */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="mb-4 text-2xl font-bold">About This Project</h2>
        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
          {project.description}
        </p>
      </motion.section>

      {/* Technologies */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="mb-6 text-2xl font-bold">Technologies Used</h2>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech, i) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-4 py-2 text-[var(--color-text-secondary)]"
            >
              {tech.icon && <span className="mr-2">{tech.icon}</span>}
              {tech.name}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* Links */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="mb-6 text-2xl font-bold">Links</h2>
        <div className="flex flex-wrap gap-4">
          {project.prodLink && (
            <a
              href={project.prodLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View Live
            </a>
          )}

          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            View GitHub
          </a>

          {project.videoLink && (
            <a
              href={project.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Watch Demo
            </a>
          )}
        </div>
      </motion.section>

      {/* Back to Projects */}
      <div className="mt-16 border-t border-[var(--color-border)] pt-8 text-center">
        <Link
          href="/#hero"
          className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
        >
          ← Back to All Projects
        </Link>
      </div>
    </motion.article>
  );
}

