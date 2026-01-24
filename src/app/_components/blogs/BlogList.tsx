"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BlogCard } from "./BlogCard";
import type { Blog, User } from "../../../../generated/prisma";

type BlogWithOwner = Blog & {
  owner: Pick<User, "id" | "name" | "image"> | null;
};

interface BlogListProps {
  blogs: BlogWithOwner[];
}

export function BlogList({ blogs }: BlogListProps) {
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");

  if (blogs.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-xl text-[var(--color-text-muted)]">
          No blog posts yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Display Toggle */}
      <div className="mb-8 flex items-center justify-end gap-4">
        <span className="text-sm text-[var(--color-text-muted)]">View:</span>
        <div className="flex rounded-lg border border-[var(--color-border)] p-1">
          <button
            onClick={() => setDisplayMode("grid")}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              displayMode === "grid"
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setDisplayMode("list")}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              displayMode === "list"
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Blog Grid/List */}
      <div
        className={
          displayMode === "grid"
            ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            : "space-y-6"
        }
      >
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <BlogCard blog={blog} variant={displayMode} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

