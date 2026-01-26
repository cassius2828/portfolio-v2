"use client";

import Image from "next/image";
import Link from "next/link";
import { type Project } from "../../../../generated/prisma";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const fallbackImg = "/images/api-programming.png";

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
          <Image
            src={project.img ?? fallbackImg}
            alt={project.title}
            fill
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
            {project.description}
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
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
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
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Demo
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}

