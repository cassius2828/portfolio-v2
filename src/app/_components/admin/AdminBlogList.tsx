"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import type { Blog, User } from "../../../../generated/prisma";

type BlogWithOwner = Blog & {
  owner: Pick<User, "id" | "name" | "image"> | null;
};

interface AdminBlogListProps {
  blogs: BlogWithOwner[];
}

export function AdminBlogList({ blogs: initialBlogs }: AdminBlogListProps) {
  const router = useRouter();
  const deleteMutation = api.blog.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate({ id });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
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
                {formatDate(blog.createdAt)}
              </td>
              <td className="px-6 py-4 text-[var(--color-text-muted)]">
                {formatDate(blog.updatedAt)}
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

