"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import type { SerializedBlog } from "~/lib/types";
import { formatDate } from "~/lib/format";

interface AdminBlogListProps {
  blogs: SerializedBlog[];
}

export function AdminBlogList({ blogs: initialBlogs }: AdminBlogListProps) {
  const router = useRouter();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const deleteMutation = api.blog.delete.useMutation({
    onSuccess: () => {
      setDeleteError(null);
      router.refresh();
    },
    onError: (error) => {
      setDeleteError(error.message ?? "Failed to delete blog post");
    },
  });

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate({ id });
    }
  };

  if (initialBlogs.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="mb-4 text-lg text-[var(--color-text-muted)]">
          No blogs yet
        </p>
        <Link href="/admin/blogs/new" className="btn-primary">
          Create Your First Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      {deleteError && (
        <div
          role="alert"
          className="border-b border-red-500/20 bg-red-500/10 px-6 py-3 text-sm text-red-400"
        >
          {deleteError}
        </div>
      )}
      <table className="w-full">
        <thead className="border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-muted)]">
              Title
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-muted)]">
              Created
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-muted)]">
              Updated
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-[var(--color-text-muted)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {initialBlogs.map((blog) => (
            <tr
              key={blog.id}
              className="border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-bg-hover)]"
            >
              <td className="px-6 py-4">
                <Link
                  href={`/blogs/${blog.id}`}
                  className="font-medium hover:text-[var(--color-accent)]"
                >
                  {blog.title}
                </Link>
              </td>
              <td className="px-6 py-4 text-[var(--color-text-muted)]">
                {formatDate(blog.createdAt, "short")}
              </td>
              <td className="px-6 py-4 text-[var(--color-text-muted)]">
                {formatDate(blog.updatedAt, "short")}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/blogs/${blog.id}/edit`}
                    className="text-sm text-[var(--color-accent)] hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id, blog.title)}
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
