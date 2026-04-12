"use client";

import Link from "next/link";
import { type SerializedProject } from "../shared/ProjectCard";
import { SafeImage } from "../shared/SafeImage";
import { TechIcon } from "../shared/TechIcon";
import { GithubIcon } from "../icons/GithubIcon";
import { FALLBACK_IMG } from "~/lib/constants";

interface ProjectDetailProps {
  project: SerializedProject;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="mx-auto max-w-5xl px-6 pb-24">
      {/* Back Button */}
      <Link
        href="/#hero"
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
        Back to Projects
      </Link>

      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{project.title}</h1>

        {project.featured && (
          <span className="inline-block rounded-full bg-[var(--color-accent-muted)] px-4 py-1 text-sm font-medium text-[var(--color-accent)]">
            Featured Project
          </span>
        )}
      </header>

      {/* Featured Image */}
      <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl">
        <SafeImage
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- intentional: empty string "" must trigger fallback
          src={project.img || FALLBACK_IMG}
          alt={project.title}
          fallbackSrc={FALLBACK_IMG}
          fill
          quality={100}
          unoptimized={project.img?.endsWith(".png")}
          sizes="(max-width: 1280px) 100vw, 1024px"
          className="object-cover"
          priority
        />
      </div>

      {/* Description */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">About This Project</h2>
        <div
          className="prose-project text-lg leading-relaxed text-[var(--color-text-secondary)]"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      </section>

      {/* Technologies */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Technologies Used</h2>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span
              key={tech.name}
              className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-4 py-2 text-[var(--color-text-secondary)]"
            >
              <TechIcon name={tech.name} size={20} />
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* Links */}
      <section>
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
            <GithubIcon />
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
      </section>

      {/* Back to Projects */}
      <div className="mt-16 border-t border-[var(--color-border)] pt-8 text-center">
        <Link
          href="/#hero"
          className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
        >
          ← Back to All Projects
        </Link>
      </div>
    </article>
  );
}
