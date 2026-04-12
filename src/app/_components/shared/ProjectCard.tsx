"use client";

import { useRouter } from "next/navigation";
import { SafeImage } from "./SafeImage";
import { GithubIcon } from "../icons/GithubIcon";
import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";
import { PlayCircleIcon } from "../icons/PlayCircleIcon";
import { FALLBACK_IMG } from "~/lib/constants";
import { stripHtml } from "~/lib/format";
import type { SerializedProject } from "~/lib/types";

interface ProjectCardProps {
  project: SerializedProject;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return;
    router.push(`/projects/${project.id}`);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/projects/${project.id}`);
        }
      }}
      aria-label={`View ${project.title} details`}
      className={`card group h-full cursor-pointer overflow-hidden ${
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
            className="flex flex-1 items-center justify-center gap-2 py-3 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-accent)]"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            Live
          </a>
        )}
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
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
            className="flex flex-1 items-center justify-center gap-2 border-l border-[var(--color-border)] py-3 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-accent)]"
          >
            <PlayCircleIcon className="h-4 w-4" />
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
