"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import type { Project } from "../../../../generated/prisma";

interface AdminProjectListProps {
  projects: Project[];
}

export function AdminProjectList({
  projects: initialProjects,
}: AdminProjectListProps) {
  const router = useRouter();
  const deleteMutation = api.project.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate({ id });
    }
  };

  if (initialProjects.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-lg text-[var(--color-text-muted)]">
          No projects yet
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-muted)]">
              Title
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-muted)]">
              Featured
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-muted)]">
              Priority
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-muted)]">
              Technologies
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-[var(--color-text-muted)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {initialProjects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-bg-hover)]"
            >
              <td className="px-6 py-4">
                <Link
                  href={`/projects/${project.id}`}
                  className="font-medium hover:text-[var(--color-accent)]"
                >
                  {project.title}
                </Link>
              </td>
              <td className="px-6 py-4">
                {project.featured ? (
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    Featured
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-500/10 px-3 py-1 text-xs font-medium text-gray-400">
                    Regular
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-[var(--color-text-muted)]">
                {project.priorityLevel}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-md bg-[var(--color-bg-tertiary)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]"
                    >
                      {tech.name}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-[var(--color-text-muted)]">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-sm text-[var(--color-accent)] hover:underline"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    disabled={deleteMutation.isPending}
                    className="text-sm text-red-400 hover:underline disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

