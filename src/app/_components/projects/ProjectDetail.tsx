"use client";

import Link from "next/link";
import type { SerializedProject } from "~/lib/types";
import { SafeImage } from "../shared/SafeImage";
import { TechIcon } from "../shared/TechIcon";
import { GithubIcon } from "../icons/GithubIcon";
import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";
import { PlayCircleIcon } from "../icons/PlayCircleIcon";
import { FALLBACK_IMG } from "~/lib/constants";

interface ProjectDetailProps {
  project: SerializedProject;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const trimmedProdLink = project.prodLink?.trim() ?? "";
  const imageHref =
    trimmedProdLink !== "" ? trimmedProdLink : project.githubLink;
  const imageLinkLabel = trimmedProdLink
    ? `Open live site for ${project.title}`
    : `View ${project.title} on GitHub`;

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

      {/* Featured Image — links to live app when available, otherwise GitHub */}
      <a
        href={imageHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={imageLinkLabel}
        className="group relative mb-12 block aspect-video overflow-hidden rounded-2xl ring-offset-2 ring-offset-[var(--color-bg-primary)] transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      >
        <SafeImage
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- intentional: empty string "" must trigger fallback
          src={project.img || FALLBACK_IMG}
          alt=""
          fallbackSrc={FALLBACK_IMG}
          fill
          quality={85}
          unoptimized={project.img?.endsWith(".png")}
          sizes="(max-width: 1280px) 100vw, 1024px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority
        />
        <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
      </a>

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
              <ExternalLinkIcon />
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
              <PlayCircleIcon />
              Watch Demo
            </a>
          )}
        </div>
        <p className="mt-5 text-lg text-[var(--color-text-muted)]">
          {project.year}
        </p>
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
