"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import type { Blog, User } from "../../../../generated/prisma";

type BlogWithOwner = Blog & {
  owner: Pick<User, "id" | "name" | "image"> | null;
};

interface BlogContentProps {
  blog: BlogWithOwner;
  adjacent: {
    prev: { id: string; title: string } | null;
    next: { id: string; title: string } | null;
  };
}

export function BlogContent({ blog, adjacent }: BlogContentProps) {
  const [copied, setCopied] = useState(false);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(blog.createdAt));

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  // Sanitize HTML content
  const sanitizedContent =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(blog.content)
      : blog.content;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl px-6 pb-24"
    >
      {/* Header */}
      <header className="mb-12 text-center">
        <p className="mb-4 text-[var(--color-text-muted)]">{formattedDate}</p>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">{blog.title}</h1>

        {/* Author */}
        <div className="flex items-center justify-center gap-3">
          {blog.owner?.image && (
            <Image
              src={blog.owner.image}
              alt={blog.owner.name ?? "Author"}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <span className="text-[var(--color-text-secondary)]">
            {blog.owner?.name ?? "Cassius Reynolds"}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      {blog.img && (
        <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl">
          <Image
            src={blog.img}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose-custom mb-12"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {/* Share Section */}
      <div className="mb-12 flex justify-center">
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          {copied ? (
            <>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Link Copied!
            </>
          ) : (
            <>
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
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy Link
            </>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between border-t border-[var(--color-border)] pt-8">
        {adjacent.prev ? (
          <Link
            href={`/blogs/${adjacent.prev.id}`}
            className="group flex max-w-[45%] flex-col text-left"
          >
            <span className="mb-1 text-sm text-[var(--color-text-muted)]">
              ← Previous
            </span>
            <span className="font-medium text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-accent)]">
              {adjacent.prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/blogs"
          className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          All Posts
        </Link>

        {adjacent.next ? (
          <Link
            href={`/blogs/${adjacent.next.id}`}
            className="group flex max-w-[45%] flex-col text-right"
          >
            <span className="mb-1 text-sm text-[var(--color-text-muted)]">
              Next →
            </span>
            <span className="font-medium text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-accent)]">
              {adjacent.next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </motion.article>
  );
}

