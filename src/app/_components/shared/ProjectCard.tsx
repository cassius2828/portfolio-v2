"use client";

import Link from "next/link";
import { SafeImage } from "./SafeImage";
import { GithubIcon } from "../icons/GithubIcon";
import { FALLBACK_IMG } from "~/lib/constants";
import { stripHtml } from "~/lib/format";
import type { SerializedProject } from "~/lib/types";

export type { SerializedProject };

interface ProjectCardProps {
  project: SerializedProject;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div
        className={`card group h-full overflow-hidden ${
          featured ? "glow-hover" : ""
        }`}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <SafeImage
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- intentional: empty string "" must trigger fallback
            src={project.img || FALLBACK_IMG}
            alt={project.title}
            fallbackSrc={FALLBACK_IMG}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-[var(--color-accent)]">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-[var(--color-text-secondary)]">
            {stripHtml(project.description)}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech.name}
                className="rounded-md bg-[var(--color-bg-tertiary)] px-2 py-1 text-xs text-[var(--color-text-muted)]"
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="rounded-md bg-[var(--color-bg-tertiary)] px-2 py-1 text-xs text-[var(--color-text-muted)]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="flex border-t border-[var(--color-border)]">
          {project.prodLink && (
            <a
              href={project.prodLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-1 items-center justify-center gap-2 py-3 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-accent)]"
            >
              <svg
                className="h-4 w-4"
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
              Live
            </a>
          )}
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex flex-1 items-center justify-center gap-2 border-l border-[var(--color-border)] py-3 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-accent)]"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          {project.videoLink && (
            <a
              href={project.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-1 items-center justify-center gap-2 border-l border-[var(--color-border)] py-3 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-accent)]"
            >
              <svg
                className="h-4 w-4"
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
              Demo
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}
